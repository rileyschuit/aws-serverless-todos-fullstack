import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
  render () {
    const todos = this.props.data.map(todo => {
      return <TodoItem
        key={todo.id}
        todo={todo}
        changeTodo={this.props.changeTodo}
        removeTodo={this.props.removeTodo}/>
    })
    return <ul className="ItemList">{todos}</ul>
  }
}

export default TodoList
