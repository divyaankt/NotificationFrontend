import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/NotificationActions";
import { Row, Col, Table, Layout } from 'antd';
import NotificationForm from "./NotificationForm";

const { Content } = Layout;

const columns = [
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
    }
];

const Notification = (props) => {

    
    const Notifs = props.NotificationList.map((record, index) => {
        return {
            key: index,
            notifMessage: record.notificationText,
            startDate: record.startDate,
            endDate: record.endDate,
            userName: record.username
        }
    })

    useEffect(()=>{
        props.fetchAllNotifications()
    },[])
    return (
        <>
            <Row>
                <Col span = {12} >
                    <Content>
                        <p>Notification Form</p>
                    </Content>
                    <NotificationForm/>    
                </Col> 
                <Col span = {12}>
                    <Content>
                        <p>List of Notification</p>
                    </Content>
                    {<Table dataSource = {Notifs} columns = {columns}/>}
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    return {
        NotificationList: state.NotificationReducer.list
    }
}

const mapActionToProps = {
    fetchAllNotifications: actions.fetchAll
}
export default connect(mapStateToProps, mapActionToProps)(Notification);
