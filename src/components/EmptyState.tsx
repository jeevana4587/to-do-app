interface EmptyStateProps {
  hasTasks: boolean;
}

export function EmptyState({ hasTasks }: EmptyStateProps) {
  if (!hasTasks) {
    return (
      <div className="empty-state" role="status">
        <h2>No tasks yet</h2>
        <p>Add your first task to start a focused list for today.</p>
      </div>
    );
  }

  return (
    <div className="empty-state" role="status">
      <h2>No tasks match your filters</h2>
      <p>Try a different search, status, or priority to see more tasks.</p>
    </div>
  );
}
