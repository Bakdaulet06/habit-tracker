function Table({habits, setHabits, currentDate}) {
  function getWeekKey(date) {
    const day = date.getDay();
    date.setDate(date.getDate() - ((day + 6) % 7))
    return date.toISOString().split("T")[0]
  }
  const weekKey = getWeekKey(currentDate)

  function toggleDay(habitIndex, dayIndex) {
    const updatedHabits = [...habits]
    const habit = updatedHabits[habitIndex]
    const weekData = habit.completed[weekKey] ? [...habit.completed[weekKey]] : Array(7).fill(false);
    weekData[dayIndex] = !weekData[dayIndex];
    habit.completed = {
      ...habit.completed,
      [weekKey]: weekData
    };
    updatedHabits[habitIndex] = habit;
    setHabits(updatedHabits)
  }
  return(
    <>
      <div className="table">
        <div className="table-top table-separator">
          <div className="table-habit-title">Habits</div>
          <div className="days">
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
            <div className="day">Sun</div>
          </div>
        </div>
        <div className="table-body">
          {
            habits.map((habit, index) => {
              const weekData = habit.completed[weekKey] || Array(7).fill(false);
              return (
                <div className="table-habit table-separator" key={index}>
                  <div className="table-habit-title">{habit.title}</div>
                  <div className="days">
                    {weekData.map((done, i) => (
                      <div
                        key={i}
                        className={`day ${done ? "completed" : "not-completed"}`}
                        onClick={() => toggleDay(index, i)} 
                      />
                    ))}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Table;