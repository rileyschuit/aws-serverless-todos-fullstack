import React, { Component } from 'react'

class TodoHeader extends Component {
  render () {
    return (
      <div className="Header">
        <h2>{this.props.dataCount} Todos</h2>
      </div>
    )
  }
}

export default TodoHeader
