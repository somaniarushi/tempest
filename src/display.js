import React from 'react';
import Select from './selectmenu';
import Submitter from './input';

/*
Manages the display of the roots of our tree.
*/
class Display extends React.Component {
    /*
    Dynamically handles the display settings for our roots.
    */
    constructor(props) {
        super(props);
        this.state = { tag: "all", project: "default" };
        this.handleTagSelect = this.handleTagSelect.bind(this);
        this.handleProjectSelect = this.handleProjectSelect.bind(this);
        this.displayLinks = this.displayLinks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(tree, value, currtag) {
        let note = {name: value, time: Date(), category: currtag, children: []}
        tree.push(note)
    }

    /*
    Handles the updation of a tag display.
    */
    handleTagSelect(event) {
        this.setState({ tag: event.target.value });
    }

    /*
    Handles the updation of a project display.
    */
    handleProjectSelect(event) {
        this.setState({ project: event.target.value })
    }

    /*
    Displays the notes roots for the given project and tag.
    */
    displayLinks() {
        const input = []
        this.props.tree[this.state.project].forEach(note => {
            if (this.state.group === "all" || note.category === this.state.group) {
                const date = new Date(note.time)
                const dateString = date.toLocaleString();
                input.push(
                    <div>
                        <p className="date">{dateString}</p>
                        <p className="text">{note.name}</p>
                        <p className="category">{note.category}</p>
                        <p className="project">{this.state.project}</p>
                        {/* <Submitter 
                            submissionAdder={
                                (value, currtag)=> {
                                    this.handleSubmit(this.props.tree[this.state.project], value, currtag)
                                }
                            }
                            tags={this.state.list}
                            projects={this.state.projects}
                        /> */}
                        {/* <div className="children">{this.displayChildren(note.children)}</div> */}
                    </div>
                );
            }
        });
        console.log(input)
        return input
    }

    /*
    Displays the tree.
    */
    render() {
        const input = this.displayLinks()
        return (
            <>
                <Select list={this.props.list} group={this.state.tag} handleSelect={this.handleTagSelect} />
                <Select list={this.props.projects} group={this.state.project} handleSelect={this.handleProjectSelect} />
                {input}
            </>
        );
    }
}

export default Display