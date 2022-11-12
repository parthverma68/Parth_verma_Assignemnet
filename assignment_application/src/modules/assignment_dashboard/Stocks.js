import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TableApp from '../app_structural_module/app_components/Table_assignment';
import { Grid } from '@mui/material';

export default function SimpleContainer() {
 return (
  <Grid xl={12}>

   <TableApp />
  </Grid>
 );
}