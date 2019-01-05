import React from 'react';
import styled from 'styled-components';

const EditorButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${props => (props.isActive ? 'black' : 'gray')};
    cursor: pointer;
    font-size: 20px;
`;

export default ({ isActive, icon, onClick }) => {
    return (
        <EditorButton isActive={isActive} onClick={onClick}>
            {icon}
        </EditorButton>
    );
};
