import { useState } from "react";
import HabitList from "./components/HabitList";
import Table from "./components/Table";

function App() {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState("list"); // "list" | "table"
  const [currentDate, setCurrentDate] = useState(new Date());

  // Week range helper
  const getWeekRange = (date) => {
    const current = new Date(date);
    const day = current.getDay(); // 0 (Sun) - 6 (Sat)
    const monday = new Date(current);
    monday.setDate(current.getDate() - ((day + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
  };

  const { monday, sunday } = getWeekRange(currentDate);

  // Today info
  const weekdayShort = currentDate.toLocaleDateString("en-US", { weekday: "short" });
  const monthShort = currentDate.toLocaleDateString("en-US", { month: "short" });
  const year = currentDate.getFullYear();

  return (
    <>
      <div className="navbar">
        <button onClick={() => setView("list")}>Habit List</button>
        <button onClick={() => setView("table")}>Table</button>
      </div>

      {view === "list" && (
        <HabitList habits={habits} setHabits={setHabits} />
      )}

      {view === "table" && (
        <div className="table-wrapper">
          <Table habits={habits} />

          <div className="week-changer" style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() =>
                  setCurrentDate(prev => {
                    const d = new Date(prev);
                    d.setDate(d.getDate() - 7);
                    return d;
                  })
                }
              >
                Previous Week
              </button>

              <button
                onClick={() =>
                  setCurrentDate(prev => {
                    const d = new Date(prev);
                    d.setDate(d.getDate() + 7);
                    return d;
                  })
                }
              >
                Next Week
              </button>
            </div>

            <p style={{ marginTop: "10px" }}>
              Week:{" "}
              {monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
              -{" "}
              {sunday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>

            <p>
              Today: {weekdayShort}, {monthShort} {currentDate.getDate()}, {year}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
