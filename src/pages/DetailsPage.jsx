import React from "react";
import { useParams } from "react-router-dom";
import { fetchDetailUrl } from "../service/ApiService";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Box,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function DetailsPage() {
  const { id } = useParams();
  const [url, setUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchDetailUrl(id)
      .then(data => {
        setUrl(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!url) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 8 }}>
        URL not found
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 6, px: 3 }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom noWrap>
            Short URL
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            sx={{ wordBreak: "break-word", mb: 2 }}
            component="a"
            href={url.shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url.shortenedUrl}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" fontWeight="bold" gutterBottom noWrap>
            Original URL
          </Typography>
          <Typography
            variant="body1"
            sx={{ wordBreak: "break-word", mb: 2 }}
            component="a"
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url.originalUrl}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body2">
                {new Date(url.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Created By
              </Typography>
              <Typography variant="body2">
                {url.createdBy || "Unknown"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "center", py: 2 }}>
          <Button
            variant="contained"
            color="primary"
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            size="large"
          >
            Go to Original URL
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
