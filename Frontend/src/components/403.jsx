import { Button, Result } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const PageNotAuthor = () => {
  const navigate = useNavigate();

  // const { userRole } = useSelector((state) => state.auth);
  const userRole = localStorage.getItem('user_role').toLowerCase();
  console.log('🚀 ~ file: 404.jsx:5 ~ PageNotFound ~ userRole:', userRole);
  // const path = userRole.toLowerCase();
  // console.log("🚀 ~ file: 403.jsx:11 ~ PageNotAuthor ~ path:", path)

  const handleRedirect = () => {
    navigate(`/${userRole}`);
  };
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button type='primary' onClick={() => handleRedirect()}>
          Back to {userRole}
        </Button>
      }
      style={{ width: '100%' }}
    />
  );
};
