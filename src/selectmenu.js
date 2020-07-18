import React from 'react';

/*
    Displays a list of items, with the ability to
    select one of them.
*/
const Select = (props) => {
    let input = []
    for (var item of props.list) {
        input.push(
            <option value={item}>{item}</option>
        )
    }
    return (<select value={props.group} onChange={props.handleSelect}>
             {input}
    </select>);
}

export default Select;