/*
 * Valeria - map of Western and Central Europe (schematic, lon/lat; projected in js/map.js)
 * REALMS: colour + name of each realm.
 * REGIONS: { id, realm, fill? (own shade on the map, else the realm colour), name, short, of, names (POOLS key), lang, houses, ruler: [EN, FR], second?: [EN, FR],
 *            label: [lon, lat], cities: [[name, lon, lat]], poly: [point key or [lon, lat]], isles?: [extra polygons] }
 * Neighbouring regions share the same points (P) so borders line up.
 * BACKDROP: non-clickable land drawn under the regions (rest of Europe, Iberia, Corsica, Scandinavia).
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
    V1: [-0.3, 42.2], V2: [-1.6, 41.9], V3: [-2.5, 42.4], V4: [-2.2, 43.3],
    // Central Europe
    X1: [4.6, 51.7], X2: [5.9, 51.8], X3: [5.95, 51.0], X4: [6.15, 50.3], X5: [6.5, 49.8],
    Y1: [7.2, 52.0], Y2: [8.9, 51.7], Y3: [9.5, 50.4], Y4: [9.6, 49.6], Y5: [9.2, 49.0],
    Z1: [7.9, 46.3], Z2: [8.6, 45.9], Z3: [8.5, 45.0], Z4: [8.0, 43.85],
    J1: [11.9, 50.3], J2: [12.4, 49.9], J3: [13.8, 48.8], J4: [13.45, 48.55], J5: [13.0, 47.8], J6: [12.2, 47.6], J7: [10.9, 47.5], J8: [9.6, 47.55],
    S1: [10.8, 52.15], S2: [12.5, 52.2], S3: [14.7, 51.5], S4: [14.3, 50.9], S5: [12.9, 50.4],
    H1: [15.0, 49.0], H2: [16.9, 48.6], H3: [17.1, 48.0], H4: [16.4, 47.0], H5: [16.0, 46.4], H6: [15.5, 45.5], H7: [14.5, 45.3],
    H8: [13.8, 45.65], H9: [13.0, 46.5], H10: [12.0, 46.2], H11: [10.5, 46.5],
    O1: [16.2, 50.6], O2: [17.8, 50.3], O3: [18.8, 49.6], O4: [17.9, 49.0],
    U1: [20.2, 49.4], U2: [22.5, 49.1], U3: [24.3, 47.9], U4: [24.6, 46.0], U5: [22.6, 44.6], U6: [21.0, 44.8], U7: [19.0, 44.9],
    U8: [16.5, 45.2], U9: [15.4, 44.8], U10: [14.9, 44.95],
    W1: [14.7, 52.4], W2: [16.3, 53.2], W3: [17.6, 53.1], W4: [19.3, 53.2], W5: [21.6, 53.4], W6: [23.8, 53.0], W7: [24.3, 51.0], W8: [24.5, 49.6],
    // Low Countries, northern Germany, Denmark
    HL1: [4.1, 52.0], HL2: [4.75, 52.95], HL3: [5.4, 52.9], HL4: [5.9, 52.4],
    NG1: [5.6, 53.4], NG2: [7.0, 53.6], NG3: [8.6, 53.9], NG4: [9.8, 53.5], NG5: [11.2, 53.0], NG7: [11.0, 54.1], NG8: [12.5, 54.3],
    NG9: [13.4, 54.6], NG10: [12.9, 54.2], NG11: [12.9, 53.3], NG12: [11.6, 53.1], NG13: [14.3, 53.9], NG14: [15.6, 54.2], NG15: [16.6, 54.6],
    DK1: [8.7, 54.35], DK2: [10.1, 54.45],
    I1: [17.2, 54.0], I2: [17.3, 54.75], I3: [18.4, 54.8], I4: [18.65, 54.4], I5: [19.6, 54.45], I6: [20.3, 54.7], I7: [21.1, 55.7], I8: [22.8, 54.4]
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
    hre: { name: { en: 'Holy Roman Empire', fr: 'Saint-Empire' }, fill: '#d0a878' },
    sav: { name: { en: 'County of Savoy', fr: 'Comté de Savoie' }, fill: '#9fc7c4' },
    boh: { name: { en: 'Kingdom of Bohemia', fr: 'Royaume de Bohême' }, fill: '#f0c9a0' },
    hun: { name: { en: 'Kingdom of Hungary', fr: 'Royaume de Hongrie' }, fill: '#c7d98f' },
    pol: { name: { en: 'Kingdom of Poland', fr: 'Royaume de Pologne' }, fill: '#e6a6ab' },
    teu: { name: { en: 'State of the Teutonic Order', fr: "État de l'ordre Teutonique" }, fill: '#d9d6cc' },
    dan: { name: { en: 'Kingdom of Denmark (Kalmar Union)', fr: 'Royaume de Danemark (Union de Kalmar)' }, fill: '#b5a3d6' }
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
      fill: '#d2a874', short: { en: 'Lorraine', fr: 'Lorraine' }, of: ['of Lorraine', 'de Lorraine'], names: 'fr', lang: 'fr', houses: ['burgundy', 'valois'], ruler: ['Duchess of Lorraine', 'Duchesse de Lorraine'],
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
    }),
    R('luxembourg', 'hre', 'Brabant & Luxembourg', 'Brabant et Luxembourg', {
      fill: '#e3c79a', short: { en: 'Luxembourg', fr: 'Luxembourg' }, of: ['of Luxembourg', 'de Luxembourg'], names: 'fr', lang: 'fr', houses: ['luxembourg', 'burgundy'], ruler: ['Duchess of Luxembourg', 'Duchesse de Luxembourg'],
      label: [5.3, 50.5], cities: [['Luxembourg', 6.13, 49.61], ['Brussels', 4.35, 50.85], ['Louvain', 4.7, 50.88], ['Namur', 4.87, 50.47], ['Liège', 5.57, 50.63]],
      poly: ['A1', 'X1', 'X2', 'X3', 'X4', 'X5', 'E6', 'E5', 'E4', 'E3', 'E2']
    }),
    R('rhineland', 'hre', 'Rhineland & the Palatinate', 'Rhénanie et Palatinat', {
      fill: '#bf8f63', short: { en: 'Rhineland', fr: 'Rhénanie' }, of: ['of the Rhine', 'du Rhin'], names: 'ger', lang: 'en', houses: ['wittelsbach'], ruler: ['Countess Palatine of the Rhine', 'Comtesse palatine du Rhin'],
      label: [7.9, 50.5], cities: [['Heidelberg', 8.69, 49.41], ['Cologne', 6.96, 50.94], ['Mainz', 8.27, 50.0], ['Trier', 6.64, 49.75], ['Aachen', 6.08, 50.78]],
      poly: ['X2', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'E8', 'E7', 'E6', 'X5', 'X4', 'X3']
    }),
    R('savoy', 'sav', 'Savoy & Piedmont', 'Savoie et Piémont', {
      short: { en: 'Savoy', fr: 'Savoie' }, of: ['of Savoy', 'de Savoie'], names: 'fr', lang: 'fr', houses: ['savoy'], ruler: ['Countess of Savoy', 'Comtesse de Savoie'], second: ['Princess of Piedmont', 'Princesse de Piémont'],
      label: [7.6, 45.25], cities: [['Turin', 7.68, 45.07], ['Aosta', 7.32, 45.74], ['Nice', 7.3, 43.76], ['Ivrea', 7.88, 45.47]],
      poly: ['E11', 'Z1', 'Z2', 'Z3', 'Z4', 'M1', 'E14', 'E13', 'E12']
    }),
    R('bavaria', 'hre', 'Bavaria & Swabia', 'Bavière et Souabe', {
      fill: '#e8c590', short: { en: 'Bavaria', fr: 'Bavière' }, of: ['of Bavaria', 'de Bavière'], names: 'ger', lang: 'en', houses: ['wittelsbach'], ruler: ['Duchess of Bavaria', 'Duchesse de Bavière'],
      label: [11.0, 48.7], cities: [['Munich', 11.58, 48.14], ['Augsburg', 10.9, 48.37], ['Regensburg', 12.1, 49.02], ['Nuremberg', 11.08, 49.45], ['Landshut', 12.15, 48.54]],
      poly: ['E8', 'Y5', 'Y4', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'E9']
    }),
    R('saxony', 'hre', 'Saxony & Thuringia', 'Saxe et Thuringe', {
      fill: '#cfae7c', short: { en: 'Saxony', fr: 'Saxe' }, of: ['of Saxony', 'de Saxe'], names: 'ger', lang: 'en', houses: ['wettin'], ruler: ['Margravine of Meissen', 'Margravine de Misnie'],
      label: [11.9, 51.4], cities: [['Meissen', 13.47, 51.16], ['Dresden', 13.74, 51.05], ['Leipzig', 12.37, 51.34], ['Erfurt', 11.03, 50.98], ['Wittenberg', 12.65, 51.87]],
      poly: ['Y2', 'S1', 'S2', 'S3', 'S4', 'S5', 'J1', 'Y4', 'Y3']
    }),
    R('austria', 'hre', 'Austria & Tyrol', 'Autriche et Tyrol', {
      fill: '#c08a5e', short: { en: 'Austria', fr: 'Autriche' }, of: ['of Austria', "d'Autriche"], names: 'ger', lang: 'en', houses: ['habsburg'], ruler: ['Duchess of Austria', "Duchesse d'Autriche"],
      label: [14.0, 47.4], cities: [['Vienna', 16.37, 48.21], ['Graz', 15.44, 47.07], ['Innsbruck', 11.4, 47.27], ['Linz', 14.29, 48.31], ['Wiener Neustadt', 16.24, 47.81]],
      alias: ['Wien'],
      poly: ['J4', 'J3', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'J7', 'J6', 'J5']
    }),
    R('bohemia', 'boh', 'Bohemia & Moravia', 'Bohême et Moravie', {
      short: { en: 'Bohemia', fr: 'Bohême' }, of: ['of Bohemia', 'de Bohême'], names: 'boh', lang: 'en', houses: ['luxembourg'], ruler: ['Queen of Bohemia', 'Reine de Bohême'], second: ['Princess of Bohemia', 'Princesse de Bohême'],
      label: [15.3, 49.75], cities: [['Prague', 14.42, 50.08], ['Kutná Hora', 15.27, 49.95], ['Brno', 16.61, 49.2], ['Olomouc', 17.25, 49.59]],
      alias: ['Praha'],
      poly: ['J1', 'S5', 'S4', 'S3', 'O1', 'O2', 'O3', 'O4', 'H2', 'H1', 'J3', 'J2']
    }),
    R('hungary', 'hun', 'Hungary & Croatia', 'Hongrie et Croatie', {
      short: { en: 'Hungary', fr: 'Hongrie' }, of: ['of Hungary', 'de Hongrie'], names: 'hun', lang: 'en', houses: ['anjou', 'garai', 'luxembourg'], ruler: ['Queen of Hungary', 'Reine de Hongrie'], second: ['Princess of Hungary', 'Princesse de Hongrie'],
      label: [19.8, 47.0], cities: [['Buda', 19.04, 47.5], ['Pressburg', 17.11, 48.14], ['Esztergom', 18.74, 47.79], ['Kassa', 21.26, 48.72], ['Zagreb', 15.98, 45.81]],
      poly: ['O3', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2', 'O4']
    }),
    R('poland', 'pol', 'Poland', 'Pologne', {
      of: ['of Poland', 'de Pologne'], names: 'pol', lang: 'en', houses: ['jagiellon', 'anjou'], ruler: ['Queen of Poland', 'Reine de Pologne'], second: ['Princess of Poland', 'Princesse de Pologne'],
      label: [20.0, 51.6], cities: [['Kraków', 19.94, 50.06], ['Gniezno', 17.6, 52.53], ['Poznań', 16.93, 52.41], ['Warsaw', 21.01, 52.23], ['Lwów', 24.03, 49.84]],
      alias: ['Krakow', 'Cracow'],
      poly: ['S3', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'U2', 'U1', 'O3', 'O2', 'O1']
    }),
    R('prussia', 'teu', 'Prussia', 'Prusse', {
      of: ['of Marienburg', 'de Marienbourg'], names: 'ger', lang: 'en', houses: ['teutonic'], ruler: ['Abbess of Marienburg', 'Abbesse de Marienbourg'],
      label: [20.1, 53.9], cities: [['Marienburg', 19.03, 54.04], ['Danzig', 18.62, 54.33], ['Königsberg', 20.51, 54.71], ['Elbing', 19.4, 54.16]],
      poly: ['W3', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'W5', 'W4']
    }),
    R('holland', 'hre', 'Holland & Zeeland', 'Hollande et Zélande', {
      fill: '#d6b27a', short: { en: 'Holland', fr: 'Hollande' }, of: ['of Holland', 'de Hollande'], names: 'flem', lang: 'fr', houses: ['wittelsbach'], ruler: ['Countess of Holland', 'Comtesse de Hollande'],
      label: [4.85, 52.3], cities: [['The Hague', 4.3, 52.08], ['Dordrecht', 4.67, 51.81], ['Haarlem', 4.64, 52.38], ['Leiden', 4.49, 52.16], ['Utrecht', 5.12, 52.09]],
      poly: ['A1', 'HL1', 'HL2', 'HL3', 'HL4', 'X2', 'X1']
    }),
    R('brunswick', 'hre', 'Brunswick & Westphalia', 'Brunswick et Westphalie', {
      fill: '#e6cf9f', short: { en: 'Brunswick', fr: 'Brunswick' }, of: ['of Brunswick', 'de Brunswick'], names: 'ger', lang: 'en', houses: ['welf'], ruler: ['Duchess of Brunswick-Lüneburg', 'Duchesse de Brunswick-Lunebourg'],
      label: [8.4, 52.75], cities: [['Brunswick', 10.52, 52.27], ['Lüneburg', 10.41, 53.25], ['Bremen', 8.8, 53.08], ['Münster', 7.63, 51.96], ['Osnabrück', 8.05, 52.28]],
      alias: ['Braunschweig'],
      poly: ['X2', 'HL4', 'HL3', 'NG1', 'NG2', 'NG3', 'NG4', 'NG5', 'S1', 'Y2', 'Y1']
    }),
    R('mecklenburg', 'hre', 'Holstein & Mecklenburg', 'Holstein et Mecklembourg', {
      fill: '#d4b585', short: { en: 'Lübeck', fr: 'Lübeck' }, of: ['of Mecklenburg', 'de Mecklembourg'], names: 'ger', lang: 'en', houses: ['mecklenburg'], ruler: ['Duchess of Mecklenburg', 'Duchesse de Mecklembourg'],
      label: [11.1, 53.6], cities: [['Lübeck', 10.69, 53.87], ['Hamburg', 9.99, 53.55], ['Rostock', 12.1, 54.09], ['Wismar', 11.46, 53.89], ['Kiel', 10.13, 54.32]],
      poly: ['NG4', 'NG3', 'DK1', 'DK2', 'NG7', 'NG8', 'NG10', 'NG11', 'NG12', 'NG5']
    }),
    R('brandenburg', 'hre', 'Brandenburg & Pomerania', 'Brandebourg et Poméranie', {
      fill: '#b9966a', short: { en: 'Brandenburg', fr: 'Brandebourg' }, of: ['of Brandenburg', 'de Brandebourg'], names: 'ger', lang: 'en', houses: ['hohenzollern', 'griffin'], ruler: ['Margravine of Brandenburg', 'Margravine de Brandebourg'],
      label: [13.9, 52.95], cities: [['Brandenburg', 12.55, 52.41], ['Berlin', 13.4, 52.52], ['Stettin', 14.55, 53.43], ['Stralsund', 13.09, 54.31], ['Frankfurt on the Oder', 14.55, 52.34]],
      alias: ['Szczecin'],
      poly: ['S1', 'NG5', 'NG12', 'NG11', 'NG10', 'NG9', 'NG13', 'NG14', 'NG15', 'I2', 'I1', 'W3', 'W2', 'W1', 'S3', 'S2']
    }),
    R('denmark', 'dan', 'Denmark', 'Danemark', {
      of: ['of Denmark', 'de Danemark'], names: 'dan', lang: 'en', houses: ['griffin'], ruler: ['Queen of Denmark', 'Reine de Danemark'], second: ['Princess of Denmark', 'Princesse de Danemark'],
      label: [9.2, 56.15], cities: [['Copenhagen', 12.57, 55.68], ['Roskilde', 12.08, 55.64], ['Ribe', 8.76, 55.33], ['Aarhus', 10.2, 56.16], ['Lund', 13.19, 55.7], ['Odense', 10.39, 55.4], ['Schleswig', 9.57, 54.52]],
      alias: ['København'],
      poly: ['DK1', [8.6, 55.5], [8.1, 56.6], [9.8, 57.6], [10.6, 57.7], [10.5, 56.5], [10.9, 56.2], [10.6, 55.6], [10.0, 55.0], 'DK2'],
      // Funen, Zealand, Lolland-Falster, Scania, Bornholm
      isles: [[[9.7, 55.5], [10.5, 55.6], [10.8, 55.3], [10.6, 55.0], [9.9, 55.1]],
        [[11.0, 55.9], [12.6, 56.0], [12.68, 55.65], [12.4, 55.2], [11.3, 55.2]],
        [[11.0, 54.85], [12.1, 54.9], [12.0, 54.6], [11.1, 54.65]],
        [[12.6, 56.0], [12.9, 55.4], [14.2, 55.4], [14.6, 56.1], [15.5, 56.15], [15.3, 56.6], [13.6, 56.7], [12.5, 56.9], [12.3, 56.6]],
        [[14.7, 55.3], [15.15, 55.15], [14.9, 54.98], [14.7, 55.1]]]
    })
  ];
  Valeria.REGIONS.forEach(r => { r.poly = r.poly.map(pt); if (r.isles) r.isles = r.isles.map(p => p.map(pt)); });

  Valeria.BACKDROP = [
    // rest of the Empire, Low Countries, Denmark, Baltic lands, Balkans, Italy (regions are drawn on top)
    ['A1', [4.5, 52.0], [4.8, 52.9], [5.6, 53.4], [7.0, 53.6], [8.6, 53.9], [8.6, 55.5], [8.1, 56.6], [9.8, 57.6], [10.6, 57.7], [10.5, 56.5], [10.9, 56.2], [10.6, 55.6], [10.0, 55.0], [11, 54.1], [12.5, 54.3],
      [13.4, 54.6], [14.3, 53.9], [15.6, 54.2], [16.6, 54.6], 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', [21.0, 56.5], [21.6, 57.5], [22.6, 57.7], [23.5, 57.1], [24.3, 57.3], [23.6, 58.3], [23.5, 59.3], [24.8, 59.5], [27.0, 59.5],
      [27.0, 41.0], [19.5, 41.0], [19.4, 41.8], [18.5, 42.4], [18.1, 42.65], [17.0, 43.4], [16.4, 43.5], [15.2, 44.1], 'U10', 'H7', 'H8', [13.3, 45.75], [12.3, 45.4], [12.5, 44.5], [13.6, 43.6], [14.2, 42.5],
      [15.0, 42.0], [16.0, 41.9], [16.2, 41.4], [16.5, 41.0], [13.0, 41.0], [12.5, 41.5], [12.0, 41.8], [11.1, 42.4], [10.5, 43.0], [10.3, 43.5], [9.8, 44.1], [8.9, 44.4], [8.2, 43.9], 'M1', 'E14', 'E13', 'E12', 'E11', 'E10', 'E9', 'E8', 'E7', 'E6', 'E5', 'E4', 'E3', 'E2'],
    // Iberia
    ['R1', [-3.0, 43.45], [-5.5, 43.55], [-7.5, 43.75], [-8.3, 43.5], [-9.2, 43.1], [-8.9, 42.0], [-8.8, 41.0], [1.0, 40.8], [2.2, 41.3], [3.2, 41.9], 'R6', 'R5', 'R4', 'R3', 'R2'],
    // Corsica
    [[9.4, 43.0], [9.55, 42.1], [9.2, 41.4], [8.6, 41.7], [8.6, 42.4], [9.3, 42.7]],
    // Sweden, Gotland
    [[10.5, 60.0], [18.8, 60.0], [18.5, 59.3], [18.0, 58.9], [16.8, 58.0], [16.6, 57.0], [16.0, 56.2], [14.6, 56.1], [14.2, 55.4], [12.9, 55.4], [12.6, 56.0], [12.0, 57.4], [11.8, 58.0], [11.2, 59.0], [10.7, 59.4]],
    [[18.1, 57.9], [19.0, 57.8], [18.7, 57.2], [18.2, 57.0], [18.1, 57.4]]
  ].map(poly => poly.map(pt));

  Valeria.SEAS = [
    { name: { en: 'North Sea', fr: 'Mer du Nord' }, at: [2.8, 55.2] },
    { name: { en: 'The Channel', fr: 'La Manche' }, at: [-2.4, 50.0] },
    { name: { en: 'Irish Sea', fr: "Mer d'Irlande" }, at: [-5.1, 53.8] },
    { name: { en: 'Bay of Biscay', fr: 'Golfe de Gascogne' }, at: [-4.6, 45.4] },
    { name: { en: 'Mediterranean', fr: 'Méditerranée' }, at: [5.6, 42.3] },
    { name: { en: 'Ocean Sea', fr: 'Mer Océane' }, at: [-9.2, 48.6] },
    { name: { en: 'Baltic Sea', fr: 'Mer Baltique' }, at: [17.8, 55.7] },
    { name: { en: 'Adriatic', fr: 'Adriatique' }, at: [15.6, 42.8] }
  ];
})();
