import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';
import { UserDto } from '../dtos/user.dto';

interface UsersTableProps {
  users: Array<UserDto>;
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <ContainerWrapper>
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
