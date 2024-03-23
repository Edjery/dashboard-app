import { Button, CircularProgress, Typography } from "@mui/material";

interface Props {
  isSubmitting: boolean;
  buttonText: string;
}

const LoadingButton = ({ isSubmitting, buttonText }: Props) => {
  return (
    <Button type="submit" variant="contained" disabled={isSubmitting}>
      {isSubmitting ? (
        <CircularProgress color="primary" size={30} sx={{ padding: 1 }} />
      ) : (
        <Typography fontSize={20} sx={{ padding: 1 }}>
          {buttonText}
        </Typography>
      )}
    </Button>
  );
};

export default LoadingButton;
