import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import ErrorBoundary from './shared/Components/ErrorBoundary/ErrorBoundary';
import List from './shared/Presentationals/List/List';
import Form from './shared/Components/Form/Form';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    const { selectedDelivery } = this.props;
    this.state = {
      selectedDelivery,
    };
  }

  componentDidMount() {
    this.props.getDeliveries();
  }

  componentWillReceiveProps(newProps) {
    const { selectedDelivery } = newProps;
    if (
      _.isEqual(selectedDelivery, this.state.selectedDelivery)
    ) return null;

    this.setState = {
      selectedDelivery,
    };
  }

  render() {
    const { error,
      raiseError,
      changeFilter,
      selectedDelivery,
      deliveries,
      filter,
      filters,
      selectDelivery,
      deleteDelivery,
      updateDelivery,
      createDelivery,
      recoverDelivery,
      setOrder,
      order, } = this.props;
    
    const deliveryList = () => (
      <List deleteDelivery={deleteDelivery}
        selectDelivery={selectDelivery}
        onFilterChange={changeFilter}
        filters={filters}
        filter={filter}
        deliveries={deliveries}
        setOrder={setOrder}
        order={order} />
    );

    const deliveryForm = () => (
      <Form totalresults={deliveries.length}
        recoverDelivery={recoverDelivery}
        createDelivery={createDelivery}
        updateDelivery={updateDelivery}
        selectedDelivery={selectedDelivery} />
    );

    return (
      <React.Fragment>
        <ErrorBoundary error={error} raiseError={raiseError}>
          <Switch>
            <Route exact path='/' component={deliveryList} />
            <Route exact path='/delivery/:id' component={deliveryForm} />
          </Switch>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default AppRouter;
