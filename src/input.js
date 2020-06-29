import React from 'react';
import Select from './selectmenu'

class Submitter extends React.Component {
    render() {
      return (
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.props.value} onChange={this.props.handleChange} />
            <Select list={this.props.list} group={this.props.group} handleSelect={this.props.handleSelect}/>
            <Select list={this.props.projects} group={this.props.project} handleSelect={this.props.handleProjectSelect}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }



export default Submitter