const fetchAPI = async (param) => {
  const response = await fetch(param);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchAPI;
