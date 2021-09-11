import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { Modal, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const columns = [
    { field: 'description', title: 'Description' },
    { field: 'completed', title: 'Completed' },
    { field: 'createdAt', title: 'Created at', type: 'date' },
    { field: 'updatedAt', title: 'Updated at' },

];

const taskUrl = "https://api-nodejs-todolist.herokuapp.com/task"
const putUrl = "https://api-nodejs-todolist.herokuapp.com/task/"
const deleteUrl = "https://api-nodejs-todolist.herokuapp.com/task/"

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
    },
}));
const mystyle = {

    backgroundColor: "#1E90FF",
    color: "white",
    margin: "10px",
};

function Todo() {


    const [data, setData] = useState([]);
    const styles = useStyles();
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [selectedTask, setSelectedTask] = useState({
        description: "",
        completed: "",
        createdAt: "",
        updatedAt: "",
        _id: ""
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

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const selectTask = (task, caso) => {
        setSelectedTask(task);
        (caso === "Edit") ? abrirCerrarModalEditar()
            :
            abrirCerrarModalEliminar()
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const peticionPost = async () => {
        await axios.post(taskUrl, selectedTask, config)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        var body = {
            'completed': (selectedTask.completed.toLowerCase() === 'true')
        }
        await axios.put(putUrl + selectedTask._id, body, config)
            .then(response => {
                abrirCerrarModalEditar();
                peticionGet();
            }).catch(error => {
                console.log(error);
            })
    }


    const peticionDelete = async () => {
        await axios.delete(deleteUrl + selectedTask._id, config)
            .then(response => {
                setData(taskList.data.filter(task => task._id !== selectedTask._id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionGet = async () => {
        await axios.get(taskUrl, config)
            .then(response => {
                setTaskList(response.data)
                console.log("Tasklist:", taskList.data)
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
                <Button color="primary" onClick={() => peticionPost()} >ADD</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Edit Task</h3><small>(you can only edit completed field)</small>

            <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} value={selectedTask && selectedTask.description} />
            <br />
            <TextField className={styles.inputMaterial} label="Completed" name="completed" onChange={handleChange} value={selectedTask && selectedTask.completed} />
            <br />
            <TextField className={styles.inputMaterial} label="Created" name="createdAt" onChange={handleChange} value={selectedTask && selectedTask.createdAt} />
            <br />
            <TextField className={styles.inputMaterial} label="Updated" name="updatedAt" onChange={handleChange} value={selectedTask && selectedTask.updatedAt} />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>EDIT</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancel</Button>
            </div>
        </div>
    )
    const bodyEliminar = (
        <div className={styles.modal}>
            <p>Are you sure you want to delete this task <b>{selectedTask && selectedTask.description}</b>? </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Yes</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

            </div>

        </div>
    )

    return (
        <div>
            <br />
            <Button style={mystyle} onClick={() => abrirCerrarModalInsertar()}> Add Task </Button>
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
                        onClick: (event, rowData) => selectTask(rowData, "Edit")


                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete task',
                        onClick: (event, rowData) => selectTask(rowData, "Delete")
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

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

        </div >

    )

}

export default Todo