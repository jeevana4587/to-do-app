import type { Priority, Task } from "../types/task";
import { EmptyState } from "./EmptyState";
import { TaskItem } from "./TaskItem";

interface EditDraft {
  title: string;
  priority: Priority;
}

interface TaskListProps {
  tasks: Task[];
  hasAnyTasks: boolean;
  editingId: string | null;
  editDraft: EditDraft | null;
  editError: string;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onDraftChange: (draft: EditDraft) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  hasAnyTasks,
  editingId,
  editDraft,
  editError,
  onToggle,
  onStartEdit,
  onDraftChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState hasTasks={hasAnyTasks} />;
  }

  return (
    <section className="panel task-list-panel" aria-labelledby="task-list-heading">
      <h2 id="task-list-heading">Your tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            editDraft={editingId === task.id ? editDraft : null}
            editError={editingId === task.id ? editError : ""}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onDraftChange={onDraftChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
