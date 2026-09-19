import type { PriorityFilter, StatusFilter } from "../types/task";

interface TaskFiltersProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
}



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
  <label htmlFor="status-filter">Status</label>
  <select
    id="status-filter"
    value={statusFilter}
    onChange={(event) =>
      onStatusChange(event.target.value as StatusFilter)
    }
  >
    <option value="all">All</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
  </select>
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
