import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentsForm from '@/app/[locale]/students/_components/StudentsForm'; 
import axios from 'axios';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StudentsForm Component', () => {
    const translations = {
      firstname: 'First Name',
      lastname: 'Last Name',
      matriculation: 'Matriculation Number',
      email: 'Email',
      update: 'Update',
      create: 'Create',
      firstnameMinValidationMessage: 'Vorname ist erforderlich',
      firstnameMaxValidationMessage: 'Vorname darf maximal 50 Zeichen lang sein',
      lastnameMinValidationMessage: 'Nachname ist erforderlich',
      lastnameMaxValidationMessage: 'Nachname darf maximal 50 Zeichen lang sein',
      matriculationMinValidationMessage: 'Matrikelnummer muss mindestens 8 Zeichen lang sein',
      matriculationMaxValidationMessage: 'Matrikelnummer darf maximal 10 Zeichen lang sein',
      matriculationRefineValidationMessage: 'Matrikelnummer darf nur Ziffern enthalten',
      emailValidationMessage: 'E-Mail ist ungültig',
    };
  
    it('should call axios.post when submitting a new student', async () => {
      render(<StudentsForm translations={translations} />);
  
      const firstNameInput = screen.getByPlaceholderText(translations.firstname);
      const lastNameInput = screen.getByPlaceholderText(translations.lastname);
      const matriculationInput = screen.getByPlaceholderText(translations.matriculation);
      const emailInput = screen.getByPlaceholderText(translations.email);
      const submitButton = screen.getByRole('button', { name: /Create/i });
  
      await userEvent.type(firstNameInput, 'John');
      await userEvent.type(lastNameInput, 'Doe');
      await userEvent.type(matriculationInput, '12345678');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.click(submitButton);
  
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/students', {
        firstName: 'John',
        lastName: 'Doe',
        matrikel: '12345678',
        email: 'john.doe@example.com',
      });
    });
  
    it('should call axios.patch when updating an existing student', async () => {
      const mockStudent = {
        id: '1',
        firstName: 'Jane',
        lastName: 'Doe',
        matrikel: '87654321',
        email: 'jane.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      render(<StudentsForm translations={translations} student={mockStudent} />);
  
      const submitButton = screen.getByRole('button', { name: /Update/i });
      await userEvent.click(submitButton);
  
      expect(mockedAxios.patch).toHaveBeenCalledWith('/api/students/' + mockStudent.id, {
        firstName: mockStudent.firstName,
        lastName: mockStudent.lastName,
        matrikel: mockStudent.matrikel,
        email: mockStudent.email,
      });
    });
  });