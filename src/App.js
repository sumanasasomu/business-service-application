import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Form1 from 'screens/Form1';
import { Route, Switch } from 'react-router-dom';
import Form2 from 'screens/Form2';

function App(props) {
  return (
    <Switch>
      <Route path="/form2/:services">
        <Form2 />
      </Route>
      <Route path="/">
        <Form1 />
      </Route>
    </Switch>
  );
}

export default App;
