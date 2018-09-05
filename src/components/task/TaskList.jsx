import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './Task';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const TaskWrapper = styled.div`
    margin-bottom: 20px;
`;

class TaskList extends Component {
    render() {
        let { tasks } = this.props;
        return (
            <div>
                <List>
                    {tasks &&
                        tasks.map(task => (
                            <TaskWrapper key={task.id}>
                                <Task id={task.id} />
                            </TaskWrapper>
                        ))}
                </List>
            </div>
        );
    }
}

const mapStateToProps = ({ tasks }) => ({
    tasks
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);
