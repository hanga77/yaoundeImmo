// Data for seeding the database. Converted from frontend TypeScript constants.

export const PropertyType = {
  SALE: 'À Vendre',
  RENT: 'À Louer',
  FURNISHED: 'Meublé',
};

export const CAROUSEL_SLIDES = [
  {
    id: 'slide1',
    imageUrl: 'https://picsum.photos/seed/hero1/1920/1080',
    title: 'Le Bien de vos Rêves à Yaoundé',
    subtitle: 'Avec notre expertise, trouvez, vendez ou louez en toute confiance.',
  },
  {
    id: 'slide2',
    imageUrl: 'https://picsum.photos/seed/hero2/1920/1080',
    title: 'Des Propriétés d\'Exception',
    subtitle: 'Explorez notre catalogue exclusif de villas, appartements et terrains.',
  },
  {
    id: 'slide3',
    imageUrl: 'https://picsum.photos/seed/hero3/1920/1080',
    title: 'Votre Projet, Notre Priorité',
    subtitle: 'Un accompagnement personnalisé à chaque étape de votre transaction.',
  }
];

export const PROPERTIES = [
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

export const AGENTS = [
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

export const SERVICES = [
    {
      id: 'construction',
      title: 'Construction',
      icon: 'BuildingOffice2Icon',
      description: 'Nous construisons la maison de vos rêves, de la conception à la livraison.',
      longDescription: 'Notre service de construction prend en charge votre projet de A à Z. En collaboration avec des architectes et des artisans qualifiés, nous nous assurons que votre future maison ou immeuble respecte les normes les plus élevées de qualité et de sécurité. Nous gérons le permis de construire, le suivi de chantier et la livraison dans les délais convenus.'
    },
    {
      id: 'renovation',
      title: 'Rénovation',
      icon: 'WrenchScrewdriverIcon',
      description: 'Modernisez et valorisez votre bien immobilier avec nos experts.',
      longDescription: 'Que ce soit pour une simple remise à neuf ou une transformation complète, notre équipe de rénovation est à votre écoute. Nous vous conseillons sur les meilleurs matériaux et les solutions les plus adaptées pour optimiser votre espace, améliorer son confort et augmenter sa valeur sur le marché.'
    },
    {
      id: 'demenagement',
      title: 'Déménagement',
      icon: 'TruckIcon',
      description: 'Un service de déménagement complet pour une installation sans stress.',
      longDescription: 'Nous facilitons votre installation grâce à notre service de déménagement clé en main. Nos partenaires de confiance s\'occupent de l\'emballage, du transport et du déballage de vos biens en toute sécurité. Nous pouvons également gérer les formalités de transfert de contrats (eau, électricité) pour une transition en douceur.'
    }
];

export const PRODUCTS = [
  {
    id: 'prod1',
    name: 'Vase en Céramique Abstrait',
    price: 25000,
    category: 'Décoration',
    imageUrl: 'https://picsum.photos/seed/prod1/600/600',
    imageUrls: [
      'https://picsum.photos/seed/prod1-1/1200/800',
      'https://picsum.photos/seed/prod1-2/1200/800',
    ],
    description: 'Un vase en céramique au design moderne et abstrait, parfait pour ajouter une touche artistique à votre salon ou votre bureau. Fait à la main par des artisans locaux.',
    isFeatured: true,
  },
  {
    id: 'prod2',
    name: 'Lampe de Table Industrielle',
    price: 45000,
    category: 'Luminaires',
    imageUrl: 'https://picsum.photos/seed/prod2/600/600',
    description: 'Cette lampe de table combine le bois brut et le métal noir pour un style industriel chic. Idéale pour un bureau ou une table de chevet, elle diffuse une lumière chaude et agréable.',
    isFeatured: true,
  },
  {
    id: 'prod3',
    name: 'Coussin en Velours Côtelé',
    price: 15000,
    category: 'Textiles',
    imageUrl: 'https://picsum.photos/seed/prod3/600/600',
    description: 'Ajoutez confort et texture à votre canapé avec ce coussin en velours côtelé ultra-doux. Disponible en plusieurs couleurs pour s\'adapter à votre décor.',
    isFeatured: true,
  },
  {
    id: 'prod4',
    name: 'Table d\'Appoint en Marbre',
    price: 85000,
    category: 'Mobilier',
    imageUrl: 'https://picsum.photos/seed/prod4/600/600',
    description: 'Une table d\'appoint élégante avec un plateau en marbre véritable et une structure en métal doré. Parfaite pour poser un verre, un livre ou une plante.',
    isFeatured: true,
  },
  {
    id: 'prod5',
    name: 'Miroir Mural Oeil de Sorcière',
    price: 35000,
    category: 'Décoration',
    imageUrl: 'https://picsum.photos/seed/prod5/600/600',
    description: 'Un miroir mural décoratif en rotin tressé qui agrandit l\'espace et ajoute une touche bohème à votre entrée ou votre chambre.',
  },
];

export const ABOUT_DATA = {
  history: "Fondée avec la vision de transformer l'expérience immobilière à Yaoundé, ImmoYaoundé est devenue un acteur incontournable du marché. Notre agence est bâtie sur des valeurs de transparence, d'intégrité et de service client irréprochable.",
  mission: "Nous couvrons l'ensemble des 7 communes de Yaoundé, avec une connaissance approfondie de chaque quartier, de ses atouts et de son potentiel. Notre mission est de vous offrir un accompagnement sur-mesure, que vous soyez vendeur, acheteur, locataire ou investisseur.",
  interventionTitle: "Nos Zones d'Intervention",
  interventionText: "Nous opérons sur l'ensemble du territoire de Yaoundé, vous offrant une couverture complète des 7 communes de la capitale.",
  interventionImageUrl: "https://picsum.photos/seed/map/1200/400"
};

export const HOME_PAGE_DATA = {
  ctaBannerPrefix: "ImmoYaoundé :",
  ctaBannerSuffix: "Bien plus qu'une agence. Découvrez nos services exclusifs et laissez-nous concrétiser votre projet immobilier de A à Z.",
  ownerCtaTitle: "Vous êtes propriétaire ?",
  ownerCtaText: "Confiez-nous la vente, la location ou la gestion de votre bien. Profitez de notre visibilité et de notre expertise pour une transaction sereine et rentable.",
  servicesTitle: "Nos Services",
  servicesSubtitle: "Un service complet pour répondre à tous vos besoins immobiliers.",
  featuredPropertiesTitle: "Biens à la Une",
  featuredPropertiesSubtitle: "Le meilleur de notre catalogue, sélectionné pour vous.",
  featuredProductsTitle: "Produits à la Une",
  featuredProductsSubtitle: "Notre sélection d'articles pour parfaire votre intérieur.",
};