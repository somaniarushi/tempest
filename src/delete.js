import React from 'react';
import styled from 'styled-components';

/*
A main submitter class that takes input and maintains state while it isn't submitted,
then 
*/
class Deleter extends React.Component {
        render() {
            return (
                <Button onClick={this.props.handleDelete}> Delete </Button>
            );
        }
  }

  const Button = styled.button`
    display: inline;
    border: none;
    border-radius: 3px;
    background-color: rgb(255, 167, 167, 0.4);
    font-size: 0.7em;
    padding: 0.6em;
    padding-right: 1em;
    padding-left: 1em;
    margin-left: 2em;
    :hover {
        background-color: rgb(255, 167, 167, 0.7);
    }
  `



export default Deleter