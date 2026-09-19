import { useEffect, useRef, type KeyboardEvent } from "react";
import { TITLE_MAX_LENGTH, type Priority, type Task } from "../types/task";

interface EditDraft {
  title: string;
  priority: Priority;
}

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editDraft: EditDraft | null;
  editError: string;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onDraftChange: (draft: EditDraft) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function TaskItem({
  task,
  isEditing,
  editDraft,
  editError,
  onToggle,
  onStartEdit,
  onDraftChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskItemProps) {
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  function handleEditKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancelEdit();
    }
  }

  return (
    <li className={task.completed ? "task-item is-complete" : "task-item"}>
      {isEditing && editDraft ? (
        <form
          className="edit-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSaveEdit(task.id);
          }}
        >
          <div className="field">
            <label htmlFor={`edit-title-${task.id}`}>Edit title</label>
            <input
              ref={editInputRef}
              id={`edit-title-${task.id}`}
              type="text"
              value={editDraft.title}
              maxLength={TITLE_MAX_LENGTH}
              onChange={(event) => onDraftChange({ ...editDraft, title: event.target.value })}
              onKeyDown={handleEditKeyDown}
              aria-invalid={editError.length > 0}
              aria-describedby={editError ? `edit-error-${task.id}` : undefined}
            />
          </div>
          <div className="field">
            <label htmlFor={`edit-priority-${task.id}`}>Edit priority</label>
            <select
              id={`edit-priority-${task.id}`}
              value={editDraft.priority}
              onChange={(event) =>
                onDraftChange({ ...editDraft, priority: event.target.value as Priority })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="task-actions">
            <button type="submit" className="secondary-action">
              Save
            </button>
            <button type="button" className="ghost-action" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
          {editError ? (
            <p id={`edit-error-${task.id}`} className="error" role="alert">
              {editError}
            </p>
          ) : null}
        </form>
      ) : (
        <>
          <div className="task-main">
            <input
              id={`complete-${task.id}`}
              className="complete-control"
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
            />
            <div className="task-copy">
              <label htmlFor={`complete-${task.id}`} className="task-title">
                {task.title}
              </label>
              <span className={`priority-badge priority-${task.priority}`}>
                <span className="priority-mark" aria-hidden="true" />
                {PRIORITY_LABEL[task.priority]}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button type="button" className="ghost-action" onClick={() => onStartEdit(task)}>
              Edit
            </button>
            <button type="button" className="danger-action" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
