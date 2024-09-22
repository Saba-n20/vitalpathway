import express from 'express';
import session from 'express-session'; 
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cors from 'cors';
import router from './route/route.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8888;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));

// Use routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
