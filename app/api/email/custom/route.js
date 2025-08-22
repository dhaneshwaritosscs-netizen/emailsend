import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        message: 'Hello from the Custom Email API',
        endpoints: {
            POST: '/api/email/custom - Send email with custom SMTP credentials',
            GET: '/api/email/custom - Get API information'
        },
        usage: {
            method: 'POST',
            body: {
                smtpUser: 'your-email@gmail.com',
                smtpPass: 'your-app-password',
                smtpHost: 'smtp.gmail.com',
                smtpPort: 587,
                smtpSecure: false,
                senderEmail: 'sender@example.com',
                senderName: 'Sender Name',
                recipientEmail: 'recipient@example.com',
                subject: 'Email Subject',
                message: 'Email message body'
            }
        },
        note: 'This endpoint allows you to specify custom SMTP credentials for each request'
    }
    return Response.json({ data })
}

export async function POST(req) {
    try {
        const { 
            smtpUser, 
            smtpPass, 
            smtpHost = "smtp.gmail.com", 
            smtpPort = 587, 
            smtpSecure = false,
            senderEmail, 
            senderName, 
            recipientEmail, 
            subject, 
            message 
        } = await req.json();

        console.log('Received Custom Email Request:', { 
            smtpUser, 
            smtpHost, 
            smtpPort, 
            smtpSecure,
            senderEmail, 
            senderName, 
            recipientEmail, 
            subject, 
            message 
        });

        // Validate required fields
        if (!smtpUser || !smtpPass || !senderEmail || !senderName || !recipientEmail || !subject || !message) {
            return NextResponse.json({ 
                error: 'All fields are required: smtpUser, smtpPass, senderEmail, senderName, recipientEmail, subject, message' 
            }, { status: 400 });
        }

        // Create transporter with custom credentials
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        // Verify SMTP connection
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('SMTP verification failed:', verifyError);
            return NextResponse.json({ 
                error: 'SMTP connection failed. Please check your credentials and settings.' 
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
            message: 'Email sent successfully using custom SMTP',
            details: {
                smtpHost: smtpHost,
                smtpPort: smtpPort,
                from: `${senderName} <${senderEmail}>`,
                to: recipientEmail,
                subject: subject
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Custom Email Send Error:', error);
        return NextResponse.json({ 
            error: error.message || 'Failed to send email with custom SMTP' 
        }, { status: 500 });
    }
}
