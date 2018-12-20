import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TaskPanel extends Component {
    render() {
        return <div />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskPanel);
