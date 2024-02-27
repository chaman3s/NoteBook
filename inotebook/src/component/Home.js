import React from "react";
import Notes from "./Notes";
import Alert from "./Alert"
const Home = () => {
  return (
    <div className="container">
        <Alert alert={{type:"success",msg:"successfully login"}}/>
       <Notes/>
    </div>
  );
};

export default Home;
