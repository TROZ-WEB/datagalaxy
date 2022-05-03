import React, {
    FC,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ReactNode,
    useCallback,
    useRef,
    useLayoutEffect,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, ListChildComponentProps } from 'react-window';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import keyListener from '../../../utils';
import Checkbox from '../../ui/Checkbox';
import Glyph from '../../ui/Glyph';
import Radio from '../../ui/Radio';
import Tooltip from '../../ui/Tooltip';

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
    margin-top: 8px;
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
    height: 100%;
    width: 100%;
`;

/* ---------- COMPONENT ---------- */

export interface Field {
    id: string;
    label: string;
    icon?: ReactNode;
    name?: string;
    nameUnit?: string;
    checked?: boolean;
}

interface ModalBaseProps {
    multiselect?: boolean;
    fields: Field[];
    operator?: string;
    setOperator?: Dispatch<SetStateAction<string>>;
    handleChange?: (field: Field) => void;
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
    const [searchValue, setSearchValue] = useState('');
    const [fieldsCopy, setFieldsCopy] = useState(fields);
    const [filteredFields, setFiteredFields] = useState(fields);
    const { Top } = useStoreState((state) => state.modal);
    const { resetModalState } = useStoreActions((actions) => actions.modal);
    const { pickedFilters } = useStoreState((state) => state.filters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        setFieldsCopy(fields);
        setFiteredFields(fields);
        setSearchValue('');
    }, [fields]);

    useLayoutEffect(() => {
        if (isOpen === true) {
            setSearchValue('');
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newFields = fieldsCopy.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
        setSearchValue(value);
        setFiteredFields(newFields);
    };

    const handleClose = () => {
        resetModalState();
    };

    const handleToggleFilter = (field: Field) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === attributeKey);
        const newOperator = operator === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: [field.icon],
                content: [field.label],
                name: field.name,
                nameUnit: field.nameUnit,
                filter: { attributeKey, operator: newOperator, values: [field.id] },
            };
            newPickedFilters.push(filter);
        } else {
            const { icon, content, filter } = newPickedFilters[filterIndex];
            newPickedFilters[filterIndex].filter.operator = newOperator;
            const idIndex = filter.values?.findIndex((item) => item === field.id);

            if (idIndex === -1) {
                filter.values.push(field.id);
                icon.push(field.icon);
                content.push(field.label);
            } else {
                filter.values.splice(idIndex, 1);
                icon.splice(idIndex, 1);
                content.splice(idIndex, 1);
            }

            if (filter.values.length === 0) {
                newPickedFilters.splice(filterIndex, 1);
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeOperator = (params: 'or' | 'and') => () => {
        setOperator(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === attributeKey);
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    const renderRow = useCallback(
        ({ style, index }: ListChildComponentProps<Field>) => {
            const field = filteredFields[index];

            const onChange = handleChange ? () => handleChange(field) : () => handleToggleFilter(field);

            return (
                <div data-for={field.id} data-tip={field?.label} style={style}>
                    {multiselect ? (
                        <Checkbox key={field.id} field={field} onChange={onChange} />
                    ) : (
                        <Radio
                            key={field.id}
                            field={field}
                            name={attributeKey}
                            onChange={onChange}
                            setIsOpen={handleClose}
                        />
                    )}
                    <Tooltip effect="float" id={field.id} />
                </div>
            );
        },
        [filteredFields],
    );

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isOpen && (
                <SModal onClick={(e) => e.stopPropagation()} top={Top}>
                    <SInputContainer>
                        <Glyph icon="Search" />
                        <SInput
                            ref={inputRef}
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
                                    onChange={handleChangeOperator('or')}
                                    inline
                                />
                                <SRadio
                                    field={{
                                        id: 'and',
                                        label: chrome.i18n.getMessage(`operator_and`),
                                        checked: operator === 'and',
                                    }}
                                    name="operator"
                                    onChange={handleChangeOperator('and')}
                                    inline
                                />
                            </SOperator>
                        )}
                        <SFieldsContainer>
                            {filteredFields?.length > 0 ? (
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <List
                                            height={height}
                                            itemCount={filteredFields?.length}
                                            itemSize={() => 36}
                                            width={width}
                                        >
                                            {renderRow}
                                        </List>
                                    )}
                                </AutoSizer>
                            ) : (
                                <SFullScreen>
                                    <SText>{chrome.i18n.getMessage(`no_filters`)}</SText>
                                </SFullScreen>
                            )}
                        </SFieldsContainer>
                    </SForm>
                </SModal>
            )}
        </>
    );
};

export default ModalBase;
