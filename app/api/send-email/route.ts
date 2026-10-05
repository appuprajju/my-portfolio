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
    const ownerEmail = process.env.OWNER_EMAIL || 'prajwalm.dpm@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'Portfolio Form <support@makeuperfect.in>';

    // 1. Send notification email to owner (Prajwal)
    const ownerEmailPromise = resend.emails.send({
      from: senderEmail,
      to: ownerEmail,
      replyTo: email,
      subject: `⚡ New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; margin-top: 0; border-bottom: 2px solid #1e293b; padding-bottom: 12px;">New Project Inquiry</h2>
          
          <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
            <p style="margin: 8px 0;"><strong>Client Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Client Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Project Type:</strong> ${type}</p>
            <p style="margin: 8px 0;"><strong>Budget:</strong> ${budget || "Not specified"}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Project Details</h3>
            <div style="white-space: pre-wrap; background-color: #1e293b; padding: 18px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #e2e8f0; border: 1px solid #334155;">${message}</div>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
          </div>

          <hr style="border: none; border-top: 1px solid #1e293b; margin: 30px 0 15px 0;" />
          <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">Automated notification from your Portfolio website.</p>
        </div>
      `,
    });

    // 2. Send Thank You email back to the user
    const userThankYouPromise = resend.emails.send({
      from: senderEmail,
      to: email,
      replyTo: ownerEmail,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; margin-top: 0; border-bottom: 2px solid #1e293b; padding-bottom: 12px;">Thank You for Reaching Out!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0;">Hi <strong>${name}</strong>,</p>

          <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
            Thank you for getting in touch regarding your <strong>${type}</strong> project! I have received your message and will carefully review your details.
          </p>

          <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
            I usually respond within <strong>24 to 48 hours</strong>. If your request is urgent, feel free to reply directly to this email.
          </p>

          <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #334155;">
            <h3 style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Summary of your inquiry</h3>
            <p style="margin: 6px 0; font-size: 14px; color: #94a3b8;"><strong>Project Type:</strong> <span style="color: #e2e8f0;">${type}</span></p>
            <p style="margin: 6px 0; font-size: 14px; color: #94a3b8;"><strong>Budget:</strong> <span style="color: #e2e8f0;">${budget || "Not specified"}</span></p>
            <p style="margin: 12px 0 0 0; font-size: 14px; color: #94a3b8;"><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; font-size: 14px; color: #cbd5e1; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #334155;">${message}</div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b;">
            <p style="margin: 0; font-size: 15px; color: #f8fafc; font-weight: 600;">Best regards,</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #38bdf8; font-weight: 700;">Prajwal M</p>
            <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Full Stack & 3D Web Developer</p>
          </div>
        </div>
      `,
    });

    const [ownerResult, userResult] = await Promise.all([
      ownerEmailPromise,
      userThankYouPromise,
    ]);

    if (ownerResult.error) {
      console.error('Error sending owner notification email:', ownerResult.error);
    }
    if (userResult.error) {
      console.error('Error sending user thank-you email:', userResult.error);
    }

    if (ownerResult.error) {
      return NextResponse.json(
        { error: ownerResult.error.message || 'Failed to send notification email.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully and confirmation sent!' },
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

