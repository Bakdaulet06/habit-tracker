import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ─── HabitList ─── */
function HabitList({ habits, setHabits }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addHabit = () => {
    if (!title.trim() || !description.trim()) return;
    setHabits([...habits, { title: title.trim(), description: description.trim(), completed: {} }]);
    setTitle(""); setDescription("");
  };

  const deleteHabit = (i) => setHabits(habits.filter((_, idx) => idx !== i));

  const editHabit = (i) => { setEditIndex(i); setTitle(habits[i].title); setDescription(habits[i].description); };

  const saveHabit = (i) => {
    if (!title.trim() || !description.trim()) return;
    const u = [...habits];
    u[i] = { ...u[i], title: title.trim(), description: description.trim() };
    setHabits(u); setEditIndex(null); setTitle(""); setDescription("");
  };

  const cancelEdit = () => { setEditIndex(null); setTitle(""); setDescription(""); };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">New Habit</p>
        <div className="space-y-3">
          {[["Title", title, setTitle, "e.g. Morning run"], ["Description", description, setDescription, "e.g. 30 min before breakfast"]].map(([label, val, setter, ph]) => (
            <div key={label} className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 tracking-wide uppercase">{label}</label>
              <input
                type="text" value={val} onChange={e => setter(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addHabit()}
                placeholder={ph}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 transition-all"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addHabit}
          disabled={!title.trim() || !description.trim()}
          className="w-full bg-white text-zinc-900 rounded-xl py-2.5 text-sm font-bold tracking-wide hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        >
          + Add Habit
        </button>
      </div>

      {habits.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-1">
            Habits <span className="text-zinc-700 ml-1">{habits.length}</span>
          </p>
          <div className="space-y-2">
            {habits.map((habit, i) =>
              editIndex === i ? (
                <EditCard key={i} index={i} title={title} description={description} setTitle={setTitle} setDescription={setDescription} saveHabit={saveHabit} cancelEdit={cancelEdit} />
              ) : (
                <HabitCard key={i} habit={habit} index={i} editHabit={editHabit} deleteHabit={deleteHabit} />
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
        <button onClick={() => editHabit(index)} className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200 transition-all active:scale-95">Edit</button>
        <button onClick={() => deleteHabit(index)} className="px-3 py-1.5 rounded-lg text-xs text-red-500 border border-zinc-700 hover:border-red-800 hover:bg-red-950 transition-all active:scale-95">Delete</button>
      </div>
    </div>
  );
}

function EditCard({ index, title, description, setTitle, setDescription, saveHabit, cancelEdit }) {
  return (
    <div className="bg-zinc-900 border border-zinc-600 rounded-2xl p-5 space-y-3">
      {[["Title", title, setTitle], ["Description", description, setDescription]].map(([label, val, setter]) => (
        <div key={label} className="space-y-1.5">
          <label className="text-[10px] text-zinc-500 tracking-wide uppercase">{label}</label>
          <input type="text" value={val} onChange={e => setter(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 transition-all" />
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button onClick={() => saveHabit(index)} className="flex-1 bg-white text-zinc-900 rounded-xl py-2.5 text-sm font-bold hover:bg-zinc-200 active:scale-[0.98] transition-all">Save</button>
        <button onClick={cancelEdit} className="px-5 border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-sm hover:border-zinc-500 hover:text-zinc-200 active:scale-[0.98] transition-all">Cancel</button>
      </div>
    </div>
  );
}

/* ─── Table ─── */
function Table({ habits, setHabits, currentDate }) {
  function getWeekKey(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - ((day + 6) % 7));
    return d.toISOString().split("T")[0];
  }

  const weekKey = getWeekKey(currentDate);
  const todayCol = (currentDate.getDay() + 6) % 7;

  function toggleDay(habitIndex, dayIndex) {
    const updated = [...habits];
    const habit = { ...updated[habitIndex] };
    const wd = habit.completed[weekKey] ? [...habit.completed[weekKey]] : Array(7).fill(false);
    wd[dayIndex] = !wd[dayIndex];
    habit.completed = { ...habit.completed, [weekKey]: wd };
    updated[habitIndex] = habit;
    setHabits(updated);
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        </div>
        <p className="text-zinc-500 text-sm">No habits to track yet</p>
        <p className="text-zinc-700 text-xs">Add some from the Habits tab</p>
      </div>
    );
  }

  const totalDone = habits.reduce((acc, h) => {
    const wd = h.completed[weekKey] || Array(7).fill(false);
    return acc + wd.filter(Boolean).length;
  }, 0);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px] space-y-1.5">
        {/* Column headers */}
        <div className="flex items-center mb-3 px-4">
          <div className="flex-1" />
          <div className="flex gap-1.5 shrink-0">
            {DAYS.map((day, i) => (
              <div key={day} className={`w-10 text-center text-[9px] font-bold tracking-widest uppercase ${i === todayCol ? "text-zinc-300" : "text-zinc-600"}`}>
                {day}
                {i === todayCol && <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1" />}
              </div>
            ))}
          </div>
        </div>

        {habits.map((habit, habitIndex) => {
          const weekData = habit.completed[weekKey] || Array(7).fill(false);
          const doneCount = weekData.filter(Boolean).length;
          const pct = Math.round((doneCount / 7) * 100);

          return (
            <div key={habitIndex} className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 hover:border-zinc-700 transition-all">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-100 truncate">{habit.title}</p>
                  <span className="text-[10px] text-zinc-600 shrink-0 tabular-nums">{doneCount}/7</span>
                </div>
                <div className="mt-2 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {weekData.map((done, dayIndex) => {
                  const isToday = dayIndex === todayCol;
                  return (
                    <button
                      key={dayIndex}
                      onClick={() => toggleDay(habitIndex, dayIndex)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer ${
                        done
                          ? "bg-white text-zinc-900"
                          : isToday
                          ? "bg-zinc-800 border border-zinc-600 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300"
                          : "bg-zinc-800 border border-zinc-800 text-zinc-700 hover:border-zinc-600 hover:text-zinc-500"
                      }`}
                    >
                      {done ? (
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-current" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer summary */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between px-2">
          <p className="text-[10px] text-zinc-600 tabular-nums">Week of {weekKey}</p>
          <p className="text-[10px] tabular-nums">
            <span className="text-zinc-400 font-semibold">{totalDone}</span>
            <span className="text-zinc-600"> / {habits.length * 7} completed this week</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── App Shell ─── */
const SEED = [
  { title: "Morning run", description: "30 min before breakfast", completed: { "2025-04-07": [true, true, false, true, false, false, false] } },
  { title: "Read", description: "20 pages before bed", completed: { "2025-04-07": [true, false, true, true, true, false, false] } },
  { title: "Meditate", description: "10 min with Headspace", completed: { "2025-04-07": [false, false, false, false, false, false, false] } },
];

export default function App() {
  const [habits, setHabits] = useState(SEED);
  const [tab, setTab] = useState("tracker");
  const currentDate = new Date();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mb-1">
              {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Habits</h1>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {[["tracker", "This week"], ["manage", "Manage"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === id ? "bg-white text-zinc-900" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {tab === "tracker"
          ? <Table habits={habits} setHabits={setHabits} currentDate={currentDate} />
          : <HabitList habits={habits} setHabits={setHabits} />
        }
      </div>
    </div>
  );
}