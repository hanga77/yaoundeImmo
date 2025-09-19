
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Property, Agent, Service, BlogPost } from './types';
import { PROPERTIES, AGENTS, SERVICES, BLOG_POSTS } from './constants';

interface DataContextType {
  properties: Property[];
  agents: Agent[];
  services: Service[];
  blogPosts: BlogPost[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  const addProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [...prev, { ...property, id: `p${Date.now()}` }]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const value = {
    properties,
    agents,
    services,
    blogPosts,
    addProperty,
    updateProperty,
    deleteProperty,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
