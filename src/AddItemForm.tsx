import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./TodoList.scss";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") {
      addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
    <div className="AddForm">
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onChangeInputHandler}
          onKeyUp={onKeyDownHandler}
          className={error ? "error" : "AddInput"}
        />
        <button onClick={addTask} className="AddButton">
          Add
        </button>
      </div>
      {error && <div className="error-massage">Field is required</div>}
    </div>
  );
};
