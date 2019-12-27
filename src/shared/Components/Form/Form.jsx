import React from 'react';
import { withRouter } from 'react-router-dom';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import _ from 'lodash';
import { inputsForm, adminContactInputs, comercialContactInputs } from '../../../constants/shared';
import AdminContactForm from '../AdminContactForm/AdminContactForm'
import './form.css';

const DELIVERY_LIST_TITLE = 'Datos administrativos';

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { selectedDelivery } = this.props;
    this.state = {
      ...selectedDelivery,
    };
    this.validateForm();
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if (this.props.totalresults > parseInt(params.id) > 0) {
      this.props.recoverDelivery(parseInt(params.id));
    } 
  }

  validateForm = () => {
    const requiredInputs = (inputsForm.concat(adminContactInputs).concat(comercialContactInputs)).filter((i) => i.isRequired);
    const isValid = requiredInputs.reduce((acum, i) => {
      let a, b;
      if (typeof acum === 'object') {
        a = !!(_.get(this.state, acum.validateField, false));
        b = !!(_.get(this.state, i.validateField, false));
      }
      if (typeof acum === 'boolean' ) {
        a = acum;
        b = !!(_.get(this.state, i.validateField, false));
      }
      return a && b;
    });

    if (isValid !== this.state.isValid) this.setState({ isValid });
  }

  handleChange = (evt) => {
    if (evt.target) {
      this.setState({
        [evt.target.name]: evt.target.value,
      }, () => {
        this.validateForm();
      });
    } else if (evt.isAdmin) {
      const adminContact = evt;
      this.setState({
        adminContact,
      }, () => {
        this.validateForm();
      });
    } else {
      const comercialContact = evt;
      this.setState({
        comercialContact,
      }, () => {
        this.validateForm();
      });
    }
    
  }

  handleCancel = () => {
    this.props.history.push('/');
  }

  handleSave = () => {
    const { match: { params } } = this.props;
    if (params.id > 0) {
      this.props.updateDelivery(this.state);
    } else {
      this.props.createDelivery(this.state);
    }
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <div className='col-12 title_header'>
          <div className='row-fluid'>
            <div className='col-12 d-inline-block titleContainer'>
              <div className='float-left col-9 title'>
                <span>
                  {DELIVERY_LIST_TITLE}
                </span>
              </div>
            </div>
          </div>
        </div>
        {
          inputsForm.map((i, idx) => {
            const Component = i.component;
            return (
              <div key={idx} className='col-6'>
                <Component key={idx} onChange={this.handleChange} value={this.state[i.name]} {...i} />
              </div>
            );
          })
        }
        {/* Time Picker */}
        <div className='col-6 d-flex'>
          <div className='col-4 timePicker_wrapper form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span 
                  className="input-group-text timePicker_label" id="inputGroup-sizing-default">From</span>
              </div>
              <TimePicker
                value={this.state['from']}
                dateInput={true}
                onChange={this.handleChange}
                name={'from'}
                format="HH:mm"
                formatPlaceholder={{ hour: 'h', minute: 'm' }} />
            </div>
          </div>
          <div className='col-4 timePicker_wrapper form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span
                  className="input-group-text timePicker_label" id="inputGroup-sizing-default">To</span>
              </div>
              <TimePicker
                value={this.state['to']}
                dateInput={true}
                onChange={this.handleChange}
                name={'to'}
                format="HH:mm"
                formatPlaceholder={{ hour: 'h', minute: 'm' }} />
            </div>
          </div>
        </div>
        {/* Admin Contact */}
        <div className='col-12 d-flex'>
          <div className='timePicker_wrapper col-6'>
            <div className='row-fluid'>
              <div className='col-12 d-inline-block titleContainer title_header'>
                <div className='float-left col-9 title'>
                  <span>
                    Contacto administrativo
                  </span>
                </div>
              </div>
            </div>
            <div>
              <AdminContactForm config={adminContactInputs}
                onChange={this.handleChange}
                isAdmin={true}
                value={this.state.adminContact} />
            </div>
          </div>
          <div className='timePicker_wrapper col-6'>
            <div className='row-fluid'>
              <div className='col-12 d-inline-block titleContainer title_header'>
                <div className='float-left col-9 title'>
                  <span>
                    Contacto comercial
                  </span>
                </div>
              </div>
            </div>
            <div>
              <AdminContactForm config={comercialContactInputs} onChange={this.handleChange} isAdmin={false} value={this.state.comercialContact} />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className='col-11 button_container'>
          <div className='float-right'>
            <button className='btn btn-lg btn-primary'
              onClick={this.handleCancel}>Cancelar</button>
            <button disabled={!this.state.isValid} className='btn btn-lg btn-primary'
              onClick={this.handleSave} style={{ marginLeft: '5px'}}>Guardar</button>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Form);