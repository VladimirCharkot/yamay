import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Patrick_Hand_SC } from 'next/font/google'
import { Inter } from 'next/font/google'

const patrick = Patrick_Hand_SC({ subsets: ['latin'], weight: "400" })
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <main className={patrick.className}>
    <Component  {...pageProps} />
  </main>

}
