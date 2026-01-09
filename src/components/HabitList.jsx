import { useState } from "react";

function HabitList({habits, setHabits}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null); // tracks which habit is being edited

  const addHabit = () => {
    if (!title || !description) return;
    setHabits([...habits, { title, description, completed: {}}]);
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
    const updatedHabits = [...habits];
    updatedHabits[index] = { title, description };
    setHabits(updatedHabits);
    setEditIndex(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="habitlist-container">
      <div className="hh">
        <div>
          <div>
            <h3>Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h3>Description</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={addHabit}>Add Habit</button>
      <h2>
        <strong>Habits:</strong>
      </h2>
      <div className="habits-habitlist">
        {habits.map((habit, index) =>
          editIndex === index ? (
            <HabitWhenEditIsTrue
              key={index}
              habit={habit}
              index={index}
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
              saveHabit={saveHabit}
            />
          ) : (
            <HabitWhenEditIsFalse
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
  );
}

function HabitWhenEditIsFalse({ habit, index, editHabit, deleteHabit }) {
  return (
    <div className="habit-habitlist">
      <div className="hh">
        <h3>
          <strong>Title:</strong> {habit.title}
        </h3>
        <h3>
          <strong>Description:</strong> {habit.description}
        </h3>
      </div>
      <button id="edit-btn" onClick={() => editHabit(index)}>
        Edit
      </button>
      <button id="delete-btn" onClick={() => deleteHabit(index)}>
        Delete
      </button>
    </div>
  );
}

function HabitWhenEditIsTrue({
  habit,
  index,
  title,
  description,
  setTitle,
  setDescription,
  saveHabit,
}) {
  return (
    <div className="habit-habitlist">
      <div className="hh">
        <div style={{display: "flex", gap: "10px"}}>
          <h3>
            <strong>Title:</strong>
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{display: "flex", gap: "10px"}}>
          <h3>
            <strong>Description:</strong>
          </h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => saveHabit(index)}>
        Save
      </button>
    </div>
  );
}

export default HabitList;
