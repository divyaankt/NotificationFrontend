import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/NotificationActions";
import { Row, Col, Table, Layout, Button } from 'antd';
import NotificationForm from "./NotificationForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Content } = Layout;

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Message',
        dataIndex: 'notifMessage',
        key: 'notifMessage',
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

const Notification = (props) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllNotifications()
    }, [])
    
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteNotification(id, window.alert('Deleted Successfully!!!'))
    }

    const Notifs = props.NotificationList.map((record, index) => {
        return {
            key: index+1,
            notifMessage: record.notificationText,
            startDate: record.startDate,
            endDate: record.endDate,
            userName: record.username,
            Edit: <Button icon={<EditOutlined />} onClick={()=>setCurrentId(record.id)}>Edit</Button>,
            Delete: <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)}>Delete</Button>,
        }
    })

    
    return (
        <>
            <Row>
                <Col span = {8} >
                    <Content>
                        <p>
                            <h3>Notification Form</h3>
                        </p>
                    </Content>
                    <NotificationForm {...({currentId, setCurrentId})}/>    
                </Col> 
                <Col span = {16}>
                    <Content>
                        <p>
                            <h3>List of Notifications</h3>
                        </p>
                    </Content>
                    {<Table dataSource = {Notifs} columns = {columns}/>}
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    NotificationList: state.NotificationReducer.list
})

const mapActionToProps = {
    fetchAllNotifications: actions.fetchAll,
    deleteNotification: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(Notification);
