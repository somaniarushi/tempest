import React from 'react';
import styled from 'styled-components';

/*
    Displays a list of items, with the ability to
    select one of them.
*/
const Select = (props) => {
    let input = []
    for (var item of props.list) {
        input.push(
            <Option value={item}>{item}</Option>
        )
    }
    return (
        <>
            <Selection value={props.group} onChange={props.handleSelect}>
                {input}
            </Selection>
        </>
        );
}

const Selection = styled.select`
    width: 9em;
    padding: 0.5em;
    margin: 0.5em;
    border: solid 1px rgb(240, 240, 240, 0.5);
    border-radius: 5px;
    background-color: rgb(193, 212, 248, 0.3);
    vertical-align: top;
    :first-of-type {
        margin-left: 1em;
    }
`

const Option = styled.option`
`

export default Select;