import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';
import TaskDashboard from './components/task/taskDashboard/TaskDashboard';
import Store from './data/Store';
import TaskDetailPage from './components/task/taskDetailPage/TaskDetailPage';
import theme from './theme/theme';

const MainView = styled.div`
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
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/tasks" />
                                </Route>
                            </Switch>

                            <Route
                                path="/(.+)"
                                render={() => (
                                    <MainView>
                                        <Switch>
                                            <Route
                                                path="/task/:id"
                                                component={TaskDetailPage}
                                            />
                                            <Route
                                                path="/tasks"
                                                component={TaskDashboard}
                                            />
                                        </Switch>
                                    </MainView>
                                )}
                            />
                        </div>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
