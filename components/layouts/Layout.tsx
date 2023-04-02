import { FunctionComponent } from 'react';
import Head from 'next/head';

import { Box } from '@mui/material';

import { SideBar, Navbar } from 'components/ui';

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout: FunctionComponent<Props> = ({
  title = 'OpenJira',
  children,
}) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <SideBar />

      <Box sx={{ padding: '10px 20px' }}>{children}</Box>
    </Box>
  );
};
