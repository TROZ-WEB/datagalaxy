import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import keyListener from '../../../utils';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Glyph from '../../ui/Glyph';
import Radio from '../../ui/Radio';

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
`;

const SIntersection = styled.div`
    margin-top: 24px;
    display: flex;
`;

const SRadio = styled(Radio)`
    margin-left: 16px;
`;

const SButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 8px;
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
    label: string;
    multiselect?: boolean;
    fields: any[];
    intersectionLogic?: string;
    handleChangeIntersectionLogic?: (params: string) => void;
    onChange?: (id: string) => void;
    isOpen: boolean;
}

const ModalBase: FC<ModalBaseProps> = ({
    label,
    multiselect = false,
    fields,
    intersectionLogic,
    handleChangeIntersectionLogic,
    onChange,
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newFields = fieldsCopy.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
        setsearchValue(value);
        setFiteredFields(newFields);
    };
    const { resetModalState } = useStoreActions((actions) => actions.modal);

    const handleClose = () => {
        resetModalState();
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
                            onChange={handleChange}
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
                            <SIntersection>
                                <Radio
                                    checked={intersectionLogic === 'or'}
                                    id="or"
                                    label={chrome.i18n.getMessage(`intersection_or`)}
                                    name="intersectionLogic"
                                    onChange={handleChangeIntersectionLogic}
                                    bold
                                />
                                <SRadio
                                    checked={intersectionLogic === 'and'}
                                    id="and"
                                    label={chrome.i18n.getMessage(`intersection_and`)}
                                    name="intersectionLogic"
                                    onChange={handleChangeIntersectionLogic}
                                    bold
                                />
                            </SIntersection>
                        )}
                        <SFieldsContainer>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                filteredFields?.length > 0 ? (
                                    multiselect ? (
                                        filteredFields?.map((field) => (
                                            <Checkbox
                                                key={field.id}
                                                checked={field.checked}
                                                icon={field.icon}
                                                id={field.id}
                                                label={field.label}
                                                onChange={onChange}
                                            />
                                        ))
                                    ) : (
                                        filteredFields?.map((field) => (
                                            <Radio
                                                key={field.id}
                                                checked={field.checked}
                                                icon={field.icon}
                                                id={field.id}
                                                label={field.label}
                                                name={label}
                                                onChange={onChange}
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
