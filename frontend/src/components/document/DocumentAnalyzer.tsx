import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../../context/AuthContext';

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  legalImplications: string[];
  recommendations: string[];
}

const DocumentAnalyzer = () => {
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a PDF or Word document');
        setFile(null);
      }
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call for document analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis result
      setAnalysis({
        summary: 'This legal document appears to be a contract agreement between two parties...',
        keyPoints: [
          'Document type: Contract Agreement',
          'Parties involved: Party A and Party B',
          'Duration: 12 months',
          'Key terms and conditions identified',
        ],
        legalImplications: [
          'Binding agreement under Section 10 of Contract Act',
          'Requires notarization',
          'Subject to local jurisdiction',
        ],
        recommendations: [
          'Review termination clauses',
          'Consider adding force majeure clause',
          'Clarify dispute resolution process',
        ],
      });
    } catch (err) {
      setError('Failed to analyze document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              mb: 4,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Legal Document Analysis
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <input
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="document-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="document-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{
                  py: 2,
                  px: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Upload Document
              </Button>
            </label>

            {file && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {file.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={analyzeDocument}
                  disabled={loading}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Analyze Document'
                  )}
                </Button>
              </Box>
            )}

            {analysis && (
              <Box sx={{ width: '100%', mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {analysis.summary}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Key Points
                </Typography>
                <List>
                  {analysis.keyPoints.map((point, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Legal Implications
                </Typography>
                <List>
                  {analysis.legalImplications.map((implication, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={implication} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Recommendations
                </Typography>
                <List>
                  {analysis.recommendations.map((recommendation, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={recommendation} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default DocumentAnalyzer;
