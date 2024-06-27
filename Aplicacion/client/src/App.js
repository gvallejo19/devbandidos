import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './utils/App.css';
import LoginComponent from './pages/LoginComponent';
import MenuComponent from './pages/MenuComponent';
import ManagementUserComponent from './pages/ManagementUserComponent';
import ProfileComponent from './pages/ProfileComponent';
import InventoryComponent from './pages/InventoryComponent';
import ReservationComponent from './pages/ReservationComponent';
import ReservationHistoryComponent from './pages/ReservationHistoryComponent';
import LaboratoriesComponent from './pages/LaboratoriesComponent';
import EquipmentSpacesComponent from './pages/EquipmentSpacesComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PasswordResetComponent from './pages/PasswordResetComponent';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<LoginComponent />} />
            <Route path='/menu' element={<ProtectedRoute element={<MenuComponent />} />} />
            <Route path='/management-user' element={<ProtectedRoute element={<ManagementUserComponent />} />} />
            <Route path='/profile' element={<ProtectedRoute element={<ProfileComponent />} />} />
            <Route path='/inventory' element={<ProtectedRoute element={<InventoryComponent />} />} />
            <Route path='/reservations' element={<ProtectedRoute element={<ReservationComponent />} />} />
            <Route path='/reservation-history' element={<ProtectedRoute element={<ReservationHistoryComponent />} />} />
            <Route path='/laboratories' element={<ProtectedRoute element={<LaboratoriesComponent />} />} />
            <Route path='/equipment-spaces' element={<ProtectedRoute element={<EquipmentSpacesComponent />} />} />
            <Route path='/password-reset' element={<PasswordResetComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
