import { Box, TextField, Button, Typography, Alert, Paper } from "@mui/material";
import { useState } from "react";

import { fetchRegister } from "../service/ApiService";


export default function RegisterPage() {
  const [action, setAction] = useState(null);
  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setAction(null);
  const data = Object.fromEntries(new FormData(e.currentTarget));
  try {
    if (!data.email || !data.password) {
      setError("Email and password are required.");
      return;
    }
    await fetchRegister(data.email, data.password);
    setAction(`Registered as ${data.email}`);
    
  } catch (err) {
    setError("Registration failed. " + (err.response?.data?.message || err.message));
  }
};


  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={4}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "#fafafa",
      }}
      noValidate
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Registration
      </Typography>


      <TextField
        required
        fullWidth
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="outlined"
      />
      <TextField
        required
        fullWidth
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        variant="outlined"
      />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 1 }}>
        <Button variant="contained" type="submit" fullWidth>
          Register
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {action && (
        <Typography
          variant="body2"
          color="success.main"
          align="center"
          sx={{ mt: 1, fontWeight: "medium" }}
        >
          {action}
        </Typography>

      )}
    </Paper>
  );
}
