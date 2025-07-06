import React from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";

type LoginComponentProps = {
  onLoginSuccess?: () => void;
};

class LoginComponent extends React.Component<
  LoginComponentProps & any,
  { errorMsg: string }
> {
  state = { errorMsg: "" };

  handleSubmit = (values: any) => {
    const { username, password } = values;
    if (username === "admin" && password === "1234") {
      if (this.props.onLoginSuccess) {
        this.props.onLoginSuccess();
      }
    } else {
      this.setState({ errorMsg: "Invalid credentials" });
    }
  };

  render() {
    const { errorMsg } = this.state;

    return (
      <div
        id="login-component"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#232b3e",
        }}
      >
        <Card
          style={{
            minWidth: 340,
            boxShadow: "0 2px 16px #0003",
            background: "#232b3e",
            border: "1px solid #3e4a6b",
          }}
          styles={{ body: { padding: 32 } }}
        >
          <Typography.Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: "#fff",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: 2,
              textShadow: "0 1px 2px #0006",
            }}
          >
            Login
          </Typography.Title>
          <Form
            layout="vertical"
            onFinish={this.handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              label={
                <span style={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Username
                </span>
              }
            >
              <Input
                autoFocus
                style={{
                  background: "#232b3e",
                  color: "#fff",
                  border: "1px solid #3e4a6b",
                }}
                placeholder="Enter your username"
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              label={
                <span style={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Password
                </span>
              }
            >
              <Input.Password
                style={{
                  background: "#232b3e",
                  color: "#fff",
                  border: "1px solid #3e4a6b",
                }}
                placeholder="Enter your password"
              />
            </Form.Item>
            {errorMsg && (
              <Form.Item>
                <Alert message={errorMsg} type="error" showIcon />
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  fontWeight: 600,
                  letterSpacing: 1,
                  background:
                    "linear-gradient(90deg, #2b3556 0%, #3e4a6b 100%)",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 2px 8px #0002",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default LoginComponent;
