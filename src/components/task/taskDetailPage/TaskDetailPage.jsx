import React, { Component } from 'react';
import { connect } from 'react-redux';

export class TaskDetailPage extends Component {
    render() {
        let { task } = this.props;

        return (
            <div>
                {task && (
                    <div>
                        <div>{task.id}</div>
                        <div>{task.title}</div>
                        <div>{task.description}</div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.match.params.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.find(item => item.id == taskId);
    }

    return { task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailPage);
