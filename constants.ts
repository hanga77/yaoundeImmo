
import { Property, Agent, Service, BlogPost, PropertyType } from './types';
import { BuildingOffice2Icon, WrenchScrewdriverIcon, TruckIcon } from '@heroicons/react/24/outline';


export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Villa Moderne avec Piscine',
    type: PropertyType.SALE,
    price: 180000000,
    address: 'Bastos',
    commune: 'Yaoundé I',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    imageUrl: 'https://picsum.photos/seed/p1/800/600',
    imageUrls: [
        'https://picsum.photos/seed/p1-1/1200/800',
        'https://picsum.photos/seed/p1-2/1200/800',
        'https://picsum.photos/seed/p1-3/1200/800',
        'https://picsum.photos/seed/p1-4/1200/800',
    ],
    description: 'Superbe villa moderne avec piscine et jardin paysager, située dans le quartier résidentiel de Bastos. Idéal pour une famille. Elle comprend un grand séjour lumineux, une cuisine américaine entièrement équipée, cinq chambres spacieuses avec dressings et salles de bain privatives. Le jardin tropical et la terrasse aménagée offrent un cadre de vie exceptionnel.',
    isFeatured: true,
  },
  {
    id: 'p2',
    title: 'Appartement Lumineux en Centre-ville',
    type: PropertyType.RENT,
    price: 450000,
    address: 'Hippodrome',
    commune: 'Yaoundé II',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://picsum.photos/seed/p2/800/600',
     imageUrls: [
        'https://picsum.photos/seed/p2-1/1200/800',
        'https://picsum.photos/seed/p2-2/1200/800',
        'https://picsum.photos/seed/p2-3/1200/800',
    ],
    description: 'Appartement spacieux et lumineux au coeur de la ville, proche de toutes commodités. Parfait pour jeunes professionnels. Situé au 5ème étage avec ascenseur, il offre une vue dégagée sur la ville. Il se compose de trois chambres, un salon, une cuisine moderne et deux balcons.',
    isFeatured: true,
  },
  {
    id: 'p3',
    title: 'Studio Meublé Cosy',
    type: PropertyType.FURNISHED,
    price: 250000,
    address: 'Ngoa-Ekellé',
    commune: 'Yaoundé III',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    imageUrl: 'https://picsum.photos/seed/p3/800/600',
    imageUrls: [
        'https://picsum.photos/seed/p3-1/1200/800',
        'https://picsum.photos/seed/p3-2/1200/800',
    ],
    description: 'Studio entièrement meublé et équipé, idéal pour étudiant ou personne seule. Proche du campus universitaire. Il dispose d\'un coin cuisine fonctionnel, d\'une salle d\'eau moderne et d\'un espace de vie confortable.',
    isFeatured: true,
  },
  {
    id: 'p4',
    title: 'Maison Familiale à Odza',
    type: PropertyType.SALE,
    price: 95000000,
    address: 'Odza',
    commune: 'Yaoundé IV',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    imageUrl: 'https://picsum.photos/seed/p4/800/600',
    description: 'Grande maison familiale avec cour, située dans un quartier calme et accessible. Excellent rapport qualité-prix. La maison est construite sur un terrain de 500m² et dispose d\'un grand jardin.',
    isFeatured: true,
  },
  {
    id: 'p5',
    title: 'Duplex Haut Standing à Santa Barbara',
    type: PropertyType.RENT,
    price: 800000,
    address: 'Santa Barbara',
    commune: 'Yaoundé V',
    bedrooms: 4,
    bathrooms: 4,
    area: 280,
    imageUrl: 'https://picsum.photos/seed/p5/800/600',
    description: 'Duplex de luxe dans une résidence sécurisée avec toutes les commodités modernes pour un confort optimal. Gardiennage 24/7, piscine commune et groupe électrogène.',
  },
  {
    id: 'p6',
    title: 'Appartement Meublé de Prestige',
    type: PropertyType.FURNISHED,
    price: 600000,
    address: 'Golf',
    commune: 'Yaoundé I',
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    imageUrl: 'https://picsum.photos/seed/p6/800/600',
    description: 'Appartement meublé avec goût, offrant une vue imprenable et des services de qualité supérieure. Service de ménage inclus.',
  },
  {
    id: 'p7',
    title: 'Terrain Titré à Nkoabang',
    type: PropertyType.SALE,
    price: 25000000,
    address: 'Nkoabang',
    commune: 'Yaoundé VII',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    imageUrl: 'https://picsum.photos/seed/p7/800/600',
    description: 'Vaste terrain titré, plat et prêt à construire, dans une zone en plein développement. Excellent investissement. Accès facile à l\'eau et l\'électricité.',
  },
  {
    id: 'p8',
    title: 'Penthouse avec Vue Panoramique',
    type: PropertyType.RENT,
    price: 1200000,
    address: 'Mont Fébé',
    commune: 'Yaoundé I',
    bedrooms: 3,
    bathrooms: 3,
    area: 250,
    imageUrl: 'https://picsum.photos/seed/p8/800/600',
    description: 'Penthouse exceptionnel offrant une vue à 360 degrés sur la ville de Yaoundé. Prestations de très haut de gamme. Grande terrasse privée de 100m².',
  }
];

export const AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Marie Claire Ngono',
    title: 'Directrice d\'Agence',
    imageUrl: 'https://picsum.photos/seed/a1/400/400',
    bio: 'Avec plus de 15 ans d\'expérience dans l\'immobilier à Yaoundé, Marie Claire dirige l\'agence avec passion et une connaissance inégalée du marché local.'
  },
  {
    id: 'a2',
    name: 'Jean-Pierre Bekolo',
    title: 'Conseiller en Vente',
    imageUrl: 'https://picsum.photos/seed/a2/400/400',
    bio: 'Spécialiste des transactions de vente, Jean-Pierre vous accompagne à chaque étape pour garantir le succès de votre projet immobilier.'
  },
  {
    id: 'a3',
    name: 'Aïcha Diallo',
    title: 'Conseillère en Location',
    imageUrl: 'https://picsum.photos/seed/a3/400/400',
    bio: 'Aïcha est notre experte en location. Elle trouve rapidement le bien idéal pour les locataires et des profils fiables pour les propriétaires.'
  },
  {
    id: 'a4',
    name: 'Christian Mbia',
    title: 'Responsable Services Clé en Main',
    imageUrl: 'https://picsum.photos/seed/a4/400/400',
    bio: 'De la construction à la rénovation, Christian pilote tous les projets clé en main avec rigueur et professionnalisme pour votre tranquillité d\'esprit.'
  },
];

export const SERVICES: Service[] = [
    {
      id: 'construction',
      title: 'Construction',
      icon: BuildingOffice2Icon,
      description: 'Nous construisons la maison de vos rêves, de la conception à la livraison.',
      longDescription: 'Notre service de construction prend en charge votre projet de A à Z. En collaboration avec des architectes et des artisans qualifiés, nous nous assurons que votre future maison ou immeuble respecte les normes les plus élevées de qualité et de sécurité. Nous gérons le permis de construire, le suivi de chantier et la livraison dans les délais convenus.'
    },
    {
      id: 'renovation',
      title: 'Rénovation',
      icon: WrenchScrewdriverIcon,
      description: 'Modernisez et valorisez votre bien immobilier avec nos experts.',
      longDescription: 'Que ce soit pour une simple remise à neuf ou une transformation complète, notre équipe de rénovation est à votre écoute. Nous vous conseillons sur les meilleurs matériaux et les solutions les plus adaptées pour optimiser votre espace, améliorer son confort et augmenter sa valeur sur le marché.'
    },
    {
      id: 'demenagement',
      title: 'Déménagement',
      icon: TruckIcon,
      description: 'Un service de déménagement complet pour une installation sans stress.',
      longDescription: 'Nous facilitons votre installation grâce à notre service de déménagement clé en main. Nos partenaires de confiance s\'occupent de l\'emballage, du transport et du déballage de vos biens en toute sécurité. Nous pouvons également gérer les formalités de transfert de contrats (eau, électricité) pour une transition en douceur.'
    }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Le marché immobilier de Yaoundé en 2025 : Tendances et perspectives',
    excerpt: 'Découvrez les quartiers qui montent et les opportunités d\'investissement à ne pas manquer dans la capitale camerounaise.',
    date: '22 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b1/800/600',
    author: 'Marie Claire Ngono',
  },
  {
    id: 'b2',
    title: '5 conseils pour bien préparer la vente de votre bien immobilier',
    excerpt: 'De la valorisation de votre bien (home staging) à la fixation du juste prix, nos experts vous livrent leurs secrets.',
    date: '15 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b2/800/600',
    author: 'Jean-Pierre Bekolo',
  },
  {
    id: 'b3',
    title: 'Investissement locatif à Yaoundé : quel quartier choisir ?',
    excerpt: 'Analyse comparative des rendements locatifs et du potentiel de plus-value dans les 7 communes de Yaoundé.',
    date: '5 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b3/800/600',
    author: 'Aïcha Diallo',
  }
];