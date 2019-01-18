import React from 'react';
import styled from 'styled-components';
import { GridLoader } from 'react-spinners';

const LoadingArea = styled.div`
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
`;

const LoaderCss = 'margin: auto;';

export default () => {
    return (
        <LoadingArea>
            <GridLoader
                color="white"
                css={LoaderCss}
                sizeUnit={'px'}
                size={25}
            />
        </LoadingArea>
    );
};
