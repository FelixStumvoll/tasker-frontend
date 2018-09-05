import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';

import { updateTask } from './taskActions';

const TaskField = styled.div`
    border-radius: 5px;
    background-color: #d30c7b;
    display: grid;
    grid-template-columns: 50px 830px;
    grid-column-gap: 20px;
`;

// const TaskText = styled(Textarea)`
//     border: none;
//     outline: none;
//     width: auto;
//     box-sizing: border-box;
//     display: block;
//     margin: 5px;
//     padding: 0px;
//     background-color: inherit;
//     resize: none;
//     line-height: 30px;
// `;

const CheckedIcon = styled(FontAwesomeIcon)`
    margin: auto;
    color: ${({ checked }) => (checked ? 'white' : 'black')};
`;

const CheckedField = styled.button`
    background-color: ${props => (props.checked ? 'green' : 'red')};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0;
    outline: none;
    border: none;
    padding-top: 4px;
`;

const TaskView = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px 5px 5px 0px;
`;

const TaskHeader = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
`;

const TaskText = styled.span`
    white-space: pre-line;
`;

const BadgeWrapper = styled.div`
    position: relative;
`;

const Badge = styled.button`
    border: none;
    outline: none;
    position: absolute;
    bottom: -15px;
    right: -15px;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    background-color: #ddca7d;
`;

const EditIcon = styled(FontAwesomeIcon)`
    margin: auto;
`;

//feature: Modal
/*

position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

modal-main {
    position:fixed;
    background: white;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2),  0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
}
*/

class Task extends Component {
    // constructor() {
    //     super();
    //     // this.state = { checked: false };
    // }

    textAreaChange = e => {
        let areaHeight = e.target.style.height;
        let margin = areaHeight === '30px' ? 0 : 1;
        this.setState({ margin });
    };

    completedClick = () => {
        console.log(this.props.task);
        let { task } = this.props;
        task.completed = !task.completed;
        this.props.updateTask(task);
    };

    render() {
        let { task } = this.props;
        return (
            <TaskField>
                <CheckedField
                    checked={task.completed}
                    onClick={this.completedClick}
                >
                    <CheckedIcon
                        checked={task.completed}
                        icon={faCheck}
                        size="2x"
                    />
                </CheckedField>
                <TaskView>
                    <TaskHeader> {task.title} </TaskHeader>
                    <TaskText>{task.description}</TaskText>
                    <BadgeWrapper>
                        <Badge>
                            <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                        </Badge>
                    </BadgeWrapper>
                </TaskView>
            </TaskField>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.filter(item => item.id === taskId)[0];
    }

    return { task };
};

const mapDispatchToProps = { updateTask };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);
