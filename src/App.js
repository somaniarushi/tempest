import React from 'react';
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

    State is saved in localStorage on every submission.
  */
  constructor(props) {
    super(props);
    this.state = {
                  tree: {"default": {}},
                  tags: ["thoughts", "questions", "concerns", "resources", "ideas", "all"],
                  projects: ["default"],
                  };
    
    if (localStorage.getItem('state') !== null) {
      this.state = JSON.parse(localStorage.getItem('state'));
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.tagAdder = this.tagAdder.bind(this);
    this.projectAdder = this.projectAdder.bind(this);
    this.tagRemover = this.tagRemover.bind(this);
    this.projectRemover = this.projectRemover.bind(this);
    
    this.appForceUpdate = this.appForceUpdate.bind(this);
  }

 
  /*
  Handles a new input submission.

  A new Note has attributes:
  name: The string with which the note was submitted.
  time: When the note was submitted.
  category: The current tag when the note was submitted.
  children: The subsequent notes made to the current note. 
  */
  handleSubmit(value, currtag, currproject) {
    let note = {time: Date(), category: currtag, children: {}}
    this.state.tree[currproject][value] = note;
    this.appForceUpdate();
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

tagRemover(tag) {
  delete this.state.tags[this.state.tags.indexOf(tag)];
  console.log(this.state.tags)
  this.setState((prevState) => ({tags: prevState.tags}));
}

projectRemover(proj) {
  delete this.state.projects[this.state.projects.indexOf(proj)];
  this.setState((prevState) => ({projects: prevState.projects}));
}

appForceUpdate() {
    this.setState((prevState) => ({tree: prevState.tree}));
    localStorage.setItem('state', JSON.stringify(this.state));
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
              handleTagDelete={this.tagRemover}
              handleProjectDelete={this.projectRemover}
              initialTagValue=""
              initialProjectValue=""
              />
              <br></br>

          <Submitter 
              submissionAdder={this.handleSubmit}
              tags={this.state.tags}
              projects={this.state.projects}
            />

          <Display 
            tree={this.state.tree} 
            list={this.state.tags} 
            projects={this.state.projects}
            appForceUpdate={this.appForceUpdate}
          />
      </>
    );
  }
}

export default App;
