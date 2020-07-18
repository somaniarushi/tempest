import React from 'react';
import Select from './selectmenu'

/*
A main submitter class that takes input and maintains state while it isn't submitted,
then 
*/
class Submitter extends React.Component {

  /*
  Maintains the dynamic state of submitter before submissions.
  value: Stores the note string.
  currtag: Stores the note tag.
  currproject: Stores the note project.
  */
  constructor(props){
    super(props)
    this.state=({
        value: "",
        currtag: "thoughts",
        currproject: "default",
    });

    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.state.currproject = event.target.value;
    this.setState((prevState) => ({currproject: prevState.currproject}));
  }

  /*
  Handles a change in input.
  Changes value in state, does not make any changes to tree.
  */
  handleInputChange(event) {
    this.setState({value: event.target.value});
  }

  /* Handles a submission from the submitter. It
     adds the submission to the tree, then blanks out the form. 
  */
  handleSubmit(event) {
    this.props.submissionAdder(this.state.value, this.state.currtag, this.state.currproject)
    this.setState({value: ""})
    event.preventDefault()
  }

  /*
  Renders a form for submission, calling a select class to display the
  selections for tags and projects.
  */
  render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Note:
            <input type="text" value={this.props.value} onChange={this.handleInputChange} />
            <Select list={this.props.tags} group={this.state.currtag} handleSelect={this.handleTagSelect}/>
            <Select list={this.props.projects} group={this.state.currproject} handleSelect={this.handleProjectSelect}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }



export default Submitter