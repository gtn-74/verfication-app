import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Page Router Example</title>
        <meta name="description" content="Contact page example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Contact Page</h1>
          <p>これはPage Routerを使用したContactページです。</p>
          <p>ファイルパス: <code>src/pages/contact.tsx</code></p>
          <p>URL: <code>/contact</code></p>
          
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name">名前:</label>
              <input type="text" id="name" name="name" style={{ marginLeft: '10px', padding: '5px' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">メール:</label>
              <input type="email" id="email" name="email" style={{ marginLeft: '10px', padding: '5px' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="message">メッセージ:</label>
              <textarea id="message" name="message" rows={4} style={{ marginLeft: '10px', padding: '5px', display: 'block', marginTop: '5px' }} />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
              送信
            </button>
          </form>
          
          <div className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Link href="/" className={styles.primary}>
              ホームに戻る
            </Link>
            <Link href="/about" className={styles.secondary}>
              About
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}