import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { checkMobileNumber } from 'src/api/auth';
import { otpVerify, otpGenerate } from 'src/api/otp';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';



export default function JwtRegisterView() {
  const { registerAsDoctor } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [checkedNumberResponse, setCheckedNumberResponse] = useState({
    isAvailable: false,
    message: ''
  })

  const [timer, setTimer] = useState(50);
  const [showTimer, setShowTimer] = useState(true);
  const passwordFlag = useBoolean();
  const confirmPasswordFlag = useBoolean();
  const [otpCodeId, setOtpCodeId] = useState({});

  const [show, setShow] = useState({
    firstSliderForm: true,
    secondSliderForm: false,
    thirdSliderForm: false,
  });

  useEffect(() => {
    let intervalId;
    if (timer > 0 && showTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowTimer(false);
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timer, showTimer]);


  // Set Forms Validation Rule

  const FirstSlideFormSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    mobileNumber: Yup.number()
      .min(1000000000, 'Mobile Number must be at least 10 digits')
      .max(9999999999, 'Mobile Number must be at most 10 digits')
      .required('Mobile Number is required'),
  });

  const SecondSlideFormSchema = Yup.object().shape({
    otpCode: Yup.string().required('OTP Code is required'),
  });

  const ThirdSliderFormSchema = Yup.object().shape({
    lastName: Yup.string().required('First Name is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be between 6 to 8 characters long'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Initialized the initial values of each form

  const defaultValuesFirstSlideForm = {
    firstName: '',
    mobileNumber: '',
  };

  const defaultValuesSecondSlideForm = {
    otpCode: '',
    isMobileNumberVerified: false
  };

  const defaultValuesThirdSlideForm = {
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  const firstSlideFormMethods = useForm({
    resolver: yupResolver(FirstSlideFormSchema),
    defaultValuesFirstSlideForm,
  });

  const secondSlideFormMethods = useForm({
    resolver: yupResolver(SecondSlideFormSchema),
    defaultValuesSecondSlideForm,
  });

  const thirdSlideFormMethods = useForm({
    resolver: yupResolver(ThirdSliderFormSchema),
    defaultValuesThirdSlideForm,
  });

  const { handleSubmit: handleSubmitFirstSlideForm } = firstSlideFormMethods;
  const { handleSubmit: handleSubmitSecondSlideForm } = secondSlideFormMethods;
  const { handleSubmit: handleSubmitThirdSlideForm } = thirdSlideFormMethods;

  // Components
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="h4">
        {show.firstSliderForm &&
          "Register as a Doctor"
        }
        {show.secondSliderForm &&
          "Enter Received OTP Code"
        }
        {show.thirdSliderForm &&
          "Enter Few Additional Details"
        }
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link
        href="https://medantrik.com/terms-and-conditions"
        underline="always"
        color="text.primary"
        target="_blank"
      >
        Terms of Service
      </Link>
      {' and '}
      <Link
        href="https://medantrik.com/privacy-policy"
        underline="always"
        color="text.primary"
        target="_blank"
      >
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const onSubmitFirstSlideForm = handleSubmitFirstSlideForm(async (data) => {
    try {
      const responseValidNumber = await checkMobileNumber(data);
      const isAvailable = responseValidNumber.data;
      setCheckedNumberResponse({
        ...checkedNumberResponse,
        isAvailable,
        message: responseValidNumber.message
      });

      if (isAvailable) {
        localStorage.setItem('mobileNumber', data?.mobileNumber);
        localStorage.setItem('firstName', data?.firstName);
        const response = await otpGenerate(data);
        if (response.success) {
          setOtpCodeId(response.data.otpCodeId);
          setShow({ firstSliderForm: false, secondSliderForm: true, pasForm: false, upiForm: false });
          enqueueSnackbar(response.message, { variant: 'success' });
          setTimer(response.data.expiry);
          setShowTimer(true);
        }
      } else {
        enqueueSnackbar('Try with an new Mobile Number or Login with same entered mobile number!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while checking Mobile Number Exist or not !', { variant: 'error' });
    }
  });

  const onSubmitSecondSlideForm = handleSubmitSecondSlideForm(async (data) => {
    const mobileNumber = localStorage.getItem('mobileNumber');
    try {
      if (mobileNumber) {
        const dataToSend = {
          otpCode: data?.otpCode,
          otpCodeId
        };
        const response = await otpVerify(dataToSend);
        console.log("OTP Response =>", response);
        if (response.success) {
          secondSlideFormMethods.setValue('isMobileNumberVerified', true);
          enqueueSnackbar('Entered OTP code verified successfully!', { variant: 'success' });
          setShow({ firstSliderForm: false, secondSliderForm: false, thirdSliderForm: true });
        }
      } else {
        enqueueSnackbar('Please entered the correct OTP Code.', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to verify OTP Code. Try again', { variant: 'error' });
    }
  });

  const onSubmitThirdSlideForm = handleSubmitThirdSlideForm(async (formData) => {
    try {
      const { password, lastName } = formData;
      const firstName = firstSlideFormMethods.getValues('firstName');
      const mobileNumber = firstSlideFormMethods.getValues('mobileNumber');
      const isMobileNumberVerified = secondSlideFormMethods.getValues('isMobileNumberVerified');
  
      const payload = {
        password,
        firstName,
        lastName,
        mobileNumber,
        isMobileNumberVerified
      };
  
      const result = await registerAsDoctor(payload);
  
      if (result.success) {
        enqueueSnackbar(result.message, { variant: 'success' });
        router.push(returnTo || PATH_AFTER_LOGIN);
      } else {
        enqueueSnackbar(result.message || 'Registration failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during registration:', error.message || error);
      enqueueSnackbar('Failed to register. Please try again.', { variant: 'error' });
    }
  });
  
  const handleResendClick = async () => {
    try {
      const dataToSend = {
        mobileNumber: firstSlideFormMethods.getValues('mobileNumber')
      };

      const response = await otpGenerate(dataToSend);
      if (response.success) {
        setOtpCodeId(response.data.otpCodeId);
        enqueueSnackbar(response.message, { variant: 'success' });
        setTimer(response.data.expiry);
        setShowTimer(true);
      } else {
        enqueueSnackbar(response.message, { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred while re-sending OTP Code again!', { variant: 'error' });
    }
  };

  return (
    <>
      {renderHead}

      {/* First Slider Form: Fist Name and Mobile Number */}
      {show.firstSliderForm && (
        <FormProvider methods={firstSlideFormMethods} onSubmit={onSubmitFirstSlideForm}>
          <Stack spacing={2}>

            <RHFTextField name="firstName" label="First Name" />

            <Typography variant="body2">
              Please provide your mobile number, excluding the country code (+91).
            </Typography>
            <RHFTextField name="mobileNumber" label="Mobile Number" />
            <Typography variant="body2" sx={{ color: checkedNumberResponse?.isAvailable ? 'green' : 'red' }}>
              {checkedNumberResponse?.message}
            </Typography>

            <Button variant="contained" size="large" type="submit">
              Next
            </Button>
          </Stack>
        </FormProvider>
      )}

      {/* Second Slider Form: OTP Code */}
      {show.secondSliderForm && (
        <FormProvider methods={secondSlideFormMethods} onSubmit={onSubmitSecondSlideForm}>
          <Stack spacing={2}>
            {/* <Typography variant="body2">Ref for mobile : {ref}</Typography> */}
            <RHFTextField name="otpCode" label="OTP Code" />
            <Stack direction="row" spacing={2}>
              {showTimer ? (
                <Button variant="outlined" size="large">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </Button>
              ) : (
                <Button variant="contained" size="large" onClick={handleResendClick}>
                  Resend
                </Button>
              )}
            </Stack>
            <Button variant="contained" size="large" type="submit">
              Next
            </Button>
          </Stack>
        </FormProvider>
      )}

      {/* Third Form: Personal Details */}
      {show.thirdSliderForm && (
        <FormProvider methods={thirdSlideFormMethods} onSubmit={onSubmitThirdSlideForm}>
          <Stack spacing={2}>
            <RHFTextField name="lastName" label="Last Name" />
            {/* <RHFTextField name="email" label="Email Address" /> */}
            <RHFTextField
              name="password"
              label="Password"
              type={passwordFlag.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={passwordFlag.onToggle} edge="end">
                      <Iconify icon={passwordFlag.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              type={confirmPasswordFlag.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={confirmPasswordFlag.onToggle} edge="end">
                      <Iconify
                        icon={confirmPasswordFlag.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </Stack>
          {renderTerms}
        </FormProvider>
      )}

    </>
  );
}
