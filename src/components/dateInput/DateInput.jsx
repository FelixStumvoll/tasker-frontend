import React, { Component } from 'react';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import 'react-day-picker/lib/style.css';
import './dateInput.css';

const DateField = styled.input`
    border: none;
    outline: none;
    padding-left: 5px;
`;

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: undefined
        };
    }

    parseDate = (str, format, locale) => {
        const parsed = dateFnsParse(str, format, { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    };

    formatDate = (date, format, locale) => {
        return dateFnsFormat(date, format, { locale });
    };

    handleDayClick = (selectedDay, { selected }) => {
        let dayVal;
        console.log('1 selected :', selected);
        if (selected) {
            dayVal = undefined;
        } else {
            dayVal = selectedDay;
        }
        this.setState({ selectedDay: dayVal });
    };

    handleDayChange = dayVal => {
        console.log('2');
        let { callback } = this.props;
        let { selectedDay } = this.state;
        if (!callback) {
            return;
        }
        console.log('selectedDay :', selectedDay);
        if (!dayVal) {
            callback('');
        } else {
            callback(dateFnsFormat(dayVal, 'dd.MM.yyyy'));
        }
    };

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

        const FORMAT = 'dd.MM.yyyy';

        return (
            <DayPickerInput
                onDayChange={this.handleDayChange}
                formatDate={this.formatDate}
                format={FORMAT}
                parseDate={this.parseDate}
                clickUnselectsDay={true}
                dayPickerProps={{
                    modifiers,
                    modifiersStyles,
                    onDayClick: this.handleDayClick,
                    selectedDays: this.state.selectedDay,
                    disabledDays: { before: new Date() }
                }}
                placeholder="Enter a due Date"
                component={props => <DateField {...props} readOnly />}
            />
        );
    }
}
