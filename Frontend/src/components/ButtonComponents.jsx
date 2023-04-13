import React from 'react';
import { Button } from 'antd';

const ButtonComponents = () => {
  return (
    <div>
      <Button style={{ margin: '10px 0', marginLeft: '1200px' }} type='default'>
        Cancel
      </Button>
      <Button type='primary' style={{ marginLeft: 8 }}>
        Send
      </Button>
    </div>
  );
};

export default ButtonComponents;
