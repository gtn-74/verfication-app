import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

interface CategoryProps {
  category: {
    slug: string;
    name: string;
    description: string;
  };
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
  }>;
}

export default function Category({ category, posts }: CategoryProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{category.name} - Blog Category</title>
        <meta name="description" content={category.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <nav style={{ marginBottom: '2rem' }}>
            <Link href="/blog">← Blog</Link>
          </nav>
          
          <h1>{category.name} Category</h1>
          <p>{category.description}</p>
          <p>ファイルパス: <code>src/pages/blog/category/[slug].tsx</code></p>
          <p>URL: <code>/blog/category/{category.slug}</code></p>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Posts in this category</h2>
            {posts.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {posts.map((post) => (
                  <div key={post.id} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>この カテゴリにはまだ投稿がありません。</p>
            )}
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>ネストした動的ルーティング</h3>
            <ul>
              <li>パス: <code>/blog/category/[slug]</code></li>
              <li>3層のネストした構造</li>
              <li>動的パラメータ: <code>{JSON.stringify(router.query)}</code></li>
            </ul>
          </div>
          
          <div className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Link href="/blog" className={styles.primary}>
              Blog に戻る
            </Link>
            <Link href="/blog/category/design" className={styles.secondary}>
              Design Category
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  
  const categories: { [key: string]: any } = {
    tech: {
      slug: 'tech',
      name: 'Technology',
      description: 'Latest technology trends and tutorials',
    },
    design: {
      slug: 'design',
      name: 'Design',
      description: 'UI/UX design tips and inspiration',
    },
    business: {
      slug: 'business',
      name: 'Business',
      description: 'Business strategies and insights',
    },
  };

  const category = categories[slug as string] || {
    slug: slug as string,
    name: `Category: ${slug}`,
    description: `Posts in the ${slug} category`,
  };

  const mockPosts = [
    {
      id: '1',
      title: `Sample ${category.name} Post 1`,
      excerpt: `This is a sample post in the ${category.name} category.`,
    },
    {
      id: '2',
      title: `Sample ${category.name} Post 2`,
      excerpt: `Another sample post about ${category.name}.`,
    },
  ];

  return {
    props: {
      category,
      posts: mockPosts,
    },
  };
};