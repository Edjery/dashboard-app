"use client";

import registerSchema from "@/app/schema/registerSchema";
import axiosInstance from "@/app/services/apiClient";
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
import LoadingButton from "../LoadingButton";
import popUpError from "../popUpError";
import IRegisterValues from "./IRegisterValues";

const Register = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const initialValues: IRegisterValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IRegisterValues) => {
    setSubmitting(true);
    console.log("Submitting...");
    const response = await axiosInstance.post("/register", values);

    if (response.status === 201) {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            console.log(response);
            popUpError("Incorrect credentials, please try again");
          } else {
            return true;
          }
        })
        .catch((error) => {
          popUpError("Sign in failed");
          console.error("Sign in failed:", error);
          return false;
        });

      if (res) {
        router.push("/");
      }
    }

    setSubmitting(false);
  };
  return (
    <Box maxWidth="500px" m="auto">
      <ToastContainer />
      <Toolbar />
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values: IRegisterValues) => {
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
              <LoadingButton isSubmitting={submitting} buttonText="Register" />
            </Stack>
          </Form>
        )}
      </Formik>
      <Link href="/login" underline="none">
        <Typography marginTop="10px" textAlign="right">
          Already have an account? Sign In!
        </Typography>
      </Link>
    </Box>
  );
};

export default Register;
