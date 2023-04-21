import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layouts from '../layouts/index.layouts';
import ManagerPage from '../pages/manager/index.manager';
import StaffPage from '../pages/staff/index.staff';
import LandingPage from '../pages/landing/index.landing';
import LoginPage from '../pages/auth/index.auth';
import { DayoffDetails } from '../pages/staff/dayoffDetails.staff';
import ChangePassword from '../pages/auth/ChangePassword/ChangePassword';
import LogOffForm from '../pages/staff/LogOff/LogOffForm';
import GroupDetailsPage from '../pages/manager/groupDetails.manager';
import Workspaces from '../pages/admin/Workspaces';
import WorkspaceDetails from '../pages/admin/WorkspaceDetails';

const AppRouter = (req, res) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page route */}
        <Route path='/landing' exact element={<LandingPage />} />

        {/* auth route */}
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/change-password' exact element={<ChangePassword />} />
        <Route path='/' exact element={<Layouts />}>
          {/* admin route */}
          <Route path='/admin'>
            <Route path='/admin/workspaces' exact element={<Workspaces />} />
            <Route path='/admin/workspace-details' exact element={<WorkspaceDetails />} />
          </Route>

          {/* manager route */}
          <Route path='/manager'>
            <Route path='/manager' exact element={<ManagerPage />} />
            <Route path='/manager/group' exact>
              <Route path='/manager/group/details' exact element={<GroupDetailsPage />} />
            </Route>
          </Route>

          {/* staff route */}
          <Route path='/staff'>
            <Route path='/staff' exact element={<StaffPage />} />
            <Route path='/staff/log_off_form' exact element={<LogOffForm />} />
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
