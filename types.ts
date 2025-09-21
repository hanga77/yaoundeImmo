// Fix: Import React to resolve the 'React' namespace for React.ElementType.
import React from 'react';

export enum PropertyType {
  SALE = 'À Vendre',
  RENT = 'À Louer',
  FURNISHED = 'Meublé',
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  address: string;
  commune: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  imageUrl: string;
  imageUrls?: string[];
  description: string;
  isFeatured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // Changed from React.ElementType to string
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  author: string;
  content: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface SEOData {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
}

export interface FooterData {
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
}

export interface AboutData {
  history: string;
  mission: string;
}