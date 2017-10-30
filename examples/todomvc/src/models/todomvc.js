import * as MS from 'microstates';

export default class TodoMVC {
  todos = MS.Array;

  get completedCount() {
    return this.todos.filter(({ completed }) => completed).length;
  }

  get nextId() {
    return this.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
  }

  completeTodo(current, todo) {
    return this(current).todos.replace(todo, {
      ...todo,
      completed: true,
    });
  }

  deleteTodo(current, todo) {
    return this(current).todos.filter(item => item !== todo);
  }

  addTodo(current, text) {
    return this(current).todos.push({
      text,
      id: current.nextId,
      completed: false,
    });
  }

  editTodo(current, todo, text) {
    return this(current).todos.replace(todo, {
      text,
      ...todo,
    });
  }

  clearCompleted(current) {
    return this(current).todos.filter(({ completed }) => !completed);
  }
}
