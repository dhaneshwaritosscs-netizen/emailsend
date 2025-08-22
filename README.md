# Email Sender API

A RESTful API service built with Next.js that allows sending emails to recipients through SMTP (Gmail).

## Features

- **RESTful API**: Clean API endpoints for sending emails
- **SMTP Integration**: Uses Gmail SMTP for reliable email delivery
- **Form Validation**: Client-side and server-side validation
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Error Handling**: Comprehensive error handling and user feedback

## API Endpoints

### GET `/api/email`
Returns API information and usage details.

**Response:**
```json
{
  "data": {
    "message": "Hello from the Email API",
    "endpoints": {
      "POST": "/api/email - Send email with sender, recipient, subject, and message",
      "GET": "/api/email - Get API information"
    },
    "usage": {
      "method": "POST",
      "body": {
        "senderEmail": "sender@example.com",
        "senderName": "Sender Name",
        "recipientEmail": "recipient@example.com",
        "subject": "Email Subject",
        "message": "Email message body"
      }
    }
  }
}
```

### POST `/api/email`
Sends an email to the specified recipient.

**Request Body:**
```json
{
  "senderEmail": "sender@example.com",
  "senderName": "Sender Name",
  "recipientEmail": "recipient@example.com",
  "subject": "Email Subject",
  "message": "Email message body"
}
```

**Success Response (200):**
```json
{
  "message": "Email sent successfully",
  "details": {
    "from": "Sender Name <sender@example.com>",
    "to": "recipient@example.com",
    "subject": "Email Subject"
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message description"
}
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Gmail account with App Password enabled

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Gmail SMTP
The API is pre-configured with Gmail SMTP settings. If you want to use your own Gmail account:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password
3. Update the credentials in `app/api/email/route.js`:

```javascript
const transporter = nodemailer.createTransporter({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password"
    }
});
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## Usage Examples

### Using the Web Interface
1. Navigate to the homepage
2. Fill in the email form with sender details, recipient, subject, and message
3. Click "Send Email"
4. View the success/error message

### Using the API Directly

#### cURL Example
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "senderEmail": "sender@example.com",
    "senderName": "John Doe",
    "recipientEmail": "recipient@example.com",
    "subject": "Test Email",
    "message": "This is a test email from the API."
  }'
```

#### JavaScript Example
```javascript
const response = await fetch('/api/email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    senderEmail: 'sender@example.com',
    senderName: 'John Doe',
    recipientEmail: 'recipient@example.com',
    subject: 'Test Email',
    message: 'This is a test email from the API.'
  }),
});

const data = await response.json();
console.log(data);
```

## Project Structure

```
emailsend/
├── app/
│   ├── api/
│   │   └── email/
│   │       └── route.js          # Email API endpoints
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage with email form
├── package.json                  # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # This file
```

## Security Considerations

- **App Passwords**: Use Gmail App Passwords instead of regular passwords
- **Environment Variables**: Consider moving SMTP credentials to environment variables
- **Rate Limiting**: Implement rate limiting for production use
- **Input Validation**: All inputs are validated on both client and server side

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Ensure you're using an App Password, not your regular Gmail password
2. **Port Blocked**: Some networks block port 587, try port 465 with `secure: true`
3. **Gmail Security**: Make sure "Less secure app access" is enabled or use App Passwords

### Error Messages

- **"All fields are required"**: Ensure all form fields are filled
- **"Failed to send email"**: Check SMTP configuration and network connectivity
- **"Network error occurred"**: Verify the API endpoint is accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
