import React, { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Rating from "react-rating";

const CommentModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(comment);
    console.log(rating);

    //fetch
  };

  const handleRatingOnchange = (value: any) => {
    setRating(value);
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
            <Form.Control
              as="textarea"
              onChange={handleCommentOnChange}
              style={{ height: 150 }}
            />
            <div style={{ margin: 10 }}>
              評分：
              <Rating
                onChange={handleRatingOnchange}
                stop={5}
                emptySymbol={[
                  "far fa-star fa-2x",
                  "far fa-star fa-2x",
                  "far fa-star fa-2x",
                  "far fa-star fa-2x",
                  "far fa-star fa-2x",
                ]}
                fullSymbol={[
                  "fas fa-star fa-2x",
                  "fas fa-star fa-2x",
                  "fas fa-star fa-2x",
                  "fas fa-star fa-2x",
                  "fas fa-star fa-2x",
                ]}
                initialRating={rating}
                quiet={true}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              關閉
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!rating || !comment}
            >
              提交
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CommentModal;
