import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LearningSelector from './components/LearningSelector';
import ShnaimMikra from './components/ShnaimMikra';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/select-program" element={<LearningSelector />} />
          <Route path="/shnaim-mikra" element={<ShnaimMikra />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


