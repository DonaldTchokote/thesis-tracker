// __tests__/ThesisFormUpdate.integration.test.tsx
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThesisForm from '@/app/[locale]/thesis/_components/ThesisForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Status, Level } from '@prisma/client';
import { JSX, ClassAttributes, TextareaHTMLAttributes, LegacyRef } from 'react';
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

describe('ThesisForm Update Integration Tests', () => {
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

  it('should update an existing thesis with new data and redirect to its detail page', async () => {
    const mockThesis = {
      id: 3,
      title: 'Thesis for Update',
      description: 'This is the original description.',
      level: Level.BACHELOR,
      status: Status.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: '2024-01-01',
      applicationDate: '2024-02-01',
      submitionDate: '2024-03-01',
    };

    render(<ThesisForm translations={translations} thesis={mockThesis} />);

    const titleInput = screen.getByPlaceholderText(translations.title);
    const descriptionInput = screen.getByPlaceholderText(translations.description);
    const submitButton = screen.getByRole('button', { name: translations.update });

    // Simulate user updating the thesis fields
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Thesis Title');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'This is the updated description.');

    await userEvent.click(submitButton);

    // Check if axios.patch was called with the updated data
    await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledWith('/api/thesis/' + mockThesis.id, {
      title: 'Updated Thesis Title',
      description: 'This is the updated description.',
      level: mockThesis.level,
      status: mockThesis.status,
      startDate: mockThesis.startDate,
      applicationDate: mockThesis.applicationDate,
      submitionDate: mockThesis.submitionDate,
    }));

    // Check if the user is redirected to the updated thesis detail page
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/' + mockThesis.id));
  });

  it('should display validation errors when trying to update with invalid data', async () => {
    const mockThesis = {
      id: 3,
      title: 'Thesis for Update',
      description: 'This is the original description.',
      level: Level.BACHELOR,
      status: Status.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: '2024-01-01',
      applicationDate: '2024-02-01',
      submitionDate: '2024-03-01',
    };

    render(<ThesisForm translations={translations} thesis={mockThesis} />);

    const titleInput = screen.getByPlaceholderText(translations.title);
    const descriptionInput = screen.getByPlaceholderText(translations.description);
    const submitButton = screen.getByRole('button', { name: translations.update });

    // Simulate user input clearing the title field
    await userEvent.clear(titleInput);
    await userEvent.type(descriptionInput, 'Updated description.');

    await userEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() =>
      expect(screen.getByText(translations.titleMinValidationMessage)).toBeInTheDocument()
    );
  });

  it('should handle server errors gracefully when updating a thesis', async () => {
    const mockThesis = {
      id: 4,
      title: 'Thesis to Trigger Server Error',
      description: 'Description that will cause an error.',
      level: Level.MASTER,
      status: Status.DEFENDED,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: '2024-05-01',
      applicationDate: '2024-06-01',
      submitionDate: '2024-07-01',
    };

    mockedAxios.patch.mockRejectedValueOnce(new Error('Server Error'));

    render(<ThesisForm translations={translations} thesis={mockThesis} />);

    const submitButton = screen.getByRole('button', { name: translations.update });
    await userEvent.click(submitButton);
  });
});
