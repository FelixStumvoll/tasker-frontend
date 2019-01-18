import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NotificationModal from './NotificationModal';

class NotificationManager extends Component {
    render() {
        let { notification } = this.props;
        if (notification.show) return <NotificationModal />;

        return <div />;
    }
}

NotificationManager.propTypes = {
    notification: PropTypes.object.isRequired
};

const mapStateToProps = ({ notification }) => ({
    notification
});

export default connect(mapStateToProps)(NotificationManager);
