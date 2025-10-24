import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Components/Create';
import Form from './Components/Form';
import Resume from './Components/Resume';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/create" element={<Create />} />
        <Route path="/form" element={<Form />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resume/:id" element={<Resume />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
