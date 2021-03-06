import React, { useState, useEffect } from 'react';
import '../App.css';
import FormFunctions from "./FormFunctions";
import { connect } from "react-redux";
import * as actions from "../actions/NotificationActions";
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col
} from 'antd';

const { TextArea } = Input;

const initialFieldValues = {
    notificationText:'',
    username:'',
    startDate:'',
    endDate:''
}

const NotificationForm = ({...props}) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');

    //The validation function written here is buggy
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('notificationText' in fieldValues)
            temp.notificationText = fieldValues.notificationText ? "" : "This field is required."
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "This field is required."
        if ('endDate' in fieldValues)
            temp.endDate = fieldValues.endDate ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = FormFunctions(initialFieldValues, validate, props.setCurrentId)

    //Reset function provided by built-in Form component of Ant-Design
    const onReset = () => {
        form.resetFields();
    };

    const onSuccess = (notificationText) => {
        onReset();
        //resetForm();
        window.alert(notificationText)
    }
    //For correct validate and edit function, the commented-out if-else statement should be used 
    const handleFinish = (values) => {
        console.log(values)
        console.log(props.currentId)
        //e.preventDefault doesn't work for some reason, tried resolving it
        //e.preventDefault()
        //window.alert('Validation Successful')
        if (props.currentId == 0)
            props.createNotification(values, onSuccess('Notification Created'))
        else
            props.updateNotification(props.currentId, values, onSuccess('Notification Updated'))
        {/*if (validate()) {
            const onSuccess = () => {
                onReset()
            }
            if (props.currentId == 0)
                props.createNotification(values, onSuccess)
            else
                props.updateNotification(props.currentId, values, onSuccess)
        } else {
            window.alert('Could not perform operation:(')
        }*/}
    }

    //Edit function
    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.NotificationList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <Form form={form} className="form-class" layout={formLayout} onFinish={values=>handleFinish(values)}>
            <Row>
                <Col span={24}>
                    <Form.Item
                        name="notificationText"
                        label="Message"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Enter Notification Text"
                            value = {values.notificationText}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Name of Person to be notified"
                            value = {values.username}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Starting Date"
                            value = {values.startDate}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Ending Date"
                            value = {values.endDate}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

const mapStateToProps = state => ({
    NotificationList: state.NotificationReducer.list
})

const mapActionToProps = {
    createNotification: actions.create,
    updateNotification: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(NotificationForm);
