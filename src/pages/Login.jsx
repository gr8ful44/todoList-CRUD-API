import { useState } from "react";

function Login() {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();

   const login = async (userinfo) => {
      return fetch("https://candidate.neversitup.com/todo/users/auth", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(userinfo),
      }).then((res) => res.json());
   };

   const hSubmitLogin = async (e) => {
      e.preventDefault();
      const response = await login({
         username,
         password,
      });
      if ("token" in response) {
         localStorage.setItem("bearer", response.token);
         window.location.href = "/todo/todos";
      }
   };

   return (
      <div className="loginpage">
         <h2 className="lititle">Login</h2>
         <form onSubmit={hSubmitLogin} className="form">
            <div className="wp">
               <input
                  type="text"
                  className="input"
                  required
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
               />
               <label htmlFor="username" className="lilabel">
                  username
               </label>
            </div>
            <div className="wp">
               <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
               />
               <label htmlFor="password" className="lilabel">
                  password
               </label>
            </div>
            <button type="submit" className="submit">
               login
            </button>
         </form>
      </div>
   );
}
export default Login;
