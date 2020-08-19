import React, { useState, useEffect } from 'react';
import '../App.css';
import { connect } from "react-redux";
import * as actions from "../actions/NotificationActions";
import { Row, Col, Table, Layout, Button } from 'antd';
import NotificationForm from "./NotificationForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
    {
        title: 'StartDate',
        dataIndex: 'startDate',
        key: 'startDate',
    },
    {
        title: 'EndDate',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: 'Username',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'Edit',
        dataIndex: 'Edit',
        key: 'Edit',
    },
    {
        title: 'Delete',
        dataIndex: 'Delete',
        key: 'Delete',
    }
];

//This component displays the list of Notifications on the RHS
const Notification = (props) => {
    const [currentId, setCurrentId] = useState(0) //Used for Edit and Delete Functionality

    useEffect(() => {
        props.fetchAllNotifications()
    }, [])
    
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteNotification(id, window.alert('Deleted Successfully!!!'))
    }

    //Each Row in the List of Notifications
    const Notifs = props.NotificationList.map((record, index) => {
        return {
            key: index+1, //Increment index by 1 as it is 0-based
            message: record.notificationText,
            startDate: record.startDate,
            endDate: record.endDate,
            userName: record.username,
            Edit: <Button icon={<EditOutlined />} onClick={()=>setCurrentId(record.id)}>Edit</Button>,
            Delete: <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)}>Delete</Button>,
        }
    })

    //As seen below, I have used Ant-Design's Grid Layout system for dividing the page into 2 sections
    return (
        <>
            <Row>
                <Col span = {8} >
                    <Content>
                        <p>
                            <h3 style={{padding: "10px"}}>Notification Form</h3>
                        </p>
                    </Content>
                    <NotificationForm {...({currentId, setCurrentId})}/>    
                </Col> 
                <Col span = {16}>
                    <Content>
                        <p>
                            <h3 style={{padding: "10px"}}>List of Notifications</h3>
                        </p>
                    </Content>
                    <div className = "list-class">
                        {<Table dataSource = {Notifs} columns = {columns}/>}
                    </div>
                </Col>
            </Row>
        </>
    )
}

//Important functions for Redux
const mapStateToProps = state => ({
    NotificationList: state.NotificationReducer.list
})

const mapActionToProps = {
    fetchAllNotifications: actions.fetchAll,
    deleteNotification: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(Notification);
