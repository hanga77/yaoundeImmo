import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Property, Agent, Service, Product, User, SEOData, FooterData, AboutData, BlogPost } from './types';
import { PROPERTIES, AGENTS, SERVICES, PRODUCTS, ABOUT_DATA, BLOG_POSTS } from './constants';
import { USERS } from './users';

interface DataContextType {
  properties: Property[];
  agents: Agent[];
  services: Service[];
  products: Product[];
  blogPosts: BlogPost[];
  user: User | null;
  seoData: SEOData;
  footerData: FooterData;
  aboutData: AboutData;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (service: Service) => void;
  deleteService: (serviceId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addAgent: (agent: Omit<Agent, 'id'>) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (agentId: string) => void;
  updateSeoData: (data: SEOData) => void;
  updateFooterData: (data: FooterData) => void;
  updateAboutData: (data: AboutData) => void;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (postId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialSeoData: SEOData = {
    title: 'Immo Yaoundé - Agence Immobilière',
    description: 'Découvrez les meilleures offres immobilières à Yaoundé. Vente, location et gestion de biens avec notre agence experte.',
    keywords: 'immobilier, yaoundé, vente, location, agence, cameroun',
    ogImage: 'https://picsum.photos/seed/og/1200/630'
};

const initialFooterData: FooterData = {
    address: "123 Avenue de l'Indépendance, Yaoundé, Cameroun",
    phone: "+237 6XX XX XX XX",
    email: "contact@immoyaounde.com",
    openingHours: "Lundi - Vendredi : 8h30 - 18h00\nSamedi : 9h00 - 13h00",
    facebookUrl: "#",
    twitterUrl: "#",
    instagramUrl: "#"
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  // Fix: Add state for blog posts.
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [user, setUser] = useState<User | null>(null);
  const [seoData, setSeoData] = useState<SEOData>(initialSeoData);
  const [footerData, setFooterData] = useState<FooterData>(initialFooterData);
  const [aboutData, setAboutData] = useState<AboutData>(ABOUT_DATA);

  useEffect(() => {
      const storedUser = sessionStorage.getItem('immoUser');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

  const login = (email: string, pass: string): boolean => {
      const foundUser = USERS.find(u => u.email === email && u.password === pass);
      if (foundUser) {
          const userData: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
          setUser(userData);
          sessionStorage.setItem('immoUser', JSON.stringify(userData));
          return true;
      }
      return false;
  };

  const logout = () => {
      setUser(null);
      sessionStorage.removeItem('immoUser');
  };

  const addProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [...prev, { ...property, id: `p${Date.now()}` }]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
  };
  
  const addService = (service: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...service, id: `s${Date.now()}` }]);
  };

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };
  
  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [{ ...product, id: `prod${Date.now()}` }, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addAgent = (agent: Omit<Agent, 'id'>) => {
    setAgents(prev => [...prev, { ...agent, id: `a${Date.now()}` }]);
  };

  const updateAgent = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(a => a.id === updatedAgent.id ? updatedAgent : a));
  };

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(a => a.id !== agentId));
  };

  const updateSeoData = (data: SEOData) => {
      setSeoData(data);
  }

  const updateFooterData = (data: FooterData) => {
      setFooterData(data);
  }

  const updateAboutData = (data: AboutData) => {
    setAboutData(data);
  }

  // Fix: Add CRUD functions for blog posts.
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
        ...post,
        id: `blog${Date.now()}`,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

  const value = {
    properties,
    agents,
    services,
    products,
    blogPosts,
    user,
    seoData,
    footerData,
    aboutData,
    login,
    logout,
    addProperty,
    updateProperty,
    deleteProperty,
    addService,
    updateService,
    deleteService,
    addProduct,
    updateProduct,
    deleteProduct,
    addAgent,
    updateAgent,
    deleteAgent,
    updateSeoData,
    updateFooterData,
    updateAboutData,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
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