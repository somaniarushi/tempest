import React from 'react';
import Select from './selectmenu';
import Submitter from './input';
import Deleter from './delete';
import styled from 'styled-components';

/*
Manages the display of the roots of our tree.
*/
class Display extends React.Component {
    /*
    Dynamically handles the display settings for our roots.
    */
    constructor(props) {
        super(props);
        this.state = { tag: "all", project: "default"};
        this.handleTagSelect = this.handleTagSelect.bind(this);
        this.handleProjectSelect = this.handleProjectSelect.bind(this);
        this.displayLinks = this.displayLinks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /*
    Handles a child note. It takes in a child list, the value of the child note,
    and the tag of the child note and attaches it to the tree. Then, it sends
    an alert to the app to update the main tree and refresh the display.
    */
    handleSubmit(tree, value, currtag) {
        let note = {time: Date(), category: currtag, checked: true, child: true, children: {}}
        tree[value] = note
        this.props.appForceUpdate()
    }

    /*
    Handles the deletion of a note.
    */
   handleDelete(tree, note, val) {
        if (val === null) {
            delete tree.children[note]
        } else {
            delete tree[val][note]
        }
       this.props.appForceUpdate();
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
        const input = this.display(this.props.tree[this.state.project], this.state.project, this.props.tree, this.state.project);
        return input
    }

    /*
    Recursively defined function that displays all the nodes in the tree with padding as required.
    */
    display(children, project, parentTree, parentVal) {
        const input = []
        for(var note in children) {
            const date = new Date(children[note].time)
            const dateString = date.toLocaleTimeString();
            input.push(
                    <div style={{paddingLeft: '50px'}}>
                        <DateTimeDisplay>{dateString}</DateTimeDisplay>
                        <TextDisplay>{note}</TextDisplay>
                        <TagDisplay>{children[note].category}</TagDisplay>
                        <ProjectDisplay>{project}</ProjectDisplay>
                        <Deleter handleDelete={
                                () => this.handleDelete(parentTree, note, parentVal)
                            }/>
                        <Checkbox type="checkbox" defaultChecked="on" onChange={(e) => {
                            children[note].checked=e.target.checked;
                            this.props.appForceUpdate();
                        }} />
                        <CheckBoxDisplay>Show Children</CheckBoxDisplay>
                        <Submitter 
                            submissionAdder={
                                (value, currtag)=> {
                                    this.handleSubmit(children[note].children, value, currtag)
                                    }
                            }
                            tags={this.props.list}
                            projects={this.props.projects}
                            project={project}
                            child={true}
                        />
                    { children[note].checked &&
                    <div className="children">{this.display(children[note].children, this.state.project, children[note], null)}</div>}
                </div>
                );
            }
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

const DateTimeDisplay = styled.p`
    font-size: 0.6em;
    padding: 0.6em;
    display: none;
`
    
const ProjectDisplay = styled.p`
    padding: 0.5em;
    background-color: rgb(188, 225, 188, 0.4);
    border-radius: 4px;
    display: inline;
    font-size: 0.7em;
    padding-right: 1em;
    padding-left: 1em;
    margin: 0.5em;
`

const TagDisplay = styled.p`
    padding: 0.5em;
    background-color: rgb(188, 225, 188, 0.4);
    border-radius: 4px;
    display: inline;
    font-size: 0.7em;
    padding-right: 1em;
    padding-left: 1em;
    margin: 0.5em;
`

const TextDisplay = styled.p`
    padding-left: 0.5em;
    padding-top: 0em;
    margin-top: 0.5em;
    margin-bottom: 0.3em;
    font-family: font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

const Checkbox = styled.input`
    margin-left: 1.5em;
    margin-top: 0.6em;
    display: block;
    display: inline;
`

const CheckBoxDisplay = styled.p`
    padding-left: 0.5em;
    font-size: 0.7em;
    display: inline;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

export default Display