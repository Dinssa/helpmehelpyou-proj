import './App.css';
import { useState } from 'react';

// Router
import { Routes, Route } from 'react-router-dom';
// Token
import { getUserFromToken } from '../../utilities/users-service';

// Custom components
import AuthPage from '../Auth/AuthPage';
import Nav from '../../components/global/Nav/Nav';
import HomePage from '../Home/HomePage';
import ProjectPage from '../Project/ProjectPage';
import TemplatePage from '../Template/TemplatePage';

function App() {
  const [user, setUser] = useState(getUserFromToken())
  return (
    <main className="App">
      <Nav user={user} setUser={setUser} />
      {user ? 
      <>
        <Routes>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/templates" element={<TemplatePage />} />
        </Routes>
      </>
        :
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        </Routes>
      }
    </main>
  );
}

export default App;
