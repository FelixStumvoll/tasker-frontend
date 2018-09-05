import React, { Component } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    position: fixed;
    background: white;
    
`;

export default class Modal extends Component {
    render() {
        return <div />;
    }
}
