import React, {useState, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './table.css'

const Todo = () =>{

    // const[tableData, setTableData] = useState([])
    // useEffect(() => {
    //     fetch("https://api-nodejs-todolist.herokuapp.com/task")
    //     fetch("https://jsonplaceholder.typicode.com/posts")

    //     .then((data)=>data.json())
    //     .then((data)=>setTableData(data))
    //     .then((data)=>console.log(data))

    // })
    // const [description, setDescription] = useState(data);
    return (
            <div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="th "> Check </th>
                            <th className="th "> Description </th>
                            <th className="th "> Completed </th>
                            <th className="th "> Created at </th>
                            <th className="th "> Updated at </th>
                            <th className="th "> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {}
                        <tr>
                            <td className="td">a</td>
                            <td className="td">test</td>
                            <td className="td">false</td>
                            <td className="td">December 10, 1815</td>
                            <td className="td">December 10, 1815</td>
                            <td className="td">a</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    
}

export default Todo