import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layouts from '../layouts/index.layouts';
import ManagerPage from '../pages/manager/index.manager';
import StaffPage from '../pages/staff/index.staff';
import LoginPage from '../pages/auth/index.auth';
import DayoffDetails from '../pages/staff/dayoffDetails.staff';
import ChangePassword from '../pages/auth/ChangePassword/ChangePassword';
import LogOffForm from '../pages/staff/LogOff/LogOffForm';
import Workspaces from '../pages/admin/Workspaces';
import WorkspaceDetails from '../pages/admin/WorkspaceDetails';
import AdminPage from '../pages/admin/index.admin';
import MemberDetails from '../pages/manager/memberDetail/MemberDetails';
import AccountRequest from '../pages/manager/accountRequest/AccountRequest';
import ProtectedRoute from './protectedRoute.route';
import { PageNotFound } from '../components/404';
import { PageNotAuthor } from '../components/403';

const AppRouter = (req, res) => {
  const isLoggedIn = localStorage.getItem('access_token');
  return (
    <Router>
      <Routes path='/login'>
        {/* auth route */}
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/change-password' exact element={<ChangePassword />} />

        <Route path='/' exact element={<Layouts />}>
          {/* admin route */}
          <Route path='/admin' element={<ProtectedRoute role={'Admin'} />}>
            <Route path='/admin/*' exact element={<PageNotAuthor />} />
            <Route path='/admin/workspaces' exact element={<Workspaces />} />
            <Route path='/admin/workspace-details' exact element={<WorkspaceDetails />} />
          </Route>

          {/* manager route */}
          <Route path='/manager' element={<ProtectedRoute role={'Manager'} />}>
            <Route path='/manager/*' exact element={<PageNotAuthor />} />
            <Route path='/manager/groups' exact element={<ManagerPage />} />
            <Route path='/manager/request' exact element={<AccountRequest/>}/>
            <Route path='/manager/days_off' exact element={<AdminPage />} />
            <Route path='/manager/member-details' exact element={<MemberDetails />} />
            <Route path='/manager/dayoff/details' exact element={<DayoffDetails/>}/>
          </Route>

          {/* staff route */}
          <Route path='/staff' element={<ProtectedRoute role={'Staff'} />}>
            <Route path='/staff/*' exact element={<PageNotAuthor />} />
            <Route path='/staff' exact element={<StaffPage />} />
            <Route path='/staff/log_off_form' exact element={<LogOffForm />} />
            <Route path='/staff/dayoff' exact>
              <Route path='/staff/dayoff/details' exact element={<DayoffDetails />} />
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;