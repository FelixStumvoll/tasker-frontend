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
    width: 100%;
    display: grid;
    grid-template-rows: ${({ theme }) => theme.navHeight} 1fr;
`;

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <MainGrid>
                            <Navbar />
                            <Router />
                        </MainGrid>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
