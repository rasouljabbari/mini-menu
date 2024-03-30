import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/icons/icomoon/style.css'
import './index.css'
import "./assets/fonts/Morabba/fontiran.css";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/app/store.js";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AppWrapper from "./App.jsx";

// Access the client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={true}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <AppWrapper/>
                </PersistGate>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
)
