import { Link, Route, Routes } from 'react-router-dom' 
import List from "./pages/BoardList";
import Detail from "./pages/BoardDetail";
import Headers from './components/Headers';
import './App.css'

function App() {
    return (
        <>
            <Headers></Headers>
            <Routes>
                <Route path="/list" element={<List />}></Route>
                <Route path="/detail" element={<Detail />}></Route>
            </Routes>
        </>
    )
}

export default App
