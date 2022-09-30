import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useFormik } from 'formik';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const loginData = {
  email: '',
  password: '',
  remember: true,
};

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password is too short').max(12, 'Password can be maximum of 12 characters').required('Password is required')
      .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .matches(/^(?=.*[!@#$%&])/, 'Must contain at least one special character'),
  });

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: loginData,
    validationSchema: LoginSchema,
    onSubmit : (values) => {
      console.log("Submitted values",values);
      navigate('/dashboard/app', { replace: true });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>

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

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormGroup>
          <FormControlLabel 
            control={ 
              <Checkbox defaultChecked onChange = {handleChange} /> 
            }
            name="remember"
            label="Remember me" 
          />
        </FormGroup>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
