
import { BrowserRouter, Navigate, Routes, Route, } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {


  return (
    <BrowserRouter>
      <Routes >
        <Route element={<DefaultLayout />}>

          <Route path="/" element={<TaskList />} />
          <Route path="/tasks" element={<Navigate to="/" replace />} /> //* rendere pulito l'url
          <Route path="/add" element={<AddTask />} />


        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
