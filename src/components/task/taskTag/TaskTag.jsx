import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Tag = styled.div`
    border-radius: 15px;
    background-color: green;
    color: white;
    line-height: 12px;
    font-size: 12px;
    width: auto;
    display: flex;
    padding: 7px;
`;

const TagText = styled.div`
    height: 12px;
    display: inline;
`;

const RemoveArea = styled.div`
    margin-left: 5px;
    cursor: pointer;
`;

const RemoveIcon = styled(FontAwesomeIcon)`
    height: 12px;
    color: white;
`;

export default props => {
    const { value, callback } = props;
    return (
        <Tag>
            <TagText>{value}</TagText>
            {callback && (
                <RemoveArea onClick={callback}>
                    <RemoveIcon icon={faTimes} />
                </RemoveArea>
            )}
        </Tag>
    );
};
