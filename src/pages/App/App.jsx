import './App.css';
import { useState } from 'react';

// Router
import { Routes, Route } from 'react-router-dom';

// Custom components
import AuthPage from '../AuthPage';
import NewOrderPage from '../NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage';
import Nav from '../../components/global/navbar';

function App() {
  const [user, setUser] = useState(true)
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
