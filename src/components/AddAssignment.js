import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import {SERVER_URL} from '../constants.js';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


const AddAssignment = (props) => {

    const [open, setOpen] = React.useState(false);

    const [assignment, setAssignment] = React.useState({name: '', dueDate: '', courseId:''});

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setAssignment({...assignment, [e.target.name]:e.target.value})
    }


    const addAssignment = () => {
        
        console.log(JSON.stringify({name: assignment.name, dueDate: assignment.dueDate, courseId: assignment.courseId}));
        fetch(`${SERVER_URL}/add`,
        {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "credentials": "include"
            },
          body: JSON.stringify({
            name: assignment.name,
            dueDate: assignment.dueDate,
            courseId: assignment.courseId
            })
        })
        .then(res =>{
            if(res.ok){
                toast.success("Assignment added successfully!", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 15000 
            });
            fetchAssignments();
            handleClose();
            }
            else{
                toast.error("Add error", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                handleClose();
            }})
        .catch(err => {
            toast.error("Add failed.", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            handleClose();
            console.log(err);
        })
      }

      const fetchAssignments = () => {
        console.log("Assignment.fetchAssignments");
        const token = Cookies.get('XSRF-TOKEN');
        fetch(`${SERVER_URL}/gradebook`, 
          {  
            method: 'GET', 
            headers: { 'X-XSRF-TOKEN': token }
          } )
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          if (Array.isArray(responseData.assignments)) {
            toast.success("Fetch assignments successful", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table 
            this.setState({ assignments: responseData.assignments.map((assignment, index) => ( { id: index, ...assignment } )) });
          } else {
            toast.error("Fetch failed.", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }        
        })
        .catch(err => console.error(err)); 
      }

    return(
    <div>
        <Button id="add" style={{marginTop:10}} variant="outlined" color="primary" onClick={handleOpen}>
            Add Assignment</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Assignment</DialogTitle>
            <DialogContent>
                <TextField id="name" autoFocus value={assignment.name} margin="dense" onChange={handleChange} name="name" label="Title" fullWidth />
                <TextField id="dueDate" autoFocus value={assignment.dueDate} margin="dense" onChange={handleChange} name="dueDate" label="Due Date" fullWidth />
                <TextField id="courseId" npmautoFocus value={assignment.courseId} margin="dense" onChange={handleChange} name="courseId" label="Course ID" fullWidth />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button id="dialogAdd" onClick={addAssignment} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>

    </div>
    );
}
export default AddAssignment;