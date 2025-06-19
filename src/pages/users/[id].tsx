import { GetStaticProps, GetStaticPaths } from 'next';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{user.name} - User Profile</title>
        <meta name="description" content={`User profile for ${user.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>User Profile</h1>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '2rem' }}>
            <h2>{user.name}</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          
          <p>これは動的ルーティングの例です（Static Generation使用）。</p>
          <p>ファイルパス: <code>src/pages/users/[id].tsx</code></p>
          <p>URL: <code>/users/{user.id}</code></p>
          
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Static Generation with Dynamic Routes</h3>
            <ul>
              <li><code>getStaticPaths</code> - 事前にビルドするパスを指定</li>
              <li><code>getStaticProps</code> - 静的データを取得</li>
              <li><code>fallback: true</code> - 未定義のパスに対してfallbackを表示</li>
            </ul>
          </div>
          
          <div className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Link href="/" className={styles.primary}>
              ホームに戻る
            </Link>
            <Link href="/users/456" className={styles.secondary}>
              Another User
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { id: '123' } },
    { params: { id: '456' } },
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id as string;
  
  const mockUsers: { [key: string]: User } = {
    '123': { id: '123', name: 'John Doe', email: 'john@example.com' },
    '456': { id: '456', name: 'Jane Smith', email: 'jane@example.com' },
  };

  const user = mockUsers[id] || { id, name: `User ${id}`, email: `user${id}@example.com` };

  return {
    props: {
      user,
    },
    revalidate: 60,
  };
};