import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';
import { Modal, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const columns = [
    // { field: 'check', title: 'Check'},
    { field: 'description', title: 'Description' },
    { field: 'completed', title: 'Completed' },
    { field: 'created', title: 'Created at', type: 'date' },
    { field: 'updated', title: 'Updated at' },

];

const taskUrl = "https://api-nodejs-todolist.herokuapp.com/task"
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
    const [selectedTask, setSelectedTask] = useState({
        description: "",
        completed: "",
        createdAt: "",
        updatedAt: ""
    })

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

    const getPetition = async () => {
        await axios.get(taskUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
            })
    }
    useEffect(() => {
        
        getPetition();
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
                <Button color="primary" onClick={() => peticionPost()}>ADD</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancel</Button>
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
                data={data}
                title="Actions"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'edit task',
                        onClick: (event, rowData) => alert("Ready to edit")


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
        </div >

    )

}

export default Todo