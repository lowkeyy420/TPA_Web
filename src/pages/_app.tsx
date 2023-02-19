import RoutingGuard from "@/other/RoutingGuard";
import { AuthContextProvider } from "@/store/Authcontext";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../components/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OldEgg</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AuthContextProvider>
        <RoutingGuard>
          <Component {...pageProps} />
        </RoutingGuard>
      </AuthContextProvider>
    </>
  );
}
