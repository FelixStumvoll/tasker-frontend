import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { hideMessage } from '../../redux/reducers/notificationReducer/notificationActions';

const slidein = keyframes`
    from {
            right: -1000px;
        }

        to {
            right: 0px;
        }
    }
`;

const slideout = keyframes`
    from {
            opacity: 1;
        }

        to {
           opacity: 0;
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: calc(${({ theme }) => theme.navHeight} + 10px);
    right: 10px;
    z-index: 9999;
    border-radius: 10px;
    border: 1px solid ${props => props.border};
    box-shadow: 0px 0px 10px 0px ${props => props.shadow};
    border-top: 10px solid ${props => props.border};
    background-color: ${props => props.background};
    font-family: ${({ theme }) => theme.defaultFont};
    width: 300px;
    font-size: 13px;
    cursor: pointer;
    color: black;
    padding: 5px;
    display: grid;
    grid-template-areas: 'Message' 'DismissText';
    grid-row-gap: 10px;
    grid-template-rows: 1fr 20px;
    transition-duration: ${({ theme }) => theme.transitionDuration};
    animation-name: ${props => (props.slidein ? slidein : slideout)};
    animation-duration: 1s;
    opacity: ${props => (props.slidein ? '1' : '0')};

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        width: calc(100% - 30px);
    }
`;

const Message = styled.div`
    font-weight: bolder;
    grid-area: Message;
    margin: auto;
    white-space: pre;
    max-width: 100%;
    word-wrap: break-word;
    overflow: auto;
    box-sizing: border-box;
    text-align: center;
`;

const DismissText = styled.div`
    grid-area: DismissText;
    font-style: italic;
    margin: auto;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
`;

class NotificationModal extends Component {
    constructor(props) {
        super(props);

        this.state = { slidein: true, timeoutId: undefined };
    }

    hideMessageDelay = () => {
        this.setState({ slidein: false });
        setTimeout(() => {
            this.props.hideMessage();
        }, 1000);
    };

    componentDidMount() {
        let { notification } = this.props;
        let timeoutId = setTimeout(() => {
            this.hideMessageDelay();
        }, notification.delay);

        this.setState({ timeoutId });
    }

    onMessageClick = () => {
        this.hideMessageDelay();
    };

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId);
    }

    render() {
        let { notification } = this.props;

        return (
            <Modal
                border={notification.style.border}
                background={notification.style.background}
                shadow={notification.style.shadow}
                slidein={this.state.slidein}
                onClick={this.onMessageClick}
            >
                <Message>{notification.message}</Message>
                <DismissText>Click to dismiss</DismissText>
            </Modal>
        );
    }
}

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = {
    hideMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationModal);
