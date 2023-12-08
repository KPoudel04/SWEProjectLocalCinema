import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../userContext/usercontext';
import Signin from './signin';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ name: 'testuser' }),
  })
);

describe('Signin Component', () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn(); 

  beforeEach(() => {
    fetch.mockClear();
    mockSetUser.mockClear();
    mockNavigate.mockClear();
  });

  test('allows the user to fill out the form and submit', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
          <Signin />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'password' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'testuser', password: 'password' }),
    });


  });

});
