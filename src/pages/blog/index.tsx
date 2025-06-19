import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Blog() {
  const categories = [
    { slug: 'tech', name: 'Technology' },
    { slug: 'design', name: 'Design' },
    { slug: 'business', name: 'Business' },
  ];

  return (
    <>
      <Head>
        <title>Blog - Page Router Example</title>
        <meta name="description" content="Blog page with nested routing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Blog</h1>
          <p>これはネストしたルーティングの例です。</p>
          <p>ファイルパス: <code>src/pages/blog/index.tsx</code></p>
          <p>URL: <code>/blog</code></p>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.slug} style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>ネストしたルーティングの説明</h3>
            <ul>
              <li><code>/blog</code> - ブログのトップページ</li>
              <li><code>/blog/category/[slug]</code> - カテゴリ別ページ</li>
              <li>フォルダ構造がURLパスと対応しています</li>
            </ul>
          </div>
          
          <div className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Link href="/" className={styles.primary}>
              ホームに戻る
            </Link>
            <Link href="/blog/category/tech" className={styles.secondary}>
              Tech Category
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}