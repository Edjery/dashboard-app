"use client";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
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
import ILoginValues from "./ILoginValues";
import LoginSchema from "./LoginSchema";

const Login = () => {
  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const handleSubmit = async (values: ILoginValues) => {
    console.log("Submitting...");
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    }).then((response) => {
      console.log("Sign in successful:", response);

      if (response?.error) {
        console.log("Incorrect credentials, please try again");

        toast.error("Incorrect credentials, please try again", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        router.push("/");
      }
    });
    console.log(res);
  };
  return (
    <Box maxWidth="500px" m="auto">
      <ToastContainer />
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
              <Button type="submit" variant="contained">
                Login
              </Button>
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
