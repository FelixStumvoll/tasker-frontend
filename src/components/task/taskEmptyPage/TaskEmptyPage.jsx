import React from 'react';
import styled from 'styled-components';

const EmptyText = styled.div`
    margin: auto;
    font-weight: bolder;
    font-size: 35px;
`;

export default () => {
    return <EmptyText>No Task selected</EmptyText>;
};
