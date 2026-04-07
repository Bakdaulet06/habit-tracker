import { useState } from "react";
import HabitList from "./components/HabitList";
import Table from "./components/Table";

function App() {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState("list"); // "list" | "table"
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekRange = (date) => {
    const current = new Date(date);
    const day = current.getDay();
    const monday = new Date(current);
    monday.setDate(current.getDate() - ((day + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
  };

  const { monday, sunday } = getWeekRange(currentDate);

  const weekdayShort = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const monthShort = currentDate.toLocaleDateString("en-US", {
    month: "short",
  });
  const year = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center px-3 sm:px-6 py-6">
      <div className="w-full max-w-5xl space-y-6">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Habit Tracker
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Track habits and build consistency
            </p>
          </div>

          <div className="text-xs sm:text-sm text-zinc-400 sm:text-right space-y-1">
            <p>
              Today:{" "}
              <span className="text-zinc-200">
                {weekdayShort}, {monthShort} {currentDate.getDate()}, {year}
              </span>
            </p>
            <p>
              Week:{" "}
              <span className="text-zinc-200">
                {monday.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {sunday.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </header>

        {/* VIEW SWITCH */}
        <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl w-full sm:w-fit">
          <button
            onClick={() => setView("list")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm transition ${
              view === "list"
                ? "bg-white text-black font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            List
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm transition ${
              view === "table"
                ? "bg-white text-black font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Table
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-3 sm:p-5">
          {view === "list" && (
            <HabitList habits={habits} setHabits={setHabits} />
          )}

          {view === "table" && (
            <div className="space-y-6">
              <Table
                habits={habits}
                setHabits={setHabits}
                currentDate={currentDate}
              />

              {/* WEEK NAV */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-900 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentDate((prev) => {
                        const d = new Date(prev);
                        d.setDate(d.getDate() - 7);
                        return d;
                      })
                    }
                    className="px-4 py-2 rounded-xl text-sm bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={() =>
                      setCurrentDate((prev) => {
                        const d = new Date(prev);
                        d.setDate(d.getDate() + 7);
                        return d;
                      })
                    }
                    className="px-4 py-2 rounded-xl text-sm bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 rounded-xl text-sm bg-white text-black font-medium hover:opacity-90 transition"
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-zinc-600">
          Stay consistent. Small improvements every day.
        </footer>
      </div>
    </div>
  );
}

export default App;