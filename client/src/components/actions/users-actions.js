import { getErrors } from "../actions/error-actions";

export const getAllUsersAddress = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  const token = getState().auth.token;
  fetch("/users/allusers", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status >= 400) {
        dispatch(getErrors(data.message, res.status, "USER_LOADING_FAIL"));
      } else {
        return data;
      }
    })
    .then((data) => {
      if (!data.users) {
        return;
      }
      dispatch({
        type: "GET_ALL_USERS",
        payload: data.users,
      });
    })
    .catch((err) => console.log(err));
};

export const setUsersLoading = () => ({
  type: "USERS_LOADING",
});
