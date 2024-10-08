import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Lib
import { QueryClientProvider, QueryClient } from 'react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
)