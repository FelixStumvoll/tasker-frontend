import passwordRules from './passwordRules';
import React from 'react';

const requiredText = 'Required';

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
                        <ul>
                            <li>number</li>
                            <li>uppercase character</li>
                            <li>lowercase character</li>
                            <li>special character</li>
                        </ul>
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
