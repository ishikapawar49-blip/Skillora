export const skilloraTemplate = (title, message) => {
  return `
  <div style="font-family:Arial; background:#f4f6f9; padding:20px">
    <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden">

      <div style="background:linear-gradient(90deg,#7C6BFF,#FF6A6A); padding:20px; color:white; text-align:center">
        <h2>Skillora</h2>
      </div>

      <div style="padding:20px">
        <h3>${title}</h3>
        <p>${message}</p>

        <a href="http://localhost:5173/vendor"
          style="display:inline-block; margin-top:15px; padding:10px 20px;
          background:#7C6BFF; color:white; text-decoration:none; border-radius:6px">
          Open Dashboard
        </a>
      </div>

      <div style="background:#f1f1f1; padding:10px; text-align:center; font-size:12px">
        © 2026 Skillora
      </div>

    </div>
  </div>
  `;
};