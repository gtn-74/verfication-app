import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

interface PostProps {
  slug: string;
}

export default function Post({ slug }: PostProps) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{slug} - Post</title>
        <meta name="description" content={`Post: ${slug}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Post: {slug}</h1>
          <p>これは動的ルーティングの例です。</p>
          <p>ファイルパス: <code>src/pages/posts/[slug].tsx</code></p>
          <p>URL: <code>/posts/{slug}</code></p>
          <p>Router query: <code>{JSON.stringify(router.query)}</code></p>
          
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>動的ルーティングの説明</h3>
            <ul>
              <li><code>[slug].tsx</code> - 単一の動的パラメータ</li>
              <li>URLパラメータは <code>router.query.slug</code> で取得できます</li>
              <li>例: <code>/posts/hello-world</code> → <code>slug = "hello-world"</code></li>
            </ul>
          </div>
          
          <div className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Link href="/" className={styles.primary}>
              ホームに戻る
            </Link>
            <Link href="/posts/another-post" className={styles.secondary}>
              Another Post
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  
  return {
    props: {
      slug: slug as string,
    },
  };
};