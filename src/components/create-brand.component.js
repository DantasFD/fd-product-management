import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class CreateBrand extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeBrandName = this.onChangeBrandName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: ""
    };
  }

  onChangeBrandName(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    console.log("Passei por aqui");
    e.preventDefault();

    const BrandObject = {
      name: this.state.name
    };

    var data = new FormData();
    data.append("json", JSON.stringify(BrandObject));

    fetch("https://localhost:44397/brand", {
      method: "post",
      headers: {
        "content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: BrandObject.name
      })
    }).then(response => {
      console.log(response);
    });

    this.setState({
      name: ""
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
              onChange={this.onChangeBrandName}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create Brand
          </Button>
        </Form>
      </div>
    );
  }
}
