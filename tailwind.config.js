/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#00012B',
                'background1': "#222A35",
                'custom-gradient': 'linear-gradient(15deg, #c320ff, #0404ef)',
                'ContactButton': `
 
            text-decoration: none;
          text-align: center;
       background: hsla(271, 100%, 50%, 1);
           background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
            background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
              background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
            padding: 13px 16px;
          margin-top: 2px;
           border-radius: 12px;
  
           border: none;
          color: #9CA3AF;
        font-size: 18px;
              font-weight: 600;`,

                'title-color': '#9CA3AF',
                'pass-color': '#374151',




            },
            fonts: {
                'title': ['Space Grotesk, sans-serif'],
                'main': ['Space Grotesk, sans-serif']
            },
        },


    },
    plugins: [],
}