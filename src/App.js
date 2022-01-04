import { Button,Col,Row,Card} from 'antd';
import { v4 as uuidv4} from 'uuid';
import React, { useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';
import "antd/dist/antd.css";
function App() {
  const[cards, updateCards] = useState([]);
  const[showModal, setShowModal] = useState(false);
  const handleClick = (taskName, description, dueDate) => {
    setShowModal(!showModal)
    
  }
  const onDelete = (id) => {
    const updatedTasks = cards.filter(card => card.id !== id)
    updateCards(updatedTasks)
  }
  const onSubmit = ({id,taskName, description, dueDate}) => {
    // console.log(values)
    // console.log(taskName)
    //console.log(description)
    //console.log(dueDate)
    const newCards = [...cards, {id: uuidv4(),taskName, description, dueDate}]
    const compareDueDate = (card1, card2) =>{
      const dueDate1 = new Date(card1.dueDate)
      const dueDate2 = new Date(card2.dueDate)
        if (dueDate1 < dueDate2){
          return -1
        }
        else if (dueDate2 > dueDate1){
          return 1
        }
        else 
          return 0
    }
    newCards.sort(compareDueDate);
    updateCards(newCards)
    setShowModal(!showModal)
  }

  return (
    <div className="App">
      <Row style ={{"height" : "100vh"}}>
        <Col span ={6} style = {{"backgroundColor" : "#EAECEE"}}>
          <p># of Tasks: {cards.length}</p>
          <p>Completed: {cards.filter(card => card.finished).length}</p>
          <p>Uncompleted: {cards.filter(card => !card.finished).length}</p>
          <Button onClick = {handleClick}> New Task </Button>
        </Col>
        <Col span = {12} style ={{"background": "#85C1E9"}}>
          {
            cards.map(card =>
              <Task
                id = {card.id}
                taskName = {card.taskName}
                description={card.description}
                dueDate={card.dueDate}
                deleteTask={onDelete}
              />
            )
            
          }
        </Col>
      
        <TaskModal show = {showModal} setShowModal={setShowModal} onSubmit={onSubmit}/> 
        <Col span ={6} style = {{"backgroundColor" : "#EAECEE"}}>
          
          </Col>
      </Row>
    </div>
  )
}

export default App;
