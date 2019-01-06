import React from 'react';
import styled from 'styled-components';

const EmptyText = styled.div`
    margin: auto;
    font-weight: bolder;
    font-size: 35px;
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 10px;
    border-radius: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
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
