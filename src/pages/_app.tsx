import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { EntriesProvider } from 'context/entries';
import { UIProvider } from 'context/ui';
import { darkTheme } from 'themes';
import '@/styles/global.css';

function App({ Component, pageProps }: AppProps) {
  // Comentario

  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default App;
