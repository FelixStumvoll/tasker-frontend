import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';

import Store, { history } from './redux/store';
import theme from './theme/theme';
import Router from './components/router/Router';
import NotificationManager from './components/notification/NotificationManager';

const MainGrid = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas: '.' 'Content';
    grid-template-rows: ${({ theme }) => theme.navHeight} 1fr;
`;

const RouterWrapper = styled.div`
    grid-area: Content;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <ConnectedRouter history={history}>
                    <ThemeProvider theme={theme}>
                        <MainGrid>
                            <NotificationManager />
                            <Navbar />
                            <RouterWrapper>
                                <Router />
                            </RouterWrapper>
                        </MainGrid>
                    </ThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
