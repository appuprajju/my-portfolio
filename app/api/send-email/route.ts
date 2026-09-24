import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    // Check if API key is provided and valid
    if (!apiKey || apiKey.includes('placeholder') || apiKey.trim() === '') {
      return NextResponse.json(
        { error: 'Email service is unconfigured or temporarily disabled.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, type, budget, message } = body;

    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: 'Missing required form fields.' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'Portfolio Form <support@makeuperfect.tech>',
      to: process.env.OWNER_EMAIL || 'support@makeuperfect.tech',
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Project Inquiry</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${type}</p>
            <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3>Project Details:</h3>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Automated email from portfolio contact form.</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: result.error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
