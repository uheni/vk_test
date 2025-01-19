import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserList } from './UserList';
import Store from '../store/Store';

jest.mock('../store/Store', () => ({
    fetchUsers: jest.fn(),
    deleteItem: jest.fn(),
    editItem: jest.fn(),
    users: [
        { id: "1", login: "user1", avatar_url: "avatar1.png", html_url: "http://example.com/user1" },
        { id: "2", login: "user2", avatar_url: "avatar2.png", html_url: "http://example.com/user2" }
    ],
    loading: false,
    sort_field: 'id',
    sort: 'ASC',
}));

describe('Tests for UserList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test user list render', () => {
        render(<UserList />);

        // table header
        expect(screen.getByText("Aватар")).toBeInTheDocument();
        expect(screen.getByText("Имя пользователя")).toBeInTheDocument();
        expect(screen.getByText("ID")).toBeInTheDocument();

        // table records
        expect(screen.getByDisplayValue("user1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("user2")).toBeInTheDocument();
    });

    test('Test Store.fetchUsers call on component mount', () => {
        render(<UserList />);
        expect(Store.fetchUsers).toHaveBeenCalled();
    });

    test('Test Store.deleteItem call when delete action is triggered', () => {
        render(<UserList />);

        const deleteButtons = screen.getAllByRole('button', { name: "Delete" });
        fireEvent.click(deleteButtons[0]);

        expect(Store.deleteItem).toHaveBeenCalledWith("1");
    });

    test('Test Store.editItem call when edit action is triggered', () => {
        render(<UserList />);

        const editButtons = screen.getAllByRole('button', { name: "Edit" });
        fireEvent.click(editButtons[0]);
        const inputElement = screen.getByDisplayValue("user1");
        fireEvent.change(inputElement, { target: { value: 'newUser' } });
        fireEvent.blur(inputElement);
        const saveButtons = screen.getAllByRole('button', { name: "Save" });
        fireEvent.click(saveButtons[0]);

        expect(Store.editItem).toHaveBeenCalledWith("1", 'newUser');
    });
});