import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Todolist({ title, del, id, edh }) {
   return (
      <div className="todolist checkbox-wrapper-11">
         <input type="checkbox" name="checkbox" id="checkbox" />
         <div>
            <div>{title}</div>
         </div>
         <div className="btnbox">
            <button className="editbtn editBtn" onClick={() => edh(id)}>
               <CreateIcon />
            </button>
            <button className="editbtn delBtn" onClick={() => del(id)}>
               <DeleteForeverIcon />
            </button>
         </div>
      </div>
   );
}

export default Todolist;
