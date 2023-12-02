import { Routes, Route } from "react-router-dom"
import Home from "../Pages/Home"
import SecondPage from "../Pages/SecondPage"

const MainRoute = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/secondPage" element={<SecondPage/>} />
     </Routes>
    </>
  )
}

export default MainRoute