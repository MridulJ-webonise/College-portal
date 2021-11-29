import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Components/Login';
import Users from './Components/Users';
import AddStudent from './Components/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/users' exact component={Users} />
        <Route path='/users/addUser' exact component={AddStudent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
