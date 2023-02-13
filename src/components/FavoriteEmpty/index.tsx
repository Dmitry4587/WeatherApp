import React from 'react';
import { Typography, Box } from '@mui/material';

const FavoriteEmpty = ({ text, icon }: { text: string; icon: React.ReactNode }) => {
  return (
    <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
        <Typography
          sx={{
            mt: '5px',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'var(--primary)',
          }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default FavoriteEmpty;
