"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import axios from '../../utils/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('adminToken', token);
      router.replace('/admin');
      toast.success('Login successful!');
    } catch (err) {
      toast.error('Login failed!');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700">
      {/* Left Side - Branding */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 py-10 text-white text-center lg:text-left">
        <div className="mb-8">
          <div className="flex justify-center lg:justify-start items-center mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-purple-600 rounded transform rotate-45"></div>
            </div>
            <span className="text-2xl font-bold">Admin Panel</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Sunil Soni – eCommerce Admin Panel
          </h1>

          <h2 className="text-lg sm:text-xl font-medium mb-4 text-purple-100">
            India’s Trusted eCommerce Mentor Panel
          </h2>

          <p className="text-base sm:text-lg text-purple-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Welcome to your course-selling admin dashboard. Upload new courses, manage student enrollments, track earnings, and grow your online academy with ease.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md bg-white shadow-2xl border-0 rounded-3xl">
          <CardHeader className="text-center pt-10 pb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome, Sunil Soni!
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Enter your credentials to access the admin panel.
            </p>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 sm:h-14 text-base border-gray-200 border-2 rounded-2xl px-6 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 w-full"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 sm:h-14 text-base border-gray-200 border-2 rounded-2xl px-6 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 w-full"
                  required
                />
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-purple-600 hover:text-purple-500 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant={"blue"}
                size={"full"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
