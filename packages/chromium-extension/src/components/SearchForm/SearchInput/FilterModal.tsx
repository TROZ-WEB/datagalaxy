import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Glyph from '../../ui/Glyph';
import Radio from '../../ui/Radio';
import FiltersModalTag from './FiltersModalTag';

/* ---------- STYLES ---------- */

const SModal = styled.div`
    background: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    position: absolute;
    width: 350px;
    height: 340px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px;
    z-index: 100;
`;

const SOverlay = styled.div`
    position: fixed;
    width: 400px;
    height: 100%;
    top: 0;
    right: 0;
    background: #00103033;
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

interface FilterModalProps {
    label: string;
    multiselect?: boolean;
    fields: any[];
    intersectionLogic?: string;
    handleChangeIntersectionLogic?: (params: string) => void;
    onChange?: (id: string) => void;
}

const FilterModal: FC<FilterModalProps> = ({
    label,
    multiselect = false,
    fields,
    intersectionLogic,
    handleChangeIntersectionLogic,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [fieldsCopy, setFieldsCopy] = useState(fields);
    const [filteredFields, setFiteredFields] = useState(fields);

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

    return (
        <>
            <FiltersModalTag label={label} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <SOverlay>
                    <SModal>
                        <SInputContainer>
                            <Glyph icon="Search" />
                            <SInput onChange={handleChange} placeholder="Search..." type="text" value={searchValue} />
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
                                    filteredFields.length > 0 ? (
                                        multiselect ? (
                                            filteredFields?.map((field) => (
                                                <Checkbox
                                                    key={field.id}
                                                    checked={field.checked}
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
                                                    id={field.id}
                                                    label={field.label}
                                                    name={label}
                                                    onChange={onChange}
                                                    setIsOpen={setIsOpen}
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
                            {multiselect && (
                                <SButtonContainer>
                                    <Button id={`filter_${label}`} onClick={() => setIsOpen(false)}>
                                        {chrome.i18n.getMessage(`form_send`)}
                                    </Button>
                                </SButtonContainer>
                            )}
                        </SForm>
                    </SModal>
                </SOverlay>
            )}
        </>
    );
};

export default FilterModal;
