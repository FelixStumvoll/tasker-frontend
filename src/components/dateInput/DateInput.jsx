import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import './dateInput.css';

const DateField = styled.input`
    border: none;
    outline: none;
    padding-left: 5px;
`;

export default class DateInput extends Component {
    render() {
        const modifiers = {
            today: new Date()
        };

        const modifiersStyles = {
            today: {
                backgroundColor: 'green',
                color: 'white'
            }
        };

        return (
            <DayPickerInput
                dayPickerProps={{
                    modifiers,
                    modifiersStyles,
                    disabledDays: { before: new Date() }
                }}
                placeholder="Enter a due Date"
                component={props => <DateField {...props} />}
            />
        );
    }
}
