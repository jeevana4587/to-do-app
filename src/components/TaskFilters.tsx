import type { PriorityFilter, StatusFilter } from "../types/task";

interface TaskFiltersProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TaskFilters({
  searchQuery,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <section className="panel filters" aria-labelledby="filters-heading">
      <h2 id="filters-heading">Find tasks</h2>
      <div className="filters-grid">
        <div className="field search-field">
          <label htmlFor="task-search">Search by title</label>
          <input
            id="task-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Type part of a title"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <p id="status-filter-label" className="field-label">
            Status
          </p>
          <div className="segmented" role="group" aria-labelledby="status-filter-label">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={statusFilter === option.value ? "segment is-active" : "segment"}
                aria-pressed={statusFilter === option.value}
                onClick={() => onStatusChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}
