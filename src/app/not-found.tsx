'use client';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mx-4">

      {/* Logo with animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/images/logoShopify.svg"
          width={100}
          height={100}
          alt={`${APP_NAME} logo`}
          priority
          className="mb-6 drop-shadow-xl"
        />
      </motion.div>

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 w-full max-w-md bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl text-center border border-white/30"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">Oops!</h1>
        <p className="text-lg text-gray-800 dark:text-gray-400 mt-3">
          The page you are looking for doesn’t exist.
        </p>

        <Button
          variant="outline"
          className="mt-6 px-6 py-3 text-lg font-semibold text-gray-800 dark:text-white border-gray-600 dark:border-white/40 hover:bg-gray-200 dark:hover:bg-white/20 hover:scale-105 transition-transform duration-300"
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
