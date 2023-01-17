import { useEffect, useState } from "react";
import Todolist from "../components/Todolist";
import Update from "../components/Update";

function Todo() {
   const [todo, setTodo] = useState([]);
   const [task, setTask] = useState("");
   const token = localStorage.getItem("bearer");

   const [isEditing, setEditing] = useState(false);

   const getData = async () => {
      let headersList = {
         Authorization: `Bearer ${token}`,
      };

      let response = await fetch(
         "https://candidate.neversitup.com/todo/todos/",
         {
            method: "GET",
            headers: headersList,
         }
      );

      let data = await response.json();
      setTodo(data);
   };

   const del = async (id) => {
      let headersList = {
         Authorization: `Bearer ${token}`,
      };

      let response = await fetch(
         `https://candidate.neversitup.com/todo/todos/${id}`,
         {
            method: "DELETE",
            headers: headersList,
         }
      );
      getData();
   };

   const add = async (e) => {
      e.preventDefault();
      let headersList = {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
         title: task,
      });

      let response = await fetch(
         "https://candidate.neversitup.com/todo/todos",
         {
            method: "POST",
            body: bodyContent,
            headers: headersList,
         }
      );
      setTask("");
      getData();
   };

   const edh = (id) => {
      setEditing(true);
   };

   useEffect(() => {
      getData();
      // if todo is update > re-render.
   }, []);

   return (
      <div className="main">
         <h1>🔥</h1>
         <form className="todo" onSubmit={add}>
            <div className="ipw todow">
               <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => setTask(e.target.value)}
               />
               <label htmlFor="task" className="label">
                  enter something..
               </label>
            </div>
            <button className="addbtn">+</button>
         </form>
         {todo &&
            todo.map((item) => (
               <Todolist
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  del={del}
                  edh={edh}
               />
            ))}
         {isEditing &&
            todo.map((item) => (
               <Update
                  key={item._id}
                  id={item._id}
                  token={token}
                  setEditing={setEditing}
                  getData={getData}
               />
            ))}
      </div>
   );
}

export default Todo;
