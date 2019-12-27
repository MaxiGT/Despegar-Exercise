import React from 'react';
import { adminContactInputs } from '../../../constants/shared';
import { shallow } from 'enzyme';
import AdminContactForm from './AdminContactForm';
import { spy } from 'sinon';
import Input from '../Input/Input';

describe('AdminContactForm', () => {

  const onChangeMock = spy();
  const isAdmin = true;
  const initialValue = {
    name: 'Admin Mock Name',
    lastName: 'Mock LastName',
    phone: '456 715 42',
    email: 'MockEmail@MockEmail.com',
  };
  const newValue = {
    name: 'New Admin Mock Name',
    lastName: 'New Mock LastName',
    phone: '(011) 456 715 42',
    email: 'NewMockEmail@MockEmail.com',
  };

  const form = shallow(<AdminContactForm
    config={adminContactInputs}
    onChange={onChangeMock}
    isAdmin={isAdmin}
    value={initialValue} />);

  it('Should render properly', () => {
    expect(form.find(Input).length).toEqual(adminContactInputs.length);
    expect(form).toMatchSnapshot();
  });

  it('Should react input change', () => {
    form.find({ name: 'name' }).simulate('change', { target: { name: '', value: '' } });
    expect(onChangeMock.called).toBe(true);
  });

  it('Should react to props change', () => {
    expect(form.instance().props.value).toEqual(initialValue);
    form.setProps({ value: newValue });
    expect(form.instance().props.value).toEqual(newValue);
  });
});

