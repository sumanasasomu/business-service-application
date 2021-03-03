import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import MyForm from './components/MyForm'

function App() {
  return (
    <Router>
      <Route exact path="/" component={MyForm} />
      <Route path="/page2" component={MyForm} />
    </Router>
  );
}

export default App;
