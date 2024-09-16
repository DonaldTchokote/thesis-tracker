// __tests__/ThesisStatusUpdate.integration.test.tsx
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThesisForm from '@/app/[locale]/thesis/_components/ThesisForm'; // Import your ThesisForm component
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Status, Level } from '@prisma/client';
import { JSX, ClassAttributes, TextareaHTMLAttributes, LegacyRef } from 'react';
// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock react-simplemde-editor
jest.mock('react-simplemde-editor', () => {
    const React = require('react');
    return {
      __esModule: true,
      default: React.forwardRef((props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTextAreaElement> & 
      TextareaHTMLAttributes<HTMLTextAreaElement>, ref: LegacyRef<HTMLTextAreaElement> | undefined) => 
      <textarea ref={ref} {...props} />),
    };
  });

describe('Integration Test for Updating Thesis Status in ThesisForm', () => {
    const translations = {
      selectStatus: 'Select Status',
      open: 'Open',
      inProgress: 'In Progress',
      registered: 'Registered',
      submitted: 'Submitted',
      defended: 'Defended',
      cancelled: 'Cancelled',
      closed: 'Closed',
      selectLevel: 'Select Level',
      pProject: 'P-Project',
      bachelor: 'Bachelor',
      master: 'Master',
      title: 'Title',
      description: 'Description',
      startDate: 'Start Date',
      applicationDate: 'Application Date',
      submissionDate: 'Submission Date',
      update: 'Update',
      create: 'Create',
      titleMinValidationMessage: 'Title is required',
      titleMaxValidationMessage: 'Title must be less than 255 characters',
      typeValidationMessage: 'Invalid type selected',
      descriptionMinValidationMessage: 'Description is required',
      descriptionMaxValidationMessage: 'Description must be less than 65535 characters',
    };
  
    beforeEach(() => {
      const mockPush = jest.fn();
      const mockRefresh = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        refresh: mockRefresh,
      });
    });
  
    it('should update the thesis status and reflect the changes immediately in the form', async () => {
      const mockThesis = {
        id: 2,
        title: 'Initial Thesis Title',
        description: 'Initial description for the thesis.',
        level: Level.MASTER,
        status: Status.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
        startDate: '2024-01-01',
        applicationDate: '2024-02-01',
        submitionDate: '2024-03-01',
      };
  
      // Render the ThesisForm component with the existing thesis
      render(<ThesisForm translations={translations} thesis={mockThesis} />);
  
      const statusSelect = screen.getByLabelText(translations.selectStatus);
      const submitButton = screen.getByRole('button', { name: translations.update });
  
      // Simulate user changing the thesis status
      await userEvent.selectOptions(statusSelect, [translations.defended]);
  
      // Submit the updated form
      await userEvent.click(submitButton);
  
      // Check if axios.patch was called with the correct updated data
      await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledWith('/api/thesis/' + mockThesis.id, {
        title: mockThesis.title,
        description: mockThesis.description,
        level: mockThesis.level,
        status: Status.DEFENDED, // Updated status
        startDate: mockThesis.startDate,
        applicationDate: mockThesis.applicationDate,
        submitionDate: mockThesis.submitionDate,
      }));
  
      // Check if the user is redirected to the updated thesis detail page
      await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/' + mockThesis.id));
    });
  });