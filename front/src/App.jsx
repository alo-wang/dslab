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
                <Route path="/boards" element={<List />} />
                <Route path="/boards/:pstSn" element={<Detail />} />
            </Routes>
        </>
    )
}

export default App
