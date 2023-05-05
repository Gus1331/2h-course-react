import './App.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarckCheckfill } from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () { // tem como metodo padrão GET (por isso não definimos)
    const loadData = async function () {
      setLoading(true);

      const res = await fetch(API + "/project")
        .then((res) => res.json()) //transforma a res em json
        .then((data) => data) // nomeia res como data
        .catch((error) => console.log(error)); //tratamento de erro

        setLoading(false);
        setList(res);
    };
    loadData();
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }

    //envio para API
    await fetch(API + "/project", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      }
    }); //pode dar erro de referencia

    setList((prevState) => [...prevState, todo])
    
    setTime("");
    setTitle("");
  }

if(loading){
  return <p>Carregando...</p>
}

  return (
    <div className="App">

      <header>
        <h1>React Lista de tarefas</h1>
      </header>

      <div className="form-list">
        <h2>Adicione uma tarefa:</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="text">O que você vai fazer?</label>
            <input type="text" name="title" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} value={title || ""} required />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input type="text" name="time" placeholder="Tempo estimado em horas" onChange={(e) => setTime(e.target.value)} value={time || ""} required />
          </div>
          <input type="submit" value="Criar tarefa" />
        </form>
      </div>
      <div className="list">
        <h2>Tarefas:</h2>
        {list.length === 0 && <p>Não há tarefas ativas!</p>}
        
        {list.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className="actions">
              <span>
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarckCheckfill/>}
              </span>
              <BsTrash/>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default App;
