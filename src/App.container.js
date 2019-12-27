import AppRouter from './App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getDeliveries,
  changeFilter,
  raiseError,
  selectDelivery,
  deleteDelivery,
  updateDelivery,
  createDelivery,
  recoverDelivery,
  setOrder } from "./store/actions";
import { getSortedDeliveries } from './store/selector';

const mapStateToProps = (state) => {
  return({
    deliveries: getSortedDeliveries(state),
    selectedDelivery: state.app.selectedDelivery,
    error: state.app.error,
    fetching: state.app.fetching,
    filter: state.app.filter,
    order: state.app.order,
    filters: state.app.filters,
  });
};

const dispatchActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDeliveries,
      selectDelivery,
      changeFilter,
      raiseError,
      deleteDelivery,
      updateDelivery,
      createDelivery,
      recoverDelivery,
      setOrder,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, dispatchActionsToProps)(AppRouter));