import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductDescription = this.onChangeProductDescription.bind(
      this
    );
    this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
    this.onChangeProductFabricationDate = this.onChangeProductFabricationDate.bind(
      this
    );
    this.onChangeProductWarrantyExpireDate = this.onChangeProductWarrantyExpireDate.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: "",
      description: "",
      price: 0.0,
      brands: [],
      fabricationDate: new Date(),
      warrantyExpireDate: new Date()
    };
  }

  componentDidMount() {
    fetch("https://localhost:44397/brand")
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        this.setState({ brands: data.response });
      });

    console.log("Retorno da API", this.state.brands);
  }

  onChangeProductName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeProductDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeProductPrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeProductBrand(e) {
    this.setState({ brands: e.target.value });
  }

  onChangeProductFabricationDate(e) {
    this.setState({ fabricationDate: e.target.value });
  }

  onChangeProductWarrantyExpireDate(e) {
    this.setState({ warrantyExpireDate: e.target.value });
  }

  handleFabricationDateChange = date => {
    this.setState({
      fabricationDate: date
    });
  };

  handleWarrantyExpireDateChange = date => {
    this.setState({
      warrantyExpireDate: date
    });
  };

  handleBrandChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOptions = () =>
    this.state.brands.length
      ? this.state.brands.map(data => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))
      : "";

  onSubmit(e) {
    e.preventDefault();

    const ProductObject = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      brand: this.state.brands,
      fabricationDate: this.state.fabricationDate,
      warrantyExpireDate: this.state.warrantyExpireDate
    };

    fetch("https://localhost:44397/brand", {
      method: "post",
      headers: {
        "content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: ProductObject.name,
        description: ProductObject.description,
        price: ProductObject.price,
        fabricationDate: ProductObject.fabricationDate,
        warrantyExpireDate: ProductObject.warrantyExpireDate
      })
    }).then(response => {
      console.log(response);
    });

    this.setState({
      name: "",
      description: "",
      price: "",
      fabricationDate: "",
      warrantyExpireDate: ""
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeProductName}
            />
          </Form.Group>

          <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              value={this.state.description}
              onChange={this.onChangeProductDescription}
            />
          </Form.Group>

          <Form.Group controlId="Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={this.state.Price}
              onChange={this.onChangeProductPrice}
            />
          </Form.Group>

          <Form.Group controlId="Brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brand"
              as="select"
              onChange={this.handleBrandChange}
            >
              {this.createOptions()}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="FabricationDate">
            <Form.Label>Fabrication Date</Form.Label>
            <Form.Row>
              <DatePicker
                selected={this.state.warrantyExpireDate}
                onChange={this.handleWarrantyExpireDateChange}
              />
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="WarrantyExpireDate">
            <Form.Label>Warranty Expire Date</Form.Label>
            <Form.Row>
              <DatePicker
                selected={this.state.warrantyExpireDate}
                onChange={this.handleWarrantyExpireDateChange}
              />
            </Form.Row>
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create Product
          </Button>
        </Form>
      </div>
    );
  }
}
