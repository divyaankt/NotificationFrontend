import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Notification from "./components/Notification";
import { Layout } from 'antd';

const { Content } = Layout;


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Content className="content-class">
          <div className="notification-class">
            <Notification />
          </div>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
