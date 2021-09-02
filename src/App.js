import logo from './logo.svg';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import Departments from './pages/DepartmentPage/Departments';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Jobs from './pages/JobPages/Jobs';
import Job from './pages/JobPages/Job';
import AddJob from './pages/JobPages/AddJob';


function App() {

  var nameconsist = false;
  let cokiees = document.cookie.split(";");

  for(var i=0; i<cokiees.length; i++)
  {
    if(cokiees[i].includes("name") == true)
    {
      nameconsist = true;
    }
    //console.log(nameconsist + " " + cokiees[i]);
  }


  //console.log("=>" + nameconsist);
  
  if(!nameconsist){
    return (
      <Router>
      <Switch>
        <Route exact path="/" component = {Login}/>
      </Switch>
    </Router>
    );
  }
  else{
  return (   
    <Router>
      <Switch>
        <Route exact path="/" component = {Login}/>
        <Route exact path="/Home" component = {Home}/>
        <Route exact path="/Departments" component = {Departments}/>
        <Route exact path="/Jobs" component={Jobs} />
        <Route path="/AddJob/:JobName" component={AddJob} />
        <Route path="/AddJob" component={AddJob} />
        <Route path="/Job/:JobName" component={Job} />
      </Switch>
    </Router>
  );
  }
}

export default App;
