import { Box, Breadcrumbs, Paper } from '@mui/material';
import React from 'react';
import image from '../../../src/imagenes/spartaInicio.jpeg'

console.log(image);
console.log('palmero');

const Inicio = () => {
    return (
        <Box
        component="img"
        sx={{
          marginTop:10,
          height: 500,
          width: 500,
          maxHeight: { xs: 500, md: 500 },
          maxWidth: { xs: 500, md: 500 },
        }}
       src={image}
      />

    );
}

export default Inicio;
