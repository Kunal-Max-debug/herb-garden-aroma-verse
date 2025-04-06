
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render without StrictMode wrapping the entire app
// This avoids double-rendering issues with React Query
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
