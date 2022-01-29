import { Col, Container, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ autenticate }) {
  const [mobilephone, setMobilephone] = useState('');

  const navigate = useNavigate();

  function validarFormulario() {
    return mobilephone.length > 0;
  }

  async function manejarSubmit(event) {
    event.preventDefault();
    console.log('mobilephone: ', mobilephone);
    await axios
      .post('https://v3.tissini.app/api/v3/login/client', {
        mobilephone: mobilephone,
      })
      .then((response) => {
        localStorage.setItem('user', true);
        autenticate();
        navigate('/');
      });
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <h1>Autenticarse</h1>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <Form onSubmit={manejarSubmit}>
            <Form.Group controlId='mobilephone'>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingrese su telefono'
                value={mobilephone}
                onChange={(e) => setMobilephone(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Nunca compartiremos su informacion con nadie.
              </Form.Text>
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              disabled={!validarFormulario()}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
