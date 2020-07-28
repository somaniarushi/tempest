import React from 'react';

/*
A main submitter class that takes input and maintains state while it isn't submitted,
then 
*/
class Deleter extends React.Component {
        render() {
            return (
                <button onClick={this.props.handleDelete}>Delete</button>
            );
        }
  }



export default Deleter