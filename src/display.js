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

    /*
    Handles a child note. It takes in a child list, the value of the child note,
    and the tag of the child note and attaches it to the tree. Then, it sends
    an alert to the app to update the main tree and refresh the display.
    */
    handleSubmit(tree, value, currtag) {
        let note = {name: value, time: Date(), category: currtag, children: []}
        tree.push(note)
        this.props.appForceUpdate()
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
        const input = this.display(this.props.tree[this.state.project], this.state.project);
        return input
    }

    /*
    Recursively defined function that displays all the nodes in the tree with padding as required.
    */
    display(children, project) {
        const input = []
        children.forEach(note => {
                const date = new Date(note.time)
                const dateString = date.toLocaleString();
                input.push(
                    <div style={{paddingLeft: '50px'}}>
                        <button>Delete</button>
                        <p className="date">{dateString}</p>
                        <p className="text">{note.name}</p>
                        <p className="category">{note.category}</p>
                        <p className="project">{project}</p>
                        <Submitter 
                            submissionAdder={
                                (value, currtag)=> {
                                    this.handleSubmit(note.children, value, currtag)
                                }
                            }
                            tags={this.props.list}
                            projects={this.props.projects}
                        />
                        <div className="children">{this.display(note.children)}</div>
                    </div>
                );
            });
            return input;
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