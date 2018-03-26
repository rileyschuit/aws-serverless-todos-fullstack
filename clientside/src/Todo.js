import React, { Component } from 'react'
import http from 'axios'
import _ from 'lodash'
import TodoHeader from './TodoHeader'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

window.apiUrl = '//5a23ef1b3a6dd70012db4ed8.mockapi.io/todo/'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.changeData = this.changeData.bind(this)
    this.changeTodo = this.changeTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  componentDidMount () {
    http.get(window.apiUrl).then(res => {
      this.setState({
        data: res.data
      })
    })
  }

  changeData (newData) {
    this.setState({
      data: newData
    })
  }

  changeTodo (todo) {
    const el = document.querySelector(`[data-id="${todo.id}"`)
    el.classList.add('isDisable')

    const status = {
      status: !todo.status
    }
    const newArray = _.cloneDeep(this.state.data)
    const todoIndex = _.findIndex(newArray, ['id', todo.id])

    http.put(window.apiUrl + todo.id, status).then(res => {
      if (res.data.status)
        newArray[todoIndex].status = true
      else newArray[todoIndex].status = false
      this.changeData(newArray)
      el.classList.remove('isDisable')
    })
  }

  removeTodo (todo) {
    const el = document.querySelector(`[data-id="${todo.id}"`)
    el.classList.add('isDisable')
    http.delete(window.apiUrl + todo.id).then(res => {
      if (res.status === 200) {
        const newArray = _.cloneDeep(this.state.data)
        _.remove(newArray, ['id', todo.id])
        this.changeData(newArray)
      }
    })
  }

  render () {
    return (
      <div>
        <TodoHeader
          dataCount={this.state.data.length}/>
        <TodoForm
          data={this.state.data}
          changeData={this.changeData}/>
        <TodoList
          removeTodo={this.removeTodo}
          changeTodo={this.changeTodo}
          data={this.state.data}/>
      </div>
    )
  }
}

export default App
