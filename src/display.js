import React from 'react';
import Select from './selectmenu';
import Submitter from './input';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = { group: "thoughts", project: "default" };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleProjectSelect = this.handleProjectSelect.bind(this);
        this.displayLinks = this.displayLinks.bind(this);
    }

    handleSelect(event) {
        this.setState({ group: event.target.value });
    }

    handleProjectSelect(event) {
        this.setState({ project: event.target.value })
    }

    displayLinks() {
        const input = []
        console.log(this.props.tree[this.state.project].entries())
        this.props.tree[this.state.project].forEach(note => {
            if (note.category === this.state.group) {
                const date = new Date(note.time)
                const dateString = date.toLocaleString();
                input.push(
                    <div>
                        <p className="date">{dateString}</p>
                        <p className="text">{note.name}</p>
                        <p className="category">{note.category}</p>
                        <p className="project">{this.state.project}</p>
                    </div>
                );
            }
        });
        return input
    }



    render() {
        const input = this.displayLinks()
        return (
            <>
                <Select list={this.props.list} group={this.state.group} handleSelect={this.handleSelect} />
                <Select list={this.props.projects} group={this.state.project} handleSelect={this.handleProjectSelect} />
                {input}
            </>
        );
    }
}

export default Display