export const skilloraTemplate = (title, message) => {
  return `
  <div style="font-family:Arial, sans-serif; background:#f4f6f9; padding:20px">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1)">

      <!-- Header -->
      <div style="background:linear-gradient(90deg,#7C6BFF,#FF6A6A); padding:20px; color:white; text-align:center">
        <h2 style="margin:0;">Skillora</h2>
        <p style="margin:0; font-size:14px;">Admin Notification</p>
      </div>

      <!-- Body -->
      <div style="padding:25px">
        <h3 style="margin-bottom:10px;">${title}</h3>
        <p style="color:#555; line-height:1.5;">${message}</p>

        <!-- CTA Button -->
        <a href="https://skillora-frontend.vercel.app/admin/notifications"
          style="display:inline-block; margin-top:20px; padding:12px 22px;
          background:#7C6BFF; color:white; text-decoration:none; border-radius:6px; font-weight:500">
          View Notification
        </a>
      </div>

      <!-- Footer -->
      <div style="background:#f1f1f1; padding:12px; text-align:center; font-size:12px; color:#777">
        © 2026 Skillora • All Rights Reserved
      </div>

    </div>

  </div>
  `;
};