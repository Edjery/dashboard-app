"use client";

import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ILoginValues from "./ILoginValues";
import LoginSchema from "./LoginSchema";

const Login = () => {
  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ILoginValues) => {
    console.log("Submitting...");
    signIn("credentials", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        console.log("Sign in successful:", response);
      })
      .catch((error) => {
        console.error("Sign in failed:", error);
      });
  };
  return (
    <Box maxWidth="500px" m="auto">
      <Toolbar />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values: ILoginValues) => {
          console.log(values);
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
              <Button type="submit">Login</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
