import React, { Component } from 'react';
import dateFnsFormat from 'date-fns/format';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = { date: props.selectedDate };
    }

    componentDidMount() {
        registerLocale('en-GB', enGB);
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
                locale="en-GB"
                className="datepicker"
                popperModifiers={{
                    offset: {
                        enabled: true,
                        offset: '-50px, 5px'
                    },
                    preventOverflow: {
                        enabled: true,
                        escapeWithReference: true, // force popper to stay in viewport (even when input is scrolled out of view)
                        boundariesElement: 'viewport'
                    }
                }}
            />
        );
    }
}
