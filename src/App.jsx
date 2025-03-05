import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard"; 
import Note from "./pages/Note";
import './App.css'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/" element={<Note />} />
          <Route path="/note/:id" element={<Note />} />
        </Route>
      </Routes>

      <span className="app-version">Version: {import.meta.env.VITE_APP_VERSION}</span>
    </>
  );
}

export default App;