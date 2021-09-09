import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { getToken } from '../Utils/Common';
import { Modal, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const columns = [
    //  { field: 'check', title: 'Check', type: 'Checkbox'},
    { field: 'description', title: 'Description' },
    { field: 'completed', title: 'Completed' },
    { field: 'createdAt', title: 'Created at', type: 'date' },
    { field: 'updatedAt', title: 'Updated at' },

];

const taskUrl = "https://api-nodejs-todolist.herokuapp.com/task"
const putUrl = "https://api-nodejs-todolist.herokuapp.com/task/"
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));
function Todo() {

    const token = getToken();
        // if (!token) {
    //     return;
    // }
    const [data, setData] = useState([]);
    const styles = useStyles();
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [selectedTask, setSelectedTask] = useState({
        description: "",
        completed: "",
        createdAt: "",
        updatedAt: ""
    })
    const [taskList, setTaskList] = useState([]);
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(selectedTask);
    }
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar)
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar)
    }

    const selectTask=(description, caso)=>{
        setSelectedTask(description);
        (caso==="Edit")&&abrirCerrarModalEditar()
    }

    const peticionPost=async()=>{
        await axios.post(taskUrl, selectedTask, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response=>{
            setData(data.concat(response.data))
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPut=async()=>{
        await axios.put(putUrl, selectedTask._id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response=>{
            setData(data.concat(response.data))
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGet = async () => {
        await axios.get(taskUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setTaskList(response.data)
                console.log("Tasklist:",taskList.data)
            })
    }
    useEffect(() => {
        setTaskList([])
        peticionGet();
    }, [])

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Add new Task</h3>
            <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Completed" name="completed" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Created" name="createdAt" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Updated" name="updatedAt" onChange={handleChange} />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={()=>peticionPost()} >ADD</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Edit Task</h3>
            <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} value={selectedTask&&selectedTask.description} />
            <br />
            <TextField className={styles.inputMaterial} label="Completed" name="completed" onChange={handleChange} value={selectedTask&&selectedTask.completed} />
            <br /> 
            <TextField className={styles.inputMaterial} label="Created" name="createdAt" onChange={handleChange} value={selectedTask&&selectedTask.createdAt}  />
            <br /> 
            <TextField className={styles.inputMaterial} label="Updated" name="updatedAt" onChange={handleChange} value={selectedTask&&selectedTask.updatedAt}   />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut ()}>EDIT</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancel</Button>
            </div>
        </div>
    )

    return (
        <div>
            <br />
            <Button onClick={() => abrirCerrarModalInsertar()}> Add Task </Button>
            <br />
            <br />

            <MaterialTable
                columns={columns}
                data={taskList.data}
                title="Tasks"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'edit task',
                        onClick: (event, rowData) => selectTask(rowData,"Edit")


                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete task',
                        onClick: (event, rowData) => alert("Ready to delete")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
        </div >

    )

}

export default Todo