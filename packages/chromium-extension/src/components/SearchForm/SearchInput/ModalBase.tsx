import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import keyListener from '../../../utils';
import Checkbox from '../../ui/Checkbox';
import Glyph from '../../ui/Glyph';
import Radio from '../../ui/Radio';
// import { handleToggleFilter } from './Modals/utils';

/* ---------- STYLES ---------- */

const SModal = styled.div`
    background: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    position: absolute;
    width: 350px;
    height: 340px;
    top: ${(props) => props.top}px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    z-index: 500;
`;

const SInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(2, 42, 142, 0.1);
    position: relative;
`;

const SInput = styled.input`
    width: 100%;
    border: none;
    padding: 4px;
    font-size: 14px;
    height: 32px;
    font-family: 'Montserrat', sans-serif;

    &:focus-visible {
        outline: -webkit-focus-ring-color auto 0px;
    }
`;

const SOperator = styled.div`
    margin-top: 24px;
    display: flex;
`;

const SRadio = styled(Radio)`
    width: auto;

    &:not(:first-child) {
        margin-left: 16px;
    }
`;

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 88%;
`;

const SFullScreen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const SText = styled.p`
    white-space: initial;
`;

const SFieldsContainer = styled.div`
    overflow-x: hidden;
    margin-top: 16px;
    height: 100%;
    width: 100%;
`;

/* ---------- COMPONENT ---------- */

interface ModalBaseProps {
    multiselect?: boolean;
    fields: any[];
    operator?: string;
    setOperator?: Dispatch<SetStateAction<string>>;
    handleChange?: (field) => void;
    attributeKey: string;
    isOpen: boolean;
}

const ModalBase: FC<ModalBaseProps> = ({
    multiselect = false,
    fields,
    operator,
    setOperator,
    handleChange,
    attributeKey,
    isOpen,
}) => {
    const [searchValue, setsearchValue] = useState('');
    const [fieldsCopy, setFieldsCopy] = useState(fields);
    const [filteredFields, setFiteredFields] = useState(fields);
    const { Top } = useStoreState((state) => state.modal);

    useEffect(() => {
        setFieldsCopy(fields);
        setFiteredFields(fields);
    }, [fields]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newFields = fieldsCopy.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
        setsearchValue(value);
        setFiteredFields(newFields);
    };
    const { resetModalState } = useStoreActions((actions) => actions.modal);

    const handleClose = () => {
        resetModalState();
    };

    const { pickedFilters } = useStoreState((state) => state.filters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    const handleToggleFilter = (field) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === attributeKey);
        const newOperator = operator === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: [field.icon],
                label: [field.label],
                filter: { attributeKey, operator: newOperator, values: [field.id] },
            };
            newPickedFilters.push(filter);
        } else {
            const { icon, label, filter } = newPickedFilters[filterIndex];
            newPickedFilters[filterIndex].filter.operator = newOperator;
            const idIndex = filter.values?.findIndex((item) => item === field.id);

            if (idIndex === -1) {
                filter.values.push(field.id);
                icon.push(field.icon);
                label.push(field.label);
            } else {
                filter.values.splice(idIndex, 1);
                icon.splice(idIndex, 1);
                label.splice(idIndex, 1);
            }

            if (filter.values.length === 0) {
                newPickedFilters.splice(filterIndex, 1);
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeOperator = (params) => {
        setOperator(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === attributeKey);
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isOpen && (
                <SModal onClick={(e) => e.stopPropagation()} top={Top}>
                    <SInputContainer>
                        <Glyph icon="Search" />
                        <SInput
                            onBlur={() => {
                                window.removeEventListener('keypress', keyListener, true);
                                window.removeEventListener('keydown', keyListener, true);
                                window.removeEventListener('keyup', keyListener, true);
                            }}
                            onChange={handleSearch}
                            onFocus={() => {
                                window.addEventListener('keypress', keyListener, true);
                                window.addEventListener('keydown', keyListener, true);
                                window.addEventListener('keyup', keyListener, true);
                            }}
                            placeholder="Search..."
                            type="text"
                            value={searchValue}
                        />
                    </SInputContainer>
                    <SForm>
                        {multiselect && (
                            <SOperator>
                                <SRadio
                                    field={{
                                        id: 'or',
                                        label: chrome.i18n.getMessage(`operator_or`),
                                        checked: operator === 'or',
                                    }}
                                    name="operator"
                                    onChange={() => handleChangeOperator('or')}
                                    bold
                                />
                                <SRadio
                                    field={{
                                        id: 'and',
                                        label: chrome.i18n.getMessage(`operator_and`),
                                        checked: operator === 'and',
                                    }}
                                    name="operator"
                                    onChange={() => handleChangeOperator('and')}
                                    bold
                                />
                            </SOperator>
                        )}
                        <SFieldsContainer>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                filteredFields?.length > 0 ? (
                                    multiselect ? (
                                        filteredFields?.map((field) => (
                                            <Checkbox
                                                key={field.id}
                                                field={field}
                                                onChange={
                                                    handleChange
                                                        ? () => handleChange(field)
                                                        : () => handleToggleFilter(field)
                                                }
                                            />
                                        ))
                                    ) : (
                                        filteredFields?.map((field) => (
                                            <Radio
                                                key={field.id}
                                                field={field}
                                                name={attributeKey}
                                                onChange={
                                                    handleChange
                                                        ? () => handleChange(field)
                                                        : () => handleToggleFilter(field)
                                                }
                                                setIsOpen={handleClose}
                                            />
                                        ))
                                    )
                                ) : (
                                    <SFullScreen>
                                        <SText>{chrome.i18n.getMessage(`no_filters`)}</SText>
                                    </SFullScreen>
                                )
                            }
                        </SFieldsContainer>
                    </SForm>
                </SModal>
            )}
        </>
    );
};

export default ModalBase;
