import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gym Holic, The Fitness Club',
    short_name: 'Gym Holic',
    description: "Ambikapur's premier fitness destination for strength training, body transformations, certified coaching, and custom Indian nutrition.",
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
