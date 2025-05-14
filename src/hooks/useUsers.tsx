import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';
import { UserDto } from '../dtos/user.dto';

export function useUsers() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}
