import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export class ModalWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { modalShow, grid, handleClose } = this.props;
    return (
      <Modal show={modalShow[0]} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Set Weight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="modal_weight">
              <Form.Label>
                Choose the weight of node-{modalShow[1]}-{[modalShow[2]]}
              </Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: "100px" }}
            onClick={() => handleClose()}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{ width: "100px" }}
            onClick={() => {
              grid[modalShow[1]][modalShow[2]].weight = parseInt(
                document.getElementById("modal_weight").value
              );
              handleClose();
            }}
          >
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
