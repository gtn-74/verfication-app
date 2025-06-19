import { render, screen } from '@testing-library/react';
import About from '../../src/pages/about';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/about',
    pathname: '/about',
    query: {},
    asPath: '/about',
  }),
}));

describe('About Page', () => {
  it('renders about page content', () => {
    render(<About />);
    
    expect(screen.getByRole('heading', { name: /about page/i })).toBeInTheDocument();
    expect(screen.getByText(/これはPage Routerを使用したAboutページです。/)).toBeInTheDocument();
    expect(screen.getByText(/src\/pages\/about\.tsx/)).toBeInTheDocument();
    expect(screen.getByText(/URL:/)).toBeInTheDocument();
  });

  it('renders page structure correctly', () => {
    render(<About />);
    
    // Check if Head component is present (title will be handled by Next.js in real app)
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<About />);
    
    const homeLink = screen.getByRole('link', { name: /ホームに戻る/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  // Note: Meta tags and document title are handled by Next.js Head component
  // In a real application, these would be tested differently or with tools like Playwright
  it('contains expected content structure', () => {
    render(<About />);
    
    expect(screen.getByRole('main')).toHaveClass('main');
    expect(screen.getByRole('main').closest('div')).toHaveClass('page');
  });
});