import { Layout, Card, Image, Typography } from 'antd';
import DashboardImage from '../../assets/dashboard.png';
import './dashboard.css';

const { Content } = Layout;
const { Text } = Typography;

export default function Dashboard() {
  return (
    <>
      <Content
        style={{
          margin: '0 45px',
        }}
      >
        <Card title='Day Off System' bordered={true} className='card-dashboard'>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, aspernatur accusantium
            maiores quia deleniti eveniet, iure dolorum voluptatibus molestiae nisi asperiores
            nostrum minus est dolor saepe tempore, quae libero facilis veritatis doloribus! Neque ab
            iure sequi dolorem doloribus officiis nesciunt quis blanditiis aperiam ex asperiores
            veritatis, sint, expedita consectetur esse. Doloremque quod facere eligendi ad impedit
            atque neque laborum mollitia suscipit. Ea, id laboriosam veritatis rerum in nemo quis
          </Text>
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
            <Image
              preview={false}
              style={{
                margin: 'auto',
                width: '100%',
                maxWidth: '400px',
              }}
              src={DashboardImage}
            />
          </div>
        </Card>
      </Content>
    </>
  );
}
