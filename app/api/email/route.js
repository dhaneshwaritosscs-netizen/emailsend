import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        message: 'Hello from the Email API',
        endpoints: {
            POST: '/api/email - Send email with sender, recipient, subject, and message',
            GET: '/api/email - Get API information'
        },
        usage: {
            method: 'POST',
            body: {
                senderEmail: 'sender@example.com',
                senderName: 'Sender Name',
                recipientEmail: 'recipient@example.com',
                subject: 'Email Subject',
                message: 'Email message body'
            }
        }
    }
    return Response.json({ data })
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "toss125training@gmail.com",
        pass: "limzksqufgsenfls"
    }
});

export async function POST(req) {
    try {
        const { senderEmail, senderName, recipientEmail, subject, message } = await req.json();

        console.log('Received Email Request:', { senderEmail, senderName, recipientEmail, subject, message });

        if (!senderEmail || !senderName || !recipientEmail || !subject || !message) {
            return NextResponse.json({ 
                error: 'All fields are required: senderEmail, senderName, recipientEmail, subject, message' 
            }, { status: 400 });
        }

        const mailOptions = {
            from: `"${senderName}" <${senderEmail}>`,
            to: recipientEmail,
            subject: subject,
            text: message,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">${subject}</h2>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        Sent by: ${senderName} (${senderEmail})
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ 
            message: 'Email sent successfully',
            details: {
                from: `${senderName} <${senderEmail}>`,
                to: recipientEmail,
                subject: subject
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Email Send Error:', error);
        return NextResponse.json({ 
            error: error.message || 'Failed to send email' 
        }, { status: 500 });
    }
}
