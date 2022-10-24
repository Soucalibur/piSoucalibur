import './App.css';
import home from "./Components/home"
import intro from "./Components/intro"
import nav from "./Components/nav"
import pais from "./Components/pais"
import activity from "./Components/activity"
import enviado from "./Components/enviado"
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Route path="/home" component={nav} className="navPosition" />
      <Route exact path= "/home" component= {home} className="homePosition"/>
      <Route exact path="/" component={intro}  />
      
      <Route path="/pais/:id" component={pais} className="paisPosition"/>
      <Route path="/home/createActivity" component={activity} />
      <Route exact path="/enviado" component={enviado}/>
      
    </div>
  );
}

export default App;
