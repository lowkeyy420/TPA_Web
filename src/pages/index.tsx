import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>OldEgg</title>
        <meta name="description" content="OldEgg PC Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <main></main>
    </>
  );
}
