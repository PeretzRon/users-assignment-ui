import { useEffect, useState } from 'react';

import { fetchData } from '../utils/api';
import { UserDto } from '../dtos/user.dto';
import { AddUserFormData } from '../dtos/add-user-form-data';

export function useUsers() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);

  const usersServerUrl = 'http://localhost:3001/api/v1/users';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const users = await fetchData<UserDto[]>(usersServerUrl);
      setUsers(users || []);
    } catch (e) {
      setError('Failed to get users');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (formData: AddUserFormData) => {
    try {
      setError('');
      setAddUserLoading(true);
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
      setError('Failed to add todo');
      return false;
    } finally {
      setAddUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    error,
    users,
    loading,
    addUser,
    addUserLoading,
  };
}
