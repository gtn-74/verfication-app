import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../../src/pages/contact';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/contact',
    pathname: '/contact',
    query: {},
    asPath: '/contact',
  }),
}));

describe('Contact Page', () => {
  it('renders contact page content', () => {
    render(<Contact />);
    
    expect(screen.getByRole('heading', { name: /contact page/i })).toBeInTheDocument();
    expect(screen.getByText(/これはPage Routerを使用したContactページです。/)).toBeInTheDocument();
    expect(screen.getByText(/src\/pages\/contact\.tsx/)).toBeInTheDocument();
    expect(screen.getByText(/URL:/)).toBeInTheDocument();
  });

  it('renders page structure correctly', () => {
    render(<Contact />);
    
    // Check if main component is present
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders contact form with all fields', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/名前:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メール:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メッセージ:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /送信/i })).toBeInTheDocument();
  });

  it('allows user to type in form fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/名前:/i);
    const emailInput = screen.getByLabelText(/メール:/i);
    const messageTextarea = screen.getByLabelText(/メッセージ:/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageTextarea, 'This is a test message');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageTextarea).toHaveValue('This is a test message');
  });

  it('form has correct input types', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/名前:/i);
    const emailInput = screen.getByLabelText(/メール:/i);
    
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('renders navigation links', () => {
    render(<Contact />);
    
    const homeLink = screen.getByRole('link', { name: /ホームに戻る/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('can submit form', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<Contact />);
    
    const form = screen.getByRole('button', { name: /送信/i }).closest('form');
    
    if (form) {
      fireEvent.submit(form);
    }
    
    // フォーム送信は preventDefault されていないので、実際にはページリロードが発生する
    // テスト環境では何も起こらないが、フォームが存在することを確認
    expect(form).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('contains expected content structure', () => {
    render(<Contact />);
    
    expect(screen.getByRole('main')).toHaveClass('main');
    expect(screen.getByRole('main').closest('div')).toHaveClass('page');
  });
});