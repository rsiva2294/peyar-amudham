import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

describe('App Canary Test', () => {
  it('renders the header title', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    const titleElement = screen.getByText(/PEYAR AMUDHAM/i);
    expect(titleElement).toBeDefined();
  });
});
