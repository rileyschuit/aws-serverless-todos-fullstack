import React, { Component } from 'react'
import http from 'axios'

class TodoFrom extends Component {
  constructor () {
    super()
    this.state = {
      text: ''
    }
    this.changeInput = this.changeInput.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  changeInput (e) {
    this.setState({
      text: e.target.value
    })
  }

  addTodo (e) {
    e.preventDefault()
    const newTodo = {
      text: this.state.text
    }
    this.fromInput.setAttribute('disabled', '')
    http.post(window.apiUrl, newTodo).then(res => {
      if (res.status === 201) {
        this.setState({
          text: ''
        })
        this.props.changeData(
          this.props.data.concat(res.data)
        )
      }
      this.fromInput.removeAttribute('disabled')
    })
  }

  render () {
    return (
      <form onSubmit={this.addTodo}>
        <input type="text"
               value={this.state.text}
               onChange={this.changeInput}
               ref={(input) => {
                 this.fromInput = input
               }}
        />
      </form>
    )
  }
}

export default TodoFrom
