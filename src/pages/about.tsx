import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About - Page Router Example</title>
        <meta name="description" content="About page example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>About Page</h1>
          <p>これはPage Routerを使用したAboutページです。</p>
          <p>ファイルパス: <code>src/pages/about.tsx</code></p>
          <p>URL: <code>/about</code></p>
          
          <div className={styles.ctas}>
            <Link href="/" className={styles.primary}>
              ホームに戻る
            </Link>
            <Link href="/contact" className={styles.secondary}>
              Contact
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}