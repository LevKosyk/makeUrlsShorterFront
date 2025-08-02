import React from "react";
import { Box, TextField, Button, Typography, Alert, Paper } from "@mui/material";
import { useDispatch } from "react-redux";

import { login } from "../features/user/userSlice";
import { fetchLogin } from "../service/ApiService";


export default function LoginPage() {
  const [error, setError] = React.useState(null);
  const [action, setAction] = React.useState(null);
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setAction(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await fetchLogin(data.email, data.password);
      dispatch(login(data.email));
      setAction(`Logged in as ${data.email}`);
    } catch (err) {
      setError("Login failed. Please check your credentials." + err.message);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ maxWidth: 420, mx: "auto", mt: 6, p: 4, borderRadius: 2, display: "flex", flexDirection: "column", gap: 3, backgroundColor: "#fafafa" }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>Login</Typography>

      <TextField required fullWidth label="Email" name="email" type="email" variant="outlined" />
      <TextField required fullWidth label="Password" name="password" type="password" variant="outlined" />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 1 }}>
        <Button variant="contained" type="submit" fullWidth>Login</Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {action && <Typography variant="body2" color="success.main" align="center" sx={{ mt: 1, fontWeight: "medium" }}>{action}</Typography>}
    </Paper>
  );
}
