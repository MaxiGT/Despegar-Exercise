import React from 'react';
import './filter.css';
import Input from "../Input/Input";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    const { filters } = props;
    const { name, address, phone } = this.props.filter;
    this.state = {
      name,
      address,
      phone,
      filters,
    };
  }

  handleSubmit = () => {
    const newFilter = {
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
    };
    this.props.onFilterChange(newFilter);
  }

  handleOnChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  renderFilters = () => {
    return this.state.filters.filter((f) => f.isSelected)
      .map((filter, idx) => {
        return(
          <div className={`col-6 ${idx >= 2 ? 'filterPaddingTop' : ''} ${idx % 2 ? 'float-right' : 'float-left'}`}>
            <Input label={filter.label}
              name={filter.name}
              type={filter.type}
              value={this.state[filter.name]}
              placeholder={filter.placeholder}
              onChange={this.handleOnChange} />
          </div>
        );
      });
  }

  render() {
    return(
      <div className='row-fluid col-8 filterContainer d-flex'>
        <div className='d-inline-block' style={{ marginTop: 'inherit', marginBottom: 'inherit' }}>
          <div className='col-1 float-left'>
            Filtros
          </div>
          <div className='col-11 float-right'>
            {this.renderFilters()}
          </div>
        </div>
        <div style={{ marginTop: 'inherit' }}>
          <button style={{ marginTop: '0px' }} type="button" class="btn btn-primary" onClick={this.handleSubmit}>Apply</button>
        </div>
      </div>
    );
  };

}

export default Filter;