import React from 'react';
import Submitter from './input';
import Display from './display';
import Adder from './adder';
import * as app from 'firebase/app';
import storage from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGfsVBD4I2Mhcum8ROdPRSSJrpC14uMa0",
  authDomain: "codestormstore.firebaseapp.com",
  databaseURL: "https://codestormstore.firebaseio.com",
  projectId: "codestormstore",
  storageBucket: "codestormstore.appspot.com",
  messagingSenderId: "1083838522362",
  appId: "1:1083838522362:web:1b118ac2cd28ec1c12fa43",
  measurementId: "G-LEKY5V4F1P"
};
app.initializeApp(firebaseConfig);

var store = app.storage();
var parent = store.ref();
var ref = parent.child('main');

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

    var stat = {}
    ref.getDownloadURL().then((url) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      var blob;
      xhr.onload = function(event) {
        blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      const reader = new FileReader();
      stat = JSON.parse(reader.readAsText(blob))
      console.log(stat)
    })
    .catch(function(error) {
      console.log("fuck")
    });

    this.state = {
      tree: {"default": []},
      tags: ["thoughts", "questions", "concerns", "resources", "ideas", "all"],
      projects: ["default"],
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.tagAdder = this.tagAdder.bind(this);
    this.projectAdder = this.projectAdder.bind(this);
    
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
    let note = {name: value, time: Date(), category: currtag, children: []}
    this.state.tree[currproject].push(note)

    console.log(JSON.stringify(this.state));

    ref.putString(JSON.stringify(this.state)).then(function(snapshot) {
      console.log('Uploaded state!');
    }).catch((err) => console.log("error"))

    this.setState(
      (prevState) => ({tree: prevState.tree}));
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

  appForceUpdate() {
    this.setState((prevState) => ({tree: prevState.tree}));
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
