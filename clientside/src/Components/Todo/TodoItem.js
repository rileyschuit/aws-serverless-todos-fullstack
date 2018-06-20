import React, { Component } from 'react'

class TodoItem extends Component {
  constructor () {
    super()
    this.remove = this.remove.bind(this)
    this.change = this.change.bind(this)
  }

  remove () {
    this.props.removeTodo(this.props.todo)
  }

  change () {
    this.props.changeTodo(this.props.todo)
  }

  render () {
    const { id, status, todotext } = this.props.todo
    return (
      <li className="Item" data-id={id}>
        <label>
          <input checked={status}
                 type="checkbox"
                 onChange={this.change}/>
          <span>{todotext}</span>
          <button type="button"
                  onClick={this.remove}>X
          </button>
        </label>
      </li>
    )
  }
}

export default TodoItem
