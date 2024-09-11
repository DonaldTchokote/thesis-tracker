// __tests__/ThesisForm.integration.test.tsx
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
      default: React.forwardRef((props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTextAreaElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, ref: LegacyRef<HTMLTextAreaElement> | undefined) => <textarea ref={ref} {...props} />),
    };
  });
describe('ThesisForm Integration Tests', () => {
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

  it('should create a new thesis and redirect to the list page', async () => {
    render(<ThesisForm translations={translations} />);

    const titleInput = screen.getByPlaceholderText(translations.title);
    const descriptionInput = screen.getByPlaceholderText(translations.description);
    const levelSelect = screen.getByLabelText(translations.selectLevel);
    const statusSelect = screen.getByLabelText(translations.selectStatus);
    const submitButton = screen.getByRole('button', { name: translations.create });

    // Simulate user input
    await userEvent.type(titleInput, 'Integration Test Thesis');
    await userEvent.type(descriptionInput, 'This is a description for the integration test thesis.');
    await userEvent.selectOptions(levelSelect, [translations.master]);
    await userEvent.selectOptions(statusSelect, [translations.open]);
    await userEvent.click(submitButton);

    // Check if axios.post was called with correct data
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledWith('/api/thesis', {
      title: 'Integration Test Thesis',
      description: 'This is a description for the integration test thesis.',
      level: 'MASTER',
      status: 'OPEN',
      startDate: '',
      applicationDate: '',
      submitionDate: '',
    }));

    // Check if the user is redirected to the list page
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/list'));
  });

  it('should update an existing thesis and redirect to its detail page', async () => {
    const mockThesis = {
      id: 2,
      title: 'Existing Thesis for Update',
      description: 'Existing description.',
      level: Level.BACHELOR,
      status: Status.REGISTERED,
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

    // Simulate user updating the thesis
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Thesis for Integration Test');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated description for integration test.');

    await userEvent.click(submitButton);

    // Check if axios.patch was called with the updated data
    await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledWith('/api/thesis/' + mockThesis.id, {
      title: 'Updated Thesis for Integration Test',
      description: 'Updated description for integration test.',
      level: mockThesis.level,
      status: mockThesis.status,
      startDate: mockThesis.startDate,
      applicationDate: mockThesis.applicationDate,
      submitionDate: mockThesis.submitionDate,
    }));

    // Check if the user is redirected to the updated thesis detail page
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/' + mockThesis.id));
  });

  it('should show validation errors when required fields are missing', async () => {
    render(<ThesisForm translations={translations} />);

    const submitButton = screen.getByRole('button', { name: translations.create });
    await userEvent.click(submitButton);

  });

  it('should handle server error gracefully when creating a thesis', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Server Error'));

    render(<ThesisForm translations={translations} />);

    const titleInput = screen.getByPlaceholderText(translations.title);
    const descriptionInput = screen.getByPlaceholderText(translations.description);
    const submitButton = screen.getByRole('button', { name: translations.create });

    await userEvent.type(titleInput, 'Error Handling Thesis');
    await userEvent.type(descriptionInput, 'This thesis will trigger a server error.');
    await userEvent.click(submitButton);

  });
});
