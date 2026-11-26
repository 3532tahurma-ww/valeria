/*
 * Valeria - map of Western Europe (schematic, lon/lat; projected in js/map.js)
 * REALMS: colour + name of each realm.
 * REGIONS: { id, realm, name, short, of, names (POOLS key), lang, houses, ruler: [EN, FR], second?: [EN, FR],
 *            label: [lon, lat], cities: [[name, lon, lat]], poly: [point key or [lon, lat]] }
 * Neighbouring regions share the same points (P) so borders line up.
 * BACKDROP: non-clickable land (Holy Roman Empire, Iberia, Corsica).
 */
window.Valeria = window.Valeria || {};

(() => {
  const P = {
    A1: [4.0, 51.4], A2: [3.2, 51.35], A3: [2.4, 51.05], A4: [1.85, 50.95], A5: [1.6, 50.7], A6: [1.6, 50.2], A7: [1.1, 49.95],
    A8: [0.15, 49.5], A9: [-0.4, 49.33], A10: [-1.25, 49.65], A11: [-1.9, 49.7], A12: [-1.6, 49.2], A13: [-1.5, 48.63],
    A14: [-2.0, 48.65], A15: [-3.0, 48.85], A16: [-4.1, 48.7], A17: [-4.75, 48.35], A18: [-4.35, 48.05], A19: [-4.3, 47.8],
    A20: [-3.3, 47.7], A21: [-2.6, 47.4], A22: [-2.15, 47.25], A23: [-2.0, 46.85], A24: [-1.2, 46.15], A25: [-1.1, 45.55],
    A26: [-1.2, 44.6], A27: [-1.5, 43.5], R1: [-1.8, 43.35], R2: [-1.0, 43.0], R3: [0.0, 42.8], R4: [1.0, 42.7], R5: [1.8, 42.5],
    R6: [3.15, 42.45], M8: [3.05, 42.8], M7: [3.2, 43.2], M6: [3.9, 43.55], M5: [4.6, 43.4], M4: [5.35, 43.3], M3: [5.9, 43.1],
    M2: [6.6, 43.2], M1: [7.3, 43.7], E2: [4.2, 50.75], E3: [4.1, 50.3], E4: [4.8, 49.9], E5: [5.8, 49.5], E6: [6.4, 49.45],
    E7: [7.0, 49.1], E8: [8.1, 48.95], E9: [7.6, 47.6], E10: [6.9, 47.4], E11: [6.1, 46.4], E12: [6.9, 45.8], E13: [7.0, 45.0],
    E14: [6.9, 44.4], F1: [2.4, 50.5], N1: [1.7, 49.3], N2: [3.3, 49.3], N3: [4.1, 49.8], N4: [0.3, 48.4], N5: [1.6, 48.6],
    B1: [-1.1, 48.5], B2: [-1.2, 47.0], B3: [-1.0, 46.9], C3: [3.5, 48.4], C4: [3.6, 47.8], K1: [5.2, 49.0], K2: [5.1, 47.9],
    K3: [5.9, 47.8], L1: [2.6, 48.1], L2: [3.0, 47.0], L3: [2.2, 46.4], L4: [0.8, 46.7], P2: [0.6, 45.6], G1: [4.8, 46.2],
    G2: [3.7, 46.3], G3: [4.0, 45.2], T1: [3.0, 44.3], Q1: [1.2, 44.5], Q2: [0.6, 43.3], D1: [5.0, 44.3], D3: [4.6, 44.0],
    V1: [-0.3, 42.2], V2: [-1.6, 41.9], V3: [-2.5, 42.4], V4: [-2.2, 43.3]
  };
  const pt = p => (typeof p === 'string' ? P[p] : p);

  Valeria.REALMS = {
    en: { name: { en: 'Kingdom of England', fr: "Royaume d'Angleterre" }, fill: '#d9a59c' },
    fr: { name: { en: 'Kingdom of France', fr: 'Royaume de France' }, fill: '#a9b9d8' },
    bur: { name: { en: 'Burgundian lands', fr: 'Terres bourguignonnes' }, fill: '#c6a8cc' },
    bri: { name: { en: 'Duchy of Brittany', fr: 'Duché de Bretagne' }, fill: '#dcd3b6' },
    sco: { name: { en: 'Kingdom of Scotland', fr: "Royaume d'Écosse" }, fill: '#a9c8a2' },
    irl: { name: { en: 'Lordship of Ireland', fr: "Seigneurie d'Irlande" }, fill: '#bcd6a0' },
    nav: { name: { en: 'Kingdom of Navarre', fr: 'Royaume de Navarre' }, fill: '#e3c487' },
    hre: { name: { en: 'Holy Roman Empire', fr: 'Saint-Empire' }, fill: '#cdbf98' }
  };

  const R = (id, realm, en, fr, o) => Object.assign({ id, realm, name: { en, fr } }, o);
  Valeria.REGIONS = [
    R('scotland', 'sco', 'Scotland', 'Écosse', {
      of: ['of Scotland', "d'Écosse"], names: 'scot', lang: 'en', houses: ['stewart'], ruler: ['Queen of Scots', 'Reine des Écossais'], second: ['Princess of Scotland', "Princesse d'Écosse"],
      label: [-4.3, 57.1], cities: [['Edinburgh', -3.19, 55.95], ['Stirling', -3.94, 56.12], ['Aberdeen', -2.1, 57.15], ['Perth', -3.43, 56.4]],
      poly: [[-5.0, 58.6], [-3.0, 58.6], [-3.1, 58.0], [-4.0, 57.6], [-1.8, 57.6], [-2.1, 57.1], [-2.5, 56.5], [-3.0, 56.1], [-2.0, 55.9], [-2.0, 55.8], [-2.7, 55.3], [-3.0, 55.0], [-3.6, 54.9], [-5.0, 54.7], [-5.1, 55.4], [-5.7, 55.4], [-5.6, 56.4], [-6.2, 56.7], [-5.7, 57.3], [-5.8, 57.9]]
    }),
    R('north', 'en', 'Northumbria & York', 'Northumbrie et York', {
      short: { en: 'York', fr: 'York' }, of: ['of York', "d'York"], names: 'en', lang: 'en', houses: ['neville', 'percy', 'york'], ruler: ['Duchess of York', "Duchesse d'York"],
      label: [-1.9, 54.3], cities: [['York', -1.08, 53.96], ['Durham', -1.57, 54.78], ['Lancaster', -2.8, 54.05], ['Newcastle', -1.61, 54.97]],
      poly: [[-2.0, 55.8], [-1.6, 55.6], [-1.4, 55.0], [-1.1, 54.6], [-0.4, 54.3], [-0.1, 54.0], [0.1, 53.6], [-0.4, 53.2], [-1.5, 53.0], [-2.4, 53.1], [-3.0, 53.4], [-2.9, 54.0], [-3.4, 54.4], [-3.6, 54.9], [-3.0, 55.0], [-2.7, 55.3]]
    }),
    R('wales', 'en', 'Wales', 'Pays de Galles', {
      of: ['of Wales', 'de Galles'], names: 'wales', lang: 'en', houses: ['plantagenet', 'beaufort'], ruler: ['Princess of Wales', 'Princesse de Galles'],
      label: [-3.85, 52.4], cities: [['Cardiff', -3.18, 51.5], ['Caernarfon', -4.27, 53.14], ['Pembroke', -4.92, 51.69], ['Aberystwyth', -4.08, 52.41]],
      poly: [[-3.0, 53.4], [-2.4, 53.1], [-3.0, 52.3], [-2.7, 51.6], [-3.2, 51.4], [-4.1, 51.6], [-5.2, 51.7], [-5.2, 52.0], [-4.1, 52.4], [-4.1, 52.9], [-4.7, 52.8], [-4.6, 53.3], [-3.4, 53.4]]
    }),
    R('london', 'en', 'London & the South-East', 'Londres et le Sud-Est', {
      short: { en: 'London', fr: 'Londres' }, of: ['of England', "d'Angleterre"], names: 'en', lang: 'en', houses: ['plantagenet', 'lancaster', 'york', 'beaufort'],
      ruler: ['Queen of England', "Reine d'Angleterre"], second: ['Princess of England', "Princesse d'Angleterre"],
      label: [0.1, 52.2], cities: [['London', -0.13, 51.5], ['Canterbury', 1.08, 51.28], ['Dover', 1.25, 51.15], ['Oxford', -1.2, 51.75], ['Norwich', 1.3, 52.63]],
      alias: ['Westminster'],
      poly: [[0.1, 53.6], [0.3, 53.1], [1.7, 52.7], [1.7, 52.0], [1.0, 51.8], [1.4, 51.3], [1.4, 51.1], [0.3, 50.8], [-1.0, 50.8], [-1.3, 51.8], [-1.5, 53.0], [-0.4, 53.2]]
    }),
    R('wessex', 'en', 'Wessex & Cornwall', 'Wessex et Cornouailles', {
      short: { en: 'Wessex', fr: 'Wessex' }, of: ['of Cornwall', 'de Cornouailles'], names: 'en', lang: 'en', houses: ['beaufort', 'plantagenet', 'neville'], ruler: ['Countess of Cornwall', 'Comtesse de Cornouailles'],
      label: [-3.4, 50.95], cities: [['Winchester', -1.31, 51.06], ['Exeter', -3.53, 50.72], ['Bristol', -2.59, 51.45], ['Gloucester', -2.24, 51.86]],
      poly: [[-1.0, 50.8], [-2.0, 50.6], [-3.4, 50.6], [-4.2, 50.3], [-5.7, 50.05], [-5.0, 50.6], [-4.2, 51.2], [-3.0, 51.2], [-2.7, 51.6], [-3.0, 52.3], [-2.4, 53.1], [-1.5, 53.0], [-1.3, 51.8]]
    }),
    R('ireland', 'irl', 'Ireland', 'Irlande', {
      of: ['of Desmond', 'de Desmond'], names: 'irl', lang: 'en', houses: ['fitzgerald'], ruler: ['Countess of Desmond', 'Comtesse de Desmond'],
      label: [-8.0, 53.1], cities: [['Dublin', -6.3, 53.35], ['Waterford', -7.11, 52.26], ['Galway', -9.0, 53.27], ['Kilkenny', -7.25, 52.65]],
      poly: [[-6.0, 55.2], [-7.3, 55.3], [-8.3, 55.1], [-8.6, 54.6], [-10.0, 54.2], [-9.9, 53.4], [-9.0, 53.1], [-9.9, 52.1], [-10.2, 51.8], [-9.6, 51.5], [-8.2, 51.8], [-6.4, 52.2], [-6.0, 53.0], [-6.2, 53.6], [-5.5, 54.4]]
    }),
    R('flanders', 'bur', 'Flanders', 'Flandre', {
      of: ['of Flanders', 'de Flandre'], names: 'flem', lang: 'fr', houses: ['burgundy'], ruler: ['Countess of Flanders', 'Comtesse de Flandre'],
      label: [3.2, 50.85], cities: [['Bruges', 3.22, 51.21], ['Ghent', 3.72, 51.05], ['Ypres', 2.88, 50.85], ['Lille', 3.06, 50.63]],
      poly: ['A1', 'A2', 'A3', 'F1', 'E3', 'E2']
    }),
    R('picardy', 'fr', 'Picardy & Artois', 'Picardie et Artois', {
      short: { en: 'Picardy', fr: 'Picardie' }, of: ['of Artois', "d'Artois"], names: 'fr', lang: 'fr', houses: ['valois', 'burgundy'], ruler: ['Countess of Artois', "Comtesse d'Artois"],
      label: [2.5, 50.05], cities: [['Amiens', 2.3, 49.89], ['Calais', 1.95, 50.88], ['Arras', 2.78, 50.29], ['Beauvais', 2.08, 49.43]],
      poly: ['A3', 'A4', 'A5', 'A6', 'A7', 'N1', 'N2', 'N3', 'E3', 'F1']
    }),
    R('normandy', 'fr', 'Normandy', 'Normandie', {
      of: ['of Normandy', 'de Normandie'], names: 'fr', lang: 'fr', houses: ['plantagenet', 'valois'], ruler: ['Duchess of Normandy', 'Duchesse de Normandie'],
      label: [0.1, 49.0], cities: [['Rouen', 1.1, 49.44], ['Caen', -0.37, 49.18], ['Cherbourg', -1.6, 49.58], ['Évreux', 1.15, 49.02]],
      poly: ['A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'B1', 'N4', 'N5', 'N1']
    }),
    R('brittany', 'bri', 'Brittany', 'Bretagne', {
      of: ['of Brittany', 'de Bretagne'], names: 'fr', lang: 'fr', houses: ['brittany'], ruler: ['Duchess of Brittany', 'Duchesse de Bretagne'],
      label: [-2.9, 48.2], cities: [['Rennes', -1.68, 48.11], ['Nantes', -1.55, 47.22], ['Vannes', -2.76, 47.66], ['Brest', -4.45, 48.39]],
      poly: ['A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20', 'A21', 'A22', 'B2', 'B1']
    }),
    R('ile', 'fr', 'Île-de-France', 'Île-de-France', {
      short: { en: 'Paris', fr: 'Paris' }, of: ['of France', 'de France'], names: 'fr', lang: 'fr', houses: ['valois'],
      ruler: ['Queen of France', 'Reine de France'], second: ['Princess of France', 'Princesse de France'],
      label: [2.5, 48.95], cities: [['Paris', 2.35, 48.86], ['Senlis', 2.59, 49.2], ['Melun', 2.66, 48.54]],
      poly: ['N1', 'N2', 'C3', 'L1', 'N5']
    }),
    R('champagne', 'fr', 'Champagne', 'Champagne', {
      of: ['of Champagne', 'de Champagne'], names: 'fr', lang: 'fr', houses: ['valois'], ruler: ['Countess of Champagne', 'Comtesse de Champagne'],
      label: [4.3, 48.7], cities: [['Reims', 4.03, 49.26], ['Troyes', 4.07, 48.3], ['Châlons', 4.36, 48.96]],
      poly: ['N2', 'N3', 'E3', 'E4', 'K1', 'K2', 'C4', 'C3']
    }),
    R('lorraine', 'hre', 'Lorraine & Alsace', 'Lorraine et Alsace', {
      short: { en: 'Lorraine', fr: 'Lorraine' }, of: ['of Lorraine', 'de Lorraine'], names: 'fr', lang: 'fr', houses: ['burgundy', 'valois'], ruler: ['Duchess of Lorraine', 'Duchesse de Lorraine'],
      label: [6.4, 48.45], cities: [['Nancy', 6.18, 48.69], ['Metz', 6.18, 49.12], ['Strasbourg', 7.75, 48.58], ['Verdun', 5.39, 49.16]],
      poly: ['E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'K3', 'K2', 'K1']
    }),
    R('burgundy', 'bur', 'Burgundy', 'Bourgogne', {
      of: ['of Burgundy', 'de Bourgogne'], names: 'fr', lang: 'fr', houses: ['burgundy'], ruler: ['Duchess of Burgundy', 'Duchesse de Bourgogne'],
      label: [4.9, 46.95], cities: [['Dijon', 5.04, 47.32], ['Beaune', 4.84, 47.02], ['Besançon', 6.02, 47.24], ['Nevers', 3.2, 46.99], ['Mâcon', 4.83, 46.33]],
      poly: ['C4', 'K2', 'K3', 'E10', 'E11', 'G1', 'G2', 'L2']
    }),
    R('loire', 'fr', 'Anjou & the Loire', 'Anjou et Val de Loire', {
      short: { en: 'Anjou', fr: 'Anjou' }, of: ['of Anjou', "d'Anjou"], names: 'fr', lang: 'fr', houses: ['anjou', 'valois'], ruler: ['Duchess of Anjou', "Duchesse d'Anjou"],
      label: [0.9, 47.6], cities: [['Orléans', 1.9, 47.9], ['Tours', 0.69, 47.39], ['Angers', -0.55, 47.47], ['Le Mans', 0.2, 48.0], ['Bourges', 2.4, 47.08], ['Blois', 1.33, 47.59]],
      poly: ['B1', 'N4', 'N5', 'L1', 'C3', 'C4', 'L2', 'L3', 'L4', 'B3', 'B2']
    }),
    R('poitou', 'fr', 'Poitou', 'Poitou', {
      of: ['of Poitou', 'de Poitou'], names: 'fr', lang: 'fr', houses: ['valois', 'plantagenet'], ruler: ['Countess of Poitou', 'Comtesse de Poitou'],
      label: [-0.45, 46.3], cities: [['Poitiers', 0.34, 46.58], ['La Rochelle', -1.1, 46.17], ['Niort', -0.46, 46.32], ['Angoulême', 0.16, 45.66]],
      poly: ['A22', 'A23', 'A24', 'A25', 'P2', 'L4', 'B3', 'B2']
    }),
    R('aquitaine', 'en', 'Aquitaine & Gascony', 'Guyenne et Gascogne', {
      short: { en: 'Aquitaine', fr: 'Guyenne' }, of: ['of Aquitaine', "d'Aquitaine"], names: 'fr', lang: 'fr', houses: ['plantagenet', 'lancaster'], ruler: ['Duchess of Aquitaine', "Duchesse d'Aquitaine"],
      label: [-0.2, 44.35], cities: [['Bordeaux', -0.58, 44.84], ['Bayonne', -1.45, 43.49], ['Agen', 0.62, 44.2], ['Bergerac', 0.48, 44.85]],
      poly: ['P2', 'A25', 'A26', 'A27', 'R1', 'R2', 'R3', 'R4', 'Q2', 'Q1']
    }),
    R('auvergne', 'fr', 'Auvergne & Limousin', 'Auvergne et Limousin', {
      short: { en: 'Auvergne', fr: 'Auvergne' }, of: ['of Auvergne', "d'Auvergne"], names: 'fr', lang: 'fr', houses: ['valois'], ruler: ['Countess of Auvergne', "Comtesse d'Auvergne"],
      label: [2.2, 45.55], cities: [['Clermont', 3.08, 45.78], ['Limoges', 1.26, 45.83], ['Aurillac', 2.44, 44.93], ['Moulins', 3.33, 46.57]],
      poly: ['P2', 'L4', 'L3', 'L2', 'G2', 'G3', 'T1', 'Q1']
    }),
    R('dauphine', 'fr', 'Lyonnais & Dauphiné', 'Lyonnais et Dauphiné', {
      short: { en: 'Lyon', fr: 'Lyon' }, of: ['of the Viennois', 'du Viennois'], names: 'fr', lang: 'fr', houses: ['valois', 'anjou'], ruler: ['Dauphine of the Viennois', 'Dauphine du Viennois'],
      label: [5.6, 45.35], cities: [['Lyon', 4.84, 45.76], ['Grenoble', 5.72, 45.19], ['Vienne', 4.87, 45.52], ['Chambéry', 5.92, 45.57]],
      poly: ['G1', 'E11', 'E12', 'E13', 'E14', 'D1', 'G3', 'G2']
    }),
    R('provence', 'fr', 'Provence', 'Provence', {
      of: ['of Provence', 'de Provence'], names: 'fr', lang: 'fr', houses: ['anjou'], ruler: ['Countess of Provence', 'Comtesse de Provence'],
      label: [6.0, 43.85], cities: [['Avignon', 4.81, 43.95], ['Marseille', 5.4, 43.33], ['Aix', 5.45, 43.53], ['Arles', 4.65, 43.68], ['Toulon', 5.95, 43.16]],
      poly: ['D1', 'E14', 'M1', 'M2', 'M3', 'M4', 'M5', 'D3']
    }),
    R('languedoc', 'fr', 'Toulouse & Languedoc', 'Toulousain et Languedoc', {
      short: { en: 'Toulouse', fr: 'Toulouse' }, of: ['of Toulouse', 'de Toulouse'], names: 'fr', lang: 'fr', houses: ['valois', 'navarre'], ruler: ['Countess of Toulouse', 'Comtesse de Toulouse'],
      label: [2.3, 43.75], cities: [['Toulouse', 1.44, 43.6], ['Carcassonne', 2.35, 43.21], ['Montpellier', 3.88, 43.61], ['Narbonne', 3.0, 43.18], ['Albi', 2.15, 43.93]],
      poly: ['Q1', 'T1', 'G3', 'D1', 'D3', 'M5', 'M6', 'M7', 'M8', 'R6', 'R5', 'R4', 'Q2']
    }),
    R('navarre', 'nav', 'Navarre', 'Navarre', {
      of: ['of Navarre', 'de Navarre'], names: 'nav', lang: 'fr', houses: ['navarre'], ruler: ['Queen of Navarre', 'Reine de Navarre'], second: ['Princess of Navarre', 'Princesse de Navarre'],
      label: [-1.45, 42.4], cities: [['Pamplona', -1.64, 42.82], ['Olite', -1.65, 42.48], ['Estella', -2.03, 42.67]],
      poly: ['R1', 'R2', 'R3', 'V1', 'V2', 'V3', 'V4']
    })
  ];
  Valeria.REGIONS.forEach(r => { r.poly = r.poly.map(pt); });

  Valeria.BACKDROP = [
    // Holy Roman Empire, Low Countries, Denmark, northern Italy
    ['A1', [4.5, 52.0], [4.8, 52.9], [5.6, 53.4], [7.0, 53.6], [8.6, 53.9], [8.6, 55.5], [8.1, 56.6], [9.8, 57.6], [10.6, 57.7], [10.5, 56.5], [10.9, 56.2], [10.6, 55.6], [10.0, 55.0], [11, 54.1], [12.5, 54.3], [12.5, 41.5], [12.0, 41.8], [11.1, 42.4], [10.5, 43.0], [10.3, 43.5], [9.8, 44.1], [8.9, 44.4], [8.2, 43.9], 'M1', 'E14', 'E13', 'E12', 'E11', 'E10', 'E9', 'E8', 'E7', 'E6', 'E5', 'E4', 'E3', 'E2'],
    // Iberia
    ['R1', [-3.0, 43.45], [-5.5, 43.55], [-7.5, 43.75], [-8.3, 43.5], [-9.2, 43.1], [-8.9, 42.0], [-8.8, 41.0], [1.0, 40.8], [2.2, 41.3], [3.2, 41.9], 'R6', 'R5', 'R4', 'R3', 'R2'],
    // Corsica
    [[9.4, 43.0], [9.55, 42.1], [9.2, 41.4], [8.6, 41.7], [8.6, 42.4], [9.3, 42.7]]
  ].map(poly => poly.map(pt));

  Valeria.SEAS = [
    { name: { en: 'North Sea', fr: 'Mer du Nord' }, at: [2.8, 55.2] },
    { name: { en: 'The Channel', fr: 'La Manche' }, at: [-2.4, 50.0] },
    { name: { en: 'Irish Sea', fr: "Mer d'Irlande" }, at: [-5.1, 53.8] },
    { name: { en: 'Bay of Biscay', fr: 'Golfe de Gascogne' }, at: [-4.6, 45.4] },
    { name: { en: 'Mediterranean', fr: 'Méditerranée' }, at: [5.6, 42.3] },
    { name: { en: 'Ocean Sea', fr: 'Mer Océane' }, at: [-9.2, 48.6] }
  ];
})();
