import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import "./LoginRegister.css";
import { registerUser } from "../Store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { RootState } from "../Store/Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email address"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleRegister = async (form: RegisterFormsInputs) => {
    dispatch(registerUser({ email: form.email, username: form.userName, password: form.password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <div className="login-container">
      <h2>Sign in to your account</h2>
      <Form onSubmit={handleSubmit(handleRegister)} className="form-container">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
            className="form-input"
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
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

        <Button variant="primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Registering...' : 'Sign Up'}
        </Button>
      </Form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Register;
