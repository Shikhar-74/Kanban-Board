import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Header from "./componants/header";
import Box from "./componants/box";
import Backlog from "./componants/backLog";
import ToDo from "./componants/to_do";
import Ongoing from "./componants/Ongoing";
import Done from "./componants/done";
import Analytics from "./componants/Analytics";


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority) => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title, priority, status: "backlog" }]);
  };

  const moveTask = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const editTask = (id, title) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
  };

  const deleteTask = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks(tasks.filter(t => t.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    moveTask(Number(result.draggableId), result.destination.droppableId);
  };

  return (
    <>
      <Header />
      <Analytics tasks={tasks} />
      <Box addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 pb-10">
          <Backlog tasks={tasks} moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
          <ToDo tasks={tasks} moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
          <Ongoing tasks={tasks} moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
          <Done tasks={tasks} moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
