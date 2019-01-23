import passwordRules from './passwordRules';
import React from 'react';
import styled from 'styled-components';

const requiredText = 'Required';

const List = styled.ul`
    margin: auto;
`;

const ListItem = styled.li`
    margin: 0px;
    width: fit-content;
`;

export default values => {
    const errors = {};

    let { username, password, passwordRepeat } = values;

    if (!username) errors.username = requiredText;

    if (!password) errors.password = requiredText;
    else {
        for (let i = 0; i < passwordRules.length; i++) {
            if (!new RegExp(passwordRules[i]).test(password)) {
                errors.password = (
                    <div>
                        Password needs to contain atleast a
                        <List>
                            <ListItem>number</ListItem>
                            <ListItem>uppercase character</ListItem>
                            <ListItem>lowercase character</ListItem>
                            <ListItem>special character</ListItem>
                        </List>
                    </div>
                );
                break;
            }
        }
    }

    if (!passwordRepeat) errors.passwordRepeat = requiredText;

    if (password && passwordRepeat && password !== passwordRepeat)
        errors.passwordRepeat = 'Passwords must be equal';
    return errors;
};
