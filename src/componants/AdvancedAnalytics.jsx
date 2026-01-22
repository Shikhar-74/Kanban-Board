import { useState } from "react";
import { exportToCSV } from "../utils/csvExport";

function AdvancedAnalytics({ tasks }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // 🔹 Apply filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
    );
  });

  // 🔹 Task Aging (SAFE)
  const agingData = filteredTasks.map((task) => {
    const ageDays = task.createdAt
      ? Math.floor((Date.now() - task.createdAt) / 86400000)
      : 0;

    return {
      title: task.title,
      status: task.status,
      ageDays,
    };
  });

  // 🔹 Avg Completion Time (SAFE)
  const completedTasks = filteredTasks.filter(
    (t) => t.completedAt && t.createdAt
  );

  const avgCompletion =
    completedTasks.length === 0
      ? "N/A"
      : Math.round(
          completedTasks.reduce(
            (sum, t) => sum + (t.completedAt - t.createdAt),
            0
          ) /
            completedTasks.length /
            86400000
        );

  // 🔹 CSV Export data
  const exportData = filteredTasks.map((t) => ({
    title: t.title,
    status: t.status,
    priority: t.priority,
    age_days: t.createdAt
      ? Math.floor((Date.now() - t.createdAt) / 86400000)
      : 0,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow border mb-10 mx-6">
      <h2 className="text-lg font-semibold mb-4">
        📈 Advanced Analytics
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border px-3 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="backlog">Backlog</option>
          <option value="todo">To Do</option>
          <option value="ongoing">Ongoing</option>
          <option value="done">Done</option>
        </select>

        <select
          className="border px-3 py-1 rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          onClick={() => exportToCSV(exportData)}
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Metric title="Filtered Tasks" value={filteredTasks.length} />
        <Metric
          title="Avg Completion Time (days)"
          value={avgCompletion}
        />
      </div>

      {/* TASK AGING */}
      <div>
        <h3 className="font-medium mb-2">Task Aging</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {agingData.map((t, i) => (
            <li key={i}>
              • {t.title} →{" "}
              {t.status === "done"
                ? "Completed"
                : t.ageDays === 0
                ? "Today"
                : `${t.ageDays} days old`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

export default AdvancedAnalytics;
