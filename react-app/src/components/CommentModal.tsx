import React, { ChangeEvent, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Rating from "react-rating";

const CommentModal: React.FC<{
  userEmail: string | null;
  courseName: string;
  token: string | null;
}> = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [alertMsg, setAlertMsg] = useState<string>("");
  const [isShowAlert, setIsShowAlert] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();

      const fetchBody = {
        userEmail: props.userEmail,
        courseName: props.courseName,
        comment,
        rating,
      };

      const queryRoute: string = "/course/comment/update";

      const fetchRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(fetchBody),
        }
      );

      const result = await fetchRes.json();

      console.log(fetchRes.status);

      if (
        fetchRes.status === 500 ||
        fetchRes.status === 401 ||
        fetchRes.status === 400
      ) {
        setShow(false);
        throw new Error(result.message);
      }

      setShow(false);
      setAlertMsg("已成功評價");
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
      }, 3000);
    } catch (err) {
      console.error(err.message);
      setAlertMsg(err.message);
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
      }, 3000);
    }
  };

  const handleRatingOnchange = (value: any) => {
    setRating(value);
  };

  function handleCommentOnChange(event: ChangeEvent<HTMLInputElement>) {
    setComment(event.currentTarget.value);
  }

  return (
    <>
      {isShowAlert && (
        <Alert key="info" variant="warning" className="warning-alert">
          {alertMsg}
        </Alert>
      )}
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
              maxLength={300}
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
              disabled={
                !rating ||
                !comment ||
                !props.userEmail ||
                !props.token ||
                !props.courseName
              }
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
