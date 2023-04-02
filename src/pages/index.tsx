import { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Layout } from 'components/layouts/';
import { EntryList } from 'components/ui';
import NewEntry from 'components/ui/NewEntry';

const HomePage: NextPage = () => (
  <Layout title='Home - OpenJira'>
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='Pendientes'></CardHeader>
          <CardContent>
            <NewEntry />
            <EntryList status='pending'></EntryList>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='En Progreso'></CardHeader>
          <CardContent>
            <EntryList status='in-progress'></EntryList>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='Completadas'></CardHeader>
          <CardContent>
            <EntryList status='finished'></EntryList>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Layout>
);

export default HomePage;
