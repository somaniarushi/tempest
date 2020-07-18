import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Submitter from './input';
import Display from './display';
import Adder from './adder';

/*
The parent function that stores all information, and calls on helper functions to 
create codestorm.
*/
class App extends React.Component {

  /*
    tree: A JSON dictionary that stores all the attributes of Notes given by users.
    value: Stores the value of the blank at any point in the input process that is before submission.
    currtag: Stores the value of the current selected tag, with which the Note will be tagged.
    currproject: Stores the name of the current project in which the Note will be stored.
    tags: Stores a list of all the tags.
    projects: Stores a list of all the projects.
  */
  constructor(props) {
    super(props);
    this.state = {
                  tree: {"default": []},
                  value: "",
                  currtag: "Thoughts", 
                  currproject: "all",
                  tags: ["thoughts", "questions", "concerns", "resources", "ideas"],
                  projects: ["default"],
                  };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
    this.tagAdder = this.tagAdder.bind(this);
    this.projectAdder = this.projectAdder.bind(this);
  }

  /*
  Handles the selection of a tag.
  Changes currtag in state, does not make any changes to tree.
  */
  handleTagSelect(event) {
    this.state.currtag = event.target.value;
    this.setState((prevState) => ({currtag: prevState.currtag}));
  }

  /*
  Handles the selection of a project.
  Changes currproject in state, does not make any changes to tree.
  */
  handleProjectSelect(event) {
    this.state.project = event.target.value;
    this.setState((prevState) => ({project: prevState.project}));
  }

  /*
  Handles a change in input.
  Changes value in state, does not make any changes to tree.
  */
  handleInputChange(event) {
    this.setState({value: event.target.value});
  }

  /*
  Handles a new input submission.

  A new Note has attributes:
  name: The string with which the note was submitted.
  time: When the note was submitted.
  category: The current tag when the note was submitted.
  children: The subsequent notes made to the current note. 
  */
  handleSubmit(event) {
    let note = {name: this.state.value, time: Date(), category: this.state.currtag, children: []}
    this.state.tree[this.state.currproject].push(note)
    this.state.value = ""
    this.setState(
      (prevState) => ({tree: prevState.tree, value: prevState.value}));
    event.preventDefault();
  }

  /*
  Adds a tag to the tags list in state.
  */
  tagAdder(tag) {
    if (!(this.state.tags.includes(tag))) {
    this.setState(
      (prevState) => ({tags: this.state.tags.concat([tag])})
    );
  }
}

  /*
  Adds a project to the projects list in state. Also adds the project name to the tree.
  */
 projectAdder(project) {
   if (!(this.state.projects.includes(project))) {
     this.state.tree[project] =[]
   this.setState(
     (prevState) => ({
        projects: this.state.projects.concat([project]),
        tree: prevState.tree
     })
   )
  }
}

  /*
  The display for the project.
  */
  render() {
    return (
        <>
          <Adder 
              tagAdder={this.tagAdder}
              projectAdder={this.projectAdder} 
              />
          <Submitter 
              group={this.state.tag} 
              value={this.state.value} 
              project={this.state.project}
              handleChange={this.handleInputChange} 
              handleSubmit={this.handleSubmit}
              handleSelect={this.handleTagSelect}
              handleProjectSelect={this.handleProjectSelect}
              list={this.tags}
              projects={this.projects}
            />
          {/* <Display texts={this.state.texts} list={this.list} projects={this.projects}/> */}
      </>
    );
  }
}

export default App;
