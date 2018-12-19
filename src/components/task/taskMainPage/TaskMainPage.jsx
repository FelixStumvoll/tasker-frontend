import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MainPanel = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
`;

class TaskMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { task: undefined };
    }
    render() {
        console.log('this.state.task :', this.props.task);

        return <MainPanel>ABCD</MainPanel>;
    }
}

const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(x => x.id === ownprops.match.params.id);
    console.log('task', task);
    return { task: task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskMainPage);
