function Table(props) {
  const leftBarStyle = {width: "300px", padding: "5px"}
  const habits = props.habits
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
            habits.map((habit, index) => (
              <div className="table-habit table-separator" key={index}>
                <div className="table-habit-title">{habit.title}</div>
                <div className="days">
                  <div className="day"></div>
                  <div className="day"></div>
                  <div className="day"></div>
                  <div className="day"></div>
                  <div className="day"></div>
                  <div className="day"></div>
                  <div className="day"></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Table;