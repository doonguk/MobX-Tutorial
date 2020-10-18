import { makeObservable, autorun, observable, computed, action } from 'mobx';

class ObserverTodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    });

    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.isCompleted).length;
  }

  get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    const nextTodo = this.todos.find((todo) => !todo.isCompleted);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task,
      isCompleted: false,
      assignee: null,
    });
  }
}

const observableTodoStore = new ObserverTodoStore();

/* init */
observableTodoStore.addTodo('read MobX tutorial');
observableTodoStore.addTodo('try MobX');
observableTodoStore.todos[0].completed = true;
observableTodoStore.todos[1].task = 'try MobX in own project';
observableTodoStore.todos[0].task = 'grok MobX tutorial';
/* init end */

const peopleStore = observable([{ name: 'Michel' }, { name: 'Me' }]);

observableTodoStore.todos[0].assignee = peopleStore[0];
observableTodoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = 'Michel Weststrate';

export default observableTodoStore;
