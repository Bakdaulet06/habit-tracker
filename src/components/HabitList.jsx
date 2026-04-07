import { useState } from "react";

function HabitList({ habits, setHabits }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addHabit = () => {
    if (!title.trim() || !description.trim()) return;
    setHabits([...habits, { title: title.trim(), description: description.trim(), completed: {} }]);
    setTitle("");
    setDescription("");
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const editHabit = (index) => {
    setEditIndex(index);
    setTitle(habits[index].title);
    setDescription(habits[index].description);
  };

  const saveHabit = (index) => {
    if (!title.trim() || !description.trim()) return;
    const updatedHabits = [...habits];
    updatedHabits[index] = {
      ...updatedHabits[index],
      title: title.trim(),
      description: description.trim(),
    };
    setHabits(updatedHabits);
    setEditIndex(null);
    setTitle("");
    setDescription("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Add Habit Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">New Habit</p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-500 tracking-wide">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="e.g. Morning run"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-500 tracking-wide">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="e.g. 30 minutes before breakfast"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
            />
          </div>
        </div>
        <button
          onClick={addHabit}
          disabled={!title.trim() || !description.trim()}
          className="w-full bg-white text-zinc-900 rounded-xl py-2.5 text-sm font-semibold tracking-wide hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Add Habit
        </button>
      </div>

      {/* Habits List */}
      {habits.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase px-1">
            Habits <span className="text-zinc-700 ml-1">{habits.length}</span>
          </p>
          <div className="space-y-2">
            {habits.map((habit, index) =>
              editIndex === index ? (
                <EditCard
                  key={index}
                  habit={habit}
                  index={index}
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  saveHabit={saveHabit}
                  cancelEdit={cancelEdit}
                />
              ) : (
                <HabitCard
                  key={index}
                  habit={habit}
                  index={index}
                  editHabit={editHabit}
                  deleteHabit={deleteHabit}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HabitCard({ habit, index, editHabit, deleteHabit }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-zinc-700 transition-all">
      <div className="space-y-0.5 min-w-0 flex-1 pr-4">
        <p className="text-sm font-semibold text-zinc-100 truncate">{habit.title}</p>
        <p className="text-xs text-zinc-500 truncate">{habit.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => editHabit(index)}
          className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200 transition-all active:scale-95"
        >
          Edit
        </button>
        <button
          onClick={() => deleteHabit(index)}
          className="px-3 py-1.5 rounded-lg text-xs text-red-500 border border-zinc-700 hover:border-red-800 hover:bg-red-950 transition-all active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function EditCard({ habit, index, title, description, setTitle, setDescription, saveHabit, cancelEdit }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 space-y-3">
      <div className="space-y-1.5">
        <label className="text-xs text-zinc-500 tracking-wide">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-zinc-500 tracking-wide">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => saveHabit(index)}
          className="flex-1 bg-white text-zinc-900 rounded-xl py-2.5 text-sm font-semibold hover:bg-zinc-200 active:scale-[0.98] transition-all"
        >
          Save
        </button>
        <button
          onClick={cancelEdit}
          className="px-5 border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-sm hover:border-zinc-500 hover:text-zinc-200 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default HabitList;