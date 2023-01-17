import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";

export default function Update({ token, setEditing, id, getData }) {
   const [newtask, setNewtask] = useState("");
   const closeEditMode = () => {
      setEditing(false);
   };

   useEffect(() => {
      const closeModal = (e) => {
         e.key === "Escape" && closeEditMode();
      };

      window.addEventListener("keydown", closeModal);

      return () => {
         window.removeEventListener("keydown", closeModal);
      };
   }, [closeEditMode]);

   const ud = async (e) => {
      e.preventDefault();
      let headersList = {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
         title: newtask,
      });

      let response = await fetch(
         `https://candidate.neversitup.com/todo/todos/${id}`,
         {
            method: "PUT",
            body: bodyContent,
            headers: headersList,
         }
      );
      closeEditMode();
      getData();
   };

   return (
      <div
         role="dialog"
         aria-labelledby="editTask"
         onClick={(e) => {
            e.target === e.currentTarget && closeEditMode();
         }}
      >
         <form className="todo" onSubmit={ud}>
            <div className="todow">
               <input
                  type="text"
                  id="newtask"
                  className="input"
                  onChange={(e) => setNewtask(e.target.value)}
                  required
                  autoFocus
                  maxLength={120}
               />
               <label htmlFor="editTask" className="udlabel">
                  Update Task
               </label>
            </div>
            <button className="btn udbtn" type="submit">
               <AddIcon />
            </button>
         </form>
      </div>
   );
}
