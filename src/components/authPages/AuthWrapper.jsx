import React from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        margin: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
    }
`;

const MarginArea = styled.div`
    margin: 150px auto auto auto;
    width: 500px;
    transition: ${({ theme }) => theme.transitionDuration};

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        width: 100%;
        margin: auto;
    }
`;

export default ({ children }) => {
    return (
        <AuthWrapper>
            <MarginArea>{children}</MarginArea>
        </AuthWrapper>
    );
};
