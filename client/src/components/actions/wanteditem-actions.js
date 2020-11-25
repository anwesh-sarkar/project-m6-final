import { getErrors, clearErrors } from "./error-actions";

export const getWantedItems = (userId) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  const token = getState().auth.token;
  console.log(token);
  fetch(`/items/wanted/${userId}`, {
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
        type: "GET_WANTED_ITEMS",
        payload: data.items,
      });
    })
    .catch((err) => console.log(err));
};

export const addWantedItem = (item) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch("/items/wanted", {
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
        type: "ADD_WANTED_ITEM",
        payload: data.item,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteWantedItem = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const userId = getState().auth.user._id;
  fetch(`items/wanted/${userId}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status >= 400) {
        dispatch(getErrors(data.message, res.status, "DELETE_ITEM_ERROR"));
      } else {
        console.log(data);
        return data;
      }
    })
    .then((data) => {
      console.log(data);
      dispatch({
        type: "DELETE_WANTED_ITEM",
        payload: data.id,
      });
    })
    .catch((err) => console.log(err));
};

export const setItemsLoading = () => ({
  type: "ITEMS_LOADING",
});
