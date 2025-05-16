import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { UserDto } from '../dtos/user.dto';
import LoaderButton from './shared/loader-button';

interface UsersTableProps {
  users: Array<UserDto>;
  onDelete: (userId: string) => void;
  loadingDelete?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete }) => {
  const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({});

  const handleDelete = async (userId: string) => {
    setLoadingDelete((prev) => ({ ...prev, [userId]: true }));
    try {
      await onDelete(userId);
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [userId]: false }));
    }
  };

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
              <ColTitle>Actions</ColTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uuid}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <DeleteButton
                    variant="contained"
                    color="secondary"
                    loading={loadingDelete[user.uuid] || false}
                    disabled={loadingDelete[user.uuid] || false}
                    onClick={() => handleDelete(user.uuid)}
                  >
                    Delete
                  </DeleteButton>
                </TableCell>
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

const DeleteButton = styled(LoaderButton)`
  height: 40px;
  width: 100px;
`;


const ColTitle = styled(TableCell)`
  && {
    font-weight: bold;
  }
`;

export default UsersTable;