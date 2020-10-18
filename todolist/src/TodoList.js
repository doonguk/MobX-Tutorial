import React from 'react';
import { observer } from 'mobx-react';

const TodoList = observer(({ store }) => {
  const onNewTodo = () => {
    const nextTodo = prompt('Enter a new todo:', 'coffee plz');
    if (!nextTodo || !nextTodo.trim()) {
      return;
    }
    store.addTodo(nextTodo);
  };

  return (
    <div>
      {store.report}
      <ul>
        {store.todos.map((todo, idx) => (
          <TodoView todo={todo} key={idx} />
        ))}
      </ul>
      {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
      <button onClick={onNewTodo}>New Todo</button>
      <small> (double-click a todo to edit)</small>
    </div>
  );
});

const TodoView = ({ todo }) => {
  const [renderCount, setRenderCount] = React.useState(0);
  const onToggleCompleted = () => {
    todo.isCompleted = !todo.isCompleted;
  };

  const onRename = () => {
    todo.task = prompt('Task name', todo.task) || todo.task;
  };

  const onRenameAssigne = () => {
    const newAssignee = prompt('new name', todo.assignee.name) || todo.assignee.name;
    if (!newAssignee) {
      return;
    }
    todo.assignee.name = newAssignee;
  };

  const updateForceRenderCount = () => setRenderCount(renderCount + 1);

  React.useEffect(() => {
    console.log('trrigered');
    setRenderCount(renderCount + 1);
  }, [todo.isCompleted, todo.task, todo.assignee.name]);

  return (
    <li onDoubleClick={onRename}>
      <input type="checkbox" checked={todo.isCompleted} onChange={onToggleCompleted} />
      {todo.task}
      {todo.assignee ? <small onClick={onRenameAssigne}>{todo.assignee.name}</small> : null}
      <span onClick={updateForceRenderCount}>{renderCount}</span>
    </li>
  );
};

export default TodoList;
