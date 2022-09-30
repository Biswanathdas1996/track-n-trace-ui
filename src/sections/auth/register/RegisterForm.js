import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
// import { useForm } from 'react-hook-form';
import { useFormik } from 'formik';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
// import { FormProvider, RHFTextField } from '../../../components/hook-form';
import States from '../../../_mock/stateZones';
import Roles from '../../../_mock/userRole';
// ----------------------------------------------------------------------

  const registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phNo: '',
    state: '',
    userRole: '',
    password: '',
    confirmPassword: '',
  };

export default function RegisterForm() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'First Name is too short').max(25, 'First Name cannot be more than 25 characters').required('First name is required'),
    lastName: Yup.string().min(2, 'Last Name is too short').max(25, 'Last Name cannot be more than 25 characters').required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phNo: Yup.string().length(10, 'Phone Number must be of 10 Digits').required('Phone Number is required'),
    state: Yup.string().required('State is required'),
    userRole: Yup.string().required('Role is required'),
    password: Yup.string().min(8, 'Password is too short').max(12, 'Password can be maximum of 12 characters').required('Password is required')
      .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .matches(/^(?=.*[!@#$%&])/, 'Must contain at least one special character'),
    confirmPassword: Yup.string().required('Confirm Password is a required field').oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });


  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: registerData,
    validationSchema: RegisterSchema,
    onSubmit : (values) => {
      console.log("Submitted values",values);
      navigate('/dashboard/app', { replace: true });
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
          <TextField
            id='firstName'
            label='First name'
            fullWidth
            value={values.firstName}
            name='firstName'
            autoComplete='off'
            placeholder='First name'
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstName && touched.firstName}
            helperText={errors.firstName && touched.firstName ? errors.firstName : ''}
            
          />
          <TextField 
            id='lastName'
            label='Last name'
            fullWidth
            value={values.lastName}
            name='lastName'
            autoComplete='off'
            placeholder='Last name'
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.lastName && touched.lastName}
            helperText={errors.lastName && touched.lastName ? errors.lastName : ''}
          />
        </Stack>

        <TextField 
          id='email'
          label='Email'
          fullWidth
          value={values.email}
          type='email'
          name='email'
          autoComplete='off'
          placeholder='Email'
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : ''}
        />
        <TextField 
          id='phNo'
          label='Phone Number'
          fullWidth
          value={values.phNo}
          type='number'
          name='phNo'
          autoComplete='off'
          placeholder='Phone Number'
          onChange={handleChange}
          onBlur={handleBlur}
            error={!!errors.phNo && touched.phNo}
          helperText={errors.phNo && touched.phNo ? errors.phNo : ''}
        />
        <TextField 
          id='state'
          select
          label='State/UT'
          fullWidth
          value={values.state}
          name='state'
          autoComplete='off'
          placeholder='State/UT'
          onChange={handleChange}
          // zone needs to be handled from the API
          onBlur={handleBlur}
          error={!!errors.state && touched.state}
          helperText={errors.state && touched.state ? errors.state : ''}
        >
          {States.map((option) => (
            <MenuItem key={option.id} value={option.stateName}>
              {option.stateName}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          id='userRole'
          select
          label='User role'
          fullWidth
          value={values.userRole}
          name='userRole'
          autoComplete='off'
          placeholder='User role'
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.userRole && touched.userRole}
          helperText={errors.userRole && touched.userRole ? errors.userRole : ''}
        >
          {Roles.map((option) => (
            <MenuItem key={option.id} value={option.roleName}>
              {option.roleName}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField 
          id='password'
          label='Enter Password'
          fullWidth
          value={values.password}
          name='password'
          autoComplete='off'
          placeholder='Enter Password'
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password && touched.password}
          helperText={errors.password && touched.password ? errors.password : ''}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField 
          id='confirmPassword'
          label='Confirm Password'
          fullWidth
          value={values.confirmPassword}
          name='confirmPassword'
          autoComplete='off'
          placeholder='Confirm Password'
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.confirmPassword && touched.confirmPassword}
          helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
          type={showConfPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowConfPassword(!showConfPassword)}>
                  <Iconify icon={showConfPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* <RHFTextField name="email" id="email" label="Email address" />
        <RHFTextField name="state" id="state" label="State" />
        <RHFTextField name="role" id="role" label="User Role" /> */}

        {/* <RHFTextField
          name="password"
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}> */}
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Register
        </LoadingButton>
      </Stack>
    </form>
    // </FormProvider>

    // <div>
    //   <form>
    //     <div>
    //     </div>
    //   </form>
    // </div>
  );
}
