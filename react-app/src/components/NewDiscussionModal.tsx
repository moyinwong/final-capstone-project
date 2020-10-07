import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { IThread } from "../pages/LessonPage";

const NewDiscussionModal: React.FC<{
  userEmail: string | null | undefined;
  lessonId: number;
  discussionId?: number;
  type: string;
  token: string | null;
  setThreads: Function;
}> = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newTopic, setNewTopic] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [isShowAlert, setIsShowAlert] = useState(false);

  const getThreads = async (lessonId: number) => {
    let queryRoute: string = "/lesson/threads/retrieve/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonId}`
    );

    const result = await fetchRes.json();
    const { threads } = result;

    //sort the thread by discussion id
    threads.sort((a: IThread, b: IThread) => a.discussion_id - b.discussion_id);
    //console.log("threads :", threads);
    props.setThreads(threads);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();

      const fetchBody = {
        userEmail: props.userEmail,
        lessonId: props.lessonId,
        discussionId: props.discussionId,
        newTopic,
        newContent,
      };

      //console.log(fetchBody);

      let queryRoute: string =
        props.type === "topic"
          ? "/lesson/topic/create"
          : "/lesson/thread/create";

      const fetchRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(fetchBody),
        }
      );

      const result = await fetchRes.json();

      //console.log(fetchRes.status);

      if (
        fetchRes.status === 500 ||
        fetchRes.status === 401 ||
        fetchRes.status === 400
      ) {
        setShow(false);
        throw new Error(result.message);
      }

      setShow(false);
      setAlertMsg("已成功新增");
      setIsShowAlert(true);
      getThreads(props.lessonId);
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

  const handleTopicOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopic(event.currentTarget.value);
  };

  function handleContentOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewContent(event.currentTarget.value);
  }

  return (
    <>
      {isShowAlert && (
        <Alert key="info" variant="warning" className="warning-alert">
          {alertMsg}
        </Alert>
      )}
      <Button variant="primary" onClick={handleShow}>
        {props.type === "topic" ? "新增討論題目" : "新增回覆"}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            {props.type === "topic" ? (
              <Modal.Title style={{ width: "100%" }}>
                <Form.Group controlId="form-topic">
                  <Form.Label>題目</Form.Label>
                  <Form.Control
                    type="topic"
                    placeholder="新增題目"
                    maxLength={50}
                    onChange={handleTopicOnchange}
                  />
                </Form.Group>
              </Modal.Title>
            ) : (
              <Modal.Title>新增回覆</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="form-topic">
              <Form.Label>新增內容</Form.Label>
              <Form.Control
                as="textarea"
                type="reply"
                placeholder="新增內容"
                maxLength={500}
                style={{ height: 200 }}
                onChange={handleContentOnChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              關閉
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={
                props.type === "topic"
                  ? !props.userEmail || !newContent || !newTopic
                  : !props.userEmail || !props.discussionId || !newContent
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

export default NewDiscussionModal;
