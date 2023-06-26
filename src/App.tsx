import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { TodoList, task } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: task[];
};

function App() {
  const onClickRemove = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    let filteredTasksArr = tasks.filter((task) => task.id !== id);
    tasksObj[todoListId] = filteredTasksArr;
    setTasks({ ...tasksObj });
  };

  const onClickAddTask = (title: string, todoListId: string) => {
    let newTask = { id: v1(), title: title, isDone: false };

    let newTasks = [newTask, ...tasksObj[todoListId]];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const onChangeStatus = (id: string, isDone: boolean, todoListId: string) => {
    let task = tasksObj[todoListId].find((el) => el.id === id);

    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const onChangeTitle = (
    id: string,
    titleValue: string,
    todoListId: string
  ) => {
    let task = tasksObj[todoListId].find((el) => el.id === id);
    if (task) {
      task.title = titleValue;
      setTasks({ ...tasksObj });
    }
  };

  const onClickChangeFilter = (value: FilterValuesType, todolistId: string) => {
    let todoList = todoLists.find((todoList) => todoList.id === todolistId);
    if (todoList) {
      todoList.filter = value;
    }
    setTodoLists([...todoLists]);
  };

  const onRemoveTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);

    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };

  const onChangeListTitle = (id: string, newTitle: string) => {
    let todoList = todoLists.find((el) => el.id === id);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    { id: todoListId1, title: "What to do", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todoListId2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Vodka", isDone: true },
    ],
  });

  const addTodoList = (title: string) => {
    let todoList: TodoListsType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodoLists([todoList, ...todoLists]);

    tasksObj[todoList.id] = [];
    setTasks({ ...tasksObj });
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="AddTask">
        <div className="TitleFor">Write a new TodoList title:</div>
        <AddItemForm addItem={addTodoList} />
      </div>
      <div className="Content">
        {todoLists.map((tl) => {
          let filteredTasks = tasksObj[tl.id];

          if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter(
              (task) => task.isDone === false
            );
          }
          if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter(
              (task) => task.isDone === true
            );
          }

          return (
            <TodoList
              key={tl.id}
              id={tl.id}
              onClickRemove={onClickRemove}
              title={tl.title}
              tasks={filteredTasks}
              onClickChangeFilter={onClickChangeFilter}
              onClickAddTask={onClickAddTask}
              onChangeStatus={onChangeStatus}
              RemoveTodoList={onRemoveTodoList}
              filter={tl.filter}
              onChangeTitle={onChangeTitle}
              changeListTitle={onChangeListTitle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
