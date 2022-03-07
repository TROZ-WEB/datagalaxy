import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 25px;
`;

const SCheckbox = styled.input`
    display: none;
`;
const SLabelWrapper = styled.div`
    font-size: 14px;
    line-height: 18px;
    flex: 1;
`;
const SSwitch = styled.div`
    background: #084eff80;
    border-radius: 16px;
    width: 42px;
    height: 24px;
    position: relative;
    margin-right: 13px;

    ${(props) => props.checked && `background: #084eff`}
`;
const SSwitchSlider = styled.span`
    transition: 0.2s ease-in-out;
    -webkit-transition: 0.2s ease-in-out;
    background: #f3f6ff;
    font-size: 12px;
    line-height: 15px;
    border-radius: 16px;
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    left: 2px;
    top: 2px;

    ${(props) => props.switchSliderChecked && `left: 20px`}
`;

/* ---------- COMPONENT ---------- */

interface InputProps {
    name: string;
    label: string;
    value: boolean;
    onChange: Function;
}

const Switch = React.forwardRef<HTMLInputElement, InputProps>(
    ({ name, label, value: checked, onChange, ...rest }, ref) => {
        const triggerCheckbox = () => {
            onChange(!checked);
        };

        return (
            <SRoot>
                <SSwitch
                    checked={checked}
                    onClick={triggerCheckbox}
                    onKeyDown={triggerCheckbox}
                    role="button"
                    tabIndex={0}
                >
                    <SSwitchSlider switchSliderChecked={checked} />
                </SSwitch>
                <SLabelWrapper>
                    <label htmlFor={name}>{label}</label>
                </SLabelWrapper>
                <SCheckbox ref={ref} defaultChecked={checked} name={name} type="checkbox" {...rest} />
            </SRoot>
        );
    },
);

export default Switch;
