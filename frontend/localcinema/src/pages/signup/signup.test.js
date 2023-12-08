import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './signup';
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: () => jest.fn(),
  }));

describe('Signup Component', () => {
  test('allows the user to fill out the form and submit', async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
  });
});
