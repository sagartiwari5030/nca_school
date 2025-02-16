import { poster,endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------
export async function addContact(formData) {

  const URL = endpoints.patient.create;

  try {
    const response = await poster(URL, formData, {
      'Content-Type': 'application/json'
    });

    return response;
  } catch (error) {
    console.error('Error Creating Package:', error);
    throw error;
  }
}