import { filtersConfig } from '../constants/shared';
import { noop } from '@progress/kendo-react-common';

const initialState = {
  deliveries: [],
  selectedDelivery: {},
  filter: {
    name: '',
    address: '',
    phone: '',
  },
  filters: filtersConfig,
  order: {
    field: '',
    order: '',
    sort: noop,
  },
  error: undefined,
  fetching: false,
};

export default initialState;