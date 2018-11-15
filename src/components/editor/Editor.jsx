// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import CodeNode from './CodeNode';
import BoldMark from './BoldMark';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

const MarkHotkey = options => {
    const { type, key } = options;

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key !== key) {
                return next();
            }

            // Prevent the default characters from being inserted.
            event.preventDefault();

            // Toggle the mark `type`.
            editor.toggleMark(type);
        }
    };
};

const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '-', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' })
];

// Define our app...
export default class MyEditor extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: initialValue
    };

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value });
    };

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />;
            default:
                return next();
        }
    };

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>;
            // Add our new mark renderers...
            case 'code':
                return <code>{props.children}</code>;
            case 'italic':
                return <em>{props.children}</em>;
            case 'strikethrough':
                return <del>{props.children}</del>;
            case 'underline':
                return <u>{props.children}</u>;
            default:
                return next();
        }
    };

    // Render the editor.
    render() {
        return (
            <Editor
                value={this.state.value}
                plugins={plugins}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
            />
        );
    }
}
