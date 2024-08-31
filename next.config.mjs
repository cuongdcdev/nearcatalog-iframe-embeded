/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*",
//       },
//     ],
//   },
// };


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname:"web.archive.org"
      },
      {
        protocol: "https",
        hostname:"pbs.twimg.com"
      },
      {
        protocol: "https",
        hostname:"assets.coingecko.com"
      }
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can specify a specific origin instead of "*"
          },
        ],
      },
    ];
  },

};

export default nextConfig;