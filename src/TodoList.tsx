import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import "./TodoList.scss";

type propsType = {
  id: string;
  title: string;
  tasks: task[];
  filter: FilterValuesType;
  onClickRemove: (id: string, todoListId: string) => void;
  onClickChangeFilter: (value: FilterValuesType, todolistId: string) => void;
  onClickAddTask: (title: string, todoListId: string) => void;
  onChangeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  onChangeTitle: (id: string, titleValue: string, todoListId: string) => void;
  changeListTitle: (id: string, newTitle: string) => void;
  RemoveTodoList: (todoListId: string) => void;
};

export type task = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = ({
  id,
  title,
  tasks,
  filter,
  onClickRemove,
  onClickChangeFilter,
  onClickAddTask,
  onChangeStatus,
  RemoveTodoList,
  onChangeTitle,
  changeListTitle,
}: propsType) => {
  const onAllClickHandler = () => onClickChangeFilter("all", id);
  const onActiveClickHandler = () => onClickChangeFilter("active", id);
  const onCompletedClickHandler = () => onClickChangeFilter("completed", id);
  const onRemoveTodolistHandler = () => {
    RemoveTodoList(id);
  };

  const addTask = (title: string) => {
    onClickAddTask(title, id);
  };

  const ChangeTodoListTitle = (newTitle: string) => {
    changeListTitle(id, newTitle);
  };

  return (
    <div className="todo">
      <div className="TodoHeader">
        <EditableSpan title={title} onChange={ChangeTodoListTitle} />
        <button onClick={onRemoveTodolistHandler}>X</button>
      </div>
      <AddItemForm addItem={addTask} />
      <ul className="TasksBlock">
        {tasks.map((el) => {
          const onClickRemoveHandler = () => onClickRemove(el.id, id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            onChangeStatus(el.id, e.currentTarget.checked, id);

          const onChangeTitleHandler = (titleValue: string) => {
            onChangeTitle(el.id, titleValue, id);
          };

          return (
            <li className={el.isDone ? "is-Done" : ""}>
              <input
                type="checkbox"
                checked={el.isDone}
                onChange={onChangeHandler}
              />
              <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
              <button onClick={onClickRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div className="Filter">
        <button
          onClick={onAllClickHandler}
          className={filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
