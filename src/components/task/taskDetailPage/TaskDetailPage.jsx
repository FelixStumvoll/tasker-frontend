import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

const DetailPage = styled.div`
    padding: 10px;
    /*note global padding 20px */
`;

const DetailGrid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-basis: auto;
`;

const TaskView = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    display: inline-flex;
    flex-direction: column;
    padding: 10px;
    position: sticky;
    top: 70px;
`;

const TaskTitleInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 25px;
    margin-bottom: 10px;
`;

const TaskDescriptionInput = styled(Textarea)`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    /* box-sizing: border-box;
    display: block; */
    padding: 0px;
    margin: 0px;
    resize: none;
    font-size: 16px;
    color: inherit;
    overflow: hidden;
`;

const SubTaskHeader = styled.div`
    font-weight: bolder;
    margin-bottom: 10px;
`;

const DemonstrationBloc = styled.div`
    height: 2000px;
    background-color: red;
    border-radius: 5px;
`;

export class TaskDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = { task: props.task };
    }

    onTaskTitleChange = e => {
        let { task } = this.props;
        task.title = e.target.value;

        this.setState({ task });
    };

    onTaskDescriptionChange = e => {
        let { task } = this.props;
        task.description = e.target.value;

        this.setState({ task });
    };

    render() {
        let { task } = this.props;

        return (
            <DetailPage>
                {task && ( // note: this is only shown if the id is a valid task
                    <DetailGrid>
                        <TaskView>
                            <TaskTitleInput value={task.title} onChange={this.onTaskTitleChange} />
                            <TaskDescriptionInput
                                value={task.description}
                                onChange={this.onTaskDescriptionChange}
                            />
                        </TaskView>
                        <div>
                            <SubTaskHeader>Tasks:</SubTaskHeader>
                            <DemonstrationBloc />
                        </div>
                    </DetailGrid>
                )}
            </DetailPage>
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
