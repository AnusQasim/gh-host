import "./App.css";
import { useState } from "react";

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
  function deleteItemAll(index) {
    const tempList = [...list];
    // tempList.splice(index, 1);
    setList(tempList);
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
        <input
          onChange={updateInputState}
          placeholder="Enter any Item"
          value={userInput}
        />
        {editIndex === -1 ? (
          <button onClick={addItem}>Add to List</button>
        ) : (
          <button onClick={() => updateItem(editIndex)}>Update</button>
        )}

        <ul>
          {list.map(function (item, index) {
            return (
              <li key={index}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={userInput}
                    onChange={updateInputState}
                  />
                ) : (
                  item
                )}
                {editIndex === index ? (
                  <button onClick={() => updateItem(index)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteItem(index)}>Delete</button>
                    <button onClick={() => deleteItemAll(index)}>
                      Delete All
                    </button>
                  </>
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
