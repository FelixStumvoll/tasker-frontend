// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import styled from 'styled-components';

const EditorArea = styled.div`
    height: 100%;
    width: 100%;
`;

const EditorScrollPane = styled.div`
    /* display: flex; */
    /* flex-direction: column; */
    height: 100%;
    max-height: 100%;
    overflow: auto;
`;

const DEFAULT_NODE = 'paragraph';

const hotkeys = [
    { key: 'b', type: 'bold' },
    { key: 'k', type: 'code' },
    { key: 'i', type: 'italic' },
    { key: '-', type: 'strikethrough' },
    { key: 'u', type: 'underline' }
];

const isHotkey = event => {
    let hotkey = hotkeys.find(x => event.ctrlKey && event.key === x.key);
    if (hotkey) {
        return hotkey.type;
    } else {
        return undefined;
    }
};

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

    renderBlock = (props, editor, next) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>;
            default:
                return next();
        }
    };

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    hasBlock = type => {
        const { value } = this.state;
        return value.blocks.some(node => node.type == type);
    };

    onMarkClick = (e, type) => {
        console.log(e);
        e.preventDefault();
        const editor = this.editor.current;
        editor.toggleMark(type);
    };

    onBlockClick = (e, type) => {
        e.preventDefault();

        const editor = this.editor.current;
        const { value } = editor;
        const { document } = value;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => {
                return !!document.getClosest(
                    block.key,
                    parent => parent.type === type
                );
            });

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list'
                            ? 'numbered-list'
                            : 'bulleted-list'
                    )
                    .wrapBlock(type);
            } else {
                editor.setBlocks('list-item').wrapBlock(type);
            }
        }
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onKeyDown = (event, editor, next) => {
        let hotkey = isHotkey(event);
        // console.log('hotkey', hotkey);
        if (hotkey) {
            // event.preventDefault();
            editor.toggleMark(hotkey);
        } else {
            // console.log('next');
            return next();
        }
    };

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        console.log('isActive :', isActive);

        return (
            <button onClick={e => this.onMarkClick(e, 'bold')}>{icon}</button>
        );
    };

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type);

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const {
                value: { document, blocks }
            } = this.state;

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key);
                isActive =
                    this.hasBlock('list-item') &&
                    parent &&
                    parent.type === type;
            }
        }

        return (
            <button onClick={e => this.onBlockClick(e, type)}>{icon}</button>
        );
    };

    render() {
        let { value } = this.state;
        let editor = this.editor.current;
        return (
            <EditorArea>
                <EditorScrollPane>
                    {/* <button onClick={e => this.onMarkClick(e, 'bold')}>Bold</button> */}
                    {this.renderMarkButton('bold', 'bold')}
                    {this.renderBlockButton('heading-one', 'Heading')}
                    <Editor
                        spellCheck
                        autoFocus
                        placeholder="Taskdescription"
                        value={value}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        renderNode={this.renderBlock}
                        onKeyDown={this.onKeyDown}
                        ref={this.editor}
                    />
                </EditorScrollPane>
            </EditorArea>
        );
    }
}
