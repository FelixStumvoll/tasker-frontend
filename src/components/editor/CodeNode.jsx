import React from 'react';

export default props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};
