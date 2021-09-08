import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
function Todo() {
    const columns = [
        // { field: 'check', title: 'Check'},
        { field: 'description', title: 'Description' },
        { field: 'completed', title: 'Completed' },
        { field: 'created', title: 'Created at', type: 'date' },
        { field: 'updated', title: 'Updated at' },

    ];

    const data = [
        { description: 'test a', completed: 'false', created: 'Aug 07 2021', updated: 'Aug 08 2021' },
        { description: 'test', completed: 'true', created: 'Aug 06 2021', updated: 'Aug 07 2021' },
        { description: 'test', completed: 'true', created: 'Aug 05 2021', updated: 'Aug 06 2021' },
        { description: 'test', completed: 'false', created: 'Aug 04 2021', updated: 'Aug 05 2021' }

    ];

    // const[tableData, setTableData] = useState([])
    // useEffect(() => {
    //     fetch("https://api-nodejs-todolist.herokuapp.com/task")
    //     fetch("https://jsonplaceholder.typicode.com/posts")

    //     .then((data)=>data.json())
    //     .then((data)=>setTableData(data))
    //     .then((data)=>console.log(data))

    // })

    return (
        <div>
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
        </div >
    )

}

export default Todo