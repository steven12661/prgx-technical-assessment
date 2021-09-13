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
const buttonStyle = {
    backgroundColor: "#1E90FF",
    color: "white",
    margin: "10px",
};

function Todo() {


    const [data, setData] = useState([]);
    const styles = useStyles();
    const [insertModal, setInsertModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState({
        description: "",
        completed: "",
        createdAt: "",
        updatedAt: "",
        // _id: ""
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
    const openCloseinsertModal = () => {
        setInsertModal(!insertModal)
    }

    const openCloseeditModal = () => {
        setEditModal(!editModal)
    }

    const openClosedeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const selectTask = (task, caso) => {
        setSelectedTask(task);
        (caso === "Edit") ? openCloseeditModal()
            :
            openClosedeleteModal()
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const postMethod = async () => {
        await axios.post(taskUrl, selectedTask, config)
            .then(response => {
                setData(data.concat(response.data));
                openCloseinsertModal();
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
                openCloseeditModal();
                getMethod();
            }).catch(error => {
                console.log(error);
            })
    }


    const deleteMethod = async () => {
        await axios.delete(deleteUrl + selectedTask._id, config)
            .then(response => {
                setData(taskList.data.filter(task => task._id !== selectedTask._id));
                openClosedeleteModal();
            }).catch(error => {
                console.log(error);
            })
    }

    const getMethod = async () => {
        await axios.get(taskUrl, config)
            .then(response => {
                setTaskList(response.data)
                console.log("Tasklist:", taskList.data)
            })
    }
    useEffect(() => {
        setTaskList([])
        getMethod();
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
                <Button color="primary" onClick={() => postMethod()} >ADD</Button>
                <Button onClick={() => openCloseinsertModal()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Edit Task</h3>
            <small>Change the status of this task</small> <br/>

            {/* <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} value={selectedTask && selectedTask.description} /> */}
            <br />
            <TextField className={styles.inputMaterial} label="Completed" name="completed" onChange={handleChange} value={selectedTask && selectedTask.completed} />
            <br />
            {/* <TextField className={styles.inputMaterial} label="Created" name="createdAt" onChange={handleChange} value={selectedTask && selectedTask.createdAt} /> */}
            <br />
            {/* <TextField className={styles.inputMaterial} label="Updated" name="updatedAt" onChange={handleChange} value={selectedTask && selectedTask.updatedAt} /> */}
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>EDIT</Button>
                <Button onClick={() => openCloseeditModal()}>Cancel</Button>
            </div>
        </div>
    )
    const bodyEliminar = (
        <div className={styles.modal}>
            <p>Are you sure you want to delete this task <b>{selectedTask && selectedTask.description}</b>? </p>
            <div align="right">
                <Button color="secondary" onClick={() => deleteMethod()}>Yes</Button>
                <Button onClick={() => openClosedeleteModal()}>No</Button>

            </div>

        </div>
    )

    return (
        <div className="auth-wrapper-table auth-inner-table table--size">
            <br />
            <Button style={buttonStyle} onClick={() => openCloseinsertModal()}> Add Task </Button>
            <br />
            <br />

            <MaterialTable
                columns={columns}
                data={taskList.data}
                title="Tasks"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit task status',
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
                open={insertModal}
                onClose={openCloseinsertModal}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={editModal}
                onClose={openCloseeditModal}>
                {bodyEditar}
            </Modal>

            <Modal
                open={deleteModal}
                onClose={openClosedeleteModal}>
                {bodyEliminar}
            </Modal>

        </div >

    )

}

export default Todo