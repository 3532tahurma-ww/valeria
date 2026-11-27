/*
 * Valeria - character presets
 * TRAITS: stored on the character as the English id (backup-compatible with Carmen: traits = string array).
 *   Labels come from the dictionaries as 'trait.<id>'. Unknown traits (e.g. from a Carmen backup) are kept and shown as-is.
 * HOUSES: character.house = id; colors → character.colors (crest gradient).
 * TITLES: [EN, FR] suggestions for character.job.
 */
window.Valeria = window.Valeria || {};

Valeria.TRAITS = {
  personality: ['Chivalrous', 'Courtly', 'Pious', 'Proud', 'Cunning', 'Gentle', 'Bold', 'Shy', 'Witty',
    'Melancholic', 'Passionate', 'Loyal', 'Jealous', 'Romantic', 'Stern', 'Mischievous', 'Learned', 'Rebellious'],
  style: ['Courtly speech', 'Plain speech', 'Brief letters', 'Long letters', 'Poetic', 'Teasing', 'Uses vous', 'Uses tu']
};

Valeria.HOUSES = [
  { id: 'valois', realm: 'fr', name: { en: 'House of Valois', fr: 'Maison de Valois' }, colors: ['#1d3a8a', '#d4af37'] },
  { id: 'plantagenet', realm: 'en', name: { en: 'House of Plantagenet', fr: 'Maison Plantagenêt' }, colors: ['#a3172b', '#e0b84a'] },
  { id: 'lancaster', realm: 'en', name: { en: 'House of Lancaster', fr: 'Maison de Lancastre' }, colors: ['#b3202f', '#f2e6c9'] },
  { id: 'york', realm: 'en', name: { en: 'House of York', fr: "Maison d'York" }, colors: ['#4b5a8a', '#f4efe2'] },
  { id: 'burgundy', realm: 'fr', name: { en: 'House of Burgundy', fr: 'Maison de Bourgogne' }, colors: ['#6b1e3a', '#1f3a6b'] },
  { id: 'brittany', realm: 'fr', name: { en: 'House of Brittany', fr: 'Maison de Bretagne' }, colors: ['#1a1a1a', '#f5f1e6'] },
  { id: 'anjou', realm: 'fr', name: { en: 'House of Anjou', fr: "Maison d'Anjou" }, colors: ['#2a4f9e', '#c9342f'] },
  { id: 'navarre', realm: 'fr', name: { en: 'House of Navarre', fr: 'Maison de Navarre' }, colors: ['#9e1b20', '#e8c547'] },
  { id: 'beaufort', realm: 'en', name: { en: 'House of Beaufort', fr: 'Maison Beaufort' }, colors: ['#2f5d3a', '#f0ead8'] },
  { id: 'neville', realm: 'en', name: { en: 'House of Neville', fr: 'Maison Neville' }, colors: ['#8b1a1a', '#f0ead8'] },
  { id: 'percy', realm: 'en', name: { en: 'House of Percy', fr: 'Maison Percy' }, colors: ['#2b3a8f', '#e2c25b'] },
  { id: 'stewart', realm: 'sco', name: { en: 'House of Stewart', fr: 'Maison Stuart' }, colors: ['#1f4f8f', '#f2ecdc'] },
  { id: 'fitzgerald', realm: 'irl', name: { en: 'House of FitzGerald', fr: 'Maison FitzGerald' }, colors: ['#f2ecdc', '#b3202f'] },
  { id: 'luxembourg', realm: 'hre', name: { en: 'House of Luxembourg', fr: 'Maison de Luxembourg' }, colors: ['#2e5fa8', '#ece8dc'] },
  { id: 'habsburg', realm: 'hre', name: { en: 'House of Habsburg', fr: 'Maison de Habsbourg' }, colors: ['#c42a2a', '#fbf8f0'] },
  { id: 'wittelsbach', realm: 'hre', name: { en: 'House of Wittelsbach', fr: 'Maison de Wittelsbach' }, colors: ['#3a7cc4', '#f4f4f4'] },
  { id: 'wettin', realm: 'hre', name: { en: 'House of Wettin', fr: 'Maison de Wettin' }, colors: ['#1a1a1a', '#e8c547'] },
  { id: 'savoy', realm: 'sav', name: { en: 'House of Savoy', fr: 'Maison de Savoie' }, colors: ['#d7262f', '#ffffff'] },
  { id: 'garai', realm: 'hun', name: { en: 'House of Garai', fr: 'Maison Garai' }, colors: ['#1f3a6b', '#d4af37'] },
  { id: 'jagiellon', realm: 'pol', name: { en: 'House of Jagiellon', fr: 'Maison Jagellon' }, colors: ['#c0392b', '#f8f4ea'] },
  { id: 'welf', realm: 'hre', name: { en: 'House of Welf', fr: 'Maison Guelfe' }, colors: ['#c8102e', '#e8c547'] },
  { id: 'mecklenburg', realm: 'hre', name: { en: 'House of Mecklenburg', fr: 'Maison de Mecklembourg' }, colors: ['#1a1a1a', '#e3b341'] },
  { id: 'hohenzollern', realm: 'hre', name: { en: 'House of Hohenzollern', fr: 'Maison de Hohenzollern' }, colors: ['#f4f4f4', '#1a1a1a'] },
  { id: 'griffin', realm: 'dan', name: { en: 'House of Pomerania (the Griffins)', fr: 'Maison de Poméranie (les Griffons)' }, colors: ['#b3202f', '#f2ecdc'] },
  { id: 'visconti', realm: 'mil', name: { en: 'House of Visconti', fr: 'Maison Visconti' }, colors: ['#2a4a9e', '#e8d9b0'] },
  { id: 'mocenigo', realm: 'ven', name: { en: 'House of Mocenigo', fr: 'Maison Mocenigo' }, colors: ['#9e1f2a', '#e8c547'] },
  { id: 'este', realm: 'est', name: { en: 'House of Este', fr: "Maison d'Este" }, colors: ['#f2ecdc', '#2b4f9e'] },
  { id: 'gonzaga', realm: 'est', name: { en: 'House of Gonzaga', fr: 'Maison de Gonzague' }, colors: ['#8a1c1c', '#d4af37'] },
  { id: 'doria', realm: 'gen', name: { en: 'House of Doria', fr: 'Maison Doria' }, colors: ['#d4af37', '#1a1a1a'] },
  { id: 'medici', realm: 'flo', name: { en: 'House of Medici', fr: 'Maison de Médicis' }, colors: ['#e3b341', '#b3202f'] },
  { id: 'gorizia', realm: 'aqu', name: { en: 'House of Gorizia', fr: 'Maison de Goritz' }, colors: ['#3b5ba5', '#f2ecdc'] },
  { id: 'teutonic', realm: 'teu', name: { en: 'Teutonic Order', fr: 'Ordre Teutonique' }, colors: ['#f4f1e8', '#1a1a1a'] },
  { id: 'church', realm: '',name: { en: 'The Church', fr: "L'Église" }, colors: ['#4a2b5e', '#d9c27a'] },
  { id: 'commoner', realm: '', name: { en: 'Commoner', fr: 'Roturier' }, colors: ['#6b4f2f', '#a8865a'] }
];

Valeria.TITLES = [
  ['Queen', 'Reine'], ['King', 'Roi'], ['Princess', 'Princesse'], ['Prince', 'Prince'],
  ['Duchess', 'Duchesse'], ['Duke', 'Duc'], ['Countess', 'Comtesse'], ['Count', 'Comte'],
  ['Baroness', 'Baronne'], ['Baron', 'Baron'], ['Lady', 'Dame'], ['Knight', 'Chevalier'],
  ['Squire', 'Écuyer'], ['Lady-in-waiting', 'Dame de compagnie'], ['Troubadour', 'Troubadour'],
  ['Minstrel', 'Ménestrel'], ['Abbess', 'Abbesse'], ['Scribe', 'Scribe'], ['Healer', 'Guérisseuse'],
  ['Merchant', 'Marchande'], ['Innkeeper', 'Aubergiste'], ['Seamstress', 'Couturière'],
  ['Archer', 'Archer'], ['Spy', 'Espionne']
];
// Valeria.CITIES (seat suggestions) is built from the map regions in js/gen.js
