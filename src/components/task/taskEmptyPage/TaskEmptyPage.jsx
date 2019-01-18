import React from 'react';
import styled from 'styled-components';

const EmptyText = styled.div`
    margin: auto;
    font-weight: bolder;
    font-size: 35px;
    padding: 10px;
    border-radius: ${({ theme }) => theme.borderRadius};
    font-family: ${({ theme }) => theme.defaultFont};
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.textColor};
`;

const TextFloater = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export default () => {
    return (
        <TextFloater>
            <EmptyText>No Task selected</EmptyText>
        </TextFloater>
    );
};
