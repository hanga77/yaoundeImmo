// Fix: Import React to resolve the 'React' namespace for React.ElementType.
import React from 'react';

export enum PropertyType {
  SALE = 'À Vendre',
  RENT = 'À Louer',
  FURNISHED = 'Meublé',
}

export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Éditeur',
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

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrls?: string[];
  description: string;
  isFeatured?: boolean;
}

export interface CarouselSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
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
  xUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
  legalNoticeUrl: string;
  privacyPolicyUrl: string;
}

export interface AboutData {
  history: string;
  mission: string;
  interventionTitle: string;
  interventionText: string;
  interventionImageUrl: string;
}