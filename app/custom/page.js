'use client';

import { useState } from 'react';

export default function CustomEmailPage() {
  const [formData, setFormData] = useState({
    smtpUser: '',
    smtpPass: '',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpSecure: false,
    senderEmail: '',
    senderName: '',
    recipientEmail: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/email/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, data });
        // Don't clear SMTP credentials for convenience
        setFormData(prev => ({
          ...prev,
          senderEmail: '',
          senderName: '',
          recipientEmail: '',
          subject: '',
          message: ''
        }));
      } else {
        setResult({ success: false, error: data.error });
      }
    } catch (error) {
      setResult({ success: false, error: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Email API</h1>
          <p className="text-gray-600">Send emails with custom SMTP credentials</p>
        </div>

        <div className="bg-white shadow-md rounded-lg px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SMTP Configuration Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username/Email *
                  </label>
                  <input
                    type="email"
                    id="smtpUser"
                    name="smtpUser"
                    value={formData.smtpUser}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your-email@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="smtpPass" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password/App Password *
                  </label>
                  <input
                    type="password"
                    id="smtpPass"
                    name="smtpPass"
                    value={formData.smtpPass}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your-app-password"
                  />
                </div>

                <div>
                  <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    id="smtpHost"
                    name="smtpHost"
                    value={formData.smtpHost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    id="smtpPort"
                    name="smtpPort"
                    value={formData.smtpPort}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="587"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="smtpSecure"
                      checked={formData.smtpSecure}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Use SSL/TLS (port 465)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Email Content Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Content</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Email *
                    </label>
                    <input
                      type="email"
                      id="senderEmail"
                      name="senderEmail"
                      value={formData.senderEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="sender@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="recipient@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message here..."
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Email with Custom SMTP'}
            </button>
          </form>

          {result && (
            <div className={`mt-6 p-4 rounded-md ${
              result.success 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <div>
                  <h3 className="font-medium">Email Sent Successfully!</h3>
                  <p className="text-sm mt-1">
                    SMTP Host: {result.data.details.smtpHost}<br/>
                    From: {result.data.details.from}<br/>
                    To: {result.data.details.to}<br/>
                    Subject: {result.data.details.subject}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium">Error Sending Email</h3>
                  <p className="text-sm mt-1">{result.error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Example Usage */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Usage</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-gray-700 mb-2">Test with your credentials:</p>
            <pre className="text-xs text-gray-800 overflow-x-auto">
{`{
  "smtpUser": "dhaneshwari.tosscs@gmail.com",
  "smtpPass": "your-app-password",
  "smtpHost": "smtp.gmail.com",
  "smtpPort": 587,
  "smtpSecure": false,
  "senderEmail": "dhaneshwari.tosscs@gmail.com",
  "senderName": "Test User",
  "recipientEmail": "geetanjali.tosscs@gmail.com",
  "subject": "Test Email",
  "message": "Hello from the Custom API!"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
