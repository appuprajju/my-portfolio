import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, type, budget, message } = body;

    if (!name || !email || !type || !budget || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to your email address
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
            <p><strong>Budget:</strong> ${budget}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3>Project Details:</h3>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">This is an automated email from your portfolio contact form. Reply to ${email}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

  
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: email,
      subject: 'We received your inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thanks for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We received your project inquiry and will get back to you soon.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Project Type:</strong> ${type}</p>
            <p><strong>Budget:</strong> ${budget}</p>
          </div>
          <p>In the meantime, feel free to reach out if you have any questions.</p>
          <p>Best regards,<br/>YOUR.STUDIO</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
