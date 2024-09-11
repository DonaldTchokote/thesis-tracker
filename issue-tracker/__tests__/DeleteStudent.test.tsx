// __tests__/DeleteStudentButton.test.tsx
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteStudentButton from '@/app/[locale]/students/[id]/DeleteStudentButton'; // Pfad zu deiner Komponente
import axios from 'axios';
import { useRouter } from 'next/navigation';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DeleteStudentButton Component', () => {
  const translations = {
    delete: 'Delete',
    confirmation: 'Are you sure?',
    deleteWarning: 'This action cannot be undone.',
    cancel: 'Cancel',
    cannotDeleteDialogTitle: 'Cannot Delete Student',
    cannotDelete: 'Student cannot be deleted due to related theses.',
    ok: 'OK',
  };

  beforeEach(() => {
    const mockPush = jest.fn();
    const mockRefresh = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  it('should call axios.delete and navigate to the student list on successful deletion', async () => {
    render(
      <DeleteStudentButton
        studentId="1"
        numberOfThesiss={0}
        translations={translations}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: translations.delete });
    await userEvent.click(confirmButton);

    await waitFor(() => expect(mockedAxios.delete).toHaveBeenCalledWith('/api/students/1'));
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/students/list'));
  });

  it('should show an error dialog when deletion fails', async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error('Deletion failed'));
    render(
      <DeleteStudentButton
        studentId="1"
        numberOfThesiss={0}
        translations={translations}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: translations.delete });
    await userEvent.click(confirmButton);

    await waitFor(() => expect(screen.getByText(translations.cannotDeleteDialogTitle)).toBeInTheDocument());
  });

  it('should disable the delete button if there are associated theses', () => {
    render(
      <DeleteStudentButton
        studentId="1"
        numberOfThesiss={1}
        translations={translations}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    expect(deleteButton).toBeDisabled();
  });
});
