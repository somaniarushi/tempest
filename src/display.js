import React from 'react';
import Select from './selectmenu';
import Submitter from './input';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = { group: "thoughts", project: "all" }

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
        for (var item of this.props.texts) {
            if (this.state.project === "all" || item.project === this.state.project) {
                if (this.state.group === "thoughts" || item.category === this.state.group) {
                    const date = new Date(item.time)
                    const dateString = date.toLocaleString();
                    input.push(
                        <div>
                            <p className="date">{dateString}</p>
                            <p className="text">{item.text}</p>
                            <p className="category">{item.category}</p>
                            <p className="project">{item.project}</p>
                        </div>
                    );
                }
            }
        }
        return input;
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