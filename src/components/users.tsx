import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { CircularProgress } from '@mui/material';
import UsersTable from './users-table';
import styled from 'styled-components';

const Users = () => {
  const { users, loading, error } = useUsers();
  return (
    <Container>
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
