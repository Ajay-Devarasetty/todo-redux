import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../Redux/Reducers/todoReducer";

const Home = () => {
    const [text, setText] = useState("");
    const [button, setButton] = useState("Save");
    const [id, setId] = useState(null);
    
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.todo.Tasks);

    const saveClick = () => {
        if (button === "Save") {
            dispatch(addTask(text));
            setText("");
        } else {
            dispatch(editTask({ id, text }));
            setButton("Save");
            setText("");
        }
    };

    const editClick = (task, index) => {
        setButton("Edit");
        setId(index);
        setText(task);
    };

    const deleteClick = (index) => {
        dispatch(deleteTask(index));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
                To-Do Application - {tasks.length}
            </Typography>
            
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField 
                    variant="outlined" 
                    placeholder="Enter Task" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ width: "250px" }}
                />
                <Button variant="contained" color="primary" onClick={saveClick}>
                    {button}
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ width: "50%", boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Task</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Edit</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => editClick(task, index)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => deleteClick(index)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Home;
