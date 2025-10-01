import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Property, Agent, Service, Product, User, SEOData, FooterData, AboutData, CarouselSlide, UserRole, HomePageData } from './types';

const API_URL = '/api';

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
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (property: Property) => Promise<void>;
  deleteProperty: (propertyId: string) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  addAgent: (agent: Omit<Agent, 'id'>) => Promise<void>;
  updateAgent: (agent: Agent) => Promise<void>;
  deleteAgent: (agentId: string) => Promise<void>;
  addCarouselSlide: (slide: Omit<CarouselSlide, 'id'>) => Promise<void>;
  updateCarouselSlide: (slide: CarouselSlide) => Promise<void>;
  deleteCarouselSlide: (slideId: string) => Promise<void>;
  addUser: (user: Omit<User, 'id'> & { password?: string }) => Promise<void>;
  updateUser: (user: User & { password?: string }) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateSeoData: (data: SEOData) => Promise<void>;
  updateFooterData: (data: FooterData) => Promise<void>;
  updateAboutData: (data: AboutData) => Promise<void>;
  updateHomePageData: (data: HomePageData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialSeoData: SEOData = { title: '', description: '', keywords: '', ogImage: '' };
const initialFooterData: FooterData = { logoPart1: 'Immobilier', logoPart2: 'Yaoundé', description: '', address: '', phone: '', email: '', facebookUrl: '', xUrl: '', youtubeUrl: '', tiktokUrl: '', pinterestUrl: '', legalNoticeUrl: '', privacyPolicyUrl: '', openingHours: '', facebookIcon: 'Facebook', xIcon: 'X', youtubeIcon: 'YouTube', tiktokIcon: 'TikTok', pinterestIcon: 'Pinterest' };
const initialAboutData: AboutData = { history: '', mission: '', interventionTitle: '', interventionText: '', interventionImageUrl: '' };
const initialHomePageData: HomePageData = { ctaBannerPrefix: '', ctaBannerSuffix: '', ownerCtaTitle: '', ownerCtaText: '', servicesTitle: '', servicesSubtitle: '', featuredPropertiesTitle: '', featuredPropertiesSubtitle: '', featuredProductsTitle: '', featuredProductsSubtitle: '' };


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [seoData, setSeoData] = useState<SEOData>(initialSeoData);
  const [footerData, setFooterData] = useState<FooterData>(initialFooterData);
  const [aboutData, setAboutData] = useState<AboutData>(initialAboutData);
  const [homePageData, setHomePageData] = useState<HomePageData>(initialHomePageData);
  const [isLoading, setIsLoading] = useState(true);

  // Auth check on mount
  useEffect(() => {
      const storedUser = sessionStorage.getItem('immoUser');
      if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
      }
  }, []);
  
  // Fetch all site data
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [
          propertiesRes, servicesRes, productsRes, agentsRes, carouselRes, configRes
        ] = await Promise.all([
          fetch(`${API_URL}/properties`),
          fetch(`${API_URL}/services`),
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/agents`),
          fetch(`${API_URL}/carousel-slides`),
          fetch(`${API_URL}/config`),
        ]);

        const propertiesData = await propertiesRes.json();
        const servicesData = await servicesRes.json();
        const productsData = await productsRes.json();
        const agentsData = await agentsRes.json();
        const carouselData = await carouselRes.json();
        const configData = await configRes.json();

        if (Array.isArray(propertiesData)) setProperties(propertiesData);
        if (Array.isArray(servicesData)) setServices(servicesData);
        if (Array.isArray(productsData)) setProducts(productsData);
        if (Array.isArray(agentsData)) setAgents(agentsData);
        if (Array.isArray(carouselData)) setCarouselSlides(carouselData);
        
        if (configData) {
            setSeoData(configData.seoData || initialSeoData);
            setFooterData(configData.footerData || initialFooterData);
            setAboutData(configData.aboutData || initialAboutData);
            setHomePageData(configData.homePageData || initialHomePageData);
        }

      } catch (error) {
        console.error("Failed to fetch site data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  
  // Fetch users when an admin is logged in
  useEffect(() => {
    const fetchUsers = async () => {
        if(user && user.role === UserRole.ADMIN && user.token) {
             try {
                const response = await fetch(`${API_URL}/users`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        }
    };
    fetchUsers();
  }, [user]);

  const apiRequest = async (url: string, method: string, body?: any) => {
    if (!user?.token) throw new Error("Not authenticated");
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    };
    const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed: ${method} ${url}`);
    }
    return response.json();
  };

  const login = async (email: string, pass: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication failed');
    }
    const userData: User = await response.json();
    setUser(userData);
    sessionStorage.setItem('immoUser', JSON.stringify(userData));
  };

  const logout = () => {
      setUser(null);
      setUsers([]);
      sessionStorage.removeItem('immoUser');
  };

  const createItem = async <T extends { id: string }>(endpoint: string, item: Omit<T, 'id'>, setItems: React.Dispatch<React.SetStateAction<T[]>>) => {
    const newItem = await apiRequest(`${API_URL}/${endpoint}`, 'POST', item);
    setItems(prev => [...prev, newItem]);
  };
  
  const updateItem = async <T extends {id: string}>(endpoint: string, item: T, setItems: React.Dispatch<React.SetStateAction<T[]>>) => {
    const updatedItem = await apiRequest(`${API_URL}/${endpoint}/${item.id}`, 'PUT', item);
    setItems(prev => prev.map(p => (p.id === updatedItem.id ? updatedItem : p)));
  };
  
  const deleteItem = async <T extends { id: string }>(endpoint: string, id: string, setItems: React.Dispatch<React.SetStateAction<T[]>>) => {
    await apiRequest(`${API_URL}/${endpoint}/${id}`, 'DELETE');
    setItems(prev => prev.filter(p => p.id !== id));
  };
  
  const addProperty = (property: Omit<Property, 'id'>) => createItem('properties', property, setProperties);
  const updateProperty = (property: Property) => updateItem('properties', property, setProperties);
  const deleteProperty = (id: string) => deleteItem('properties', id, setProperties);

  const addService = (service: Omit<Service, 'id'>) => createItem('services', service, setServices);
  const updateService = (service: Service) => updateItem('services', service, setServices);
  const deleteService = (id: string) => deleteItem('services', id, setServices);

  const addProduct = (product: Omit<Product, 'id'>) => createItem('products', product, setProducts);
  const updateProduct = (product: Product) => updateItem('products', product, setProducts);
  const deleteProduct = (id: string) => deleteItem('products', id, setProducts);

  const addAgent = (agent: Omit<Agent, 'id'>) => createItem('agents', agent, setAgents);
  const updateAgent = (agent: Agent) => updateItem('agents', agent, setAgents);
  const deleteAgent = (id: string) => deleteItem('agents', id, setAgents);
  
  const addCarouselSlide = (slide: Omit<CarouselSlide, 'id'>) => createItem('carousel-slides', slide, setCarouselSlides);
  const updateCarouselSlide = (slide: CarouselSlide) => updateItem('carousel-slides', slide, setCarouselSlides);
  const deleteCarouselSlide = (id: string) => deleteItem('carousel-slides', id, setCarouselSlides);

  const addUser = async (userData: Omit<User, 'id'> & { password?: string }) => {
    const newUser = await apiRequest(`${API_URL}/users`, 'POST', userData);
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = async (userData: User & { password?: string }) => {
    if (userData.password === '') delete userData.password;
    const updatedUser = await apiRequest(`${API_URL}/users/${userData.id}`, 'PUT', userData);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if(user?.id === updatedUser.id) {
        const updatedCurrentUser = { ...updatedUser, token: user.token };
        setUser(updatedCurrentUser);
        sessionStorage.setItem('immoUser', JSON.stringify(updatedCurrentUser));
    }
  };

  const deleteUser = (userId: string) => deleteItem('users', userId, setUsers);
  
  const updateConfig = async (configData: object, setData: (data: any) => void) => {
    await apiRequest(`${API_URL}/config`, 'PUT', configData);
    setData(Object.values(configData)[0]);
  };

  const updateSeoData = (data: SEOData) => updateConfig({ seoData: data }, setSeoData);
  const updateFooterData = (data: FooterData) => updateConfig({ footerData: data }, setFooterData);
  const updateAboutData = (data: AboutData) => updateConfig({ aboutData: data }, setAboutData);
  const updateHomePageData = (data: HomePageData) => updateConfig({ homePageData: data }, setHomePageData);

  const value: DataContextType = {
    properties, agents, services, products, carouselSlides, users, user, seoData, footerData, aboutData, homePageData, isLoading,
    login, logout,
    addProperty, updateProperty, deleteProperty,
    addService, updateService, deleteService,
    addProduct, updateProduct, deleteProduct,
    addAgent, updateAgent, deleteAgent,
    addCarouselSlide, updateCarouselSlide, deleteCarouselSlide,
    addUser, updateUser, deleteUser,
    updateSeoData, updateFooterData, updateAboutData, updateHomePageData
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
