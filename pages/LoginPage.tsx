import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { ArrowRightIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold font-serif text-brand-blue">
                Admin<span className="text-brand-gold">Panel</span>
            </h1>
            <p className="mt-2 text-gray-600">Connectez-vous pour gérer le site.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@immoyaounde.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
            >
              Se connecter
              <ArrowRightIcon className="ml-2 h-5 w-5"/>
            </button>
          </div>
        </form>
        <div className="text-center mt-6 border-t pt-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-gold transition-colors duration-300 font-medium">
                <ArrowUturnLeftIcon className="h-4 w-4" />
                Retour à l'accueil
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;