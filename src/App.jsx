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

// 1. подключить reduxjs/toolkit и react-redux.
// 2. благодаря reduxjs/toolkit создается store через метод configureStore.
// 3. Store состоит из reducer и принимает различные ключи, которые берут какие-то срезы (slice).
// 4. Slice создали один (в данном примере, а так их может быть много), используя метод createSlice из toolkit
// состоит срез из имени, некоего изначального состояния (initialState) и набора редьюсеров (reducers).
// 5. Редьюсеры (reducers) создают какие-то события и обработку событий.
// 6. Данный набор событий экспортируется во "внешний мир" и сам reducer (некая общая логика, необходимая в store).
// 7. В store импортируется reducer и подключается по именем, которое хотим указать.
// 8. Далее оборачиваем приложение <App /> в провайдер, взятый из react-redux и передаем туда импортированный store.
// 9. На уровне компонентов, где нужны события, импортируется хук UseDispatch и сами события.
// 10. Из UseDispatch достается функция диспетчера (dispatch), которая по необходимости вызывается, принимает на себя событие и в событие передается какой-то набор данных (а можно и без данных, если не требуется).
// 11. Данные, которые передается приходят к нам вторым параметром в reducer через action (через action.payload).
// 12. используя useSelector мы получаем данные из store.
// useSelector передается в функцию, которая принимает всегда state и типа говорит "из всего state обратись в конкретной ветке, дастань конкретное значение, которое там хараниться и используй его".
