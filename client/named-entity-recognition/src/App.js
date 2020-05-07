import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      apiOutput: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.text);
    axios
      .post("/data", {
        text: this.state.text,
      })
      .then((res) => {
        console.log(res.data.count);
        this.setState({ apiOutput: res.data.count });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Container className="themed-container" fluid={true}>
          <Row>
            <Col xs="4">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Add text below</Label>
                  <Input
                    type="textarea"
                    placeholder="Add text here"
                    value={this.state.message}
                    onChange={(e) => this.setState({ text: e.target.value })}
                  ></Input>
                </FormGroup>
                <Button color="danger" type="submit">
                  Button
                </Button>
              </Form>
            </Col>
            <Col xs="8">
              second
              {JSON.stringify(this.state.apiOutput)}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
