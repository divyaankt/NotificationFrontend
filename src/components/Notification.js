import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/NotificationActions";

const Notification = (props) => {

    useEffect(()=>{
        props.fetchAllNotifications()
    },[])
    return (
        <div>
            From Notification
        </div>
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
