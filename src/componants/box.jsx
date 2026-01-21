import { useState } from "react";

function Box({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  return (
    <div className="flex justify-center mt-8 mb-6">
      <div className="flex gap-3 bg-white px-5 py-3 rounded-xl shadow border">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task"
          className="border px-3 py-1 rounded-md text-sm"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border px-2 rounded-md text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={() => {
            addTask(text, priority);
            setText("");
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-md text-sm"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Box;
