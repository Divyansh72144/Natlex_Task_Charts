import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewMode from '../pages/viewMode'
import Home from '../pages/home'
import BasicExample from '../components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsMode from '../pages/settings'

function App() {

  return (
    
    <Router>
      <BasicExample/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewmode" element={<ViewMode />} />
        <Route path="/settings" element={<SettingsMode/>}/>
      </Routes>
    </Router>
  )
}

export default App
