import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { switchDarkMode } from "../redux/dark/actions";
import { IRootState } from "../redux/store";
import "./DarkModeSwitch.scss";

const DarkModeSwitch: React.FC = () => {
  const isDarkMode: Boolean | undefined = useSelector(
    (state: IRootState) => state.dark.mode
  );

  const dispatch = useDispatch();

  return (
    <Form>
      <Form.Check
        type="switch"
        id="dark-mode-switch"
        label="黑夜模式"
        onChange={() => {
          dispatch(switchDarkMode(!isDarkMode));
        }}
        checked={isDarkMode as any}
      />
    </Form>
  );
};

export default DarkModeSwitch;
