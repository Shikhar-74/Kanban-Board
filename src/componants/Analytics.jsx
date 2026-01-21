import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics({ tasks }) {
  const total = tasks.length;

  const backlog = tasks.filter(t => t.status === "backlog").length;
  const todo = tasks.filter(t => t.status === "todo").length;
  const ongoing = tasks.filter(t => t.status === "ongoing").length;
  const done = tasks.filter(t => t.status === "done").length;

  const wip = todo + ongoing;
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  const priorityData = [
    { name: "High", value: tasks.filter(t => t.priority === "high").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "medium").length },
    { name: "Low", value: tasks.filter(t => t.priority === "low").length },
  ];

  const statusData = [
    { name: "Backlog", count: backlog },
    { name: "To Do", count: todo },
    { name: "Ongoing", count: ongoing },
    { name: "Done", count: done },
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <div className="px-6 mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        📊 Analytics Dashboard
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Tasks" value={total} />
        <Card title="Completed" value={`${completionRate}%`} />
        <Card title="WIP Tasks" value={wip} />
        <Card title="Done Tasks" value={done} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRIORITY PIE */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="font-medium mb-3 text-gray-700">
            Tasks by Priority
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS BAR */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="font-medium mb-3 text-gray-700">
            Tasks by Status
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}

export default Analytics;
