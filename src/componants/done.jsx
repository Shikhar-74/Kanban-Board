import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

function Done({ tasks, moveTask, editTask, deleteTask }) {
  const [editId, setEditId] = useState(null);
  const [text, setText] = useState("");

  return (
    <Droppable droppableId="done">
      {(p) => (
        <div
          ref={p.innerRef}
          {...p.droppableProps}
          className="bg-gray-50 rounded-xl p-4 min-h-[420px] border border-gray-200"
        >
          <h2 className="font-semibold text-gray-700 mb-4 flex justify-between">
            <span>Done</span>
            <span className="text-sm text-gray-400">
              {tasks.filter((t) => t.status === "done").length}
            </span>
          </h2>

          {tasks
            .filter((t) => t.status === "done")
            .map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(p) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    className="bg-white rounded-lg p-4 mb-3 shadow-sm border hover:shadow-md transition"
                  >
                    {editId === task.id ? (
                      <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editTask(task.id, text);
                            setEditId(null);
                          }
                        }}
                        className="w-full border rounded-md px-2 py-1 text-sm mb-2"
                        autoFocus
                      />
                    ) : (
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-800">
                          {task.title}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    )}

                    {/* <div className="flex justify-end gap-2 text-gray-400 text-sm">
                      <button
                        className="hover:text-gray-700"
                        onClick={() => moveTask(task.id, "ongoing")}
                      >
                        ⬅
                      </button>
                      <button
                        className="hover:text-blue-600"
                        onClick={() => {
                          setEditId(task.id);
                          setText(task.title);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => deleteTask(task.id)}
                      >
                        🗑️
                      </button>
                    </div> */}
                  </div>
                )}
              </Draggable>
            ))}

          {p.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Done;
