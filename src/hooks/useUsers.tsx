import { useEffect, useState } from 'react';

import { fetchData } from '../utils/api';
import { UserDto } from '../dtos/user.dto';
import { AddUserFormData } from '../dtos/add-user-form-data';
import { DeleteUserResponseDto } from '../dtos/delete-user-response.dto';

type ActionType = 'getUsers' | 'add' | 'delete';


export function useUsers() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [error, setError] = useState('');

  const [loadingMap, setLoadingMap] = useState<Record<ActionType, boolean>>({
    getUsers: false,
    add: false,
    delete: false,
  });

  const usersServerUrl = 'http://localhost:3001/api/v1/users';

  const setLoadingFor = (action: ActionType, value: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [action]: value }));
  };

  const fetchUsers = async () => {
    try {
      setLoadingFor('getUsers', true);
      setError('');
      const users = await fetchData<UserDto[]>(usersServerUrl);
      setUsers(users || []);
    } catch (e) {
      setError('Failed to get users');
    } finally {
      setLoadingFor('getUsers', false);
    }
  };

  const addUser = async (formData: AddUserFormData) => {
    try {
      setLoadingFor('add', true);
      const result = await fetchData<UserDto>(usersServerUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers((prev) => [...prev, result]);
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoadingFor('add', false);
    }
  };

  const deleteUser = async (uuid: string) => {
    try {
      setLoadingFor('delete', true);
      setError('')
      await new Promise((resolve) => {
        setTimeout(() => resolve(undefined), 1000);
      });
      const result = await fetchData<DeleteUserResponseDto>(`${usersServerUrl}/${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (result.deleted) {
        setUsers((prev) => prev.filter((user) => user.uuid !== uuid));
      } else {
        setError('Failed to delete user');
      }
    } catch (e) {
      setError('Failed to delete user');
    } finally {
      setLoadingFor('delete', false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    error,
    users,
    addUser,
    deleteUser,
    loadingMap,
  };
}
