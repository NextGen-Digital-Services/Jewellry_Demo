import { IMAGES } from './images';

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Rings', slug: 'rings', image: IMAGES.CATEGORIES.RINGS, description: 'Handcrafted Italian gold, diamond, and gemstone rings.' },
  { id: 'cat-2', name: 'Necklaces', slug: 'necklaces', image: IMAGES.CATEGORIES.NECKLACES, description: 'Elegant chains, statement chokers, and diamond necklaces.' },
  { id: 'cat-3', name: 'Earrings', slug: 'earrings', image: IMAGES.CATEGORIES.EARRINGS, description: 'Studs, hoops, drops, and chandelier earrings in 18kt gold.' },
  { id: 'cat-4', name: 'Bracelets & Bangles', slug: 'bracelets', image: IMAGES.CATEGORIES.BRACELETS, description: 'Tennis bracelets, sculpted bangles, and charm bracelets.' },
  { id: 'cat-5', name: 'Pendants', slug: 'pendants', image: IMAGES.CATEGORIES.PENDANTS, description: 'Solitaire, floral, and heritage motif gold pendants.' },
  { id: 'cat-6', name: 'Bridal & Mangalsutra', slug: 'bridal-sets', image: IMAGES.CATEGORIES.BRIDAL, description: 'Regal bridal sets and contemporary diamond mangalsutras.' },
  { id: 'cat-7', name: "Men's Jewellery", slug: 'mens-jewellery', image: IMAGES.CATEGORIES.MENS, description: 'Bespoke rings, kadas, cufflinks, and chains for men.' },
  { id: 'cat-8', name: 'Diamond', slug: 'diamond', image: IMAGES.CATEGORIES.DIAMONDS, description: 'Certified VVS-EF lab-grown and natural diamond creations.' },
  { id: 'cat-9', name: 'Gold Coins & Bars', slug: 'gold-coins', image: IMAGES.CATEGORIES.GOLD_COINS, description: '24kt 999 purity gold coins and minted Swiss-style bars.' }
];

export const INITIAL_COLLECTIONS = [
  { id: 'col-1', name: 'Firenze 1954', slug: 'firenze', image: IMAGES.COLLECTIONS.FIRENZE, tagline: 'Renaissance goldsmithing re-imagined', description: 'Inspired by the Ponte Vecchio ateliers of Florence, featuring intricate filigree and hammer-sculpted gold.' },
  { id: 'col-2', name: 'Roma Imperial', slug: 'roma', image: IMAGES.COLLECTIONS.ROMA, tagline: 'Monumental elegance & architectural strength', description: 'Bold geometric silhouettes and arch motifs evocative of classical Roman monuments.' },
  { id: 'col-3', name: 'Venezia Luce', slug: 'venezia', image: IMAGES.COLLECTIONS.VENEZIA, tagline: 'Shimmering reflections of the Grand Canal', description: 'Fluid pavé diamond settings reflecting the dance of sunlit waters in Venice.' },
  { id: 'col-4', name: 'Milano Moderne', slug: 'milano', image: IMAGES.COLLECTIONS.MILANO, tagline: 'Sleek high-fashion contemporary statements', description: 'Ultra-refined minimalist gold curves designed for modern haute couture layering.' },
  { id: 'col-5', name: 'Capri Riviera', slug: 'capri', image: IMAGES.COLLECTIONS.CAPRI, tagline: 'Azure coastlines & vibrant gemstone blooms', description: 'Vivid sapphires, emeralds, and rubies encircled by brilliant diamond halos.' }
];

export const INITIAL_PRODUCTS = [
  // Rings
  {
    id: 'prod-101',
    sku: 'AV-RNG-01',
    name: 'Anello Firenze Solitaire Ring',
    slug: 'anello-firenze-solitaire-ring',
    category: 'Rings',
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 4.8,
    stones: '1.2ct VVS1-E Diamond',
    makingCharges: 4500,
    price: 148000,
    originalPrice: 165000,
    stock: 12,
    rating: 4.9,
    reviewsCount: 28,
    featured: true,
    bestseller: true,
    badge: 'Bestseller',
    images: IMAGES.PRODUCTS.RINGS,
    description: 'Masterfully forged in Florentine 18kt yellow gold, holding a brilliant 1.2 carat solitaire diamond encased in an artisan scalloped crown.',
    specs: { 'Metal Weight': '4.8 grams', 'Diamond Weight': '1.20 ct', 'Clarity / Color': 'VVS1 / E Grade', 'Certificate': 'IGI Certified', 'Origin': 'Firenze Atelier' },
    sizes: ['10', '12', '14', '16', '18']
  },
  {
    id: 'prod-102',
    sku: 'AV-RNG-02',
    name: 'Oltre Roma Sculpted Gold Ring',
    slug: 'oltre-roma-sculpted-gold-ring',
    category: 'Rings',
    collection: 'Roma Imperial',
    metal: 'Rose Gold',
    purity: '18kt',
    weightGrams: 6.2,
    stones: 'Pavé Diamonds 0.45ct',
    makingCharges: 5200,
    price: 89000,
    originalPrice: 98000,
    stock: 8,
    rating: 4.8,
    reviewsCount: 19,
    featured: true,
    bestseller: false,
    badge: 'Heritage',
    images: IMAGES.PRODUCTS.RINGS,
    description: 'Sculpted with arches inspired by the Colosseum, this 18kt rose gold band is accented with brilliant pave diamonds.',
    specs: { 'Metal Weight': '6.2 grams', 'Diamond Weight': '0.45 ct', 'Clarity / Color': 'VS2 / F Grade', 'Certificate': 'Hallmarked 750', 'Origin': 'Valenza Workshop' },
    sizes: ['12', '14', '16', '18']
  },
  {
    id: 'prod-103',
    sku: 'AV-RNG-03',
    name: 'Venezia Luce Diamond Eternity Ring',
    slug: 'venezia-luce-diamond-eternity-ring',
    category: 'Rings',
    collection: 'Venezia Luce',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 5.1,
    stones: '2.5ct Full Eternity Diamonds',
    makingCharges: 7000,
    price: 215000,
    originalPrice: 230000,
    stock: 5,
    rating: 5.0,
    reviewsCount: 14,
    featured: true,
    bestseller: true,
    badge: 'High Jewellery',
    images: IMAGES.PRODUCTS.RINGS,
    description: 'A seamless continuous loop of radiant round brilliant diamonds prong-set in 18kt Venetian white gold.',
    specs: { 'Metal Weight': '5.1 grams', 'Diamond Weight': '2.50 ct Total', 'Clarity / Color': 'VVS / E-F', 'Certificate': 'GIA Certified', 'Origin': 'Venice Atelier' },
    sizes: ['12', '14', '16']
  },
  {
    id: 'prod-104',
    sku: 'AV-RNG-04',
    name: 'Capri Emerald Halo Ring',
    slug: 'capri-emerald-halo-ring',
    category: 'Rings',
    collection: 'Capri Riviera',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 5.5,
    stones: '1.8ct Natural Zambian Emerald + 0.6ct Diamonds',
    makingCharges: 6000,
    price: 192000,
    originalPrice: 210000,
    stock: 4,
    rating: 4.9,
    reviewsCount: 11,
    featured: false,
    bestseller: false,
    badge: 'Exclusive',
    images: IMAGES.PRODUCTS.RINGS,
    description: 'Deep green natural Zambian emerald surrounded by a shimmering sunburst halo of baguette diamonds.',
    specs: { 'Metal Weight': '5.5 grams', 'Emerald': '1.80 ct Natural', 'Diamonds': '0.60 ct Total', 'Certificate': 'GRS Gem Lab', 'Origin': 'Florence Atelier' },
    sizes: ['12', '14', '16']
  },

  // Necklaces
  {
    id: 'prod-201',
    sku: 'AV-NCK-01',
    name: 'Collana Venezia Diamond Riviera Necklace',
    slug: 'collana-venezia-diamond-riviera-necklace',
    category: 'Necklaces',
    collection: 'Venezia Luce',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 28.4,
    stones: '8.5ct Graduated VVS Diamonds',
    makingCharges: 18000,
    price: 685000,
    originalPrice: 720000,
    stock: 3,
    rating: 5.0,
    reviewsCount: 9,
    featured: true,
    bestseller: true,
    badge: 'Masterpiece',
    images: IMAGES.PRODUCTS.NECKLACES,
    description: 'An ethereal cascading riviera necklace featuring 8.5 carats of hand-selected VVS diamonds set in liquid-smooth 18kt white gold.',
    specs: { 'Metal Weight': '28.4 grams', 'Total Diamond Weight': '8.50 ct', 'Clarity / Color': 'VVS1 / D-E', 'Length': '16 inches with 2-inch extender', 'Certificate': 'GIA Certified' },
    sizes: ['16 Inch', '18 Inch']
  },
  {
    id: 'prod-202',
    sku: 'AV-NCK-02',
    name: 'Firenze Renaissance Choker',
    slug: 'firenze-renaissance-choker',
    category: 'Necklaces',
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '22kt',
    weightGrams: 35.0,
    stones: 'Uncut Polki & South Sea Pearls',
    makingCharges: 14000,
    price: 345000,
    originalPrice: 375000,
    stock: 6,
    rating: 4.9,
    reviewsCount: 16,
    featured: false,
    bestseller: true,
    badge: 'Heritage',
    images: IMAGES.PRODUCTS.NECKLACES,
    description: 'Artisanal 22kt yellow gold choker featuring hand-engraved scrollwork, natural polki diamonds, and lustrous South Sea pearl drops.',
    specs: { 'Metal Weight': '35.0 grams', 'Purity': '22kt (916 Hallmarked)', 'Pearls': '12mm Natural South Sea', 'Origin': 'Firenze Atelier' },
    sizes: ['Standard Adjustable']
  },
  {
    id: 'prod-203',
    sku: 'AV-NCK-03',
    name: 'Milano Minimalist Gold Rope Chain',
    slug: 'milano-minimalist-gold-rope-chain',
    category: 'Necklaces',
    collection: 'Milano Moderne',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 12.5,
    stones: 'None',
    makingCharges: 3500,
    price: 88000,
    originalPrice: 95000,
    stock: 15,
    rating: 4.7,
    reviewsCount: 32,
    featured: false,
    bestseller: false,
    badge: 'Essential',
    images: IMAGES.PRODUCTS.NECKLACES,
    description: 'A classic 18kt yellow gold hand-woven diamond-cut rope chain. Fluid, resilient, and shimmering with Milanese understated luxury.',
    specs: { 'Metal Weight': '12.5 grams', 'Thickness': '3.2 mm', 'Length': '18 inches', 'Clasp': 'Lobster Lock' },
    sizes: ['18 Inch', '20 Inch', '22 Inch']
  },
  {
    id: 'prod-204',
    sku: 'AV-NCK-04',
    name: 'Capri Sapphire Drop Necklace',
    slug: 'capri-sapphire-drop-necklace',
    category: 'Necklaces',
    collection: 'Capri Riviera',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 14.2,
    stones: '3.2ct Royal Blue Sapphire + 1.1ct Diamonds',
    makingCharges: 8500,
    price: 320000,
    originalPrice: 350000,
    stock: 4,
    rating: 4.9,
    reviewsCount: 8,
    featured: true,
    bestseller: false,
    badge: 'New Arrival',
    images: IMAGES.PRODUCTS.NECKLACES,
    description: 'Capturing the blue hues of Capri’s Grotta Azzurra, a pear-cut 3.2ct royal blue sapphire crowned by diamond petals.',
    specs: { 'Metal Weight': '14.2 grams', 'Sapphire Weight': '3.20 ct', 'Diamond Weight': '1.10 ct', 'Certificate': 'CGL Certified' },
    sizes: ['18 Inch']
  },

  // Earrings
  {
    id: 'prod-301',
    sku: 'AV-ERG-01',
    name: 'Orecchini Roma Arch Hoop Earrings',
    slug: 'orecchini-roma-arch-hoop-earrings',
    category: 'Earrings',
    collection: 'Roma Imperial',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 8.4,
    stones: '0.6ct Brilliant Cut Diamonds',
    makingCharges: 4200,
    price: 112000,
    originalPrice: 125000,
    stock: 10,
    rating: 4.9,
    reviewsCount: 22,
    featured: true,
    bestseller: true,
    badge: 'Bestseller',
    images: IMAGES.PRODUCTS.EARRINGS,
    description: 'Iconic Roman arch silhouette in mirror-polished 18kt gold, lined with a front-facing row of sparkling round diamonds.',
    specs: { 'Metal Weight': '8.4 grams', 'Diamond Weight': '0.60 ct', 'Closure': 'French Clip Back', 'Diameter': '24 mm' },
    sizes: ['One Size']
  },
  {
    id: 'prod-302',
    sku: 'AV-ERG-02',
    name: 'Venezia Pearl Drop Earrings',
    slug: 'venezia-pearl-drop-earrings',
    category: 'Earrings',
    collection: 'Venezia Luce',
    metal: 'Rose Gold',
    purity: '18kt',
    weightGrams: 6.8,
    stones: 'Akoya Cultured Pearls & 0.35ct Diamonds',
    makingCharges: 3800,
    price: 78000,
    originalPrice: 85000,
    stock: 14,
    rating: 4.8,
    reviewsCount: 17,
    featured: false,
    bestseller: false,
    badge: 'Classic',
    images: IMAGES.PRODUCTS.EARRINGS,
    description: 'Flawless 9mm Akoya pearls suspended from diamond-encrusted rose gold ribbons.',
    specs: { 'Metal Weight': '6.8 grams', 'Pearl Size': '9.0 mm Akoya', 'Diamond Weight': '0.35 ct', 'Closure': 'Push Back' },
    sizes: ['One Size']
  },
  {
    id: 'prod-303',
    sku: 'AV-ERG-03',
    name: 'Firenze Solitaire Diamond Studs',
    slug: 'firenze-solitaire-diamond-studs',
    category: 'Earrings',
    collection: 'Firenze 1954',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 3.2,
    stones: '1.0ct Pair VVS1 Diamonds (0.50ct each)',
    makingCharges: 3000,
    price: 135000,
    originalPrice: 145000,
    stock: 20,
    rating: 5.0,
    reviewsCount: 45,
    featured: true,
    bestseller: true,
    badge: 'Essential',
    images: IMAGES.PRODUCTS.EARRINGS,
    description: 'Timeless 4-prong martini setting studs crafted in 18kt white gold with exceptional VVS1 clarity diamonds.',
    specs: { 'Metal Weight': '3.2 grams', 'Total Diamond Weight': '1.00 ct Pair', 'Color/Clarity': 'E / VVS1', 'Certificate': 'IGI Certified' },
    sizes: ['1.0 ct Pair', '1.5 ct Pair', '2.0 ct Pair']
  },

  // Bracelets & Bangles
  {
    id: 'prod-401',
    sku: 'AV-BRC-01',
    name: 'Bracciale Milano Diamond Tennis Bracelet',
    slug: 'bracciale-milano-diamond-tennis-bracelet',
    category: 'Bracelets & Bangles',
    collection: 'Milano Moderne',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 14.6,
    stones: '4.2ct VVS-EF Diamonds',
    makingCharges: 9500,
    price: 385000,
    originalPrice: 410000,
    stock: 6,
    rating: 5.0,
    reviewsCount: 19,
    featured: true,
    bestseller: true,
    badge: 'Iconic',
    images: IMAGES.PRODUCTS.BRACELETS,
    description: 'Flexible 4-prong diamond tennis bracelet featuring 4.2 carats of ultra-brilliant VVS diamonds linked with double-safety lock.',
    specs: { 'Metal Weight': '14.6 grams', 'Diamond Weight': '4.20 ct', 'Length': '7 inches', 'Clasp': 'Double Safety Lock' },
    sizes: ['6.5 Inch', '7.0 Inch', '7.5 Inch']
  },
  {
    id: 'prod-402',
    sku: 'AV-BRC-02',
    name: 'Roma Sculpted Gold Bangle',
    slug: 'roma-sculpted-gold-bangle',
    category: 'Bracelets & Bangles',
    collection: 'Roma Imperial',
    metal: 'Yellow Gold',
    purity: '22kt',
    weightGrams: 22.8,
    stones: 'None',
    makingCharges: 6800,
    price: 185000,
    originalPrice: 200000,
    stock: 7,
    rating: 4.8,
    reviewsCount: 12,
    featured: false,
    bestseller: false,
    badge: '22kt Gold',
    images: IMAGES.PRODUCTS.BRACELETS,
    description: 'Solid 22kt yellow gold cuff bangle featuring hand-chiselled satin finishes and polished bevelled edges.',
    specs: { 'Metal Weight': '22.8 grams', 'Purity': '22kt (916 BIS Hallmarked)', 'Inner Diameter': '2.4 / 2.6 / 2.8' },
    sizes: ['2.4', '2.6', '2.8']
  },

  // Pendants
  {
    id: 'prod-501',
    sku: 'AV-PND-01',
    name: 'Pendente Capri Sunburst Diamond Pendant',
    slug: 'pendente-capri-sunburst-diamond-pendant',
    category: 'Pendants',
    collection: 'Capri Riviera',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 4.5,
    stones: '0.75ct Round & Marquise Diamonds',
    makingCharges: 3200,
    price: 94000,
    originalPrice: 105000,
    stock: 11,
    rating: 4.9,
    reviewsCount: 15,
    featured: true,
    bestseller: false,
    badge: 'Popular',
    images: IMAGES.PRODUCTS.PENDANTS,
    description: 'Radiant sunburst pendant crafted in 18kt gold featuring a central brilliant solitaire surrounded by marquise diamond rays.',
    specs: { 'Metal Weight': '4.5 grams', 'Diamond Weight': '0.75 ct', 'Chain': 'Included 18-inch gold chain' },
    sizes: ['Standard']
  },
  {
    id: 'prod-502',
    sku: 'AV-PND-02',
    name: 'Venezia Oval Ruby Pendant',
    slug: 'venezia-oval-ruby-pendant',
    category: 'Pendants',
    collection: 'Venezia Luce',
    metal: 'Rose Gold',
    purity: '18kt',
    weightGrams: 5.2,
    stones: '1.5ct Natural Burmese Ruby + 0.4ct Diamonds',
    makingCharges: 4000,
    price: 142000,
    originalPrice: 158000,
    stock: 5,
    rating: 4.9,
    reviewsCount: 9,
    featured: false,
    bestseller: false,
    badge: 'Precious Gem',
    images: IMAGES.PRODUCTS.PENDANTS,
    description: 'Vibrant pigeon blood red natural ruby framed by a micro-pavé diamond halo on an 18kt rose gold box chain.',
    specs: { 'Metal Weight': '5.2 grams', 'Ruby Weight': '1.50 ct', 'Diamond Weight': '0.40 ct', 'Certificate': 'IGI Gemological Cert' },
    sizes: ['Standard']
  },

  // Bridal & Mangalsutra
  {
    id: 'prod-601',
    sku: 'AV-BDL-01',
    name: 'Aurelia Royal Venetian Bridal Diamond Set',
    slug: 'aurelia-royal-venetian-bridal-diamond-set',
    category: 'Bridal & Mangalsutra',
    collection: 'Venezia Luce',
    metal: 'White Gold',
    purity: '18kt',
    weightGrams: 85.0,
    stones: '16.8ct VVS Diamonds & Colombian Emerald Drops',
    makingCharges: 45000,
    price: 1850000,
    originalPrice: 1980000,
    stock: 2,
    rating: 5.0,
    reviewsCount: 6,
    featured: true,
    bestseller: true,
    badge: 'Couture Bridal',
    images: IMAGES.PRODUCTS.BRIDAL,
    description: 'Grand luxury 4-piece bridal set comprising a statement necklace, chandelier earrings, maang tikka, and matching ring.',
    specs: { 'Set Includes': 'Necklace, Earrings, Ring, Maang Tikka', 'Total Weight': '85.0 grams', 'Total Diamond Weight': '16.80 ct', 'Certificate': 'GIA Certified' },
    sizes: ['Custom Fitted']
  },
  {
    id: 'prod-602',
    sku: 'AV-BDL-02',
    name: 'Oltre Italian Diamond Solitaire Mangalsutra',
    slug: 'oltre-italian-diamond-solitaire-mangalsutra',
    category: 'Bridal & Mangalsutra',
    collection: 'Milano Moderne',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 9.8,
    stones: '0.85ct Solitaire & Black Onyx Beads',
    makingCharges: 4800,
    price: 128000,
    originalPrice: 140000,
    stock: 9,
    rating: 4.9,
    reviewsCount: 31,
    featured: true,
    bestseller: true,
    badge: 'Bestseller',
    images: IMAGES.PRODUCTS.BRIDAL,
    description: 'Modern Italian interpretation of traditional mangalsutra with 18kt yellow gold chain intertwined with fine black onyx beads and a brilliant diamond solitaire pendant.',
    specs: { 'Metal Weight': '9.8 grams', 'Diamond Weight': '0.85 ct', 'Chain Length': '18 inches', 'Certificate': 'Hallmarked 750' },
    sizes: ['16 Inch', '18 Inch', '20 Inch']
  },

  // Men's Jewellery
  {
    id: 'prod-701',
    sku: 'AV-MN-01',
    name: 'Il Duca Platinum & Diamond Men’s Band',
    slug: 'il-duca-platinum-diamond-mens-band',
    category: "Men's Jewellery",
    collection: 'Roma Imperial',
    metal: 'Platinum',
    purity: '950 Pt',
    weightGrams: 11.4,
    stones: '0.30ct Princess Cut Black & White Diamonds',
    makingCharges: 5500,
    price: 115000,
    originalPrice: 128000,
    stock: 8,
    rating: 4.8,
    reviewsCount: 14,
    featured: true,
    bestseller: false,
    badge: 'Platinum',
    images: IMAGES.PRODUCTS.MENS,
    description: 'Hefty 950 pure platinum band with satin-brushed finish and a channel-set princess cut black and white diamond axis.',
    specs: { 'Metal': 'Platinum 950', 'Weight': '11.4 grams', 'Diamond Weight': '0.30 ct', 'Width': '7 mm' },
    sizes: ['18', '20', '22', '24']
  },
  {
    id: 'prod-702',
    sku: 'AV-MN-02',
    name: 'Valenza Heavy Gold Kada for Men',
    slug: 'valenza-heavy-gold-kada-for-men',
    category: "Men's Jewellery",
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '22kt',
    weightGrams: 42.0,
    stones: 'None',
    makingCharges: 8800,
    price: 310000,
    originalPrice: 335000,
    stock: 4,
    rating: 5.0,
    reviewsCount: 10,
    featured: false,
    bestseller: true,
    badge: '22kt Hallmark',
    images: IMAGES.PRODUCTS.MENS,
    description: 'Solid 22kt hallmark yellow gold kada for men, hand-chiselled with Italian geometric bevels and velvet leather touch pouch.',
    specs: { 'Metal Weight': '42.0 grams', 'Purity': '22kt (916 BIS)', 'Inner Size': '2.6 / 2.8' },
    sizes: ['2.6', '2.8']
  },

  // Diamond
  {
    id: 'prod-801',
    sku: 'AV-DMD-01',
    name: 'Aurelia Stellar 3-Carat Diamond Solitaire Ring',
    slug: 'aurelia-stellar-3-carat-diamond-solitaire-ring',
    category: 'Diamond',
    collection: 'Venezia Luce',
    metal: 'Platinum',
    purity: '950 Pt',
    weightGrams: 6.8,
    stones: '3.01ct VVS1-D Type IIa Diamond',
    makingCharges: 25000,
    price: 1450000,
    originalPrice: 1550000,
    stock: 1,
    rating: 5.0,
    reviewsCount: 5,
    featured: true,
    bestseller: false,
    badge: 'Collector Item',
    images: IMAGES.PRODUCTS.DIAMONDS,
    description: 'Ultra-rare Type IIa 3.01 carat D-color flawless diamond solitaire in custom platinum cathedrals setting.',
    specs: { 'Carat Weight': '3.01 ct', 'Color / Clarity': 'D Color / VVS1 Flawless', 'Cut': 'Triple Excellent', 'Certificate': 'GIA 110298374' },
    sizes: ['12', '14', '16']
  },

  // Gold Coins & Bars
  {
    id: 'prod-901',
    sku: 'AV-COIN-01',
    name: 'Aurelia 24kt 999 Pure Gold Coin (10 Grams)',
    slug: 'aurelia-24kt-999-pure-gold-coin-10-grams',
    category: 'Gold Coins & Bars',
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '24kt (999)',
    weightGrams: 10.0,
    stones: 'None',
    makingCharges: 800,
    price: 74500,
    originalPrice: 77000,
    stock: 50,
    rating: 5.0,
    reviewsCount: 88,
    featured: true,
    bestseller: true,
    badge: '999 Purity',
    images: IMAGES.PRODUCTS.GOLD_COINS,
    description: 'Minted 24kt (999.9 purity) Swiss-precision gold coin featuring the Aurelia lion motif. Tamper-proof certicard packaging.',
    specs: { 'Weight': '10.0 grams', 'Purity': '999.9 Fine Gold', 'Packaging': 'NABL Accredited Certicard' },
    sizes: ['10g']
  },
  {
    id: 'prod-902',
    sku: 'AV-COIN-02',
    name: 'Aurelia 24kt 999 Pure Gold Bar (50 Grams)',
    slug: 'aurelia-24kt-999-pure-gold-bar-50-grams',
    category: 'Gold Coins & Bars',
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '24kt (999)',
    weightGrams: 50.0,
    stones: 'None',
    makingCharges: 2500,
    price: 368000,
    originalPrice: 380000,
    stock: 20,
    rating: 5.0,
    reviewsCount: 42,
    featured: false,
    bestseller: true,
    badge: 'Investment Grade',
    images: IMAGES.PRODUCTS.GOLD_COINS,
    description: '50-gram investment grade 24kt mint bar with laser hologram security and serial number.',
    specs: { 'Weight': '50.0 grams', 'Purity': '999.9 Fine Gold', 'Packaging': 'Insured Certicard Box' },
    sizes: ['50g']
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Contessa Sofia De Luca',
    city: 'Milano, Italia',
    avatar: IMAGES.AVATARS[0],
    rating: 5,
    quote: 'The level of craftsmanship in the Firenze Solitaire is breathtaking. Wearing Aurelia feels like holding a piece of Italian renaissance art.',
    productName: 'Anello Firenze Solitaire Ring'
  },
  {
    id: 't-2',
    name: 'Rohan & Ananya Malhotra',
    city: 'Mumbai, India',
    avatar: IMAGES.AVATARS[1],
    rating: 5,
    quote: 'Our wedding set from Aurelia Venezia exceeded every expectation. The personalized video consultation with their master goldsmith in Florence made us feel like royalty.',
    productName: 'Aurelia Royal Venetian Bridal Diamond Set'
  },
  {
    id: 't-3',
    name: 'Dr. Elena Rossi',
    city: 'Firenze, Italia',
    avatar: IMAGES.AVATARS[2],
    rating: 5,
    quote: 'As someone born in Florence, I am extremely particular about gold hallmarking. Aurelia’s 18kt gold weight and diamond brilliance are unparalleled.',
    productName: 'Bracciale Milano Diamond Tennis Bracelet'
  },
  {
    id: 't-4',
    name: 'Vikramaditya Singhania',
    city: 'New Delhi, India',
    avatar: IMAGES.AVATARS[3],
    rating: 5,
    quote: 'Bought the 50g gold bars for investment and a diamond mangalsutra for my wife. Seamless delivery, certified quality, and superb customer care.',
    productName: 'Oltre Italian Diamond Solitaire Mangalsutra'
  }
];

export const INITIAL_JOURNAL = [
  {
    id: 'j-1',
    slug: 'art-of-florentine-goldsmithing',
    title: 'The Lost Art of Florentine Hand-Engraving',
    category: 'Craftsmanship',
    date: '2026-09-15',
    author: 'Maestro Lorenzo Bernini',
    image: IMAGES.JOURNAL[0],
    excerpt: 'Explore how centuries-old burin engraving techniques passed through generations continue to define the soul of Italian fine jewellery.',
    content: `For over six centuries, the narrow cobblestone alleys surrounding the Ponte Vecchio in Florence have echoed with the steady tap of small hammers and burins. Here, master goldsmiths—or *Maestri Orafi*—transform raw 18kt gold into wearable poetry.

At Aurelia Venezia, every piece within our Firenze 1954 collection begins with hand-chiselled detailing. Unlike mass-manufactured cast jewellery, hand engraving cuts micro-facets directly into gold, creating a satin luminescence that catches light from every angle.

When you hold an Aurelia ring or pendant, you hold the touch of a craftsman who has dedicated four decades to perfecting a single stroke of the blade. This dedication to quiet luxury guarantees that no two creations are ever identical.`
  },
  {
    id: 'j-2',
    slug: 'guide-to-buying-certified-diamonds',
    title: 'The 4Cs Redefined: Understanding Italian Diamond Setting',
    category: 'Jewellery Guide',
    date: '2026-09-02',
    author: 'Giulia Vianello, Senior Gemologist',
    image: IMAGES.JOURNAL[1],
    excerpt: 'Carat, Clarity, Cut, and Color are only the starting point. Discover how Venetian micro-pavé setting amplifies diamond brilliance.',
    content: `While global gemological standards evaluate diamonds based on Carat, Color, Clarity, and Cut, Italian high jewellery introduces a crucial fifth dimension: *L'Incastonatura*—the art of setting.

Even a Flawless D-color diamond can lose its vitality if held by bulky, unrefined prongs. Our Valenza ateliers utilize micro-claw settings engineered to expose maximum surface area to natural light.

When choosing an engagement ring or riviera necklace, look beyond the certificate. Observe how light travels through the girdle and pavilion. At Aurelia Venezia, every solitaire above 0.50 carats is certified by GIA or IGI and set by hand under 40x magnification.`
  },
  {
    id: 'j-3',
    slug: 'modern-bridal-jewellery-trends-2026',
    title: 'Haute Couture Bridal: Merging Italian Heritage with Indian Tradition',
    category: 'Bridal Editorial',
    date: '2026-08-20',
    author: 'Isabella D’Este',
    image: IMAGES.JOURNAL[2],
    excerpt: 'How modern brides are pairing contemporary Italian solitaire mangalsutras with grand emerald bridal chokers for timeless elegance.',
    content: `Today’s bride no longer chooses between tradition and modernity—she demands both. The 2026 bridal landscape sees a beautiful synthesis of royal Indian grandeur and sleek Italian sophistication.

From layered riviera diamond chokers to delicate solitaire mangalsutras featuring black onyx and 18kt rose gold, modern brides curate heirloom pieces designed to be worn long after the wedding day.

In our newly opened Mumbai private atelier, brides-to-be work directly with our design consultants in Florence via real-time high-definition video link to customize bespoke bridal sets matching their specific wedding attire.`
  },
  {
    id: 'j-4',
    slug: 'caring-for-your-18kt-gold-and-diamonds',
    title: 'The Essential Care Guide for Fine Gold & Gemstones',
    category: 'Care & Maintenance',
    date: '2026-08-10',
    author: 'Aurelia Atelier Team',
    image: IMAGES.JOURNAL[3],
    excerpt: 'Simple steps to preserve the mirror shine, gemstone clarity, and structural integrity of your luxury jewellery pieces.',
    content: `Fine jewellery crafted in 18kt gold and precious gemstones is designed to endure for generations, but daily wear requires mindful care.

1. **Avoid Chemicals**: Remove rings and bracelets before applying perfume, hairspray, or swimming in chlorinated pools.
2. **Gentle Cleaning**: Clean your gold and diamond pieces in lukewarm water mixed with mild soap using an extra-soft toothbrush.
3. **Separate Storage**: Store each piece individually in Aurelia’s suede pouch to prevent diamonds from scratching softer metals.`
  },
  {
    id: 'j-5',
    slug: 'gold-purity-18kt-vs-22kt-vs-24kt',
    title: 'Understanding Gold Karats: 18kt vs 22kt vs 24kt Explained',
    category: 'Jewellery Guide',
    date: '2026-07-28',
    author: 'Marco Bellini',
    image: IMAGES.JOURNAL[4],
    excerpt: 'Demystifying gold purity hallmarks, metal durability, and why 18kt gold is the gold standard for high diamond jewellery.',
    content: `Gold in its purest form (24kt / 999 fine gold) is soft and malleable, making it ideal for investment coins and bars but too delicate for complex diamond settings.

- **24kt Gold (99.9% pure)**: Minted bullion coins, bars, and pure investment assets.
- **22kt Gold (91.6% pure)**: Traditional heavy Indian bridal gold, bangles, and solid gold kadas.
- **18kt Gold (75.0% pure)**: The international gold standard for luxury fine jewellery. Alloys of copper, silver, or palladium provide maximum strength to securely hold diamonds while offering rich gold color.`
  },
  {
    id: 'j-6',
    slug: 'the-story-of-ponte-vecchio-artisans',
    title: 'Ponte Vecchio: The Historic Heart of Italian Goldsmithing',
    category: 'Heritage',
    date: '2026-07-14',
    author: 'Francesca Moretti',
    image: IMAGES.JOURNAL[5],
    excerpt: 'A historic journey through the 16th-century decree of Grand Duke Ferdinando I that made Florence the world capital of fine jewellery.',
    content: `In 1593, Grand Duke Ferdinando I de' Medici issued a royal decree ordering all butchers and blacksmiths off the Ponte Vecchio bridge in Florence, replacing them exclusively with goldsmiths and jewellers to elevate the city's prestige.

For over four centuries, that bridge has remained an icon of craftsmanship. Aurelia Venezia traces its founding lineage directly to a family workshop established on the south bank of the Arno River in 1954.`
  }
];

export const INITIAL_FAQS = [
  {
    category: 'Certification & Purity',
    question: 'Are all Aurelia Venezia products BIS Hallmarked & Certified?',
    answer: 'Yes, absolutely. Every piece of gold jewellery crafted by Aurelia Venezia carries the official BIS 750 (18kt) or BIS 916 (22kt) hallmark alongside our proprietary brand stamp. All diamond creations above 0.30ct are accompanied by independent laboratory certificates from GIA, IGI, or SGL.'
  },
  {
    category: 'Certification & Purity',
    question: 'What is the difference between 18kt Gold and 22kt Gold?',
    answer: '18kt gold contains 75% pure gold alloyed with precious metals for strength, making it the ideal setting for diamonds and daily wear fine jewellery. 22kt gold contains 91.6% pure gold, traditional for solid gold bangles, chains, and heritage pieces.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Is shipping free and insured?',
    answer: 'We offer complimentary 100% fully insured express courier shipping across India and worldwide on all orders. Every shipment is dispatched in a sealed security container with real-time GPS tracking and requires OTP confirmation upon delivery.'
  },
  {
    category: 'Returns & Exchange',
    question: 'What is your return and buyback policy?',
    answer: 'We offer a 30-day hassle-free full refund return policy on unworn non-customized pieces. Additionally, all Aurelia jewellery comes with a Lifetime Buyback and Exchange Guarantee at 100% prevailing gold rate and 90% diamond value.'
  },
  {
    category: 'Bespoke & Consultation',
    question: 'How does the Virtual Video Consultation work?',
    answer: 'You can book a complimentary 30-minute private video call with our Jewellery Master in Florence or Senior Stylist in Mumbai. We display products live under high definition cameras and help you select ring sizes, bridal pairings, or custom designs.'
  },
  {
    category: 'Customization',
    question: 'Can I order a custom or bespoke jewellery design?',
    answer: 'Yes! Our Bespoke Atelier team translates your vision, sketch, or reference photo into 3D CAD models and finished 18kt gold masterpieces within 14–21 business days.'
  },
  {
    category: 'Payment Options',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major Credit/Debit Cards (Visa, Mastercard, Amex), Net Banking, UPI (Google Pay, PhonePe, Paytm), Cash on Delivery (up to ₹49,999), and flexible zero-cost EMI plans.'
  },
  {
    category: 'Ring Sizing',
    question: 'What if I order the wrong ring size?',
    answer: 'We provide one complimentary resizing within 60 days of purchase including free pickup and return shipping. You can also use our interactive Ring Size Calculator guide on the site.'
  }
];

export const INITIAL_BOUTIQUES = [
  {
    id: 'boutique-1',
    city: 'Firenze (Florence)',
    country: 'Italia',
    name: 'Palazzo Aurelia Flagship',
    address: 'Via dei Giadrossi 14, 50123 Firenze FI, Italia',
    phone: '+39 055 234 5678',
    email: 'firenze@aureliavenezia.com',
    hours: 'Mon – Sat: 10:00 AM – 7:30 PM',
    image: IMAGES.BOUTIQUES.FIRENZE,
    services: ['Master Goldsmith Atelier', 'Bespoke Design Suite', 'Private VIP Lounge', 'Heritage Museum']
  },
  {
    id: 'boutique-2',
    city: 'Milano (Milan)',
    country: 'Italia',
    name: 'Quadrilatero della Moda Boutique',
    address: 'Via Monte Napoleone 22, 20121 Milano MI, Italia',
    phone: '+39 02 7600 1234',
    email: 'milano@aureliavenezia.com',
    hours: 'Mon – Sun: 10:30 AM – 8:00 PM',
    image: IMAGES.BOUTIQUES.MILANO,
    services: ['High Jewellery Gallery', 'Bridal Salon', 'Tax Free Shopping Services']
  },
  {
    id: 'boutique-3',
    city: 'Mumbai',
    country: 'India',
    name: 'The Taj Mahal Palace Atelier',
    address: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001',
    phone: '+91 22 6665 3333',
    email: 'mumbai@aureliavenezia.com',
    hours: 'Mon – Sun: 11:00 AM – 8:30 PM',
    image: IMAGES.BOUTIQUES.MUMBAI,
    services: ['Bridal Suite', 'Virtual Consultation Station', 'BIS Hallmark Verification', 'Instant Cleaning']
  },
  {
    id: 'boutique-4',
    city: 'Roma (Rome)',
    country: 'Italia',
    name: 'Piazza di Spagna Salon',
    address: 'Via dei Condotti 68, 00187 Roma RM, Italia',
    phone: '+39 06 679 8910',
    email: 'roma@aureliavenezia.com',
    hours: 'Mon – Sat: 10:00 AM – 7:30 PM',
    image: IMAGES.BOUTIQUES.ROMA,
    services: ['Ancient Cameo Restoration', 'Custom Diamond Selection', 'Champagne Reception']
  }
];

export const INITIAL_COUPONS = [
  { id: 'c-1', code: 'WELCOME10', type: 'percentage', discount: 10, minOrder: 25000, maxDiscount: 15000, description: '10% off your first luxury purchase', active: true, expiry: '2026-12-31' },
  { id: 'c-2', code: 'ITALIA15', type: 'percentage', discount: 15, minOrder: 100000, maxDiscount: 50000, description: '15% off orders above ₹1,00,000', active: true, expiry: '2026-12-31' },
  { id: 'c-3', code: 'BRIDAL5000', type: 'flat', discount: 5000, minOrder: 150000, description: 'Flat ₹5,000 off Bridal & High Jewellery collections', active: true, expiry: '2026-11-30' },
  { id: 'c-4', code: 'GOLDCOIN2', type: 'percentage', discount: 2, minOrder: 50000, maxDiscount: 5000, description: '2% off Gold Coins and minted bars', active: true, expiry: '2026-12-31' }
];

export const INITIAL_GOLD_RATES = {
  gold18k: 5450, // INR per gram
  gold22k: 6650,
  gold24k: 7250,
  silver925: 85,
  platinum950: 3400,
  lastUpdated: new Date().toISOString(),
  history: [
    { date: '2026-10-01', gold18k: 5400, gold22k: 6600, silver925: 84 },
    { date: '2026-10-03', gold18k: 5420, gold22k: 6620, silver925: 84.5 },
    { date: '2026-10-05', gold18k: 5440, gold22k: 6640, silver925: 85 },
    { date: '2026-10-07', gold18k: 5450, gold22k: 6650, silver925: 85 }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'ORD-2026-8812',
    date: '2026-10-06T14:22:00Z',
    customer: { name: 'Ananya Singhania', email: 'ananya@example.com', phone: '9876543210' },
    shippingAddress: { addressLine: '42 Altamount Road, Malabar Hill', city: 'Mumbai', state: 'Maharashtra', pincode: '400026', country: 'India' },
    items: [
      { id: 'prod-101', name: 'Anello Firenze Solitaire Ring', price: 148000, qty: 1, image: IMAGES.PRODUCTS.RINGS[0], selectedSize: '14' }
    ],
    subtotal: 148000,
    tax: 4440,
    discount: 14800,
    shippingFee: 0,
    totalAmount: 137640,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Crafting',
    timeline: [
      { status: 'Order Placed', time: '2026-10-06 14:22', completed: true },
      { status: 'Confirmed & Hallmarked', time: '2026-10-06 16:00', completed: true },
      { status: 'Atelier Crafting & Quality Check', time: '2026-10-07 09:30', completed: true },
      { status: 'Insured Express Shipping', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Pending', completed: false }
    ]
  },
  {
    id: 'ORD-2026-8790',
    date: '2026-10-04T10:15:00Z',
    customer: { name: 'Vikram Merchant', email: 'vikram.merchant@example.com', phone: '9811223344' },
    shippingAddress: { addressLine: '18 Golf Links', city: 'New Delhi', state: 'Delhi', pincode: '110003', country: 'India' },
    items: [
      { id: 'prod-401', name: 'Bracciale Milano Diamond Tennis Bracelet', price: 385000, qty: 1, image: IMAGES.PRODUCTS.BRACELETS[0], selectedSize: '7.0 Inch' }
    ],
    subtotal: 385000,
    tax: 11550,
    discount: 15000,
    shippingFee: 0,
    totalAmount: 381550,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Shipped',
    trackingNumber: 'BLUEDART-88902194',
    timeline: [
      { status: 'Order Placed', time: '2026-10-04 10:15', completed: true },
      { status: 'Confirmed & Hallmarked', time: '2026-10-04 12:00', completed: true },
      { status: 'Atelier Crafting & Quality Check', time: '2026-10-05 15:30', completed: true },
      { status: 'Insured Express Shipping', time: '2026-10-06 11:00', completed: true },
      { status: 'Delivered', time: 'Expected 2026-10-08', completed: false }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  { id: 'cust-1', name: 'Ananya Singhania', email: 'ananya@example.com', phone: '+91 98765 43210', city: 'Mumbai', ordersCount: 3, totalSpent: 485000, status: 'Active', joinedDate: '2025-11-12' },
  { id: 'cust-2', name: 'Vikram Merchant', email: 'vikram.merchant@example.com', phone: '+91 98112 23344', city: 'New Delhi', ordersCount: 2, totalSpent: 520000, status: 'Active', joinedDate: '2026-01-05' },
  { id: 'cust-3', name: 'Dr. Priya Nambiar', email: 'priya.nambiar@example.com', phone: '+91 97441 12233', city: 'Bengaluru', ordersCount: 1, totalSpent: 89000, status: 'Active', joinedDate: '2026-03-18' },
  { id: 'cust-4', name: 'Kabir Mehta', email: 'kabir.m@example.com', phone: '+91 99200 55443', city: 'Pune', ordersCount: 4, totalSpent: 640000, status: 'Active', joinedDate: '2025-08-22' }
];

export const INITIAL_APPOINTMENTS = [
  { id: 'app-1', name: 'Natasha Kapoor', email: 'natasha@example.com', phone: '9820011223', type: 'Virtual Video Consultation', boutique: 'Palazzo Aurelia Flagship (Firenze)', date: '2026-10-12', time: '03:00 PM', notes: 'Looking for custom 2.5ct diamond engagement ring', status: 'Confirmed' },
  { id: 'app-2', name: 'Rajesh & Sangeeta Goel', email: 'goel.r@example.com', phone: '9810055667', type: 'In-Boutique Visit', boutique: 'The Taj Mahal Palace Atelier (Mumbai)', date: '2026-10-15', time: '05:30 PM', notes: 'Bridal jewellery preview for daughter wedding', status: 'Pending' }
];

export const INITIAL_BESPOKE_ENQUIRIES = [
  { id: 'bespoke-1', name: 'Lady Caroline Spencer', email: 'caroline.spencer@example.com', phone: '+44 7700 900077', budget: '₹5,000,000+', category: 'High Jewellery Necklace', details: 'Wish to recreate a vintage 1920s Art Deco sapphire choker in 18kt white gold with modern GIA certified diamonds.', referenceImage: IMAGES.PRODUCTS.NECKLACES[0], status: 'Under Review', date: '2026-10-05' }
];

export const INITIAL_HOME_CONTENT = {
  announcements: [
    '✦ FATTO A MANO IN ITALIA — COMPLIMENTARY INSURED EXPRESS WORLDWIDE SHIPPING',
    '✦ EXPLORE THE FIRENZE 1954 RENAISSANCE COLLECTION',
    '✦ BOOK A PRIVATE VIRTUAL CONSULTATION WITH OUR MASTER GOLDSMITH IN FLORENCE'
  ],
  heroHeadline: 'Alta Gioielleria Italiana',
  heroSubheadline: 'Handcrafted in Florence & Valenza since 1954. Timeless 18kt gold, certified diamonds, and Renaissance master craftsmanship.',
  heroCtaPrimary: 'Explore Collections',
  heroCtaSecondary: 'Book Video Consultation',
  heroImage: IMAGES.HERO.HOME_MAIN
};
