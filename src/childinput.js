import React from 'react';
import Select from './selectmenu'
import styled from 'styled-components';

/*
A main submitter class that takes input and maintains state while it isn't submitted,
then 
*/
class ChildSubmitter extends React.Component {

  /*
  Takes in the following props:
  submissionAdder: something that handles a submit and adds it to the tree
  tags: A list of tags that must be used as display.
  projects: The list of projects for display.

  Maintains the dynamic state of submitter before submissions.
  value: Stores the note string.
  currtag: Stores the note tag.
  currproject: Stores the note project.
  */
  constructor(props){
    super(props)
    this.state=({
        value: "",
        currtag: "all",
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
  this.setState({currtag: event.target.value});
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
    this.props.submissionAdder(this.state.value, this.state.currtag, this.props.project)
    this.setState({value: ""})
    event.preventDefault()
  }

  /*
  Renders a form for submission, calling a select class to display the
  selections for tags and projects.
  */
  render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Label>
            <Input type="text" value={this.state.value} onChange={this.handleInputChange} placeholder="add note"/>
          </Label>
          <Select list={this.props.tags} group={this.state.currtag} handleSelect={this.handleTagSelect}/>
          <Submit type="submit" value=" + " />
        </Form>
      );
    }
  }

  
  
  const Form = styled.form`
  padding: 0.5em;
  :first-of-type {
    padding-top: 1em;
  }
`

const Label = styled.label`
    padding: 0.5em;
  `
  const Input = styled.textarea`
    resize: none;
    width: 25em;
    height: 3em;
    padding-top: 0.5em;
    padding-left: 0.5em;
    background-color: rgb(240, 240, 240, 0.5);
    border: solid 1px rgb(200, 200, 200, 0.5);
    border-radius: 8px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  `

  const Submit = styled.input`
    margin: 0.3em;
    padding: 0.3em;
    margin-top: 0.6em;
    vertical-align: top;
    background-color: rgb(193, 212, 248, 0.8);
    border: none;
    border-radius: 5px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`



export default ChildSubmitter