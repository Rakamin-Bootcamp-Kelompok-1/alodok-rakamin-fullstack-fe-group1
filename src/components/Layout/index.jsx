import { Box } from '@mui/system';
import React from 'react';
import Navbar from '../Navbar';
import './layoutstyles.css';

export default function Layout(props) {
  return (
    <div className="layout-container">
      <Navbar />
      <Box className="layout-content">{props.children}</Box>
    </div>
  );
}
