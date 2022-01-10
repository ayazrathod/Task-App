import {Form,Modal,DatePicker,Input} from 'antd';
import React,{useState, useEffect} from 'react';

const EditForm = ({show,setShowModal,onSubmit}) => {
    console.log(show)
    const [form] = Form.useForm();
    const[loading,setLoading] = useState(false);
 
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
      console.log(form.getFieldsValue(true))
      onSubmit(form.getFieldsValue(true))
      clearData()
  }

  const clearData = () =>{
      form.setFieldsValue({taskName: '', description: '', dueDate: ''})
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
      form={form}
      
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
        <Input />
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
        <Input />
      </Form.Item>
      <Form.Item label="Due Date"
                  name="dueDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter due date!',
                    },
                  ]}>
        <DatePicker />
      </Form.Item>
    </Form>
          
        </Modal>
          </>
  )
}

export default EditForm;