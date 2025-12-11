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
                <Route path="/boards/:pstSn" element={<Detail />} /> {/* :pstSn 에서 :d이 붙는 이유는 매번 달라질 수 있는 변수 자리라는 표시, 즉 동적 세그먼트!  */}
            </Routes>
        </>
    )
}

export default App
