import * as constants from '../constants';

const fetchApi = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

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
  return fetchApi(constants.POST_FORM_URL, {
    method: constants.POST_HTTP_METHOD,
    body: JSON.stringify(formData),
  });
};

export const onGetFormData = async (id) => {
  return fetchApi(`${constants.POST_FORM_URL}${id}`, {
    method: constants.GET_HTTP_METHOD,
  });
};

export const onGetAllFormData = async () => {
  return fetchApi(constants.POST_FORM_URL, {
      method: constants.GET_HTTP_METHOD,
  });
};

