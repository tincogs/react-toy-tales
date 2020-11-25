import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const API = "http://localhost:3000/toys"

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(toys => {
        this.setState({
      toys: toys
      })
    })
  }

  getUpdatedToys = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(toys => {
        this.setState({
      toys: toys
      })
    })
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleLike = (id, likes) => {
    console.log(id, likes)

    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      likes: likes + 1
      })
    }
    fetch(API + '/' + id, reqObj)
    .then(resp => resp.json())
    .then(toy =>
      this.getUpdatedToys()
    )
  }

  handleDonate = (id) => {
    console.log(id)

    const reqObj = {
      method: "DELETE"
    }
    fetch(API + '/' + id, reqObj)
    .then(resp => resp.json())
    .then(toy =>
      this.getUpdatedToys()
    )
  }

  addToy = (newToyState) => {
    console.log("add toy btn", newToyState)

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      ...newToyState
      })
    }
    fetch(API, reqObj)
    .then(resp => resp.json())
    .then(toy =>
      this.getUpdatedToys()
    )
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
        toys={this.state.toys}
        handleLike={this.handleLike}
        handleDonate={this.handleDonate}/>
      </>
    );
  }

}

export default App;
