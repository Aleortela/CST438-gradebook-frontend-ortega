
import './App.css';
import AddAssignment from './components/AddAssignment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Gradebook from './components/Gradebook';
import Assignment from './components/Assignment';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';
import React from 'react';

function App() {

  const [assignment, setAssignment] = React.useState([]);

  const addAssignment = (assignment) => {
    setAssignment([assignment, ...assignment]);
  }


  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Gradebook Proj
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Assignment} />
        <Route path='/gradebook' component={Gradebook} />
       </Switch>
       <AddAssignment addAssignment={addAssignment} />
      </BrowserRouter>       
      
    </div>
  );
}

export default App;
