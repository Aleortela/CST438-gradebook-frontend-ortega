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
import Assignment from './Assignment.js';


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
                position: toast.POSITION.BOTTOM_LEFT
            });
        
            handleClose();
            }
            else{
                toast.error("Fetch error", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                handleClose();
            }})
        .catch(err => {
            toast.error("Fetch failed.", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            handleClose();
            console.log(err);
        })
      }

    return(
    <div>
        <Button style={{marginTop:10}} variant="outlined" color="primary" onClick={handleOpen}>
            Add Assignment</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Assignment</DialogTitle>
            <DialogContent>
                <TextField autoFocus value={assignment.name} margin="dense" onChange={handleChange} name="name" label="Title" fullWidth />
                <TextField autoFocus value={assignment.dueDate} margin="dense" onChange={handleChange} name="dueDate" label="Due Date" fullWidth />
                <TextField autoFocus value={assignment.courseId} margin="dense" onChange={handleChange} name="courseId" label="Course ID" fullWidth />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addAssignment} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>

    </div>
    );
}
export default AddAssignment;