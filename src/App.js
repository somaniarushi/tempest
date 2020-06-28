import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', texts: [], group: "None"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.state.group = event.target.value;
    this.setState((prevState) => ({group: prevState.group}));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let input = {text: this.state.value, time: Date(), category: this.state.group}
    this.state.texts.push(input)
    this.state.value = ""
    this.setState(
      (prevState) => ({texts: prevState.texts, value: prevState.value}));
    event.preventDefault();
  }

  render() {
    constructor(props) {
      super(props);
      this.state = {value: '', texts: [], group: "None"};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }
    
    return (
        <>
          <Submitter 
              group={this.state.group} 
              value={this.state.value} 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
              handleSelect={this.handleSelect}
            />
          <Display texts={this.state.texts}/>
      </>
    );
  }
}

class Display extends React.Component {
  render() {
    <select value={this.props.group} onChange={this.props.handleSelect}>
    <option value="default">Thoughts</option>
    <option value="questions">Questions</option>
    <option value="concerns">Concerns</option>
    <option value="resources">Resources</option>
    <option value="ideas">Ideas</option>
  </select>
  }
}



class Submitter extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.props.value} onChange={this.props.handleChange} />
          <select value={this.props.group} onChange={this.props.handleSelect}>
            <option value="default">Thoughts</option>
            <option value="questions">Questions</option>
            <option value="concerns">Concerns</option>
            <option value="resources">Resources</option>
            <option value="ideas">Ideas</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default App;
