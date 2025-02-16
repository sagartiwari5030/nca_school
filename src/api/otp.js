import { poster, endpoints } from 'src/utils/axios';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------

export async function otpGenerate(formData) {

  const URL = endpoints.otp.send;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json',
    });

    return response;
  } catch (error) {
    console.error('Error while sending OTP Code:', error);
    throw error;
  }
}

export async function otpVerify(formData) {

  const URL = endpoints.otp.verify;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json',
    });

    return response;
  } catch (error) {
    console.error('Error while verifying the OTP Code:', error);
    throw error;
  }
}