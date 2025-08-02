import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField, Button, Typography, Alert, Paper, Snackbar, IconButton, Tooltip } from "@mui/material";

import { setUrls, deleteUrl, clearUrls } from '../features/user/userSlice';
import { fetchUrls, fetchDeleteUrl, fetchShortenUrl, fetchDeleteAllUrls } from '../service/ApiService';




const TablePage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urls = useSelector(state => state.user.urls);


  useEffect(() => {
    fetchUrls().then(urls => dispatch(setUrls(urls)));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await fetchDeleteUrl(id);
      dispatch(deleteUrl(id));
      setSuccess("URL deleted successfully.");
    } catch {
      setError("Failed to delete URL.");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await fetchDeleteAllUrls();
      dispatch(clearUrls());
      setSuccess("All URLs deleted.");
    } catch {
      setError("Failed to delete all URLs.");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form));

  try {
    await fetchShortenUrl(data.url);
    const updatedUrls = await fetchUrls();
    dispatch(setUrls(updatedUrls));
    setSuccess("URL shortened successfully!");
    form.reset();
  } catch (err) {
    setError("Error shortening URL.");
  }
};


  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, p: 2 }}>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mb: 4,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
        }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
          Shorten Your URL
        </Typography>
        <TextField
          required
          fullWidth
          label="Paste your long URL here"
          name="url"
          placeholder="https://example.com/your-long-url"
          type="url"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ fontWeight: 600 }}
        >
          Shorten
        </Button>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Tooltip title="Delete all URLs">
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAll}
            sx={{ fontWeight: 600 }}
          >
            Delete All
          </Button>
        </Tooltip>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="urls table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Short URL</b></TableCell>
              <TableCell><b>Original URL</b></TableCell>
              <TableCell><b>Created At</b></TableCell>
              <TableCell><b>Created By</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">No URLs found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              urls.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/details/${item.id}`)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <a
                      href={item.shortenedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      {item.shortenedUrl}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#333", textDecoration: "underline" }}
                    >
                      {item.originalUrl?.toString().slice(0, 50) || '—'}
                    </a>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete this URL">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)} sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TablePage;