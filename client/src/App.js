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
      
      
      <Route path="/home" component={nav} />
      <Route exact path= "/home" component= {home} />
      <Route exact path="/" component={intro}  />
      
      <Route path="/home/pais/:id" component={pais} />
      <Route path="/home/createActivity" component={activity} />
      <Route exact path="/enviado" component={enviado}/>
      
    </div>
  );
}

export default App;
