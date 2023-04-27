import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layouts from '../layouts/index.layouts';
import ManagerPage from '../pages/manager/index.manager';
import StaffPage from '../pages/staff/index.staff';
import LoginPage from '../pages/auth/index.auth';
import DayoffDetails from '../pages/staff/dayoffDetails.staff';
import LogOffForm from '../pages/staff/LogOff/LogOffForm';
import Workspaces from '../pages/admin/Workspaces';
import WorkspaceDetail from '../pages/admin/WorkspaceDetail/WorkspaceDetail';
import DashboardPage from '../pages/dashboard/dashboard';
import MemberDetails from '../pages/manager/memberDetail/MemberDetails';
import AccountRequest from '../pages/manager/accountRequest/AccountRequest';
import ProtectedRoute from './protectedRoute.route';
import { PageNotFound } from '../components/404';
import { PageNotAuthor } from '../components/403';
import Member from '../pages/manager/managerMember/managerMember';
import GroupDetail from '../pages/manager/groupDetail/groupDetails.manager';
import Profile from '../pages/auth/Profile/Profile';
import AccountDayoff from '../pages/manager/accountRequest/AccountDayoff';

const AppRouter = (req, res) => {
  const isLoggedIn = localStorage.getItem('access_token');
  return (
    <Router>
      <Routes path='/login'>
        {/* auth route */}
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/' exact element={<Layouts />}>
          <Route path='/dashboard' exact element={<DashboardPage />} />
          <Route path='/profile' exact element={<Profile />} />
          {/* admin route */}
          <Route path='/admin' element={<ProtectedRoute role={'Admin'} />}>
            <Route path='/admin/*' exact element={<PageNotAuthor />} />
            <Route path='/admin/workspaces' exact element={<Workspaces />} />
            <Route path='/admin/workspace-detail/:id' element={<WorkspaceDetail />} />
          </Route>

          {/* manager route */}
          <Route path='/manager' element={<ProtectedRoute role={'Manager'} />}>
            <Route path='/manager/*' exact element={<PageNotAuthor />} />
            <Route path='/manager/groups' exact element={<ManagerPage />} />
            <Route path='/manager/groups/groups-details' exact element={<GroupDetail />} />
            <Route path='/manager/day-off' exact element={<AccountDayoff />} />
            <Route path='/manager/member' exact element={<Member />} />
            <Route path='/manager/member-details' exact element={<MemberDetails />} />
            <Route path='/manager/day-off/details/:id' exact element={<DayoffDetails />} />
            <Route path='/manager/request' exact element={<AccountRequest />} />
            <Route path='/manager/request/details/:id' exact element={<DayoffDetails />} />
          </Route>

          {/* staff route */}
          <Route path='/staff' element={<ProtectedRoute role={'Staff'} />}>
            <Route path='/staff/*' exact element={<PageNotAuthor />} />
            <Route path='/staff' exact element={<StaffPage />} />
            <Route path='/staff/log_off_form' exact element={<LogOffForm />} />
            <Route path='/staff/day-off' exact element={<AccountDayoff/>}/>
            <Route path='/staff/request' exact element={<AccountRequest/>}/>
            <Route path='/staff/day-off/details/:id' exact element={<DayoffDetails />} />
            <Route path='/staff/request/details/:id' exact element={<DayoffDetails />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
