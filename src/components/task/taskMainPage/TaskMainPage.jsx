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
        console.log('this.state.task :', this.state.task);

        return <MainPanel>ABCD</MainPanel>;
    }
}

const mapStateToProps = ({ tasks }, ownprops) => {
    console.log('ownprops.match.params.id :', ownprops.match.params.id);
    let task = tasks.find(x => x.id === ownprops.match.params.id);
    return { task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskMainPage);
