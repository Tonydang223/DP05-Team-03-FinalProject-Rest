import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='153567813301-7dag213moso4o6qu8v0j496r0844jsvt.apps.googleusercontent.com'>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#583da1',
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
