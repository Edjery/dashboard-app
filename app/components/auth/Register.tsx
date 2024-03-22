"use client";

import UserSchema from "@/app/api/register/UserSchema";
import axiosInstance from "@/app/services/apiClient";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import IRegisterValues from "./IRegisterValues";

const Register = () => {
  const initialValues: IRegisterValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IRegisterValues) => {
    console.log("Submitting...");
    try {
      const response = await axiosInstance.post("/register", values);
      console.log("Registration successful:", response.data);
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
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <Box maxWidth="500px" m="auto">
      <Toolbar />
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values: IRegisterValues) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight="bold" textAlign="center">
                Create Account
              </Typography>

              <FormControl>
                <Field
                  as={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
              </FormControl>
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
              <Button type="submit">Register</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
