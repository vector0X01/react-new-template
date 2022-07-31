import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Dashboard = () => {
  return (
    <div style={{ marginTop: '45px' }}>
      <Box
        className="dashboard-container"
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container class="dashboard-inner" maxWidth={false}>
          <Grid container spacing={3} rowSpacing={2}></Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
