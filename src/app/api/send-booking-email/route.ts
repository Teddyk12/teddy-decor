import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { booking, adminMessage, type } = body;

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!web3FormsKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const isConfirmation = type === 'confirmation';
    const subject = isConfirmation 
      ? `✅ Booking Confirmed - ${booking.event_type} on ${booking.event_date}`
      : `📋 Booking Update - ${booking.event_type}`;

    const htmlContent = isConfirmation ? `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2d5f3f 0%, #c49f47 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .detail-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #2d5f3f; }
            .message-box { background: #e8f5e9; border-left: 4px solid #2d5f3f; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
              <p>Your event decor booking has been approved</p>
            </div>
            <div class="content">
              <p>Dear ${booking.name},</p>
              <p>Great news! We're excited to confirm your booking with Teddy Decor.</p>
              
              ${adminMessage ? `
                <div class="message-box">
                  <strong>Message from Teddy Decor:</strong>
                  <p>${adminMessage}</p>
                </div>
              ` : ''}

              <h3>📋 Booking Details:</h3>
              
              <div class="detail-row">
                <span class="label">Event Type:</span> ${booking.event_type}
              </div>
              
              <div class="detail-row">
                <span class="label">Event Date:</span> ${new Date(booking.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              
              ${booking.event_time ? `
                <div class="detail-row">
                  <span class="label">Event Time:</span> ${booking.event_time}
                </div>
              ` : ''}
              
              ${booking.guest_count ? `
                <div class="detail-row">
                  <span class="label">Expected Guests:</span> ${booking.guest_count}
                </div>
              ` : ''}

              <h3>📞 Next Steps:</h3>
              <p>We'll be in touch soon to discuss the details. If you have any questions, contact us:</p>
              
              <div class="detail-row">
                <span class="label">Email:</span> yonigoteddy@gmail.com<br>
                <span class="label">Phone:</span> (206) 739-2365
              </div>

              <p style="margin-top: 30px;">We can't wait to make your event unforgettable!</p>
              <p><strong>- The Teddy Decor Team</strong></p>
            </div>
            
            <div class="footer">
              <p>Teddy Decor - Creating Unforgettable Moments</p>
              <p>www.teddydecor.com | yonigoteddy@gmail.com | (206) 739-2365</p>
            </div>
          </div>
        </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Booking Update</h1>
            </div>
            <div class="content">
              <p>Dear ${booking.name},</p>
              <p>Thank you for your interest in Teddy Decor for your ${booking.event_type}.</p>
              
              ${adminMessage ? `
                <div class="message-box">
                  <strong>Message from Teddy Decor:</strong>
                  <p>${adminMessage}</p>
                </div>
              ` : ''}

              <p>Please feel free to contact us to discuss alternative dates or options.</p>
              
              <p><strong>Contact Us:</strong><br>
              Email: yonigoteddy@gmail.com<br>
              Phone: (206) 739-2365</p>

              <p>Thank you,<br>
              <strong>The Teddy Decor Team</strong></p>
            </div>
            
            <div class="footer">
              <p>Teddy Decor - Creating Unforgettable Moments</p>
              <p>www.teddydecor.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const formData = new FormData();
    formData.append('access_key', web3FormsKey);
    formData.append('subject', subject);
    formData.append('from_name', 'Teddy Decor');
    formData.append('to', booking.email);
    formData.append('reply_to', 'yonigoteddy@gmail.com');
    formData.append('message', htmlContent);
    formData.append('email', htmlContent);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
