import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

import UsersTable from './users-table';
import { useUsers } from '../hooks/useUsers';
import AddUserForm from './add-user-form/add-user-form';

const Users = () => {
  const { users, addUser, deleteUser, loadingMap, error } = useUsers();
  return (
    <Container>
      <AddUserForm onAdd={addUser} loading={loadingMap.add} />
      {loadingMap.getUsers && <CircularProgress />}
      <>
        <ErrorMsg>{error}</ErrorMsg>
        {users.length > 0 && (<div className={'table-wrapper'}>
          <UsersTable users={users} onDelete={deleteUser} loadingDelete={loadingMap.delete} />
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
  height: 30px;
  font-size: 1.2rem;
`;

export default Users;
