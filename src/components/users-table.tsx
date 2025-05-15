import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { UserDto } from '../dtos/user.dto';

interface UsersTableProps {
  users: Array<UserDto>;
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <ContainerWrapper>
      <h2>Users list</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <ColTitle>First Name</ColTitle>
              <ColTitle>Last Name</ColTitle>
              <ColTitle>Email</ColTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uuid}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  margin: 10px;
`;

const ColTitle = styled(TableCell)`
  && {
    font-weight: bold;
  }
`;


export default UsersTable;
