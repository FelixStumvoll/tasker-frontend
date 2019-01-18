import React from 'react';
import styled from 'styled-components';

const EditorButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${({ isActive, theme }) =>
        isActive ? theme.textColor : theme.styleButtonColor};
    cursor: pointer;
    font-size: 20px;
`;

export default ({ isActive, icon, onClick }) => {
    return (
        <EditorButton isActive={isActive} onMouseDown={onClick}>
            {icon}
        </EditorButton>
    );
};
