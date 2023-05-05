import './App.css';

import { useState, useEfect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarckCheckfill } from 'react';

const API = "http://localhost:5000";

function App() {
const [title, setTitle] = useState("");
const [time, setTime] = useState("");
const [list, setList] = useState([]);
const [loading, setLoading] = useState(false);
const handleSubmit = function(e){
  e.preventDefault();
  setTitle("");
  
  const todo = {
    id: Math.random(),
    title,
    time,
    done: false,
  }
  //envio para API
  console.log(todo);

  setTime("");
  setTitle("");
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
            <input type="submit" value="Criar tarefa"/>
        </form>
      </div>
      <div className="list">
        <h2>Tarefas:</h2>
        {list.length === 0 && <p>Não há tarefas ativas!</p>}
      </div>


    </div>
  );
}

export default App;
