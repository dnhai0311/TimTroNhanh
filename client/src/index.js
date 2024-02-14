import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import reduxStore from './redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

const { store, persistor } = reduxStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    // </React.StrictMode>
);
