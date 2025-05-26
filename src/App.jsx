
import { BrowserRouter, Navigate, Routes, Route, } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {


  return (
    <BrowserRouter>
      {/* globalContext Provider wrapper */}
      <GlobalProvider>

        <Routes >
          {/* defaultLayout Wrapper */}
          <Route element={<DefaultLayout />}>
            {/* rotte */}
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks" element={<Navigate to="/" replace />} /> //* rendere pulito l'url
            <Route path="/add" element={<AddTask />} />
          </Route>
        </Routes>

      </GlobalProvider>

    </BrowserRouter>
  )
}

export default App
