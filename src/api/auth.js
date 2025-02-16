import { poster, endpoints, nativeFetcher } from 'src/utils/axios';

export async function checkMobileNumber(formData) {

  const URL = endpoints.auth.check;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json',
    });

    return response;
  } catch (error) {
    console.error('Error while checking the mobile number exists or not:', error);
    throw error;
  }
}

export async function register(formData) {

  const URL = endpoints.auth.register;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json',
    });

    return response;
  } catch (error) {
    console.error('Error while registering:', error);
    throw error;
  }
}

export async function login(formData) {

  const URL = endpoints.auth.login;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json',
    });

    return response;
  } catch (error) {
    console.error('Error while logged-in:', error);
    throw error;
  }
}

export async function fetchProfile(accessToken) {
  const URL = endpoints.auth.me;
  try {
    const response = await nativeFetcher(URL, {
      Authorization: `Bearer ${accessToken}`,
    });

    return response;
  } catch (error) {
    console.error('Error while fetching the user profile:', error);
    throw error;
  }
}

export async function logOut(accessToken) {
  const URL = endpoints.auth.logout;
  try {
    const response = await nativeFetcher(URL, {
      Authorization: `Bearer ${accessToken}`,
    });

    return response;
  } catch (error) {
    console.error('Error while fetching the user profile:', error);
    throw error;
  }
}