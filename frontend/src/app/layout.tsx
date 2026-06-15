import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Global Software Solutions - Learn Skills. Build Careers.',
  description:
    'Premier computer training institute in Chodavaram, Andhra Pradesh. Offering courses in programming, MS Office, Tally, AutoCAD, Hardware & Networking and more.',
  keywords:
    'computer training, Chodavaram, Andhra Pradesh, DCA, PGDCA, Tally, Java, programming, hardware networking, Global Software Solutions',
  openGraph: {
    title: 'Global Software Solutions',
    description: 'Premier computer training institute in Chodavaram, Andhra Pradesh.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
