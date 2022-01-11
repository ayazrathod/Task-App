import React,{useState, useEffect} from 'react';
import { Form,Input,DatePicker, Modal} from 'antd';
import ListBody from 'antd/lib/transfer/ListBody';
import FormContext from 'rc-field-form/es/FormContext';

const TaskModal = ({show,setShowModal,onSubmit,task}) => {
    console.log(task)
    const [form] = Form.useForm();
    const[loading,setLoading] = useState(false);
    // const[taskName, setTaskName] = useState(task.taskName);
    // const[description, setDescription] = useState(task.description);
    // const[dueDate, setDueDate]= useState(task.dueDate);
 
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setShowModal(false);
    }, 3000);
  };

  const handleCancel = () => {
    
    form.resetFields()
    setShowModal(false);
  };
  useEffect(()=>{
      setShowModal(show)
  },[show])

  useEffect(() => {
    form.setFieldsValue({taskName:task.taskName});
    form.setFieldsValue({description:task.description});
    form.setFieldsValue({dueDate:task.dueDate});
  },[task])
  

  // const onSubmit = (values) => {
   // console.log('Success:', values);
 // };

  const onSubmitFailed = (values) => {
    console.log('Failed:', values);
  };

  const onSubmitPress = () => {
      console.log(form.values)
      const id = task.hasOwnProperty('id') ? task.id: null;
      onSubmit({id, ...form.getFieldValue()})
      form.resetFields()
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
    <Form form={form}
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
        <Input onChange={(e) => form.setFieldsValue({taskName:e.target.value})} />
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
        <Input onChange={(e) => form.setFieldsValue({description:e.target.value})}/>
      </Form.Item>
      <Form.Item label="Due Date"
                  name="dueDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter due date!',
                    },
                  ]}>
        <DatePicker onChange={(date, dateString) => form.setFieldsValue({dueDate:date})} />
      </Form.Item>
    </Form>
          
        </Modal>
          </>
  )
}

export default TaskModal;