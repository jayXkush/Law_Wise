import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  source: string;
  category: string;
  featured: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Supreme Court Landmark Ruling on Digital Privacy',
    summary: 'The Supreme Court has issued a groundbreaking decision strengthening digital privacy rights for citizens...',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'January 30, 2025',
    source: 'Legal Times',
    category: 'Constitutional Law',
    featured: true,
  },
  {
    id: 2,
    title: 'New Environmental Protection Laws Enacted',
    summary: 'Parliament passes comprehensive environmental protection legislation with stricter penalties...',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    date: 'January 29, 2025',
    source: 'Law Weekly',
    category: 'Environmental Law',
    featured: false,
  },
  {
    id: 3,
    title: 'Major Reform in Corporate Governance Rules',
    summary: 'SEBI introduces new corporate governance framework to enhance transparency and accountability...',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'January 28, 2025',
    source: 'Business Law Review',
    category: 'Corporate Law',
    featured: false,
  },
  {
    id: 4,
    title: 'AI Regulation Framework Proposed',
    summary: 'Government proposes new framework for regulating artificial intelligence and machine learning...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    date: 'January 27, 2025',
    source: 'Tech Law Journal',
    category: 'Technology Law',
    featured: false,
  },
  {
    id: 5,
    title: 'Changes in Family Law Guidelines',
    summary: 'Ministry of Law announces significant updates to family law guidelines affecting divorce proceedings...',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    date: 'January 26, 2025',
    source: 'Family Law Gazette',
    category: 'Family Law',
    featured: false,
  },
];

const NewsSection = () => {
  const featuredNews = newsItems.find((item) => item.featured);
  const regularNews = newsItems.filter((item) => !item.featured);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          mb: 2,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Legal News & Updates
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 6, textAlign: 'center' }}
      >
        Stay updated with the latest developments in law and justice
      </Typography>

      {featuredNews && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              mb: 6,
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="400"
                  image={featuredNews.image}
                  alt={featuredNews.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{
                      mb: 2,
                      background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
                    }}
                  />
                  <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                    {featuredNews.title}
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    {featuredNews.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {featuredNews.date} | {featuredNews.source}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
                      }}
                    >
                      Read Full Story
                    </Button>
                    <Box>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                      <IconButton size="small">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      )}

      <Grid container spacing={4}>
        {regularNews.map((news, index) => (
          <Grid item xs={12} sm={6} md={6} key={news.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={news.category}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      minHeight: 64,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {news.summary}
                  </Typography>
                  <Box
                    sx={{
                      mt: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {news.date}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                      <IconButton size="small">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
            px: 4,
          }}
        >
          Load More News
        </Button>
      </Box>
    </Container>
  );
};

export default NewsSection;
