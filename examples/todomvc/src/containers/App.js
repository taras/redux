import React, { Component } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Microstates from 'microstates';
import { map } from 'funcadelic';
import TodoMVC from '../models/todomvc';

export default class App extends Component {
  componentWillMount() {
    let ms = Microstates(TodoMVC, {
      todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }],
    });
    this.update(ms);
  }

  update({ transitions, states }) {
    let actions = map(
      transition => (...args) => this.update(transition(...args)),
      transitions.collapsed
    );

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
