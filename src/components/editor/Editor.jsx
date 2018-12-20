// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

const existingValue = JSON.parse(localStorage.getItem('content'));
const initialValue = existingValue
    ? Value.fromJSON(existingValue)
    : Plain.deserialize('');

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
    MarkHotkey({ key: 'k', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '-', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' })
];

// Define our app...
export default class MyEditor extends React.Component {
    // Set the initial value when the app is first constructed.

    constructor(props) {
        super(props);

        this.editor = React.createRef();

        this.state = {
            value: initialValue
        };
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content);
            this.setState({ value });
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

    hasBlock = type => {
        const { value } = this.state;
        return value.blocks.some(node => node.type == type);
    };

    onMarkClick = (e, type) => {
        e.preventDefault();
        const editor = this.editor.current;
        editor.toggleMark(type);
        editor.focus();
    };

    // Render the editor.
    render() {
        return (
            <div>
                <button onClick={e => this.onMarkClick(e, 'bold')}>Bold</button>
                <Editor
                    value={this.state.value}
                    plugins={plugins}
                    onChange={this.onChange}
                    // onKeyDown={this.onKeyDown}
                    // renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    ref={this.editor}
                />
            </div>
        );
    }
}
