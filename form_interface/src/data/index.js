import * as constants from '../constants';

const fetchApi = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  console.log(`Making request to ${constants.API_BASE_URL}${endpoint}`);

  const response = await fetch(`${constants.API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error in API call');
  }

  return response.json();
};

export const onSubmitFormData = async (formData) => {
  return fetchApi(constants.FORM_URL, {
    method: constants.POST_HTTP_METHOD,
    body: JSON.stringify(formData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};

export const onGetFormData = async (id) => {
  return fetchApi(`${constants.FORM_URL}${id}`, {
    method: constants.GET_HTTP_METHOD,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};

export const onGetAllFormData = async () => {
  console.log("onGetAllFormData");
  
  return fetchApi(constants.FORM_URL, {
      method: constants.GET_HTTP_METHOD,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
};

