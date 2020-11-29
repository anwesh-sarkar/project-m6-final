import { getErrors, clearErrors } from "./error-actions";

export const getOfferedItems = (userId) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  const token = getState().auth.token;
  console.log(token);
  fetch(`/items/offering/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status >= 400) {
        dispatch(getErrors(data.message, res.status, "GET_ITEM_ERROR"));
      } else {
        return data;
      }
    })
    .then((data) => {
      dispatch({
        type: "GET_OFFERED_ITEMS",
        payload: data.items,
      });
    })
    .catch((err) => console.log(err));
};

export const addOfferedItem = (item) => (dispatch, getState) => {
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
      console.log(data);
      dispatch({
        type: "ADD_OFFERED_ITEM",
        payload: data.item,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteOfferedItem = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const userid = getState().auth.user._id;
  fetch(`items/offering/${userid}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "DELETE_OFFERED_ITEM",
        payload: data.id,
      });
    })
    .catch((err) => console.log(err));
};

export const getAllOfferedItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  fetch("/items/alloffered", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: "GET_ALL_OFFERED_ITEMS",
        payload: data.offered,
      });
    })
    .catch((err) => console.log(err));
};

export const setItemsLoading = () => ({
  type: "ITEMS_LOADING",
});
