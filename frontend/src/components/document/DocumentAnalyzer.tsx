import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyB99T6jpCq62Jp2CrvoU8m_GFujDqNOdpc';
const genAI = new GoogleGenerativeAI(API_KEY);

const DocumentAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check if file is an image
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
        setAnalysis(null);
        // Create preview URL for image
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
      } else if (selectedFile.type === 'text/plain' || 
                selectedFile.type === 'application/pdf' || 
                selectedFile.type === 'application/msword' || 
                selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setError(null);
        setAnalysis(null);
        setPreview(null);
      } else {
        setError('Please upload an image or document file');
        setFile(null);
        setPreview(null);
      }
    }
  };

  const fileToGenerativeInput = async (file: File) => {
    if (file.type.startsWith('image/')) {
      // Handle image file
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      return {
        inlineData: {
          data: Buffer.from(uint8Array).toString('base64'),
          mimeType: file.type
        }
      };
    } else {
      // Handle text file
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
      return text;
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const fileData = await fileToGenerativeInput(file);
      
      // Choose model based on file type
      const model = file.type.startsWith('image/') 
        ? genAI.getGenerativeModel({ model: "gemini-pro-vision" })
        : genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = file.type.startsWith('image/') 
        ? "Please analyze this legal document image and provide a comprehensive summary including:\n" +
          "1. Brief overview of what this document appears to be\n" +
          "2. Key points and important information visible\n" +
          "3. Any legal implications or important details\n" +
          "4. Recommendations or potential concerns"
        : "Please analyze this legal document and provide a comprehensive summary including:\n" +
          "1. Brief overview\n" +
          "2. Key points and important clauses\n" +
          "3. Legal implications\n" +
          "4. Recommendations or potential concerns";

      // Generate content based on file type
      const result = file.type.startsWith('image/') 
        ? await model.generateContent([prompt, fileData])
        : await model.generateContent([prompt + "\n\nDocument content:\n" + fileData]);

      const response = await result.response;
      setAnalysis(response.text());

    } catch (err) {
      console.error('Analysis error:', err);
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
              accept="image/*,.pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              id="document-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="document-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={file?.type.startsWith('image/') ? <ImageIcon /> : <UploadFileIcon />}
                sx={{
                  py: 2,
                  px: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Upload Document or Image
              </Button>
            </label>

            {file && (
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                {preview ? (
                  <Box sx={{ mb: 2, maxWidth: '100%', overflow: 'hidden' }}>
                    <img 
                      src={preview} 
                      alt="Document preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }} 
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {file.name}
                  </Typography>
                )}
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
                <Paper elevation={1} sx={{ p: 3, bgcolor: '#f8fafc' }}>
                  <Typography
                    variant="body1"
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'inherit',
                    }}
                  >
                    {analysis}
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default DocumentAnalyzer;
