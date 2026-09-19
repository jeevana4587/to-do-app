import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { StatsCards } from "./components/StatsCards";
import { TaskComposer } from "./components/TaskComposer";
import { TaskFilters } from "./components/TaskFilters";
import { TaskList } from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  createId,
  isTaskArray,
  STORAGE_KEY,
  TITLE_MAX_LENGTH,
  type Priority,
  type PriorityFilter,
  type StatusFilter,
  type Task,
} from "./types/task";
import { getTaskStats, getVisibleTasks } from "./utils/taskSelectors";

interface EditDraft {
  title: string;
  priority: Priority;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [], isTaskArray);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null);
  const [editError, setEditError] = useState("");

  const visibleTasks = useMemo(
    () => getVisibleTasks(tasks, searchQuery, statusFilter, priorityFilter),
    [tasks, searchQuery, statusFilter, priorityFilter],
  );
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  function addTask(title: string, priority: Priority) {
    const now = Date.now();
    const nextTask: Task = {
      id: createId(),
      title: title.slice(0, TITLE_MAX_LENGTH),
      priority,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((current) => [nextTask, ...current]);
  }

  function toggleTask(id: string) {
    const now = Date.now();
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed, updatedAt: now } : task,
      ),
    );
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setEditDraft({ title: task.title, priority: task.priority });
    setEditError("");
  }

  function saveEdit(id: string) {
    if (!editDraft) {
      return;
    }

    const trimmed = editDraft.title.trim();
    if (trimmed.length === 0) {
      setEditError("Task title cannot be empty.");
      return;
    }

    const now = Date.now();
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              title: trimmed.slice(0, TITLE_MAX_LENGTH),
              priority: editDraft.priority,
              updatedAt: now,
            }
          : task,
      ),
    );
    setEditingId(null);
    setEditDraft(null);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft(null);
    setEditError("");
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
    if (editingId === id) {
      cancelEdit();
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <StatsCards stats={stats} />
      <TaskComposer onAdd={addTask} />
      <TaskFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />
      <TaskList
        tasks={visibleTasks}
        hasAnyTasks={tasks.length > 0}
        editingId={editingId}
        editDraft={editDraft}
        editError={editError}
        onToggle={toggleTask}
        onStartEdit={startEdit}
        onDraftChange={(draft) => {
          setEditDraft(draft);
          if (editError) {
            setEditError("");
          }
        }}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
