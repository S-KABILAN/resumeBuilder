import React from "react";
import GoogleAuth from "./components/GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
      <div className="App">
        <h1>Google Authentication with MERN</h1>
        <GoogleAuth />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
