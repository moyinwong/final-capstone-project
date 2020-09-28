import React, { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const CommentModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comment, setComment] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(comment);
  };

  function handleCommentOnChange(event: ChangeEvent<HTMLInputElement>) {
    setComment(event.currentTarget.value);
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
         評價
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>請填寫評價</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Control as="textarea" onChange={handleCommentOnChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              關閉
            </Button>
            <Button variant="primary" type="submit">
              提交
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CommentModal;
