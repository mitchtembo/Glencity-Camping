import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const { username, name, lastName, phone, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      setIsLoading(true);
      try {
        const result = await register({ username, name, lastName, phone, email, password, role: 'user' });
        
        if (result.success) {
          setSuccessMessage('Registration successful! Redirecting...');
          
          // Wait a moment to show the success message before redirecting
          setTimeout(() => {
            const redirectPath = new URLSearchParams(window.location.search).get('redirect');
            const storedBookingData = localStorage.getItem('pendingBookingData');
            
            if (storedBookingData && redirectPath) {
              // Clear the stored data as we're about to use it
              localStorage.removeItem('pendingBookingData');
              navigate(redirectPath);
            } else {
              navigate(redirectPath || '/');
            }
          }, 2000);
        } else {
          setError(result.error || 'Registration failed');
        }
      } catch (err) {
        setError('Registration failed. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Register</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password2">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </div>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
