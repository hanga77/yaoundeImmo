
import { Property, Agent, Service, BlogPost, PropertyType, AboutData } from './types';

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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Le marché immobilier de Yaoundé en 2025 : Tendances et perspectives',
    excerpt: 'Découvrez les quartiers qui montent et les opportunités d\'investissement à ne pas manquer dans la capitale camerounaise.',
    date: '22 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b1/800/600',
    author: 'Marie Claire Ngono',
    content: `
      <p>Le marché immobilier de Yaoundé connaît une dynamique fascinante en 2025. Avec une croissance démographique soutenue et un développement infrastructurel constant, la capitale camerounaise offre des opportunités uniques pour les investisseurs et les futurs propriétaires. Cet article explore les tendances clés et les perspectives pour l'année à venir.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Les Quartiers en Pleine Expansion</h3>
      <p>Si des quartiers comme Bastos et le Golf restent des valeurs sûres pour le haut de gamme, de nouvelles zones émergent avec un potentiel de plus-value considérable. Nkoabang, avec ses vastes terrains et son plan d'urbanisation, attire de plus en plus d'investisseurs cherchant à construire. De même, la zone d'Odza, grâce à sa proximité avec l'aéroport et ses nouvelles voies d'accès, voit sa valeur grimper.</p>
      <ul class="list-disc list-inside my-4">
        <li><strong>Bastos :</strong> Stabilité et prestige.</li>
        <li><strong>Nkoabang :</strong> Fort potentiel de croissance pour le neuf.</li>
        <li><strong>Odza :</strong> Connectivité et développement.</li>
      </ul>
      <h3 class="text-xl font-bold mt-6 mb-3">Tendances du Marché</h3>
      <p>La demande pour les appartements modernes et sécurisés en location est en forte hausse, notamment de la part des jeunes professionnels et des expatriés. Les duplex et les villas avec des espaces extérieurs (jardins, piscines) restent très recherchés par les familles pour l'achat. L'investissement locatif dans des studios meublés à proximité des universités, comme à Ngoa-Ekellé, offre également un excellent rendement.</p>
    `
  },
  {
    id: 'b2',
    title: '5 conseils pour bien préparer la vente de votre bien immobilier',
    excerpt: 'De la valorisation de votre bien (home staging) à la fixation du juste prix, nos experts vous livrent leurs secrets.',
    date: '15 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b2/800/600',
    author: 'Jean-Pierre Bekolo',
    content: `
      <p>Vendre un bien immobilier ne s'improvise pas. Une bonne préparation peut significativement accélérer la vente et optimiser votre gain. Voici 5 conseils essentiels de nos experts.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">1. Dépersonnalisez et désencombrez</h3>
      <p>Le futur acheteur doit pouvoir s'imaginer vivre chez vous. Retirez les photos de famille, les objets trop personnels et désencombrez les pièces pour qu'elles paraissent plus grandes et plus lumineuses.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">2. Faites les petites réparations</h3>
      <p>Une ampoule grillée, un robinet qui goutte, une poignée de porte cassée... Ces petits détails peuvent donner une mauvaise impression. Assurez-vous que tout est fonctionnel.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">3. Valorisez votre bien (Home Staging)</h3>
      <p>Nettoyez de fond en comble, aérez les pièces avant les visites, et ajoutez quelques touches de décoration neutres (plantes, coussins) pour créer une atmosphère accueillante.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">4. Rassemblez les documents nécessaires</h3>
      <p>Titre foncier, plans, factures de travaux, diagnostics techniques... Avoir un dossier complet rassure les acheteurs et accélère les démarches administratives.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">5. Fixez le bon prix</h3>
      <p>Un prix trop élevé décourage les visites, un prix trop bas vous fait perdre de l'argent. Faites appel à un professionnel pour une estimation juste et basée sur le marché actuel de votre quartier.</p>
    `
  },
  {
    id: 'b3',
    title: 'Investissement locatif à Yaoundé : quel quartier choisir ?',
    excerpt: 'Analyse comparative des rendements locatifs et du potentiel de plus-value dans les 7 communes de Yaoundé.',
    date: '5 septembre 2025',
    imageUrl: 'https://picsum.photos/seed/b3/800/600',
    author: 'Aïcha Diallo',
    content: `
      <p>Yaoundé offre un terrain fertile pour l'investissement locatif, mais le choix du quartier est déterminant pour la rentabilité de votre projet. Voici une analyse pour vous guider.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Pour un rendement élevé et rapide : Ngoa-Ekellé</h3>
      <p>Avec la présence du campus universitaire principal, la demande pour les studios et petits appartements est constante. La vacance locative est faible et les loyers sont stables. C'est un investissement idéal pour un premier projet avec un budget modéré.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Pour la sécurité et la clientèle d'expatriés : Bastos & Golf</h3>
      <p>Ces quartiers résidentiels abritent de nombreuses ambassades et organisations internationales. Les loyers y sont les plus élevés de la ville, attirant une clientèle d'expatriés et de hauts fonctionnaires. La demande est forte pour des appartements meublés de haut standing et des villas sécurisées. L'investissement initial est plus important, mais la rentabilité est excellente.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Pour le potentiel de plus-value : Nkoabang & Odza</h3>
      <p>Ces zones sont en plein développement. Acheter un terrain ou un bien à rénover aujourd'hui pourrait se révéler très rentable à moyen et long terme. Les infrastructures s'y développent rapidement, ce qui va mécaniquement augmenter la valeur des biens dans les années à venir.</p>
    `
  }
];

export const ABOUT_DATA: AboutData = {
  history: "Fondée avec la vision de transformer l'expérience immobilière à Yaoundé, ImmoYaoundé est devenue un acteur incontournable du marché. Notre agence est bâtie sur des valeurs de transparence, d'intégrité et de service client irréprochable.",
  mission: "Nous couvrons l'ensemble des 7 communes de Yaoundé, avec une connaissance approfondie de chaque quartier, de ses atouts et de son potentiel. Notre mission est de vous offrir un accompagnement sur-mesure, que vous soyez vendeur, acheteur, locataire ou investisseur."
};