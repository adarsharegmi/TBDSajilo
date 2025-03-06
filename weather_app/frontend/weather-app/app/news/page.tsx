'use client';

import { useEffect } from 'react';
import { NewsLayout } from '@/components/layout/NewsLayout';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    toast.info('Welcome to NewsHub', {
      description: 'Discover the latest news from around the world',
      position: 'bottom-right',
    });
  }, []);

  return <NewsLayout />;
};

export default Index;
