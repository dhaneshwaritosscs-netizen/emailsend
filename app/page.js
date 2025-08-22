'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderName: '',
    recipientEmail: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, data });
        setFormData({
          senderEmail: '',
          senderName: '',
          recipientEmail: '',
          subject: '',
          message: ''
        });
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
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Sender API</h1>
          <p className="text-gray-600">Send emails through our RESTful API service</p>
        </div>

        <div className="bg-white shadow-md rounded-lg px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Sender Email
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
                Sender Name
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

            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email
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
                Subject
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
                Message
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Email'}
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

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-left space-y-3">
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  GET /api/email
                </code>
                <p className="text-sm text-gray-600 mt-1">Get API information and usage details</p>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  POST /api/email
                </code>
                <p className="text-sm text-gray-600 mt-1">Send an email with the required parameters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
