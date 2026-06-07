# AI Voice Assistant 🎤

A comprehensive AI-powered voice assistant application with user authentication, speech recognition, and text-to-speech capabilities. Built with Node.js backend and Python voice processing module.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Voice Commands](#voice-commands)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Speech Recognition**: Convert voice input to text using Google Speech Recognition
- **Text-to-Speech**: Natural language output using pyttsx3
- **Password Security**: Bcrypt encryption for user passwords
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Security Headers**: Helmet.js for HTTP security headers
- **MongoDB Integration**: Persistent user data storage
- **Environment Configuration**: Environment-based settings with dotenv

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin support

### Voice Module
- **Python 3.x** - Voice processing
- **SpeechRecognition** - Audio to text conversion
- **pyttsx3** - Text to speech engine

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Python 3.x**
- **Microphone** - For speech input

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Saisurya2005editor/ai-voice-assistant.git
cd ai-voice-assistant
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

Or install individually:

```bash
pip install SpeechRecognition
pip install pyttsx3
```

## ⚙️ Configuration

### 1. Create Environment File

Copy the example environment file and update with your settings:

```bash
cp .env.example .env
```

### 2. Configure `.env` File

Edit `.env` and set the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ai-voice-assistant
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-voice-assistant

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key_min_32_chars_change_this
JWT_EXPIRE=7d

# Server Configuration
NODE_ENV=development
PORT=5000

# API Keys (if using cloud-based APIs)
# SPEECH_API_KEY=your_api_key_here
```

### 3. MongoDB Setup

**Local MongoDB:**
```bash
# Start MongoDB service
mongod
```

**MongoDB Atlas (Cloud):**
1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

## 💻 Usage

### Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Voice Assistant (Python Module)

In a separate terminal:

```bash
python python/voice_assistant.py
```

### API Requests

#### User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securePassword123"
  }'
```

#### User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📁 Project Structure

```
ai-voice-assistant/
├── controllers/
│   └── authController.js          # Authentication routes
├── models/
│   └── User.js                    # User schema and methods
├── config/
│   └── database.js                # MongoDB connection
├── python/
│   └── voice_assistant.py         # Python voice processing module
├── server.js                      # Main server file
├── package.json                   # Node.js dependencies
├── requirements.txt               # Python dependencies
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### Request/Response Examples

**Register:**
```json
Request:
{
  "username": "assistant_user",
  "password": "MySecurePass123"
}

Response (201):
{
  "message": "User registered successfully"
}
```

**Login:**
```json
Request:
{
  "username": "assistant_user",
  "password": "MySecurePass123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🎯 Voice Commands

The voice assistant supports the following commands:

- **"hello"** - Responds with greeting
- **"your name"** - Introduces itself as the voice assistant
- **"exit"** - Terminates the assistant
- **Custom commands** - Can be easily added in `voice_assistant.py`

### Adding New Commands

Edit `python/voice_assistant.py`:

```python
elif "turn on lights" in command:
    speak("Turning on the lights")
    # Add your logic here
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in `.env`
- Verify MongoDB port (default: 27017)

### Microphone Not Detected

**Problem**: `Exception: Could not find microphone`

**Solution**:
```bash
# Check audio devices
python -c "import speech_recognition as sr; print(sr.Microphone.list_microphone_indexes())"

# Update microphone index in voice_assistant.py if needed
```

### Speech Recognition Timeout

**Problem**: `RequestError: [Errno -1] An error occurred`

**Solution**:
- Check internet connection (uses Google Speech API)
- Increase timeout in `voice_assistant.py`:
  ```python
  audio = recognizer.listen(source, timeout=10)
  ```

### JWT Token Errors

**Problem**: `JsonWebTokenError: invalid token`

**Solution**:
- Ensure `JWT_SECRET` is set in `.env`
- Token may have expired (default: 7 days)
- Re-login to get a new token

## 📝 Environment Variables Reference

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `MONGODB_URI` | String | Required | MongoDB connection string |
| `JWT_SECRET` | String | Required | Secret key for JWT signing (min 32 chars) |
| `JWT_EXPIRE` | String | 7d | JWT token expiration time |
| `NODE_ENV` | String | development | Environment (development/production) |
| `PORT` | Number | 5000 | Server port |

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` for reference
2. **Change JWT_SECRET** - Use a strong, random secret in production
3. **Update dependencies** - Run `npm audit fix` regularly
4. **Use HTTPS** - Enable HTTPS in production
5. **Validate inputs** - Already implemented with express-validator
6. **Rate limiting** - Consider adding rate limiting middleware
7. **CORS** - Restrict CORS origins in production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/Saisurya2005editor/ai-voice-assistant/issues)
- Contact: [Your Contact Info]

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [SpeechRecognition](https://github.com/Uberi/speech_recognition) - Speech recognition
- [pyttsx3](https://pyttsx3.readthedocs.io/) - Text-to-speech
- [MongoDB](https://www.mongodb.com/) - Database
