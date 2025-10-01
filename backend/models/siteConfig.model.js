import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },
  ogImage: { type: String, required: true },
}, { _id: false });

const footerSchema = new mongoose.Schema({
  logoPart1: { type: String },
  logoPart2: { type: String },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebookUrl: { type: String },
  facebookIcon: { type: String },
  xUrl: { type: String },
  xIcon: { type: String },
  youtubeUrl: { type: String },
  youtubeIcon: { type: String },
  tiktokUrl: { type: String },
  tiktokIcon: { type: String },
  pinterestUrl: { type: String },
  pinterestIcon: { type: String },
  legalNoticeUrl: { type: String },
  privacyPolicyUrl: { type: String },
  openingHours: { type: String },
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  history: { type: String, required: true },
  mission: { type: String, required: true },
  interventionTitle: { type: String, required: true },
  interventionText: { type: String, required: true },
  interventionImageUrl: { type: String, required: true },
}, { _id: false });

const homePageSchema = new mongoose.Schema({
  ctaBannerPrefix: { type: String, required: true },
  ctaBannerSuffix: { type: String, required: true },
  ownerCtaTitle: { type: String, required: true },
  ownerCtaText: { type: String, required: true },
  servicesTitle: { type: String, required: true },
  servicesSubtitle: { type: String, required: true },
  featuredPropertiesTitle: { type: String, required: true },
  featuredPropertiesSubtitle: { type: String, required: true },
  featuredProductsTitle: { type: String, required: true },
  featuredProductsSubtitle: { type: String, required: true },
}, { _id: false });

const buttonThemeSchema = new mongoose.Schema({
  bg: { type: String, required: true },
  text: { type: String, required: true },
  border: { type: String, required: true },
  hoverBg: { type: String, required: true },
  hoverText: { type: String, required: true },
  hoverBorder: { type: String, required: true },
}, { _id: false });

const themeSchema = new mongoose.Schema({
  primaryButton: { type: buttonThemeSchema },
  secondaryButton: { type: buttonThemeSchema },
}, { _id: false });

const siteConfigSchema = new mongoose.Schema({
  seoData: { type: seoSchema, required: true },
  footerData: { type: footerSchema, required: true },
  aboutData: { type: aboutSchema, required: true },
  homePageData: { type: homePageSchema, required: true },
  themeData: { type: themeSchema },
}, {
  timestamps: true,
});

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

export default SiteConfig;