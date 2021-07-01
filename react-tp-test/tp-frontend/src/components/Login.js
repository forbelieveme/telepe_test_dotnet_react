import React, { Component } from 'react';
import Register from './Register';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentType: 'nit',
      document: '',
      register: false,
      data: {},
      error: '',
    };
  }

  handleDocumentEditorChange = (ev) => {
    this.setState({ document: ev.target.value });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const data = { id_number: this.state.document.toString() };

    fetch('https://localhost:5000/api/Usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.error === 0) {
          this.setState({ documentType: data.id_type, register: true, data });
        }
        this.setState({ error: data.error });
        this.setState({ message: data.message });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    const { documentType, document, register, data, error } = this.state;
    return (
      <div>
        {!register ? (
          <div className='container'>
            <div className='card'>
              <div className='card-header'>Inscripción al servicio</div>
              <div className='card-body'>
                <h3>Ingrese el NIT de la persona natural</h3>
                <form className='row g-3'>
                  <div className='col-auto'>
                    <label htmlFor='inputPassword2' className='visually-hidden'>
                      Password
                    </label>
                    <input
                      className='form-control'
                      type='number'
                      value={document}
                      onChange={this.handleDocumentEditorChange}></input>
                  </div>
                  <div className='col-auto'>
                    <button type='submit' className='btn btn-primary mb-3' onClick={this.onSubmit}>
                      Continuar
                    </button>
                  </div>
                </form>
              </div>
              <span>{error && this.state.message}</span>
            </div>
          </div>
        ) : (
          <Register documentType={documentType} company={data} />
        )}
      </div>
    );
  }
}
