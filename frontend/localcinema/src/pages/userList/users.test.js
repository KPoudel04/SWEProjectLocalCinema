import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Users from './users';

// Mock Axios and useNavigate
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(),
}));

describe('Users Component', () => {
  const usersData = [
    { id: 1, name: 'John Doe', role: 'Super', shifts: [{ shiftTime: 'Morning', shiftMovie: 'Inception' }] },
    { id: 2, name: 'Jane Smith', role: 'user', shifts: [{ shiftTime: 'Evening', shiftMovie: 'Interstellar' }] }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: usersData });
  });

  test('displays users after fetching data', async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
  
    await waitFor(() => {
        usersData.forEach(user => {
          const nameRegex = new RegExp(user.name, 'i');
          expect(screen.getByText(nameRegex)).toBeInTheDocument();
      
          const roles = screen.getAllByText(new RegExp(user.role, 'i'));
          expect(roles.length).toBeGreaterThan(0); // Check that the role appears at least once
      
          user.shifts.forEach(shift => {
            const shiftRegex = new RegExp(`${shift.shiftTime} - ${shift.shiftMovie}`, 'i');
            expect(screen.getByText(shiftRegex)).toBeInTheDocument();
          });
        });
      });      
    });
});  
