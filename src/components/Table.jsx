const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Table({ habits, setHabits, currentDate }) {
  function getWeekKey(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - ((day + 6) % 7));
    return d.toISOString().split("T")[0];
  }

  const weekKey = getWeekKey(currentDate);

  function toggleDay(habitIndex, dayIndex) {
    const updatedHabits = [...habits];
    const habit = { ...updatedHabits[habitIndex] };
    const weekData = habit.completed[weekKey]
      ? [...habit.completed[weekKey]]
      : Array(7).fill(false);
    weekData[dayIndex] = !weekData[dayIndex];
    habit.completed = { ...habit.completed, [weekKey]: weekData };
    updatedHabits[habitIndex] = habit;
    setHabits(updatedHabits);
  }

  // Determine today's column (0 = Mon, 6 = Sun)
  const todayCol = ((currentDate.getDay() + 6) % 7);

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
        <p className="text-zinc-600 text-sm">No habits yet.</p>
        <p className="text-zinc-700 text-xs">Add one to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Header row */}
        <div className="flex items-center mb-1 px-1">
          <div className="flex-1 min-w-0" />
          <div className="flex gap-1.5 shrink-0">
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`w-10 text-center text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                  i === todayCol ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Habit rows */}
        <div className="space-y-1.5">
          {habits.map((habit, habitIndex) => {
            const weekData =
              habit.completed[weekKey] || Array(7).fill(false);
            const doneCount = weekData.filter(Boolean).length;

            return (
              <div
                key={habitIndex}
                className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 hover:border-zinc-700 transition-all group"
              >
                {/* Habit info */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-100 truncate">
                      {habit.title}
                    </p>
                    <span className="text-[10px] text-zinc-600 shrink-0">
                      {doneCount}/7
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1.5 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 rounded-full transition-all duration-500"
                      style={{ width: `${(doneCount / 7) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Day toggles */}
                <div className="flex gap-1.5 shrink-0">
                  {weekData.map((done, dayIndex) => {
                    const isToday = dayIndex === todayCol;
                    return (
                      <button
                        key={dayIndex}
                        onClick={() => toggleDay(habitIndex, dayIndex)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90 ${
                          done
                            ? "bg-white text-zinc-900"
                            : isToday
                            ? "bg-zinc-800 border border-zinc-600 text-zinc-500 hover:border-zinc-400"
                            : "bg-zinc-800 border border-zinc-800 text-zinc-700 hover:border-zinc-600"
                        }`}
                      >
                        {done ? (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 8.5L6.5 12L13 5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
        </div>

        {/* Week summary */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between px-1">
          <p className="text-xs text-zinc-600">Week of {weekKey}</p>
          <p className="text-xs text-zinc-500">
            {habits.reduce((acc, h) => {
              const wd = h.completed[weekKey] || Array(7).fill(false);
              return acc + wd.filter(Boolean).length;
            }, 0)}{" "}
            <span className="text-zinc-700">/ {habits.length * 7} completed</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Table;