export interface Avion {
  slug: string;
  nom: string;
  constructeur: 'Airbus' | 'Boeing' | 'Dassault' | 'Lockheed' | 'Gulfstream' | 'Aérospatiale';
  type: 'Commercial' | 'Militaire' | 'Business' | 'Historique';
  image: string;
  svgProfil: string;
  specs: {
    premierVol: string;
    envergure: string;
    longueur: string;
    hauteur: string;
    mtow: string;
    motorisation: string;
    vitesseCroisiere: string;
    vitesseMax: string;
    plafond: string;
    portee: string;
    passagers?: number;
    statut: 'En service' | 'Retraité' | 'Prototype';
  };
  histoire: string;
  hotspots: { id: string; x: number; y: number; label: string; description: string }[];
}

export const avions: Avion[] = [
  {
    slug: 'airbus-a320neo',
    nom: 'A320neo',
    constructeur: 'Airbus',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600',
    svgProfil: 'a320neo',
    specs: {
      premierVol: '25 septembre 2014',
      envergure: '35.80 m',
      longueur: '37.57 m',
      hauteur: '11.76 m',
      mtow: '79 000 kg',
      motorisation: '2 × CFM LEAP-1A ou Pratt & Whitney PW1100G',
      vitesseCroisiere: 'Mach 0.78 (828 km/h)',
      vitesseMax: 'Mach 0.82 (871 km/h)',
      plafond: '11 900 m',
      portee: '6 500 km',
      passagers: 194,
      statut: 'En service',
    },
    histoire: "Lancé en décembre 2010, l'A320neo — new engine option — est la réponse d'Airbus à une demande croissante de sobriété énergétique. Avec ses motorisations de nouvelle génération et ses sharklets, il réduit la consommation de carburant de 15 à 20% par rapport à l'A320ceo. Depuis son entrée en service en janvier 2016 chez Lufthansa, plus de 3 400 exemplaires ont été livrés, en faisant l'avion commercial le plus vendu au monde. Sa famille — A319neo, A321neo, A321XLR — couvre un spectre opérationnel allant du court au long-courrier. Il domine le marché du moyen-courrier face au Boeing 737 MAX, avec un carnet de commandes dépassant les 7 000 unités.",
    hotspots: [
      { id: 'engine', x: 28, y: 62, label: 'Motorisation', description: 'CFM LEAP-1A — 120 kN de poussée unitaire, 16% d\'économie de carburant' },
      { id: 'sharklet', x: 82, y: 28, label: 'Sharklet', description: 'Winglets de 2.40 m réduisant la traînée induite et la consommation' },
      { id: 'cockpit', x: 10, y: 42, label: 'Cockpit', description: 'Commandes de vol électriques, 6 écrans LCD, philosophie Airbus' },
    ],
  },
  {
    slug: 'airbus-a350-900',
    nom: 'A350-900',
    constructeur: 'Airbus',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600',
    svgProfil: 'a350-900',
    specs: {
      premierVol: '14 juin 2013',
      envergure: '64.75 m',
      longueur: '66.80 m',
      hauteur: '17.05 m',
      mtow: '280 000 kg',
      motorisation: '2 × Rolls-Royce Trent XWB-84',
      vitesseCroisiere: 'Mach 0.85 (903 km/h)',
      vitesseMax: 'Mach 0.89 (945 km/h)',
      plafond: '13 100 m',
      portee: '15 000 km',
      passagers: 325,
      statut: 'En service',
    },
    histoire: "L'A350 XWB — Xtra Wide Body — incarne la rupture technologique d'Airbus dans le segment long-courrier. Composée à 53% de composites carbone, sa cellule redéfinit les standards d'efficacité et de confort passager. Son cockpit, hérité de l'A380, propose une philosophie de pilotage fly-by-wire perfectionnée. Les moteurs Trent XWB, développés spécifiquement pour l'appareil, offrent un rendement inégalé. Entré en service chez Qatar Airways en janvier 2015, l'A350 est devenu la référence des vols ultra-longs — le -900ULR reliant Singapour à New York en plus de 18 heures de vol continu.",
    hotspots: [
      { id: 'wing', x: 50, y: 55, label: 'Aile composite', description: 'Voilure entièrement en fibre de carbone, envergure de 64.75 m' },
      { id: 'engine', x: 34, y: 68, label: 'Trent XWB', description: 'Rolls-Royce Trent XWB-84 — 374 kN de poussée, ratio de dilution de 9.6:1' },
      { id: 'window', x: 18, y: 38, label: 'Hublot XXL', description: 'Hublots 30% plus grands, éclairage LED adaptatif 16 millions de couleurs' },
    ],
  },
  {
    slug: 'airbus-a380',
    nom: 'A380',
    constructeur: 'Airbus',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1583088580004-a2a689f0b3d7?w=1600',
    svgProfil: 'a380',
    specs: {
      premierVol: '27 avril 2005',
      envergure: '79.75 m',
      longueur: '72.72 m',
      hauteur: '24.09 m',
      mtow: '575 000 kg',
      motorisation: '4 × Rolls-Royce Trent 900 ou Engine Alliance GP7200',
      vitesseCroisiere: 'Mach 0.85 (903 km/h)',
      vitesseMax: 'Mach 0.89 (945 km/h)',
      plafond: '13 100 m',
      portee: '15 200 km',
      passagers: 853,
      statut: 'En service',
    },
    histoire: "Le superjumbo d'Airbus, l'A380 demeure le plus grand avion commercial jamais construit. Ses deux ponts complets peuvent accueillir jusqu'à 853 passagers en configuration monoclasse. Lancé à Toulouse en 2005, il a marqué la dernière grande bataille industrielle entre Airbus et Boeing sur le très long-courrier. 251 exemplaires ont été produits avant l'arrêt de la chaîne en 2021, victime d'un marché qui s'est orienté vers les bimoteurs plus flexibles. Emirates en opère plus de la moitié de la flotte mondiale, en faisant le fer de lance de leur réseau hub-and-spoke basé à Dubaï. Son élégance aérienne et sa douceur de vol en font une icône auprès des passagers du monde entier.",
    hotspots: [
      { id: 'deck', x: 48, y: 35, label: 'Double pont', description: 'Seul avion commercial à deux ponts complets, 550 m² de surface habitable' },
      { id: 'engine', x: 28, y: 62, label: 'Quadrimoteur', description: '4 réacteurs Trent 900 ou GP7200, poussée totale de 1 244 kN' },
      { id: 'wing', x: 55, y: 58, label: 'Aile géante', description: 'Envergure de 79.75 m — trop large pour certains aéroports standards' },
    ],
  },
  {
    slug: 'boeing-737-max',
    nom: '737 MAX',
    constructeur: 'Boeing',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1559686043-aef1bed4cc5f?w=1600',
    svgProfil: 'b737max',
    specs: {
      premierVol: '29 janvier 2016',
      envergure: '35.92 m',
      longueur: '39.52 m',
      hauteur: '12.30 m',
      mtow: '88 300 kg',
      motorisation: '2 × CFM LEAP-1B',
      vitesseCroisiere: 'Mach 0.79 (839 km/h)',
      vitesseMax: 'Mach 0.82 (871 km/h)',
      plafond: '12 500 m',
      portee: '6 570 km',
      passagers: 210,
      statut: 'En service',
    },
    histoire: "Quatrième génération du 737, le MAX reprend le DNA de l'avion de ligne le plus vendu de l'histoire. Ses motorisations LEAP-1B — plus grandes que celles du NG — ont nécessité un repositionnement avant avec le dispositif MCAS, logiciel impliqué dans les deux accidents dramatiques de Lion Air 610 et Ethiopian 302 en 2018-2019. Immobilisé mondialement pendant 20 mois, l'appareil est revenu en service fin 2020 après certification révisée. Il équipe aujourd'hui de nombreuses compagnies low-cost et reste le principal concurrent de l'A320neo sur le marché du moyen-courrier. Boeing a dû reconstruire une confiance ébranlée dans un marché où Airbus avait pris une avance nette.",
    hotspots: [
      { id: 'engine', x: 30, y: 64, label: 'CFM LEAP-1B', description: 'Moteur plus grand que sur le 737 NG, repositionné vers l\'avant' },
      { id: 'winglet', x: 84, y: 30, label: 'Winglet AT', description: 'Winglet Advanced Technology — double courbure unique au MAX' },
      { id: 'nose', x: 8, y: 42, label: 'Nez court', description: 'Héritage direct du 737 original de 1967, optimisé aérodynamiquement' },
    ],
  },
  {
    slug: 'boeing-787-dreamliner',
    nom: '787 Dreamliner',
    constructeur: 'Boeing',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1600',
    svgProfil: 'b787',
    specs: {
      premierVol: '15 décembre 2009',
      envergure: '60.12 m',
      longueur: '62.80 m',
      hauteur: '17.00 m',
      mtow: '254 000 kg',
      motorisation: '2 × General Electric GEnx ou Rolls-Royce Trent 1000',
      vitesseCroisiere: 'Mach 0.85 (903 km/h)',
      vitesseMax: 'Mach 0.90 (956 km/h)',
      plafond: '13 100 m',
      portee: '13 620 km',
      passagers: 296,
      statut: 'En service',
    },
    histoire: "Premier avion commercial majoritairement composite (50% de fibres de carbone), le 787 a redéfini les attentes de confort cabine. Son architecture permet une pression équivalente à 1 800 m d'altitude — contre 2 400 m traditionnellement — et un taux d'humidité plus élevé, réduisant significativement la fatigue passager. Ses hublots à gradient électrochromique remplacent les volets classiques. Lancé avec sept ans de retard sur le programme initial, il a souffert d'incidents de batteries lithium-ion en 2013 qui ont mené à une immobilisation temporaire. Il équipe désormais plus de 75 compagnies à travers le monde et a rouvert des routes point-à-point autrefois réservées aux quadrimoteurs.",
    hotspots: [
      { id: 'composite', x: 55, y: 45, label: 'Fuselage composite', description: '50% composites carbone, structure monolithique sans rivets' },
      { id: 'window', x: 20, y: 40, label: 'Hublots électrochromiques', description: 'Opacification électronique à 5 niveaux, les plus grands du marché' },
      { id: 'chevron', x: 35, y: 68, label: 'Chevrons moteur', description: 'Tuyères dentelées GEnx réduisant le bruit de 60% au décollage' },
    ],
  },
  {
    slug: 'concorde',
    nom: 'Concorde',
    constructeur: 'Aérospatiale',
    type: 'Historique',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600',
    svgProfil: 'concorde',
    specs: {
      premierVol: '2 mars 1969',
      envergure: '25.60 m',
      longueur: '61.66 m',
      hauteur: '12.20 m',
      mtow: '185 000 kg',
      motorisation: '4 × Rolls-Royce/Snecma Olympus 593',
      vitesseCroisiere: 'Mach 2.02 (2 179 km/h)',
      vitesseMax: 'Mach 2.23 (2 405 km/h)',
      plafond: '18 300 m',
      portee: '7 250 km',
      passagers: 128,
      statut: 'Retraité',
    },
    histoire: "Fruit de la coopération franco-britannique entre Aérospatiale et BAC, le Concorde demeure l'unique avion civil supersonique à avoir connu un service commercial durable. Sa silhouette — aile delta ogivale, nez basculant, fuselage affiné — reste gravée dans l'imaginaire collectif. Mis en service en 1976 par Air France et British Airways, il reliait Paris à New York en 3h30. La catastrophe du vol AF4590 en juillet 2000, combinée à la hausse du kérosène et à la crise post-11 septembre, a scellé son sort. Son dernier vol commercial eut lieu le 24 octobre 2003. Vingt exemplaires ont été produits, dont six conservés en musée. Il incarne une époque où la vitesse primait sur l'économie — un paradigme aujourd'hui révolu, mais que plusieurs startups tentent de ressusciter.",
    hotspots: [
      { id: 'nose', x: 8, y: 50, label: 'Nez basculant', description: 'Nez articulé s\'abaissant de 17° pour améliorer la visibilité à l\'atterrissage' },
      { id: 'wing', x: 55, y: 60, label: 'Aile delta ogivale', description: 'Aile gothique générant portance à basse et haute vitesse' },
      { id: 'engine', x: 40, y: 68, label: 'Olympus 593', description: 'Turboréacteur à postcombustion, 169 kN de poussée, survitesse Mach 2' },
    ],
  },
  {
    slug: 'dassault-rafale',
    nom: 'Rafale',
    constructeur: 'Dassault',
    type: 'Militaire',
    image: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?w=1600',
    svgProfil: 'rafale',
    specs: {
      premierVol: '4 juillet 1986',
      envergure: '10.90 m',
      longueur: '15.30 m',
      hauteur: '5.34 m',
      mtow: '24 500 kg',
      motorisation: '2 × Snecma M88-2 à postcombustion',
      vitesseCroisiere: 'Mach 1.40 (1 488 km/h)',
      vitesseMax: 'Mach 1.80 (1 912 km/h)',
      plafond: '15 240 m',
      portee: '3 700 km',
      statut: 'En service',
    },
    histoire: "Avion de combat omnirôle français, le Rafale est conçu pour remplir l'ensemble des missions de l'Armée de l'air et de la Marine nationale : supériorité aérienne, attaque au sol, reconnaissance, frappe nucléaire et dissuasion. Sa cellule en composites, son radar AESA RBE2 et son système SPECTRA de guerre électronique en font l'un des chasseurs de quatrième génération plus les avancés. Il a prouvé sa polyvalence en Afghanistan, en Libye, au Mali et en Syrie. Exporté en Égypte, Inde, Qatar, Grèce, Croatie, Émirats arabes unis et Indonésie, il représente un succès commercial majeur pour l'industrie française. Sa version marine décolle du porte-avions Charles de Gaulle grâce à ses catapultes à vapeur.",
    hotspots: [
      { id: 'canard', x: 30, y: 42, label: 'Plan canard', description: 'Plans canards couplés delta — haute agilité, faible traînée supersonique' },
      { id: 'radar', x: 10, y: 48, label: 'Radar RBE2 AESA', description: 'Radar à balayage électronique actif, détection multicible longue portée' },
      { id: 'engine', x: 75, y: 55, label: 'M88-2', description: '2 × Snecma M88-2, poussée unitaire 75 kN avec postcombustion' },
    ],
  },
  {
    slug: 'f-22-raptor',
    nom: 'F-22 Raptor',
    constructeur: 'Lockheed',
    type: 'Militaire',
    image: 'https://images.unsplash.com/photo-1531176175280-33e81422f459?w=1600',
    svgProfil: 'f22',
    specs: {
      premierVol: '7 septembre 1997',
      envergure: '13.56 m',
      longueur: '18.92 m',
      hauteur: '5.08 m',
      mtow: '38 000 kg',
      motorisation: '2 × Pratt & Whitney F119-PW-100 à postcombustion',
      vitesseCroisiere: 'Mach 1.82 (supercroisière)',
      vitesseMax: 'Mach 2.25 (2 410 km/h)',
      plafond: '19 800 m',
      portee: '2 962 km',
      statut: 'En service',
    },
    histoire: "Premier chasseur de cinquième génération opérationnel au monde, le F-22 Raptor combine furtivité radar, supercroisière et vectorisation de poussée. Développé par Lockheed Martin pour l'USAF, il domine l'air par sa capacité à frapper avant d'être détecté. Sa signature radar est comparable à celle d'une bille d'acier. Sa poussée vectorielle pitch ±20° lui confère une manœuvrabilité inégalée en combat aérien rapproché. Son coût d'exploitation astronomique — 68 000 $ de l'heure — et la fin de la guerre froide ont mené à l'arrêt de sa production à 195 exemplaires, loin des 750 initialement prévus. Il reste l'atout stratégique ultime des forces aériennes américaines, jamais exporté en vertu de l'Obey Amendment.",
    hotspots: [
      { id: 'stealth', x: 52, y: 45, label: 'Cellule furtive', description: 'Géométrie anti-radar, revêtements RAM, emports internes uniquement' },
      { id: 'thrust', x: 82, y: 58, label: 'Poussée vectorielle', description: 'Tuyères orientables ±20° en tangage, supermanœuvrabilité post-décrochage' },
      { id: 'avionic', x: 15, y: 44, label: 'Avionique intégrée', description: 'Radar AN/APG-77 AESA, fusion de capteurs, data-link tactique' },
    ],
  },
  {
    slug: 'gulfstream-g700',
    nom: 'G700',
    constructeur: 'Gulfstream',
    type: 'Business',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600',
    svgProfil: 'g700',
    specs: {
      premierVol: '14 février 2020',
      envergure: '31.40 m',
      longueur: '33.48 m',
      hauteur: '7.75 m',
      mtow: '48 000 kg',
      motorisation: '2 × Rolls-Royce Pearl 700',
      vitesseCroisiere: 'Mach 0.85 (903 km/h)',
      vitesseMax: 'Mach 0.935 (993 km/h)',
      plafond: '15 545 m',
      portee: '13 890 km',
      passagers: 19,
      statut: 'En service',
    },
    histoire: "Vaisseau amiral de la gamme Gulfstream depuis sa certification en mars 2024, le G700 redéfinit le segment des avions d'affaires ultra-long courrier. Sa cabine — la plus longue du marché à 17.14 m — s'organise en cinq zones modulables, accueillant jusqu'à 19 passagers en configuration VIP complète avec chambre maître. Ses hublots panoramiques Gulfstream, au nombre de 20, sont les plus grands de l'industrie. Ses moteurs Pearl 700 offrent une enveloppe opérationnelle exceptionnelle avec Mach 0.925 atteint en vols certifiés. Il relie Londres à Johannesburg, Hong Kong à New York sans escale. Son carnet de commandes dépasse les 200 unités, dominé par les grandes fortunes asiatiques et les chefs d'État du Golfe.",
    hotspots: [
      { id: 'cabin', x: 45, y: 45, label: 'Cabine 17.14 m', description: 'Plus longue cabine de son segment, 5 zones modulables, chambre maître' },
      { id: 'window', x: 65, y: 38, label: 'Hublots panoramiques', description: '20 hublots ovales XXL signature Gulfstream, 71 cm de large' },
      { id: 'engine', x: 80, y: 55, label: 'Pearl 700', description: 'Rolls-Royce Pearl 700 — 82 kN, optimisé haute altitude' },
    ],
  },
  {
    slug: 'airbus-a400m',
    nom: 'A400M Atlas',
    constructeur: 'Airbus',
    type: 'Militaire',
    image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=1600',
    svgProfil: 'a400m',
    specs: {
      premierVol: '11 décembre 2009',
      envergure: '42.40 m',
      longueur: '45.10 m',
      hauteur: '14.70 m',
      mtow: '141 000 kg',
      motorisation: '4 × Europrop TP400-D6 (turbopropulseurs)',
      vitesseCroisiere: 'Mach 0.72 (780 km/h)',
      vitesseMax: 'Mach 0.75 (820 km/h)',
      plafond: '11 280 m',
      portee: '8 700 km',
      passagers: 116,
      statut: 'En service',
    },
    histoire: "Avion de transport militaire polyvalent développé par Airbus Defence and Space, l'A400M Atlas occupe un créneau unique entre le C-130 Hercules tactique et le C-17 Globemaster stratégique. Ses quatre turbopropulseurs TP400-D6 — les plus puissants moteurs à hélice occidentaux — offrent une capacité d'emport de 37 tonnes sur des pistes courtes et non-aménagées. Il peut ravitailler d'autres aéronefs en vol, parachuter du personnel ou larguer du fret lourd. Développé en coopération européenne, le programme a connu des retards majeurs mais équipe aujourd'hui les forces françaises, allemandes, britanniques, espagnoles, turques, malaisiennes et belges. Ses hélices contrarotatives — chaque paire tournant en sens inverse — réduisent les contraintes aérodynamiques sur le fuselage.",
    hotspots: [
      { id: 'prop', x: 40, y: 48, label: 'TP400-D6', description: '4 × turbopropulseurs 11 000 ch, hélices contrarotatives 8 pales' },
      { id: 'ramp', x: 85, y: 55, label: 'Rampe arrière', description: 'Soute 17.71 m × 4 m × 3.85 m, largage en vol, atterrissage piste courte' },
      { id: 'wing', x: 55, y: 38, label: 'Voilure haute', description: 'Aile haute composite, garde au sol élevée pour opérations tactiques' },
    ],
  },
];

export const getAvionBySlug = (slug: string): Avion | undefined =>
  avions.find((a) => a.slug === slug);

export const getAvionIndex = (slug: string): number =>
  avions.findIndex((a) => a.slug === slug);
