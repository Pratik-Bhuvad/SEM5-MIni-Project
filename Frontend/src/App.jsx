import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/footer"
import Home from "./Pages/Home"
import Emission from "./Pages/Emission"
import About from "./Pages/About"
import Guidlines from "./Pages/Guidlines"
import User from "./Pages/User"

const App = () => {
  return (
    <Router >
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/check" element={<Emission />}/>
        <Route path="/guide" element={<Guidlines />}/>
        <Route path="/user" element={<User />}/>
      </Routes>
      <Footer />
    </Router>
  )
}
export default App