import React from 'react';
import Grid from '../../Components/Grid/Grid';
import Pager from '../../Components/Pager/Pager';
import Filter from '../../Components/Filter/Filter';
import { withRouter } from 'react-router-dom';
import { columnsConfig } from './config';

const DELIVERY_LIST_TITLE = 'Listado de deliveries';
const DELIVERY_BUTTON_LABEL = 'Crear nuevo delivery';

class List extends React.Component {

  constructor(props) {
    super(props);
    const { deliveries } = this.props;
    this.state = {
      deliveries,
    };
  }

  onTemplateButtonClick = () => {
    this.props.selectDelivery({});
    this.props.history.push('/delivery/0');
  }

  handleEdit = (delivery) => {
    this.props.selectDelivery(delivery);
    this.props.history.push('/delivery/' + delivery.id);
  }

  handleDelete = (delivery) => {
    this.props.deleteDelivery(delivery.id);
  }

  onPagerChangePage = (deliveries) => {
    this.setState({
      deliveries,
    });
  }

  render() {

    const buttonActions = {
      'edit': this.handleEdit,
      'delete': this.handleDelete,
    };
    const { deliveries, filter, onFilterChange, filters, setOrder, order } = this.props;

    return (
      <div className='col-12' style={{ marginTop: '20px' }}>
        <div className='row-fluid'>
          <div className='col-12 d-inline-block titleContainer'>
            <div className='float-left col-9 title'>
              <span>
                {DELIVERY_LIST_TITLE}
              </span>
            </div>
            <div className='float-right col-2'>
              <button onClick={this.onTemplateButtonClick} className='btn btn-primary float-right'>
                {DELIVERY_BUTTON_LABEL}
              </button>
            </div>
          </div>
        </div>

        <Filter onFilterChange={onFilterChange} filter={filter} filters={filters} />

        <Grid setOrder={setOrder}
          buttonActions={buttonActions}
          deliveries={this.state.deliveries}
          cols={columnsConfig}
          order={order} />
        <Pager
          items={deliveries}
          onChangePage={this.onPagerChangePage}
          itemsPerPage={5} />
      </div>
    );
  }
}

export default withRouter(List);