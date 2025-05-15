import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

import UsersTable from './users-table';
import { useUsers } from '../hooks/useUsers';
import AddUserForm from './add-user-form/add-user-form';

const Users = () => {
  const { users, loading, addUser, addUserLoading, error } = useUsers();
  return (
    <Container>
      <AddUserForm onAdd={addUser} loading={addUserLoading} />
      {loading && <CircularProgress />}
      <>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {users.length > 0 && (<div className={'table-wrapper'}>
          <UsersTable users={users} />
        </div>)}

      </>
    </Container>
  );
};

const Container = styled.div`
  .table-wrapper {
    width: 80%;
    margin: 0 auto;
  }
`;


const ErrorMsg = styled.p`
  color: #cc0000;
  font-size: 2rem;
`;

export default Users;
