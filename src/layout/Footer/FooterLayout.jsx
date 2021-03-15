import React from 'react';
import { Footer } from '@axa-fr/react-toolkit-all';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import './FooterLayout.css';

const FooterLayout = () => (
  <Footer icon={logo} copyright={'© 2021 AXA ACS02'} />
);

export default FooterLayout;
