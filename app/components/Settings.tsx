import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Title from "./Title";

const Settings = () => {
  const { data } = useSession();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Paper sx={{ p: 2 }}>
              <Title>Settings</Title>
              <Typography fontWeight="bold">
                Two Factor Authentication
              </Typography>
              <Typography>
                You can set up a two factor authentication using AuthenFace
              </Typography>
              <Link
                href="http://localhost:1776/register"
                target="_blank"
                underline="none"
              >
                <Button sx={{ maxWidth: 200, p: 1, my: 1 }} variant="outlined">
                  Setup AuthenFace
                </Button>
              </Link>
              <Typography fontWeight="bold">{`Here's how you can get started`}</Typography>
              <Box pl={1}>
                <Typography>
                  Click the button above to setup AuthenFace
                </Typography>
                <Typography>Register an account!</Typography>
                <Typography>Register an this website</Typography>
                <Typography>Register an this website</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings;
