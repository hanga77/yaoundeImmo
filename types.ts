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
  icon: React.ElementType;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  author: string;
}