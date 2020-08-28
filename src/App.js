import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CanvasPage } from './components/CanvasPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={CanvasPage} />
        </Switch>
      </Router>
      {/* <Canvas height={1000} width={1000} /> */}
    </div>
  );
}

export default App;
