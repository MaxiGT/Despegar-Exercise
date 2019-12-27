import { createSelector } from 'reselect';

const getDeliveries = state => state.app.deliveries;
const getFilter = state => state.app.filter;
const getOrder = state => state.app.order;

export const getFilteredDeliveries = createSelector(
  [getDeliveries, getFilter],
  (deliveries, filter) => {
    const a = deliveries.filter(d => d.name.toUpperCase().includes(filter.name.toUpperCase()) &&
      d.address.toUpperCase().includes(filter.address.toUpperCase()));
    return a || deliveries;
  }
);

export const getSortedDeliveries = createSelector(
  [getFilteredDeliveries, getOrder],
  (filteredDeliveries, order) => {
    return filteredDeliveries.sort((a, b) => {
      return order.sort(a[order.field], b[order.field], order.order);
    });
  }
)