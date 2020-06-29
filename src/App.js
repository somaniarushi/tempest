import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Submitter from './input';
import Display from './display';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('list'))
    this.state = {value: '', 
                  texts: localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list')), 
                  group: "Thoughts", 
                  project: "all"
                  };
    
    this.list = ["thoughts", "questions", "concerns", "resources", "ideas"];
    this.projects = ["all", "codestorm", "real time color picker", "cs61a pr bot"]
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
  }

  handleSelect(event) {
    this.state.group = event.target.value;
    this.setState((prevState) => ({group: prevState.group}));
  }

  handleProjectSelect(event) {
    this.state.project = event.target.value;
    this.setState((prevState) => ({project: prevState.project}));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let input = {text: this.state.value, time: Date(), category: this.state.group, project: this.state.project}
    this.state.texts.push(input)
    this.state.value = ""
    localStorage.setItem('list', JSON.stringify(this.state.texts))
    this.setState(
      (prevState) => ({texts: prevState.texts, value: prevState.value}));
    event.preventDefault();
  }

  render() {
    return (
        <>
          <Submitter 
              group={this.state.group} 
              value={this.state.value} 
              project={this.state.project}
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
              handleSelect={this.handleSelect}
              handleProjectSelect={this.handleProjectSelect}
              list={this.list}
              projects={this.projects}
            />
          <Display texts={this.state.texts} list={this.list} projects={this.projects}/>
      </>
    );
  }
}

export default App;
