import React from 'react';
import Deleter from './delete';
import styled from 'styled-components';

/*
Creates the functionality of adding a tag or a project to the tree.
*/
class Adder extends React.Component {
    /*
    Dynamically stores the value of the tag and the project when it is entered in the blank.
    */
    constructor(props) {
        super(props);
        this.state = {
          tag: this.props.initialTagValue, 
          project: this.props.initialProjectValue
        }

        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.projSubmit = this.projSubmit.bind(this);
        this.tagSubmit = this.tagSubmit.bind(this);
    }

    /*
    Handles if a tag value is updated in the blank.
    Does not add the value to our state.
    */
    handleTagChange(event) {
        this.setState({tag: event.target.value})
    }

    /*
    Handles if a project value is updated in the blank.
    Does not add the value to our state.
    */
    handleProjectChange(event) {
        this.setState({project: event.target.value})
    }

    /*
    Handles a submission of a tag, and sends it to be added to our state.
    */
   tagSubmit(event) {
     if (this.state.tag !== "") {
       console.log("i'm in")
      this.props.tagAdder(this.state.tag);
      this.setState({tag: this.props.initialTagValue});
      event.preventDefault()
     }
     event.preventDefault()
   }

   /*
   Handles a submission of a new project, and sends it to be added to our state.
   */
   projSubmit(event) {
     if (this.state.project !== "") {
        this.props.projectAdder(this.state.project)
        this.setState({project: this.props.initialProjectValue});
        event.preventDefault()
     }
     event.preventDefault()
   }

   /*
   Renders two forms to take input on tag and project.
   */
    render() {
      return (
        <>
        <Form onSubmit={this.tagSubmit}>
          <Label>
            <Input type="text" value={this.state.tag} onChange={this.handleTagChange} placeholder="add tag"/>
          </Label>
          <Submit type="submit" value=" + " />
        </Form>
        <Form onSubmit={this.projSubmit}>
            <Label>
                <Input type="text" value={this.state.project} onChange={this.handleProjectChange} placeholder="add project"/>
            </Label>
            <Submit type="submit" value=" + " />
        </Form>
        </>
      );
    }
  }

  /*
    A styled component for a blank form entry.
  */
  const Form = styled.form`
    padding: 0.5em;
    padding-left: 80%;
  `

  const Label = styled.label`
    padding: 0.3em;
  `
  const Input = styled.input`
    padding: 0.3em;
    background-color: rgb(240, 240, 240);
    border: solid 1px rgba(145, 145, 145, 0.537);
    border-radius: 5px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  `

  const Submit = styled.input`
  padding: 0.3em;
  background-color: rgb(193, 212, 248, 0.8);
  border: none;
  border-radius: 5px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`



export default Adder;