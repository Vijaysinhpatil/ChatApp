export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; background-color: #f9fafb; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03); border: 1px solid #f0f0f0;">
      
      <div style="padding: 40px 40px 20px 40px; text-align: left;">
        <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" alt="Logo" style="width: 48px; height: 48px; border-radius: 12px;">
      </div>

      <div style="padding: 0 40px 40px 40px;">
        <h1 style="font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px;">Hey ${name}, welcome to Messenger.</h1>
        <p style="color: #666666; font-size: 16px; margin-bottom: 32px;">We’re excited to have you here. Messenger is built to help you stay close to the people who matter most, with zero friction.</p>
        
        <div style="background-color: #fdfdfd; border: 1px solid #f0f0f0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <p style="font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 16px; margin-top: 0;">Quick Start Guide</p>
          
          <div style="margin-bottom: 12px; display: flex; align-items: center;">
            <span style="color: #007AFF; margin-right: 12px;">•</span>
            <span style="font-size: 15px;">Set up your profile picture</span>
          </div>
          <div style="margin-bottom: 12px; display: flex; align-items: center;">
            <span style="color: #007AFF; margin-right: 12px;">•</span>
            <span style="font-size: 15px;">Import your contacts</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="color: #007AFF; margin-right: 12px;">•</span>
            <span style="font-size: 15px;">Send your first message</span>
          </div>
        </div>

        <div style="text-align: left;">
          <a href="${clientURL}" style="background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">
            Launch Messenger
          </a>
        </div>

        <p style="color: #999999; font-size: 14px; margin-top: 40px;">
          Talk soon,<br>
          <strong>The Messenger Team</strong>
        </p>
      </div>
    </div>

    <div style="text-align: center; padding: 30px 0; color: #999999; font-size: 12px;">
      <p style="margin-bottom: 10px;">&copy; 2026 Messenger Inc.</p>
      <p>
        <a href="#" style="color: #999999; text-decoration: underline; margin: 0 8px;">Settings</a>
        <a href="#" style="color: #999999; text-decoration: underline; margin: 0 8px;">Help Center</a>
        <a href="#" style="color: #999999; text-decoration: underline; margin: 0 8px;">Unsubscribe</a>
      </p>
    </div>
  </body>
  </html>
  `;
}