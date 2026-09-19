export const PRIORITIES = ["high", "medium", "low"] as const;

export type Priority = (typeof PRIORITIES)[number];

export type StatusFilter = "all" | "active" | "completed";

export type PriorityFilter = "all" | Priority;

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export const TITLE_MAX_LENGTH = 200;

export const STORAGE_KEY = "focuslist.tasks.v1";

export function isPriority(value: unknown): value is Priority {
  return value === "high" || value === "medium" || value === "low";
}

export function isTask(value: unknown): value is Task {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.length > 0 &&
    typeof candidate.title === "string" &&
    isPriority(candidate.priority) &&
    typeof candidate.completed === "boolean" &&
    typeof candidate.createdAt === "number" &&
    Number.isFinite(candidate.createdAt) &&
    typeof candidate.updatedAt === "number" &&
    Number.isFinite(candidate.updatedAt)
  );
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
