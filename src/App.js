import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1); // Initialize as -1 when not editing

  function addItem() {
    if (userInput.trim() !== "") {
      const tempList = [...list];
      tempList.push(userInput);
      setList(tempList);
      setUserInput("");
    }
  }

  function updateInputState(e) {
    setUserInput(e.target.value);
  }

  function deleteItem(index) {
    const tempList = [...list];
    tempList.splice(index, 1);
    setList(tempList);
  }

  function deleteItemAll() {
    setList([]);
  }

  function startEditing(index) {
    setEditIndex(index);
    setUserInput(list[index]);
  }

  function stopEditing() {
    setEditIndex(-1);
    setUserInput("");
  }

  function updateItem(index) {
    if (userInput.trim() !== "") {
      const tempList = [...list];
      tempList[index] = userInput;
      setList(tempList);
      stopEditing();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            className="input-field"
            onChange={updateInputState}
            placeholder="Enter any Item"
            value={userInput}
          />
          {editIndex === -1 ? (
            <button className="add-button" onClick={addItem}>
              Add
            </button>
          ) : (
            <button
              className="update-button"
              onClick={() => updateItem(editIndex)}
            >
              Update
            </button>
          )}
        </div>
        <button className="delete-all-button" onClick={deleteItemAll}>
          Delete All
        </button>
        <ul className="list">
          {list.map(function (item, index) {
            return (
              <li className="list-item" key={index}>
                {
                  // editIndex === index ? (
                  //   <input
                  //     type="text"
                  //     className="edit-input"
                  //     value={userInput}
                  //     onChange={updateInputState}
                  //   />
                  // ) :
                  item
                }
                {editIndex === index ? (
                  <button
                    className="save-button"
                    onClick={() => updateItem(index)}
                  >
                    Save
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "20px" }}>
                    <button
                      className="edit-button"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteItem(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
