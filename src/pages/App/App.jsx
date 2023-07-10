import './App.css';
import { useState } from 'react';

// Router
import { Routes, Route } from 'react-router-dom';
// Token
import { getUserFromToken } from '../../utilities/users-service';

// Custom components
import AuthPage from '../Auth/AuthPage';
import NewOrderPage from '../NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage';
import Nav from '../../components/global/Nav/Nav';

function App() {
  const [user, setUser] = useState(getUserFromToken())
  return (
    <main className="App">
      {user ? 
      <>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
      </>
        
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
