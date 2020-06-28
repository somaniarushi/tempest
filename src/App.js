import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('list'))
    this.state = {value: '', 
                  texts: localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list')), 
                  group: "Thoughts"};

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
  constructor(props) {
    super(props);
    this.state = {group: 'default'}

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.setState({group: event.target.value});
  }

  render() {
    const input = []
    for (var item of this.props.texts) {
      if (this.state.group === "default" || item.category === this.state.group) {
       const date = new Date(item.time)
       const dateString = (
         date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + 
          " " + date.getUTCHours() + ":" + date.getMinutes() + 
          " " + (date.getHours > 12 ? "AM" : "PM")); 
        input.push(
        <div>
          <p className="date">{dateString}</p>
          <p className="text">{item.text}</p>
          <p className="category">{item.category}</p>
      </div>
      );
      }
    }
      return (
        <>
          <select value={this.state.group} onChange={this.handleSelect}>
            <option value="default">Thoughts</option>
            <option value="questions">Questions</option>
            <option value="concerns">Concerns</option>
            <option value="resources">Resources</option>
            <option value="ideas">Ideas</option>
          </select>
          {input}
        </>
          
          );
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
