import React from 'react';

class AdminContactForm extends React.Component {
  constructor(props) {
    super(props);
    const { value = {}, isAdmin } = this.props;
    this.state = {
      ...value,
      isAdmin,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {

    const { config } = this.props;
    
    return (
      <div style={{ paddingLeft: '0' }} className='col-9'>
        {
          config.map((i, idx) => {
            const Component = i.component;
            return (
              <Component key={idx} onChange={this.handleChange} value={this.state[i.name]} {...i} />
            );
          })
        }
      </div>
    );
  }
}

export default AdminContactForm;