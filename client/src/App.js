import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Users from './Components/Users';
import AddStudent from './Components/AddStudent';
import Restricted from './Components/Restricted';
import AddDepartment from './Components/AddDepartment';
import PageNotFound from './Components/PageNotFound';
import Departments from './Components/Departments';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/users' />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/addUser" exact component={AddStudent} />
        <Route path="/departments" exact component={Departments} />
        <Route path="/departments/addDepartment" exact component={AddDepartment} />
        <Route path="/restricted" component={Restricted} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
