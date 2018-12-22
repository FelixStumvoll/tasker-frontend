import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';

const DateField = styled.input`
    border: none;
    outline: none;
    padding-left: 5px;
    cursor: pointer;
`;

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: undefined
        };
    }

    formatDate = (date, format, locale) => {
        return dateFnsFormat(date, format, { locale });
    };

    handleDayClick = (selectedDay, { selected }) => {
        this.setState({
            selectedDay: selected ? undefined : selectedDay
        });
    };

    handleDayChange = selectedDay => {
        let { callback } = this.props;
        if (!callback) {
            return;
        }

        callback(selectedDay);
    };

    render() {
        let { selectedDay } = this.state;

        const modifiers = {
            today: new Date()
        };

        const modifiersStyles = {
            today: {
                backgroundColor: 'green',
                color: 'white'
            }
        };

        const FORMAT = 'dd.MM.yyyy';

        return (
            <DayPickerInput
                component={props => (
                    <DateField value={selectedDay} {...props} readOnly />
                )}
                placeholder="Enter a due Date"
                onDayChange={this.handleDayChange}
                formatDate={this.formatDate}
                format={FORMAT}
                clickUnselectsDay={true}
                dayPickerProps={{
                    modifiers,
                    modifiersStyles,
                    onDayClick: this.handleDayClick,
                    selectedDays: this.state.selectedDay,
                    disabledDays: { before: new Date() }
                }}
            />
        );
    }
}
