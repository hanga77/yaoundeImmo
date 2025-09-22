// FIX: Import BlogPost type.
import { Property, Agent, Service, Product, PropertyType, AboutData, BlogPost } from './types';

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

export const PRODUCTS: Product[] = [
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

// FIX: Add mock data for blog posts.
export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'blog1',
        title: '5 Astuces pour Vendre Votre Maison Rapidement à Yaoundé',
        excerpt: 'Découvrez nos conseils d\'experts pour accélérer la vente de votre bien immobilier dans le marché dynamique de Yaoundé. De la mise en scène à la fixation du bon prix, nous couvrons tout.',
        imageUrl: 'https://picsum.photos/seed/blog1/800/600',
        author: 'Marie Claire Ngono',
        date: '15 Juillet 2024',
        content: `
            <h3>1. La Première Impression Compte</h3>
            <p>Assurez-vous que votre maison est impeccable. Un nettoyage en profondeur, un désencombrement et quelques petites réparations peuvent faire une énorme différence. Pensez à l'attrait extérieur : une pelouse tondue et une porte d'entrée fraîchement peinte sont accueillantes.</p>
            <h3>2. Fixez le Juste Prix</h3>
            <p>Un prix trop élevé peut décourager les acheteurs potentiels dès le départ. Faites des recherches sur les biens comparables dans votre quartier ou, mieux encore, faites appel à l'un de nos agents pour une estimation professionnelle. Un prix compétitif générera plus d'intérêt et potentiellement plusieurs offres.</p>
            <h3>3. La Mise en Scène (Home Staging)</h3>
            <p>Le home staging aide les acheteurs à s'imaginer vivre dans l'espace. Optez pour une décoration neutre et dépersonnalisez les pièces. Le but est de créer une ambiance chaleureuse et accueillante sans imposer votre style personnel.</p>
            <h3>4. Des Photos de Qualité Professionnelle</h3>
            <p>La plupart des acheteurs commencent leur recherche en ligne. Des photos de haute qualité sont donc essentielles pour capter leur attention. Engagez un photographe immobilier ou assurez-vous que votre agent le fait. Des photos lumineuses et bien cadrées mettront en valeur les meilleurs atouts de votre maison.</p>
            <h3>5. Soyez Flexible pour les Visites</h3>
            <p>Il est crucial de rendre votre maison aussi accessible que possible pour les visites. Plus il est facile pour les acheteurs de voir votre bien, plus vous aurez de chances de recevoir une offre rapidement. Essayez de répondre positivement à toutes les demandes de visite, même à court préavis.</p>
        `
    },
    {
        id: 'blog2',
        title: 'Investir dans l\'Immobilier Locatif à Yaoundé : Les Quartiers à Suivre',
        excerpt: 'Yaoundé est en pleine expansion. Quels sont les quartiers les plus prometteurs pour un investissement locatif rentable ? Notre analyse pour vous guider.',
        imageUrl: 'https://picsum.photos/seed/blog2/800/600',
        author: 'Jean-Pierre Bekolo',
        date: '02 Juillet 2024',
        content: `
            <p>Investir dans l'immobilier locatif à Yaoundé peut être une excellente source de revenus passifs, à condition de choisir le bon emplacement. Voici quelques quartiers qui présentent un fort potentiel de croissance et une forte demande locative.</p>
            <h3>Bastos : La Valeur Sûre</h3>
            <p>Quartier des ambassades et des expatriés, Bastos reste une valeur sûre. La demande pour des logements de haut standing y est constante. Bien que les prix d'achat soient élevés, les loyers le sont également, garantissant une bonne rentabilité.</p>
            <h3>Ngoa-Ekellé : Le Quartier Étudiant</h3>
            <p>Avec la proximité de l'Université de Yaoundé I, Ngoa-Ekellé est un choix stratégique pour investir dans des studios ou de petits appartements. La demande locative étudiante est permanente, assurant un faible taux de vacance.</p>
            <h3>Odza : Le Futur de Yaoundé</h3>
            <p>Situé près de l'aéroport international de Nsimalen et en plein développement, Odza attire de plus en plus de familles et de jeunes professionnels. Les prix y sont encore abordables et le potentiel d'appréciation du capital est significatif à moyen et long terme.</p>
            <h3>Santa Barbara : Le Calme Résidentiel</h3>
            <p>Ce quartier résidentiel sécurisé est très prisé par les familles aisées et les cadres. Investir dans un duplex ou une villa à Santa Barbara peut offrir d'excellents rendements locatifs, en particulier pour les locations meublées.</p>
        `
    }
];

export const ABOUT_DATA: AboutData = {
  history: "Fondée avec la vision de transformer l'expérience immobilière à Yaoundé, ImmoYaoundé est devenue un acteur incontournable du marché. Notre agence est bâtie sur des valeurs de transparence, d'intégrité et de service client irréprochable.",
  mission: "Nous couvrons l'ensemble des 7 communes de Yaoundé, avec une connaissance approfondie de chaque quartier, de ses atouts et de son potentiel. Notre mission est de vous offrir un accompagnement sur-mesure, que vous soyez vendeur, acheteur, locataire ou investisseur.",
  interventionTitle: "Nos Zones d'Intervention",
  interventionText: "Nous opérons sur l'ensemble du territoire de Yaoundé, vous offrant une couverture complète des 7 communes de la capitale.",
  interventionImageUrl: "https://picsum.photos/seed/map/1200/400"
};