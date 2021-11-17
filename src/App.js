import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty, size } from 'lodash';
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions';


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const [error, setError] = useState(null)




  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      console.log(result)
      if (result.statusResponse) {
        setTasks(result.data)
      }}) () },[])



  const addTask = async (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task vacío")
      return
    }

    const result = await addDocument("tasks", { name: task, description: description, date: date })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }


    setTasks([...tasks, { id: result.data.id, name: task, description: description, date: date }])
    setTask("")
    setDescription("")
    setDate("")
  }

  const saveTask = async (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task vacío")
      return
    }

    const result = await updateDocument("tasks", id, {name: task, description: description, date: date})
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id===id ? { id, name: task, description: description, date: date} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
    setDate("")
    setDescription("")

  }

  const deleteTask = async (id) => {
    const result = await deleteDocument("tasks", id)
    if (!result.statusResponse) 
    {
      setError(result.error)
      return
    }
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (tarea) => {
    setTask(tarea.name)
    setDescription(tarea.description)
    setDate(tarea.date)
    setEditMode(true)
    setId(tarea.id)
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Tareas</h1>
        <hr />
        <div className="row aling-items-start">
          <div className="col-8">
            <h4 className="text-center">Actividades</h4>
            {
              size(tasks) === 0 ? (
                <h5 className="text-center">Aun no hay tareas</h5>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Tarea</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    tasks.map((task) => (
                      <tr  key={task.id}>
                        
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.date}</td>
                        <td><button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => deleteTask(task.id)}
                        >Eliminar </button>
                          <button className="btn btn-warning btn-sm float-right"
                          onClick={() => editTask(task)}>
                          Editar
                        </button>
                        </td>
                        
                      </tr>
                      
                    ))
                  }
                  </tbody>
                </table>
              )}
          </div>
          <div className="col-4">
            <h4 className="text-center">{editMode ? "Modificar tarea" : "Agregar Tarea"}</h4>
            <form onSubmit={editMode ? saveTask : addTask}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresar una tarea..."
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresar la descripcion..."
                onChange={(text) => setDescription(text.target.value)}
                value={description}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresar fecha de termino..."
                onChange={(text) => setDate(text.target.value)}
                value={date}
              />
              <button className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
                type="submit"
              > {editMode ? "Guardar" : "Agregar"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
  }
export default App;


