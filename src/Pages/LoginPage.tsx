import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./LoginRegister.css";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(handleLogin)} className="form-container">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("userName")}
            className="form-input"
          />
          {errors.userName && (
            <Form.Text className="text-danger">
              {errors.userName.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            className="form-input"
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
          
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="register-link">
        Don’t have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
