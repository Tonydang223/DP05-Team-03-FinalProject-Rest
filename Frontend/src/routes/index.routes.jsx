import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layouts from '../layouts/index.layouts';
import AdminPage from '../pages/admin/index.admin';
import ManagerPage from '../pages/manager/index.manager';
import StaffPage from '../pages/staff/index.staff';
import LandingPage from '../pages/landing/index.landing';
import LoginPage from '../pages/auth/index.auth';
import { DayoffDetails } from '../pages/staff/dayoffDetails.staff';

const AppRouter = (req, res) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page route */}
        <Route path='/landing' exact element={<LandingPage />} />

        {/* auth route */}
        <Route path='/login' exact element={<LoginPage />} />

        <Route path='/' exact element={<Layouts />}>
          {/* admin route */}
          <Route path='/admin'>
            <Route path='/admin' exact element={<AdminPage />} />
          </Route>

          {/* manager route */}
          <Route path='/manager'>
            <Route path='/manager' exact element={<ManagerPage />} />
          </Route>

          {/* staff route */}
          <Route path='/staff'>
            <Route path='/staff' exact element={<StaffPage />} />
            <Route path='/staff/dayoff' exact>
              <Route path='/staff/dayoff/details' exact element={<DayoffDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
