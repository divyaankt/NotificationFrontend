import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Notification from "./components/Notification";

function App() {
  return (
    <Provider store={store}>
      <Notification />
    </Provider>
  );
}

export default App;
