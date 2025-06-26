const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/expense/leader/claims`, {
  withCredentials: true,
});
setClaims(res.data.claims);
