
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainListPage from './TrainListPage';
import SingleTrainPage from './SingleTrainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={TrainListPage} />
        <Route path="/train/:trainId" component={SingleTrainPage} />
      </Routes>
    </Router>
  );
}

export default App;
