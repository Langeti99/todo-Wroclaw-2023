import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
};

export const EditableSpan = ({ title, onChange }: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [titleValue, setTitleValue] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitleValue(title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    onChange(titleValue);
  };

  const onChangeTitleValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };

  return editMode ? (
    <input
      value={titleValue}
      onChange={onChangeTitleValueHandler}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <span title="Double Tap To Edit" onDoubleClick={activateEditMode}>
      {title}
    </span>
  );
};
