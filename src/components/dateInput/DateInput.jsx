import React, { Component } from 'react';
import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateField = styled.input`
    border: none;
    outline: none;
    padding-left: 5px;
    cursor: pointer;
`;

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = { date: props.selectedDate };
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedDate !== prevProps.selectedDate) {
            this.setState({ date: this.props.selectedDate });
        }
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

    handleChange = date => {
        this.setState({
            date
        });
        this.props.callback(date);
    };

    render() {
        let { date } = this.state;

        return (
            <DatePicker
                dateFormat="dd.MM.yyyy"
                selected={date}
                onChange={this.handleChange}
                placeholderText="Select a date"
                isClearable={true}
                minDate={new Date()}
            />
        );
    }
}
