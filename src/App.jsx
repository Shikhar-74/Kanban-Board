import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import Header from "./componants/header";
import Box from "./componants/box";
import Backlog from "./componants/backLog";
import ToDo from "./componants/to_do";
import Ongoing from "./componants/Ongoing";
import Done from "./componants/done";

import Analytics from "./componants/Analytics";
import AdvancedAnalytics from "./componants/AdvancedAnalytics";

function App() {
  // 🔹 Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Persist to localStorage
  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔹 FIX OLD TASKS (prevents NaN issues)
  useEffect(() => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        createdAt: task.createdAt || Date.now(),
        completedAt: task.completedAt || null,
      }))
    );
  }, []);

  // 🔹 Create Task
  const addTask = (title, priority, dueDate) => {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        priority,
        status: "backlog",
        createdAt: Date.now(),
        completedAt: null,
        dueDate: dueDate ? new Date(dueDate).getTime() : null,
      },
    ]);
  };

  // 🔹 Move Task (buttons / drag & drop)
  const moveTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedAt:
                status === "done"
                  ? task.completedAt || Date.now()
                  : task.completedAt,
            }
          : task
      )
    );
  };

  // 🔹 Edit task title
  const editTask = (id, title) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  };

  // 🔹 Delete task
  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 🔹 Drag & Drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = Number(result.draggableId);
    const newStatus = result.destination.droppableId;

    moveTask(taskId, newStatus);
  };

  return (
    <>
      <Header />

      {/* 📊 Analytics */}
      <Analytics tasks={tasks} />
      <AdvancedAnalytics tasks={tasks} />

      {/* ➕ Create Task */}
      <Box addTask={addTask} />

      {/* 🧩 Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 pb-12">
          <Backlog
            tasks={tasks}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <ToDo
            tasks={tasks}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <Ongoing
            tasks={tasks}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <Done
            tasks={tasks}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
