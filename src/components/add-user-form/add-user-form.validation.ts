import { AddUserFormData } from '../../dtos/add-user-form-data';

export const validateFormData = (data: AddUserFormData): { [K in keyof AddUserFormData]?: string } => {
  const errors: { [K in keyof AddUserFormData]?: string } = {};

  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Invalid email';
  }

  if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  }

  return errors;
};
