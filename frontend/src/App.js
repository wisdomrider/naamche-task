import "./App.css";
import { useState } from "react";

function App() {
  const [todos] = useState([
    "Add a button that allows users to add an item in todo list",
    "Implement context",
  ]);
  return (
    <div className="App">
      <section>
        <h4>Your assignment</h4>
        <p>You cannot use any library to do this task</p>
        <p>A todo item should not be empty</p>
        <p>A todo item cannot contain word: "Postpone" in any format</p>
        <ul className="assignment-tasks">
          <li>Allow users to add an item in to do list</li>
          <li>
            Allow users to remove an individual item in to do list
          </li>
          <li>
            Separate todoitems listing component into a different component
          </li>
          <li>Bonus points if you can use Context to implement it</li>
        </ul>
      </section>
      <section>
        <h3>Todos</h3>
        <ul className="todos">
          {todos.map((todoItem) => (
            <li key={todoItem}>{todoItem}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
