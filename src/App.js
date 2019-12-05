import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateProduct from "./components/create-product.component";
import CreateBrand from "./components/create-brand.component";
import EditProduct from "./components/edit-product.component";
import ProductList from "./components/product-list.component";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-product"} className="nav-link">
                  FDProductManagement
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-product"} className="nav-link">
                    Create Product
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/create-brand"} className="nav-link">
                    Create Brand
                  </Link>
                </Nav>

                {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

                <Nav>
                  <Link to={"/product-list"} className="nav-link">
                    Product List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={CreateProduct} />
                  <Route path="/create-product" component={CreateProduct} />
                  <Route path="/create-brand" component={CreateBrand} />
                  <Route path="/edit-product/:id" component={EditProduct} />
                  <Route path="/product-list" component={ProductList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
