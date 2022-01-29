import { Button, Card, Col, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import axios from 'axios';

const cerrarSesion = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

export default class Home extends Component {
  state = {
    categorias: [],
    secciones: [],
  };

  componentDidMount() {
    axios.get('https://v3.tissini.app/api/v3/categories').then((res) => {
      this.setState({ categorias: res.data });
    });

    axios
      .get('https://v3.tissini.app/api/v3/categories/sections')
      .then((res) => {
        this.setState({ secciones: res.data });
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 12, offset: 6 }}>
            <Button onClick={cerrarSesion}>Cerrar Sesion</Button>
          </Col>
        </Row>
        <h1>Home</h1>
        <div>
          {this.state.secciones.map((seccion) => (
            <Card key={seccion.id} style={{ border: 'none' }}>
              <Card.Body>
                <Card.Img src={`https://v3.tissini.app/${seccion.image}`} />
                {seccion.products.map((productos) => (
                  <Card
                    key={productos.id}
                    style={{
                      width: '10rem',
                      display: 'inline-flex',
                      border: 'none',
                    }}
                  >
                    <Card.Body>
                      <Card.Img
                        variant='top'
                        src={`https://v3.tissini.app/${productos.image.url}`}
                      />
                      <Card.Text style={{ fontSize: '0.8em', margin: 0 }}>
                        {productos.name}
                      </Card.Text>
                      <Card.Text
                        style={{ fontSize: '0.8em', color: 'gray', margin: 0 }}
                      >
                        {productos.categories.parent.name}
                      </Card.Text>
                      <Card.Text
                        style={{
                          fontSize: '0.8em',
                          color: 'hotpink',
                          margin: 0,
                        }}
                      >
                        $ {productos.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          ))}
        </div>
        <div>
          <img
            src='https://v3.tissini.app/img/categories/product-lines.png'
            alt='Lineas'
          />
        </div>
        <div>
          {this.state.categorias.map((categoria) => (
            <Card key={categoria.id} style={{ border: 'none' }}>
              <Card.Body>
                <Card.Text style={{ fontSize: '0.8em', margin: 0 }}>
                  {categoria.name}
                </Card.Text>
                <Card.Img
                  src={`https://v3.tissini.app/${categoria.image}`}
                  style={{ height: '50%' }}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
