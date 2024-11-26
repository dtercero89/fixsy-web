import './global.css';
import { Metadata } from 'next';
import WeappedComponent from '@/components/WrappedComponent';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { LoadingProvider } from '@/lib/context/LoadingContext';
import ToastifyProvider from '@/components/ToastifyProvider';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Fixsy',
    default: 'Fixsy',
  },
  description: 'Platform to connect users with local service providers',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
};

export const viewport = {
  viewport: 'width=device-width, initial-scale=1',
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
          <head>
            <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
            <link rel="shortcut icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
          </head>

      <body className={`bg-[hsl(var(--muted)/.4)] overflow-hidden`}>
        <LoadingProvider>
          <SessionProvider session={session}>
          <ToastifyProvider />
            <WeappedComponent>{children}</WeappedComponent>
          </SessionProvider>
          </LoadingProvider>
      </body>
    </html>
  );
}
