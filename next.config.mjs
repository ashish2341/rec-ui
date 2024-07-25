/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects()  {
        return [
          {
            source: '/',
            has: [
              {
                type: 'host',
                value: 'therec.in',
              },
            ],
            destination: 'https://www.therec.in/',
            permanent: true, // Set this to false if it's a temporary redirect
          },
        ];
      },
  };

export default nextConfig;
 
  

  
