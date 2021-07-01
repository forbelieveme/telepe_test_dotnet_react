import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.company.id,
      id_number: this.props.company.id_number,
      company_name: this.props.company.company_name,
      id_type: this.props.company.id_type,
      first_name: this.props.company.first_name,
      second_name: this.props.company.second_name,
      first_lastName: this.props.company.first_lastName,
      second_lastName: this.props.company.second_lastName,
      email: this.props.company.email,
      sms_send: this.props.company.sms_send,
      email_send: this.props.company.email_send,
      auth: this.props.company.auth,
      invalid: false,
      error_email: '',
    };
  }

  onChange = (event) => {
    const { id, value, checked } = event.target;
    switch (id) {
      case 'id_number':
        this.setState({ id_number: value });
        break;
      case 'company_name':
        this.setState({ company_name: value });
        break;
      case 'id_type':
        this.setState({ id_type: value });
        break;
      case 'first_name':
        this.setState({ first_name: value });
        break;
      case 'second_name':
        this.setState({ second_name: value });
        break;
      case 'first_lastName':
        this.setState({ first_lastName: value });
        break;
      case 'second_lastName':
        this.setState({ second_lastName: value });
        break;
      case 'email':
        this.setState({ error_email: !validarEmail(value) });
        this.setState({ email: value });
        break;
      case 'sms_send':
        this.setState({ sms_send: checked });
        break;
      case 'email_send':
        this.setState({ email_send: checked });
        break;
      default:
        return;
    }
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    //llamar a la api
    const data = this.state;

    fetch(`https://localhost:5000/api/Usuarios/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    const { documentType, company } = this.props;
    const { error_email } = this.state;
    // console.log(documentType);
    // console.log(company);
    return (
      <div className='container'>
        <div className='card'>
          <div className='card-header'>Registro</div>
          <div className='card-body'>
            <div>
              <h3>Ingrese el NIT de la persona natural</h3>
              <form>
                <div className='mb-1'>
                  <label className='form-label' htmlFor='id_type'>
                    id_type
                  </label>
                  <select
                    className='form-control'
                    name='id_type'
                    id='id_type'
                    onChange={this.onChange}
                    value={this.state.id_type}>
                    <option value='nit'>nit</option>
                    <option value='cedula'>cedula</option>
                    <option value='id_extranjeria'>id_extranjeria</option>
                  </select>
                </div>
                <div className='mb-1'>
                  <label className='form-label' htmlFor='id_number'>
                    id_number
                  </label>
                  <input
                    className='form-control'
                    type='number'
                    name='id_number'
                    id='id_number'
                    value={this.state.id_number}
                    onChange={this.onChange}
                  />
                  {!new RegExp('^[0-9]*$').test(this.state.id_number) && (
                    <span className='form-text'>No puede contener letras</span>
                  )}
                </div>
                {this.state.id_type != 'cedula' && (
                  <div className='mb-1'>
                    <label className='form-label' htmlFor='company_name'>
                      company_name
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='company_name'
                      id='company_name'
                      value={this.state.company_name}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                {this.state.id_type === 'cedula' && (
                  <div className='mb-1'>
                    <label className='form-label' htmlFor='first_name'>
                      first_name
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='first_name'
                      id='first_name'
                      value={this.state.first_name}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                {this.state.id_type === 'cedula' && (
                  <div className='mb-1'>
                    <label className='form-label' htmlFor='second_name'>
                      second_name
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='second_name'
                      id='second_name'
                      value={this.state.second_name}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                {this.state.id_type === 'cedula' && (
                  <div className='mb-1'>
                    <label className='form-label' htmlFor='first_lastName'>
                      first_lastName
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='first_lastName'
                      id='first_lastName'
                      value={this.state.first_lastName}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                {this.state.id_type === 'cedula' && (
                  <div className='mb-1'>
                    <label className='form-label' htmlFor='second_lastName'>
                      second_lastName
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='second_lastName'
                      id='second_lastName'
                      value={this.state.second_lastName}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                <div className='mb-1'>
                  <label className='form-label' htmlFor='email'>
                    email
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='email'
                    id='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <span>{error_email && "Email invalido"}</span>
                </div>
                <div className='mb-1 form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='sms_send'
                    name='sms_send'
                    checked={this.state.sms_send}
                    onChange={this.onChange}
                  />
                  <label className='form-check-label' htmlFor='sms_send'>
                    I authorize the sending of messages to the cell phone provided
                  </label>
                </div>
                <div className='mb-1 form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='email_send'
                    name='email_send'
                    checked={this.state.email_send}
                    onChange={this.onChange}
                  />
                  <label className='form-check-label' htmlFor='email_send'>
                    I authorize messages to be sent to the following e-mail address
                  </label>
                </div>
                <button type='submit' className='btn btn-lg col-12 btn-primary mt-2' onClick={this.onSubmit}>
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validarEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
