import { getErrors, clearErrors } from "./error-actions";

export const getOfferedItems = () => (dispatch, getState) => {
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
      dispatch({
        type: "ADD__OFFERED_ITEM",
        payload: data.item,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteOfferedItem = (id) => (dispatch) => {
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
        type: "DELETE_OFFERED_ITEM",
        payload: data.id,
      });
    })
    .catch((err) => console.log(err));
};

export const setItemsLoading = () => ({
  type: "ITEMS_LOADING",
});
