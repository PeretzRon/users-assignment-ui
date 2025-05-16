import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import LoaderButton from '../shared/loader-button';
import { validateFormData } from './add-user-form.validation';
import { AddUserFormData } from '../../dtos/add-user-form-data';

interface AddUserFormProps {
  onAdd: (formData: AddUserFormData) => Promise<boolean>;
  loading: boolean;
}

const AddUserForm = ({ onAdd, loading }: AddUserFormProps) => {
  const fieldsConfig = [
    { name: 'firstName', label: 'first name' },
    { name: 'lastName', label: 'last name' },
    { name: 'email', label: 'email' },
    { name: 'password', label: 'password', type: 'password' },
  ];

  const [formData, setFormData] = useState<AddUserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [msgStatus, setMsgStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMsgStatus('');
    setErrors({ ...errors, [name]: '' });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const isSuccess = await onAdd(formData);
    if (isSuccess) {
      setMsgStatus('User created successfully');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    } else {
      setMsgStatus('Failed to create user');
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>Create new user</Title>
      <div className={'fieldsConfig'}>
        {fieldsConfig.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            classes={{ root: 'input-style' }}
            variant="outlined"
            type={field.type || 'text'}
            value={formData[field.name as keyof AddUserFormData] || ''}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            fullWidth
          />
        ))}
      </div>
      <SubmitButton loading={loading} type="submit" disabled={loading} variant="contained" color="primary">
        Create
      </SubmitButton>
      <StatusMessage>{msgStatus}</StatusMessage>
    </Container>
  );
};

const Container = styled.form`
  width: 80%;
  margin: 10px auto;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 2px 16px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .fields {
    display: flex;
    flex-wrap: wrap;
    gap: 5px
  }

  .input-style {
    width: 200px;
    height: 80px;
    margin-top: 10px;
  }
`;

const Title = styled.h2`
  margin-top: 0;
`;

const SubmitButton = styled(LoaderButton)`
  && {
    margin-top: 20px;
  }
`;

const StatusMessage = styled.p`

`;

export default AddUserForm;
