import UserProvider from '@/components/user-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { caustenBold, caustenLight, caustenRegular, kanit, nexaBlack, nexaLight, nexaRegular } from './fonts';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://app.aethernum.club'),
  title: 'aethernum',
  description:
    'aethernum is a fully decentralized, Ethereum-based ecosystem designed to empower users through secure staking and transparent rewards. With a trustless smart contract system, aethernum enables seamless staking, high-yield APY, and a sustainable financial model backed by blockchain technology.',
  keywords: ['aethernum', 'aethernum', 'login', 'sign up', 'join us'],
  authors: [{ name: 'aethernum' }],
  openGraph: {
    title: 'aethernum',
    siteName: 'app.aethernum',
    url: 'https://www.aethernum.club/',
    description:
      'aethernum is a fully decentralized, Ethereum-based ecosystem designed to empower users through secure staking and transparent rewards. With a trustless smart contract system, aethernum enables seamless staking, high-yield APY, and a sustainable financial model backed by blockchain technology.',
    images: [
      {
        url: '/images/logo.svg',
        width: '529',
        height: '114',
      },
    ],
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'shortcut icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon.ico',
    },
  ],
  robots: {
    follow: true,
  },
  twitter: {
    title: 'aethernum',
    description:
      'aethernum is a fully decentralized, Ethereum-based ecosystem designed to empower users through secure staking and transparent rewards. With a trustless smart contract system, aethernum enables seamless staking, high-yield APY, and a sustainable financial model backed by blockchain technology.',
    images: [
      {
        url: '/images/logo.png',
        width: '420',
        height: '420',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caustenRegular.variable} ${caustenLight.variable} ${caustenBold.variable} ${kanit.variable} ${nexaLight.variable} ${nexaRegular.variable} ${nexaBlack.variable} ${inter.variable} font-sans`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="32x32" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="aetherum" />
        <meta name="theme-color" content="#FFAA21" />
        <meta name="msapplication-TileColor" content="#FFAA21" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        ></meta>
      </head>
      <body suppressHydrationWarning={true} className="bg-primary font-causten">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <UserProvider />
        {children}
      </body>
    </html>
  );
}
