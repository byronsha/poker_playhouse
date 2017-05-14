import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    
    const username = this.username.value
    const password = this.password.value
    if (!username || !password) { return }

    axios.post(`http://localhost:9000/api/signup`, { username, password })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="What's your name?"
            ref={ref => {this.username = ref}}
          />
          <input
            type="text"
            placeholder="password"
            ref={ref => {this.password = ref}}
          />
          <input
            type="submit"
            value="Sign up"
          />
        </form>
      </div>
    )
  }
}

export default Signup
