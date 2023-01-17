import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/todo/todos" element={<Todo />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
