import React from "react";
import { useFormState } from "react-use-form-state";
import { Form, Button } from "react-bootstrap";

function LoginPage() {
  const [formState, { text, password }] = useFormState();
  return (
    <div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <form>
        <input {...text("username")} required />
        <input {...password("password")} required minLength={8} />
      </form>
    </div>
  );
}

export default LoginPage;
