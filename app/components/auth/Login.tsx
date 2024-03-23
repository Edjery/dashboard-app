"use client";

import {
  Box,
  FormControl,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import loginSchema from "../../schema/loginSchema";
import LoadingButton from "../LoadingButton";
import popUpError from "../popUpError";
import ILoginValues from "./interface/ILoginValues";

const Login = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ILoginValues) => {
    setSubmitting(true);
    console.log("Submitting...");
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          popUpError("Incorrect credentials, please try again");
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        popUpError("Sign in failed");
        console.error("Sign in failed:", error);
      });
    setSubmitting(false);
  };
  return (
    <Box maxWidth="500px" m="auto">
      <ToastContainer />
      <Toolbar />
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values: ILoginValues) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight="bold" textAlign="center">
                Sign in Account
              </Typography>
              <FormControl>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
              </FormControl>
              <FormControl>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
              </FormControl>
              <LoadingButton isSubmitting={submitting} buttonText="Login" />
            </Stack>
          </Form>
        )}
      </Formik>
      <Link href="/register" underline="none">
        <Typography marginTop="10px" textAlign="right">
          {`Don't have an account? Sign Up!`}
        </Typography>
      </Link>
    </Box>
  );
};

export default Login;
