export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  const token = getState().auth.token;
  console.log(token);
  fetch("/items/offering", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "GET_ITEMS",
        payload: data.items,
      });
    })
    .catch((err) => console.log(err));
};

export const addItem = (item) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch("/items/offering", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "ADD_ITEM",
        payload: data.item,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (id) => (dispatch) => {
  fetch(`items/offering/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: "DELETE_ITEM",
        payload: data.id,
      });
    })
    .catch((err) => console.log(err));
};

export const setItemsLoading = () => ({
  type: "ITEMS_LOADING",
});

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
    .then((res) => res.json())
    .then((data) => {
      console.log(data, data.user);
      dispatch({
        type: "USER_LOADED",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({ type: "AUTH_ERROR" });
    });
};

export const userLoaded = () => ({
  type: "USER_LOADED",
});

export const authError = () => ({
  type: "AUTH_ERROR",
});

export const login = ({ username, password }) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // localStorage.setItem("token", data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "LOGIN_FAIL",
      });
      dispatch(
        getErrors(err.response.message, err.response.status, "LOGIN_FAIL")
      );
    });
};

export const loginSuccess = () => ({
  type: "LOGIN_SUCCESS",
});

export const loginFail = () => ({
  type: "LOGIN_FAIL",
});

export const register = ({ name, username, password }) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-auth-header": token,
    },
    body: JSON.stringify({ name, username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // localStorage.setItem("token", data.token);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "REGISTER_FAIL",
      });
      dispatch(
        getErrors(err.response.message, err.response.status, "REGISTER_FAIL")
      );
    });
};

export const logout = () => (dispatch) => {};

export const registerSuccess = () => ({
  type: "REGISTER_SUCCESS",
});

export const registerFail = () => ({
  type: "REGISTER_FAIL",
});

export const getErrors = (message, status, id = null) => {
  return {
    type: "GET_ERRORS",
    payload: { message, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
