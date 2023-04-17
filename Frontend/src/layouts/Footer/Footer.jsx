import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

export default function FooterDash() {
  var today = new Date(); 
  return <>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Copyright ©{today.getFullYear()} Design by Pho Thin Team
        </Footer>
  </>;
}
