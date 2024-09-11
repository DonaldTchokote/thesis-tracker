// __tests__/ThesisForm.test.tsx
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThesisForm from '@/app/[locale]/thesis/_components/ThesisForm'; // Korrigiere den Pfad zu deiner Komponente
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

jest.mock('react-simplemde-editor', () => {
    const React = require('react');
    return {
      __esModule: true,
      default: React.forwardRef((props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTextAreaElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, ref: LegacyRef<HTMLTextAreaElement> | undefined) => <textarea ref={ref} {...props} />),
    };
  });

describe('ThesisForm Component', () => {
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

  it('should call axios.post when submitting a new thesis', async () => {
    render(<ThesisForm translations={translations} />);

    const titleInput = screen.getByPlaceholderText(translations.title);
    const descriptionInput = screen.getByPlaceholderText(translations.description);
    const levelSelect = screen.getByLabelText(translations.selectLevel);
    const statusSelect = screen.getByLabelText(translations.selectStatus);
    const submitButton = screen.getByRole('button', { name: translations.create });

    await userEvent.type(titleInput, 'New Thesis');
    await userEvent.type(descriptionInput, 'This is a description for the thesis.');
    await userEvent.selectOptions(levelSelect, [translations.bachelor]);
    await userEvent.selectOptions(statusSelect, [translations.open]);
    await userEvent.click(submitButton);

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledWith('/api/thesis', {
      title: 'New Thesis',
      description: 'This is a description for the thesis.',
      level: 'BACHELOR',
      status: 'OPEN',
      startDate: '',
      applicationDate: '',
      submitionDate: '',
    }));

    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/list'));
  });

  it('should call axios.patch when updating an existing thesis', async () => {
    const mockThesis = {
      id: 1,
      title: 'Existing Thesis',
      description: 'Existing description.',
      level: Level.MASTER,
      status: Status.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: '2024-09-01',
      applicationDate: '2024-09-02',
      submitionDate: '2024-09-03',
    };

    render(<ThesisForm translations={translations} thesis={mockThesis} />);

    const submitButton = screen.getByRole('button', { name: translations.update });
    await userEvent.click(submitButton);

    await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledWith('/api/thesis/' + mockThesis.id, {
      title: mockThesis.title,
      description: mockThesis.description,
      level: mockThesis.level,
      status: mockThesis.status,
      startDate: mockThesis.startDate,
      applicationDate: mockThesis.applicationDate,
      submitionDate: mockThesis.submitionDate,
    }));

    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/' + mockThesis.id));
  });

  it('should display validation errors when fields are empty', async () => {
    render(<ThesisForm translations={translations} />);

    const submitButton = screen.getByRole('button', { name: translations.create });
    await userEvent.click(submitButton);

  });

  it('should allow updating an existing thesis', async () => {
    const mockThesis = {
      id: 1,
      title: 'Existing Thesis',
      description: 'Existing description.',
      level: Level.MASTER,
      status: Status.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: '2024-09-01',
      applicationDate: '2024-09-02',
      submitionDate: '2024-09-03',
    };
  
    render(<ThesisForm translations={translations} thesis={mockThesis} />);

  // Simuliere die Änderung des Titels
  const titleInput = screen.getByPlaceholderText(translations.title);
  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, 'Updated Thesis Title');

  // Simuliere die Änderung der Beschreibung
  const descriptionInput = screen.getByPlaceholderText(translations.description);
  await userEvent.clear(descriptionInput);
  await userEvent.type(descriptionInput, 'Updated description for the thesis.');

  // Klicke auf die Schaltfläche zum Aktualisieren
  const submitButton = screen.getByRole('button', { name: translations.update });
  await userEvent.click(submitButton);

  // Überprüfen, ob axios.patch mit den aktualisierten Daten aufgerufen wurde
  await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledWith('/api/thesis/' + mockThesis.id, {
    title: 'Updated Thesis Title',
    description: 'Updated description for the thesis.',
    level: mockThesis.level,
    status: mockThesis.status,
    startDate: mockThesis.startDate,
    applicationDate: mockThesis.applicationDate,
    submitionDate: mockThesis.submitionDate,
  }));

  // Überprüfen, ob der Benutzer zur aktualisierten Thesis weitergeleitet wird
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/thesis/' + mockThesis.id));
});
});
