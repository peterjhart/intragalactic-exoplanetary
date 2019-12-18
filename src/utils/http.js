async function get(url, options) {
  const fetchOptions = {
    ...options
  };
  const response = await fetch(url, fetchOptions);
  return response.json();
}

export default {
  get
};
