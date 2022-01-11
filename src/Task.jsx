import React from 'react'
import { Button,Card} from 'antd';
import "antd/dist/antd.css";

const Task=({id, taskName, description, dueDate,deleteTask,editTask}) => {
    return (
          <Card title = "Tasks"  id= {id} >
              <p>{taskName}</p>
              <p>{description}</p>
              <p>{dueDate.toString()}</p>
              <Button onClick={() => deleteTask(id)}>Delete</Button>
              <Button onClick={() => editTask({id})}>Edit</Button>
            </Card>
    )
}

export default Task;