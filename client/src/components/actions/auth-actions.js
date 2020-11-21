import { getErrors, clearErrors } from "./error-actions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: "LOAD_USER" });
  const token = getState().auth.token;
  console.log(token);

  fetch("/auth/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status >= 400) {
        dispatch({
          type: "AUTH_ERROR",
        });
        dispatch(getErrors(data.message, res.status, "AUTH_ERROR"));
      } else {
        return data;
      }
    })
    .then((data) => {
      console.log(data, data.user);
      dispatch({
        type: "USER_LOADED",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = ({ username, password }) => (dispatch, getState) => {
  const token = getState().auth.token;

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(async (res) => {
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status >= 400) {
        dispatch({
          type: "LOGIN_FAIL",
        });
        dispatch(getErrors(data.message, res.status, "LOGIN_FAIL"));
      } else {
        return data;
      }
    })
    .then((data) => {
      console.log(data);
      if (!data.user) {
        return;
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const register = ({ name, username, password, confirmPassword }) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, username, password, confirmPassword }),
  })
    .then(async (res) => {
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status >= 400) {
        dispatch({
          type: "REGISTER_FAIL",
        });
        dispatch(getErrors(data.message, res.status, "REGISTER_FAIL"));
      } else {
        return data;
      }
    })
    .then((data) => {
      if (!data.user) {
        return;
      }
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = () => (dispatch) => {};
