import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/index';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

describe('Home Page', () => {
  it('renders home page content', () => {
    render(<Home />);
    
    expect(screen.getByRole('heading', { name: /page router example/i })).toBeInTheDocument();
    expect(screen.getByText(/Next\.jsのPage Routerの学習用プロジェクトです。/)).toBeInTheDocument();
  });

  it('renders main content correctly', () => {
    render(<Home />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders all navigation sections', () => {
    render(<Home />);
    
    // 基本的なページルーティング
    expect(screen.getByText(/基本的なページルーティング:/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    
    // 動的ルーティング
    expect(screen.getByText(/動的ルーティング:/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /posts/i })).toHaveAttribute('href', '/posts/hello-world');
    expect(screen.getByRole('link', { name: /user profile/i })).toHaveAttribute('href', '/users/123');
    
    // ネストしたルーティング
    expect(screen.getByText(/ネストしたルーティング:/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog category/i })).toHaveAttribute('href', '/blog/category/tech');
    
    // APIルート
    expect(screen.getByText(/APIルート:/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /api hello/i })).toHaveAttribute('href', '/api/hello');
  });

  it('renders Next.js logo', () => {
    render(<Home />);
    
    const logo = screen.getByAltText(/next\.js logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://nextjs.org/icons/next.svg');
  });

  it('renders footer links', () => {
    render(<Home />);
    
    const learnLink = screen.getByRole('link', { name: /learn/i });
    const examplesLink = screen.getByRole('link', { name: /examples/i });
    const nextjsLink = screen.getByRole('link', { name: /go to nextjs\.org/i });
    
    expect(learnLink).toBeInTheDocument();
    expect(examplesLink).toBeInTheDocument();
    expect(nextjsLink).toBeInTheDocument();
    
    expect(learnLink).toHaveAttribute('target', '_blank');
    expect(examplesLink).toHaveAttribute('target', '_blank');
    expect(nextjsLink).toHaveAttribute('target', '_blank');
  });

  // Meta tags and document title are handled by Next.js Head component
  // In production, these would be tested with E2E tools like Playwright

  it('applies correct CSS classes', () => {
    render(<Home />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('main');
    
    const pageDiv = mainElement.closest('div');
    expect(pageDiv).toHaveClass('page');
  });
});