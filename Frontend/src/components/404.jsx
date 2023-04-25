import { Button, Result } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/userSlice';

export const PageNotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { userRole } = useSelector((state) => state.auth.user.role);
  // console.log('🚀 ~ file: 404.jsx:5 ~ PageNotFound ~ userRole:', userRole);
  // const path = userRole.toLowerCase();

  const handleRedirect = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => handleRedirect()}>
          Back Home
        </Button>
      }
      style={{ width: '100%' }}
    />
  );
};
