import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';
import TaskDashboard from './components/task/taskDashboard/TaskDashboard';
import Store from './redux/store';
import theme from './theme/theme';
import TaskCreatePage from './components/task/taskCreatePage/TaskCreatePage';

const Content = styled.div`
    padding: 20px;
    margin-top: 50px;
`;

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <div>
                            <Navbar />

                            <main>
                                <Switch>
                                    <Route exact path="/">
                                        <Redirect to="/tasks" />
                                    </Route>
                                </Switch>

                                <Route
                                    path="/(.+)"
                                    render={() => (
                                        <Content>
                                            <Switch>
                                                <Route
                                                    path="/task/create"
                                                    component={TaskCreatePage}
                                                />
                                                <Route
                                                    path="/task/:id"
                                                    component={TaskCreatePage}
                                                />
                                                <Route
                                                    path="/tasks"
                                                    component={TaskDashboard}
                                                />
                                            </Switch>
                                        </Content>
                                    )}
                                />
                            </main>
                        </div>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
