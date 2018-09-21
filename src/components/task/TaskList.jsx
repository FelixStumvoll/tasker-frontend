import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import Task from './Task';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const TaskWrapper = styled.div`
    margin-bottom: 30px;
`;

class TaskList extends Component {
    render() {
        let { tasks } = this.props;
        return (
            <div>
                <List>
                    <FlipMove>
                        {tasks &&
                            tasks.map(task => (
                                <TaskWrapper key={task.id}>
                                    <Task id={task.id} />
                                </TaskWrapper>
                            ))}
                    </FlipMove>
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
