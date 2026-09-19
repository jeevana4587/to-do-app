import type { TaskStats } from "../utils/taskSelectors";

interface StatsCardsProps {
  stats: TaskStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="stats-row" aria-label="Task statistics">
      <article className="stat-card">
        <p className="stat-label">Total</p>
        <p className="stat-value">{stats.total}</p>
      </article>
      <article className="stat-card">
        <p className="stat-label">Completed</p>
        <p className="stat-value">{stats.completed}</p>
      </article>
      <article className="stat-card">
        <p className="stat-label">Pending</p>
        <p className="stat-value">{stats.pending}</p>
      </article>
    </section>
  );
}
