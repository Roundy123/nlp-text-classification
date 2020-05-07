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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <div className="App">
        <Container className="themed-container" fluid={true}>
          <Row>
            <Col xs="4">
              <Form>
                <FormGroup>
                  <Label>Add text below</Label>
                  <Input
                    type="textarea"
                    placeholder="Add text here"
                    value={this.state.message}
                    onChange={(e) => this.setState({ text: e.target.value })}
                  ></Input>
                </FormGroup>
                <Button color="danger">Button</Button>
              </Form>
            </Col>
            <Col xs="8">second</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
