import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, fetchTodos } from "./store/todoSlice";
import "./App.css";
import TodoList from "./components/ToDoList";
import InputField from "./components/inputField";

function App() {
  const [text, setText] = useState("");
  const { status, error } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodoAsync(text));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="AppName">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      {status === "loading" && <h1>LOADING...</h1>}
      {error && <h1>Error: {error}</h1>}
      <TodoList />
    </div>
  );
}

export default App;
