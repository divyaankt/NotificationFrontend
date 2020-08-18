import React from 'react';
import '../App.css';
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col
} from 'antd';

const NotificationForm = () => {
    const [form] = Form.useForm();
    return (
        <Form className="form-class">
            <Row>
                <Col span={24}>
                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="StartDate"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="EndDate"
                        label="End Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default NotificationForm
