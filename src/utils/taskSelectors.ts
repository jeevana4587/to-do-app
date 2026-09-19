import type { PriorityFilter, StatusFilter, Task } from "../types/task";

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export function getTaskStats(tasks: Task[]): TaskStats {
  const completed = tasks.filter((task) => task.completed).length;

  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
  };
}

export function getVisibleTasks(
  tasks: Task[],
  searchQuery: string,
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter,
): Task[] {
  const query = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = query.length === 0 || task.title.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "active" && !task.completed);
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}
