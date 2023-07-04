import { Route, Switch } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Create from './views/create/Create';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/landing" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
