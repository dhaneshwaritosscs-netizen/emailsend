import './globals.css'

export const metadata = {
  title: 'Email Sender API',
  description: 'A RESTful API service for sending emails through SMTP',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
