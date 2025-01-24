import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Paper } from '@mui/material';
import '../App.css'

const UserInput = ({view, setView, fetchData, isLoading}) => {

    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUserInput = (event) => {
        // Clear error if present
        if (errorMessage)
            setErrorMessage("")
        setInput(event.target.value);
    }

    const handleView = (event) => {
        setView(event.target.value);
    }

    const handleBtn = () => {
        // Update the year
        if (!(/^\d{4}$/.test(input))) {
            // Error if year is invalid
            setErrorMessage("Error: Not a valid year")
            return;
        }

        if (input < new Date().getFullYear() || input > 2200) {
            // Error if year is invalid
            setErrorMessage("Error: Not a valid year")
            return;
        }

        // Fetch data and clean the input
        setInput("");
        fetchData(input);
    }

    return (
        <Paper className="user-input">
            <div className="nav-left">
            <div className="year-input">
                <TextField 
                size='small'
                label={`Enter Year`}
                value={input}
                error={errorMessage.length > 0}
                onChange={handleUserInput}
                helperText={errorMessage ? errorMessage : `Enter year between ${new Date().getFullYear()} and 2200`} />
            </div><br />
        
            <FormControl className='mui-input' size='small'>
                <InputLabel id="demo-simple-select-label">Select Disaster</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={view}
                label="Select Disaster"
                onChange={handleView}
                >
                <MenuItem value={"Severe Storm"}>Severe Storm</MenuItem>
                <MenuItem value={"Hurricane"}>Hurricane</MenuItem>
                <MenuItem value={"Flood"}>Flood</MenuItem>
                <MenuItem value={"Fire"}>Fire</MenuItem>
                <MenuItem value={"Tornado"}>Tornado</MenuItem>
                </Select>
            </FormControl>

            <div className="btn">
                <Button disabled={isLoading} variant="contained" onClick={handleBtn}>Predict</Button>
            </div>
            </div>

            <div className="nav-right">
                <Button href="#section-map">View Map</Button>
                <Button href="#section-bar">View Bar</Button>
            </div>
      </Paper>
    )
}

export default UserInput;