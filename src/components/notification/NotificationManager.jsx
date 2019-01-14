import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationModal from './NotificationModal';

class NotificationManager extends Component {
    render() {
        let { notification } = this.props;
        if (notification.show)
            return <NotificationModal/>;

        return <div />;
    }
}

const mapStateToProps = ({ notification }) => ({
    notification
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationManager);
