import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'

const AddAssignment = (props) => {
    const [open, setOpen] = React.useState(false);

    const [assignment, setAssignment] = React.useState({assignmentId: '', assignmentName: '', dueDate: ''});

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
        props.addAssignment(assignment);
        handleClose();
    }

    return(
    <div>
        <Button style={{marginTop:10}} variant="outlined" color="primary" onClick={handleOpen}>
            Add Assignment</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Assignment</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" value={assignment.assignmentId} onChange={handleChange} name="assignmentId" label="Assignment ID" fullWidth />
                <TextField autoFocus margin="dense" value={assignment.assignmentName} onChange={handleChange} name="assignmentname" label="Title" fullWidth />
                <TextField autoFocus margin="dense" value={assignment.dueDate} onChange={handleChange} name="dueDate" label="Due Date" fullWidth />
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