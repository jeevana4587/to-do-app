import { useState, type FormEvent } from "react";
import { TITLE_MAX_LENGTH, type Priority } from "../types/task";

interface TaskComposerProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function TaskComposer({ onAdd }: TaskComposerProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();

    if (trimmed.length === 0) {
      setError("Enter a task title before adding.");
      return;
    }

    onAdd(trimmed, priority);
    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <section className="panel composer" aria-labelledby="composer-heading">
      <h2 id="composer-heading">Add a task</h2>
      <form className="composer-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => {
              setTitle(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Write the next focused action"
            aria-invalid={error.length > 0}
            aria-describedby={error ? "title-error" : "title-hint"}
            autoComplete="off"
          />
          <p id="title-hint" className="hint">
            {title.trim().length}/{TITLE_MAX_LENGTH} characters
          </p>
        </div>

        <div className="field ">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <button type="submit" className="primary-action">
          Add Task
        </button>
      </form>
      {error ? (
        <p id="title-error" className="error" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
