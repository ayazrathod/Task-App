import { Button,Col,Row,Card} from 'antd';
import { v4 as uuidv4} from 'uuid';
import React, { useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';
import EditForm from './EditForm';
import "antd/dist/antd.css";
function App() {
  const[cards, updateCards] = useState([]);
  const[showModal, setShowModal] = useState(false);
  const[taskToEdit,setTaskToEdit] = useState({});
  const handleClick = (taskName, description, dueDate) => {
    setTaskToEdit({})
    setTimeout(() => {
      setShowModal(!showModal);
   }, 500);

    //setShowModal(!showModal)
    
  }
  const onDelete = (id) => {
    const updatedTasks = cards.filter(card => card.id !== id)
    console.log(updatedTasks)
    updateCards(updatedTasks)
  }

  const editTask = ({id}) =>{
    const editedTask = cards.filter(card => card.id === id)
    setTaskToEdit(editedTask[0])
    setShowModal(true)
    // const editUpdatedTask = cards.filter(card => card.id != id)
    // updateCards(editUpdatedTask)
    //console.log(id,taskName,description,dueDate)
  }
  const getEditIndex = (id, cards) => {
    if (id === null)
      return -1
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
       if (card.id === id) {
          return i
       }
    }
    return -1
 };

 const compareDueDates = (card1, card2) =>{
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
  const onSubmit = ({id, taskName, description, dueDate}) => {
    // dueDate = dueDate.toString();
    const newCards = [...cards];
    const editIndex = getEditIndex(id, newCards);
    if (editIndex >= 0) {  
       newCards[editIndex] = {id, taskName, description, dueDate};
    } else {
       newCards.push({id: uuidv4(), taskName, description, dueDate});
    }
    newCards.sort(compareDueDates);
    updateCards(newCards);
    setShowModal(!showModal);
}
  // const onSubmit = ({id,taskName, description, dueDate}) => {
  //   console.log(isEditing)
  //   // console.log(values)
  //   // console.log(taskName)
  //   //console.log(description)
  //   //console.log(dueDate)
  //   console.log(id,taskName,description,dueDate)
  //   dueDate= dueDate.toString()
  //   if (isEditing) {
  //     console.log(id)
  //     console.log(cards)
  //   }
  //    const newCards = [...cards, {id: uuidv4(),taskName, description, dueDate}]
  //   newCards.sort(compareDueDate);
  //   updateCards(newCards)
  //   setShowModal(!showModal)
  // }


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
                editTask={editTask}
              />
            )
            
          }
        </Col>
      
        <TaskModal show = {showModal} setShowModal={setShowModal} task ={taskToEdit} onSubmit={onSubmit}/> 
        {/* { <EditForm show = {showModal} setShowModal={setShowModal} onSubmit={onSubmit}/> } */}
        <Col span ={6} style = {{"backgroundColor" : "#EAECEE"}}>
          
          </Col>
      </Row>
    </div>
  )
}

export default App;
