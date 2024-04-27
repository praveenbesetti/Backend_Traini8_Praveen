import logo from './logo.svg';
import './App.css';
import TrainingCenter from './components/registationPage';
import { Route, Routes } from 'react-router-dom';
import CodePage from './components/code';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TrainingCenter />}> </Route>
        <Route path="/code/:generatedString" element={<CodePage />} />
      
     </Routes> 
    </div>
  );
}

export default App;
