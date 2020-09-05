import React from "react";
import { useFormState } from "react-use-form-state";
import { Form, Button } from "react-bootstrap";

function LoginPage() {
  const [formState, { text, password }] = useFormState();

  //handle submit
  function submitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(formState.values);
  }

  return (
    <div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...text("username")} required placeholder="Username" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...password("password")}
          required
          minLength={8}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={submitHandler}>
        Submit
      </Button>
    </div>
  );
}

export default LoginPage;
