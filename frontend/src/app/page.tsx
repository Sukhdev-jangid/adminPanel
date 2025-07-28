import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
  redirect('/login');
  return (
    <div>
      
    </div>
  );
}
