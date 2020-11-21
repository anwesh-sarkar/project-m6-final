export const getAddress = () => (dispatch, getState) => {
  dispatch(addressLoading());
  const token = getState().auth.token;
  console.log(token);
  fetch("/address", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "GET_ADDRESS",
        payload: data.address,
      });
    })
    .catch((err) => console.log(err));
};

export const addressLoading = () => ({
  type: "LOADING_ADDRESS",
});
