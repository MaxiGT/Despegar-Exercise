import * as types from "../constants/actionTypes";
import deliveryMock from "../Mocks/deliveryMock";

const api = {
  simulateGet: () => new Promise((resolve, reject) => resolve(deliveryMock)),
};

export const raiseError = (error) => ({
  type: types.RAISE_ERROR,
  payload: error,
});

export const changeFilter = (filter) => ({
	type: types.CHANGE_FILTER,
	payload: filter,
});

export const selectDelivery = (delivery) => ({
  type: types.DELIVERY_SELECT,
  payload: delivery,
});

export const deleteDelivery = (id) => ({
  type: types.DELIVERY_DELETE,
  payload: id,
});

export const recoverDelivery = (id) => ({
  type: types.DELIVERY_RECOVER,
  payload: id,
});

export const updateDelivery = (delivery) => ({
  type: types.DELIVERY_UPDATE,
  payload: delivery,
});

export const createDelivery = (delivery) => ({
  type: types.DELIVERY_CREATE,
  payload: delivery,
});

export const setOrder = (field, order, sort) => ({
  type: types.SET_ORDER,
  payload: { field, order, sort },
});

export const getDeliverySuccess = (deliveries) => ({
  type: types.GET_DELIVERY_SUCCESS,
  payload: deliveries,
});

export const simulateApiCall = () => ({
  type: types.SIMULATE_API_CALL,
});

export const getDeliveries = () => (dispatch) => {
  dispatch(simulateApiCall());
  return api.simulateGet()
    .then(res => dispatch(getDeliverySuccess(res)))
    .catch(err => dispatch(raiseError(err)));
};