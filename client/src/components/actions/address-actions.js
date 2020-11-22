import { getErrors } from "../actions/error-actions";
export const getAddress = () => (dispatch, getState) => {
  dispatch(addressLoading());
  const token = getState().auth.token;
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

export const updateAddress = ({ street, city, state, country, user }) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  fetch("/address/updateaddress", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ street, city, state, country, user }),
  })
    .then(async (res) => {
      console.log(res);
      const data = await res.json();
      if (res.status >= 400) {
        dispatch(getErrors(data.message, res.status, "UPDATE_ADDRESS_FAIL"));
      } else {
        return data;
      }
    })
    .then((data) => {
      console.log(data);
      if (!data.location.coordinates) {
        return data;
      }
      dispatch({
        type: "UPDATE_ADDRESS",
        payload: data.location,
      });
    })
    .catch((err) => console.log(err));
};

export const addressLoading = () => ({
  type: "LOADING_ADDRESS",
});
