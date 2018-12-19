import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';

import Store from './redux/store';
import theme from './theme/theme';
import Router from './components/router/Router';

const MainGrid = styled.div`
    height: 100%;
    display: grid;
    grid-template-areas:
        'NavArea'
        'MainArea';
    grid-template-rows: ${({ theme }) => theme.navHeight} 1fr;
    grid-template-columns: 1fr;
`;

const GridWrapper = styled.div`
    height: 100%;
    grid-area: ${props => props.area};
`;

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <MainGrid>
                            <GridWrapper area="NavArea">
                                <Navbar />
                            </GridWrapper>
                            <GridWrapper area="MainArea">
                                <Router />
                            </GridWrapper>
                        </MainGrid>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
