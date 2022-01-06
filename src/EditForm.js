import {Form,Modal,DatePicker,Input} from 'antd';
import React,{useState, useEffect} from 'react';

const EditForm = ({show,setShowModal,onSubmit}) => {
    console.log(show)
    const[loading,setLoading] = useState(false);
    const[taskName, setTaskName] = useState('');
    const[description, setDescription] = useState('');
    const[dueDate, setDueDate]= useState('');
 
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setShowModal(false);
    }, 3000);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  useEffect(()=>{
      setShowModal(show)
  },[show,setShowModal])

  // const onSubmit = (values) => {
   // console.log('Success:', values);
 // };

  const onSubmitFailed = (values) => {
    console.log('Failed:', values);
  };

  const onSubmitPress = () => {
      onSubmit({taskName, description, dueDate})
      clearData()
  }

  const clearData = () =>{
      setTaskName('')
      setDescription('')
      setDueDate('')
  }

  const setDate = (dateString) => {
      //console.log(date)
      console.log(dateString)
      //setDueDate(dateString)
  }

  return (
      <>
        <Modal
          visible={show}
          title="Task"  
          
          onOk={onSubmitPress}
          onCancel={handleCancel}

        >
    <Form
      layout="horizontal"
      
      // onFinish={onSubmit}
      //    onFinishFailed={onSubmitFailed}
    >
       <Form.Item
        label="Task Name"
        name="taskName"
        rules={[
          {
            required: true,
            message: 'Please enter the task name!',
          },
        ]}
      >
        <Input onChange={(e) => setTaskName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"  
        rules={[
          {
            required: true,
            message: 'Please enter task description!',
          },
        ]}
      >
        <Input onChange={(e) => setDescription(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Due Date"
                  name="dueDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter due date!',
                    },
                  ]}>
        <DatePicker onChange={(date, dateString) => setDueDate(dateString)} />
      </Form.Item>
    </Form>
          
        </Modal>
          </>
  )
}

export default EditForm;