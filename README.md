# Next.js Page Router 学習プロジェクト

Next.js の Page Router の各機能を学習するためのプロジェクトです。

## 実装されている機能

### 1. 基本的なページルーティング

- `/about` - About ページ
- `/contact` - Contact ページ（フォーム付き）

### 2. 動的ルーティング

- `/posts/[slug]` - 動的な投稿ページ
- `/users/[id]` - ユーザープロフィールページ

### 3. ネストしたルーティング

- `/blog` - ブログトップページ
- `/blog/category/[slug]` - カテゴリ別ページ

### 4. API ルート

- `/api/hello` - 基本的な API エンドポイント
- `/api/users` - ユーザー一覧・作成 API
- `/api/users/[id]` - 特定ユーザーの CRUD 操作

## getServerSideProps の実装について

このプロジェクトでは、サーバーサイドレンダリング（SSR）を学習するために `getServerSideProps` を以下のページで実装しています。

### 1. Posts ページ (`/posts/[slug]`)

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  return {
    props: {
      slug: slug as string,
    },
  };
};
```

**特徴:**

- URL パラメータの `slug` を取得してプロップスとして渡す
- リクエスト毎にサーバーサイドで実行される
- 動的コンテンツに適している

### 2. Blog Category ページ (`/blog/category/[slug]`)

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  const categories: { [key: string]: any } = {
    tech: {
      slug: "tech",
      name: "Technology",
      description: "Latest technology trends and tutorials",
    },
    // ... その他のカテゴリ
  };

  const category = categories[slug as string] || {
    slug: slug as string,
    name: `Category: ${slug}`,
    description: `Posts in the ${slug} category`,
  };

  const mockPosts = [
    {
      id: "1",
      title: `Sample ${category.name} Post 1`,
      excerpt: `This is a sample post in the ${category.name} category.`,
    },
    // ... その他の投稿
  ];

  return {
    props: {
      category,
      posts: mockPosts,
    },
  };
};
```

**特徴:**

- カテゴリデータの取得とフォールバック処理
- 関連する投稿データの生成
- 複数のデータソースを組み合わせた例

## getStaticProps と getStaticPaths の実装について

User Profile ページ (`/users/[id]`) では、静的生成（SSG）を学習するために以下を実装しています：

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { id: "123" } }, { params: { id: "456" } }];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id as string;

  const mockUsers: { [key: string]: User } = {
    "123": { id: "123", name: "John Doe", email: "john@example.com" },
    "456": { id: "456", name: "Jane Smith", email: "jane@example.com" },
  };

  const user = mockUsers[id] || {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };

  return {
    props: {
      user,
    },
    revalidate: 60,
  };
};
```

**特徴:**

- `getStaticPaths` でビルド時に生成するパスを指定
- `fallback: true` で未定義のパスに対してもページを生成
- `revalidate: 60` で ISR（Incremental Static Regeneration）を有効化

## 開発環境

```bash
npm run dev
```

開発サーバーを起動して、各ページでの動作を確認できます。

## 学習ポイント

1. **ファイルベースルーティング** - ファイル構造が URL と対応
2. **動的ルーティング** - `[param]` を使った動的パラメータ
3. **データ取得方法** - SSR, SSG, CSR の違いと使い分け
4. **API ルート** - `/api` ディレクトリでのサーバー処理
5. **ネストしたルーティング** - フォルダ構造による階層的なルーティング


[キャッシュで理解する Next.js App Router のデータ取得](https://zenn.dev/tasugi/articles/d05c445bc79f09#getstaticprops)
