import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Property, Agent, Service, Product, User, SEOData, FooterData, AboutData, CarouselSlide, UserRole, HomePageData } from './types';
import { PROPERTIES, AGENTS, SERVICES, PRODUCTS, ABOUT_DATA, CAROUSEL_SLIDES, HOME_PAGE_DATA } from './constants';
import { USERS } from './users';

interface DataContextType {
  properties: Property[];
  agents: Agent[];
  services: Service[];
  products: Product[];
  carouselSlides: CarouselSlide[];
  users: User[];
  user: User | null;
  seoData: SEOData;
  footerData: FooterData;
  aboutData: AboutData;
  homePageData: HomePageData;
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
  addCarouselSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  updateCarouselSlide: (slide: CarouselSlide) => void;
  deleteCarouselSlide: (slideId: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updateSeoData: (data: SEOData) => void;
  updateFooterData: (data: FooterData) => void;
  updateAboutData: (data: AboutData) => void;
  updateHomePageData: (data: HomePageData) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialSeoData: SEOData = {
    title: 'Immo Yaoundé - Agence Immobilière',
    description: 'Découvrez les meilleures offres immobilières à Yaoundé. Vente, location et gestion de biens avec notre agence experte.',
    keywords: 'immobilier, yaoundé, vente, location, agence, cameroun',
    ogImage: 'https://picsum.photos/seed/og/1200/630'
};

const initialFooterData: FooterData = {
    description: "Votre partenaire de confiance pour tous vos projets immobiliers à Yaoundé. Vente, location, gestion et services sur-mesure.",
    address: "123 Avenue de l'Indépendance, Yaoundé, Cameroun",
    phone: "+237 6XX XX XX XX",
    email: "contact@immoyaounde.com",
    facebookUrl: "#",
    xUrl: "#",
    instagramUrl: "#",
    legalNoticeUrl: "/mentions-legales",
    privacyPolicyUrl: "/mentions-legales",
    // Fix: Added openingHours to support contact page feature.
    openingHours: "Lundi - Vendredi: 9h00 - 18h00\nSamedi: 9h00 - 13h00\nDimanche: Fermé"
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(CAROUSEL_SLIDES);
  const [users, setUsers] = useState<User[]>(USERS.map(({ password, ...user }) => user));
  const [user, setUser] = useState<User | null>(null);
  const [seoData, setSeoData] = useState<SEOData>(initialSeoData);
  const [footerData, setFooterData] = useState<FooterData>(initialFooterData);
  const [aboutData, setAboutData] = useState<AboutData>(ABOUT_DATA);
  const [homePageData, setHomePageData] = useState<HomePageData>(HOME_PAGE_DATA);

  useEffect(() => {
      const storedUser = sessionStorage.getItem('immoUser');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

  const login = (email: string, pass: string): boolean => {
      const foundUser = USERS.find(u => u.email === email && u.password === pass);
      if (foundUser) {
          const userData: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role };
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

  const addCarouselSlide = (slide: Omit<CarouselSlide, 'id'>) => {
    setCarouselSlides(prev => [...prev, { ...slide, id: `slide${Date.now()}` }]);
  };

  const updateCarouselSlide = (updatedSlide: CarouselSlide) => {
    setCarouselSlides(prev => prev.map(s => s.id === updatedSlide.id ? updatedSlide : s));
  };

  const deleteCarouselSlide = (slideId: string) => {
    setCarouselSlides(prev => prev.filter(s => s.id !== slideId));
  };

  const addUser = (user: Omit<User, 'id' | 'role'> & { role: UserRole }) => {
    // In a real app, you'd also handle the password securely
    const newUser: User = { ...user, id: `u${Date.now()}` };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    // Also update the current user if they are editing themselves
    if(user && user.id === updatedUser.id) {
        setUser(updatedUser);
        sessionStorage.setItem('immoUser', JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
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

  const updateHomePageData = (data: HomePageData) => {
    setHomePageData(data);
  }

  const value = {
    properties,
    agents,
    services,
    products,
    carouselSlides,
    users,
    user,
    seoData,
    footerData,
    aboutData,
    homePageData,
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
    addCarouselSlide,
    updateCarouselSlide,
    deleteCarouselSlide,
    addUser,
    updateUser,
    deleteUser,
    updateSeoData,
    updateFooterData,
    updateAboutData,
    updateHomePageData,
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