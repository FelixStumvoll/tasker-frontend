import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import EditorButton from './buttons/EditorButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faCode,
    faHeading,
    faListOl,
    faListUl
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { updateTaskText } from '../../redux/reducers/taskReducer/taskActions';

const EditorArea = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-row-gap: 10px;
`;

const EditorPanel = styled.div`
    overflow: auto;
`;
const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: sticky;
    top: ${({ theme }) => theme.navHeight};
    z-index: 100;
    background-color: ${({ theme }) => theme.primaryColor};
    width: fit-content;
    border-bottom-right-radius: 10px;
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
    let hotkey = hotkeys.find(x => event.altKey && event.key === x.key);
    if (hotkey) {
        return hotkey.type;
    } else {
        return undefined;
    }
};

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.editor = React.createRef();

        this.state = {
            value: this.getInitValue(props.initialValue)
        };
    }

    getInitValue = value => {
        return value ? Value.fromJSON(value) : Plain.deserialize('');
    };

    componentDidUpdate(prevProps) {
        if (this.props.initialValue !== prevProps.initialValue) {
            this.setState({
                value: this.getInitValue(this.props.initialValue)
            });
        }
    }

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>;
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
        return value.blocks.some(node => node.type === type);
    };

    onMarkClick = (e, type) => {
        e.preventDefault();
        const editor = this.editor.current;
        editor.toggleMark(type);
    };

    onBlockClick = (e, type) => {
        e.preventDefault();

        const editor = this.editor.current;
        const { value } = editor;
        const { document } = value;

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

    onChange = async ({ value }) => {
        if (value.document !== this.state.value.document) {
            let { updateTaskText, taskId } = this.props;
            updateTaskText(taskId, value.toJSON());
        }

        this.setState({ value });
    };

    onKeyDown = (event, editor, next) => {
        let hotkey = isHotkey(event);
        if (hotkey) {
            editor.toggleMark(hotkey);
        } else {
            return next();
        }
    };

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);

        return (
            <EditorButton
                isActive={isActive}
                onClick={e => this.onMarkClick(e, type)}
                icon={icon}
            />
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
            <EditorButton
                isActive={isActive}
                onClick={e => this.onBlockClick(e, type)}
                icon={icon}
            />
        );
    };

    render() {
        let { value } = this.state;
        return (
            <EditorArea>
                <ButtonArea>
                    {this.renderMarkButton(
                        'bold',
                        <FontAwesomeIcon icon={faBold} />
                    )}
                    {this.renderMarkButton(
                        'italic',
                        <FontAwesomeIcon icon={faItalic} />
                    )}
                    {this.renderMarkButton(
                        'underline',
                        <FontAwesomeIcon icon={faUnderline} />
                    )}
                    {this.renderMarkButton(
                        'strikethrough',
                        <FontAwesomeIcon icon={faStrikethrough} />
                    )}
                    {this.renderMarkButton(
                        'code',
                        <FontAwesomeIcon icon={faCode} />
                    )}
                    {this.renderBlockButton(
                        'heading-one',
                        <FontAwesomeIcon icon={faHeading} />
                    )}
                    {this.renderBlockButton(
                        'numbered-list',
                        <FontAwesomeIcon icon={faListOl} />
                    )}
                    {this.renderBlockButton(
                        'bulleted-list',
                        <FontAwesomeIcon icon={faListUl} />
                    )}
                </ButtonArea>
                <EditorPanel>
                    <Editor
                        spellCheck={false}
                        autoCorrect={false}
                        autoFocus
                        placeholder="Tasktext"
                        value={value}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        renderNode={this.renderBlock}
                        onKeyDown={this.onKeyDown}
                        ref={this.editor}
                    />
                </EditorPanel>
            </EditorArea>
        );
    }
}

MyEditor.propTypes = {
    taskId: PropTypes.string.isRequired,
    initialValue: PropTypes.object,
    updateTaskText: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    updateTaskText
};

export default connect(
    null,
    mapDispatchToProps
)(MyEditor);
