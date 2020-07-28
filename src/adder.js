import React from 'react';
import Deleter from './delete';

/*
Creates the functionality of adding a category or a project to the tree.
*/
class Adder extends React.Component {
    /*
    Dynamically stores the value of the tag and the project when it is entered in the blank.
    */
    constructor(props) {
        super(props);
        this.state = {tag: this.props.intialtagvalue, project: this.props.initialprojectvalue}
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
    this.props.tagAdder(this.state.tag);
    this.setState({tag: ""});
    event.preventDefault()
   }

   /*
   Handles a submission of a new project, and sends it to be added to our state.
   */
   projSubmit(event) {
        this.props.projectAdder(this.state.project)
        this.setState({project: ""});
        event.preventDefault()
   }

   /*
   Renders two forms to take input on tag and project.
   */
    render() {
      return (
        <>
        <form onSubmit={this.tagSubmit}>
          <label>
            Tag:
            <input type="text" value={this.state.tag} onChange={this.handleTagChange} />
          </label>
          <input type="submit" value="Submit" />
          {/* <Deleter handleDelete={() => this.props.handleTagDelete(this.state.tag)} /> */}
        </form>
        <form onSubmit={this.projSubmit}>
            <label>
                Project:
                <input type="text" value={this.state.project} onChange={this.handleProjectChange} />
            </label>
            <input type="submit" value="Submit" />
            {/* <Deleter handleDelete={() => this.props.handleProjectDelete(this.state.project)} /> */}
        </form>
        </>
      );
    }
  }



export default Adder;