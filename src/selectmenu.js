import React from 'react';

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