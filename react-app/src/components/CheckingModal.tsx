import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function CheckingModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          答案檢查結果
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>關閉</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckingModal;
