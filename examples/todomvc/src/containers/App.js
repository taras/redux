import React, { Component } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Microstates from 'microstates';
import { map } from 'funcadelic';
import TodoMVC from '../models/todomvc';

export default class App extends Component {
  componentWillMount() {
    this.update({
      todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }],
    });
  }

  update(value) {
    let { states, transitions } = Microstates.from(TodoMVC, value);

    let actions = map(transition => (...args) => this.update(transition(...args)), transitions);

    this.setState({
      ...states,
      actions,
    });
  }

  render() {
    let { actions, todos } = this.state || {};
    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} completedCount={this.state.completedCount} actions={actions} />
      </div>
    );
  }
}
