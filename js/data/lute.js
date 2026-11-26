/*
 * Valeria - 🪕 lute music: original medieval-style pieces, played live by js/sound.js with the same
 * Karplus-Strong lute string as the button sounds (no files, works offline).
 *   { id, name: [EN, FR], u: seconds per unit, bar: units per bar, form: 'AABB' (section order),
 *     A/B: melody, tokens 'note/units' ('D5/2', 'F#4/1', rest '-/2'), bar lines '|' ignored,
 *     bassA/bassB: one bass note per bar (root on the downbeat, fifth at mid-bar),
 *     drone?: drone note under the whole piece, drum?: tabor pattern per bar ('X' strong, 'x' soft, '.' rest) }
 * On repeats the player adds grace notes, octave doublings and small timing swing, so no two passes are alike.
 */
window.Valeria = window.Valeria || {};

Valeria.LUTE = [
  {
    id: 'rose', name: ['Estampie of the Rose', 'Estampie de la Rose'], u: 0.19, bar: 6, form: 'AABB', drone: 'D3',
    A: 'D5/2 E5/1 F5/2 G5/1 | A5/3 G5/2 F5/1 | E5/2 D5/1 E5/2 F5/1 | D5/3 A4/3 | D5/2 E5/1 F5/2 G5/1 | A5/2 C6/1 A5/2 G5/1 | F5/2 E5/1 D5/2 C5/1 | D5/6',
    B: 'A5/2 A5/1 C6/2 A5/1 | G5/3 F5/3 | G5/2 G5/1 A5/2 G5/1 | F5/3 E5/3 | F5/2 G5/1 A5/2 F5/1 | E5/2 D5/1 C5/2 E5/1 | D5/2 F5/1 E5/2 C5/1 | D5/6',
    bassA: 'D3 D3 C3 D3 D3 F3 C3 D3', bassB: 'F3 C3 C3 A2 F3 C3 A2 D3'
  },
  {
    id: 'pastourelle', name: ['Pastourelle of the Meadow', 'Pastourelle du Pré'], u: 0.2, bar: 8, form: 'AABB',
    A: 'G4/2 B4/2 D5/2 B4/2 | C5/2 E5/2 D5/4 | B4/2 C5/2 D5/2 G5/2 | F5/2 E5/2 D5/4 | G5/2 F5/2 E5/2 D5/2 | C5/2 B4/2 A4/4 | B4/2 D5/2 C5/2 A4/2 | G4/8',
    B: 'D5/2 D5/1 E5/1 F5/2 D5/2 | E5/2 C5/2 G5/4 | F5/2 E5/2 D5/2 C5/2 | B4/4 D5/4 | G5/3 F5/1 E5/2 D5/2 | C5/2 E5/2 D5/4 | B4/2 A4/2 F4/2 A4/2 | G4/8',
    bassA: 'G2 C3 G2 D3 G2 C3 D3 G2', bassB: 'D3 C3 F3 G2 C3 C3 D3 G2',
    drum: 'X...x...'
  },
  {
    id: 'lament', name: ['Lament for a Far Shore', 'Complainte du Rivage lointain'], u: 0.32, bar: 6, form: 'ABA', drone: 'A2',
    A: 'A4/2 C5/2 E5/2 | D5/3 C5/1 B4/2 | C5/2 A4/2 B4/2 | G4/6 | A4/2 C5/2 E5/2 | F5/3 E5/1 D5/2 | C5/2 B4/2 G4/2 | A4/6',
    B: 'E5/2 G5/2 A5/2 | G5/3 E5/1 D5/2 | E5/2 C5/2 D5/2 | E5/6 | F5/2 E5/2 D5/2 | C5/3 B4/1 A4/2 | B4/2 G4/2 B4/2 | A4/6',
    bassA: 'A2 D3 A2 G2 A2 D3 E3 A2', bassB: 'C3 E3 A2 E3 D3 A2 E3 A2'
  },
  {
    id: 'tabor', name: ['Tabor Dance', 'Danse du Tambourin'], u: 0.14, bar: 6, form: 'AABBAA',
    A: 'D5/1 E5/1 F5/1 G5/2 F5/1 | E5/1 D5/1 E5/1 C5/3 | D5/1 E5/1 F5/1 G5/1 A5/1 G5/1 | F5/2 E5/1 D5/3 | A5/2 G5/1 F5/2 G5/1 | A5/1 C6/1 A5/1 G5/3 | F5/1 G5/1 A5/1 G5/1 F5/1 E5/1 | D5/6',
    B: 'C6/2 A5/1 C6/2 D6/1 | C6/1 A5/1 G5/1 A5/3 | G5/2 F5/1 G5/2 A5/1 | G5/1 F5/1 E5/1 F5/3 | F5/1 G5/1 A5/1 F5/1 E5/1 D5/1 | E5/2 C5/1 E5/2 G5/1 | F5/2 E5/1 D5/2 C5/1 | D5/6',
    bassA: 'D3 C3 D3 D3 F3 A2 C3 D3', bassB: 'F3 F3 C3 F3 D3 C3 A2 D3',
    drum: 'X..x.x'
  },
  {
    id: 'candle', name: ['Nocturne by Candlelight', 'Nocturne à la Chandelle'], u: 0.28, bar: 8, form: 'AB', drone: 'E3',
    A: 'E5/2 F5/2 G5/2 A5/2 | B5/4 A5/2 G5/2 | A5/2 G5/2 F5/2 G5/2 | E5/8 | G5/2 A5/2 B5/2 C6/2 | D6/4 C6/2 B5/2 | C6/2 B5/2 A5/2 F5/2 | E5/8',
    B: 'B5/2 C6/2 D6/2 E6/2 | D6/3 C6/1 B5/4 | C6/2 A5/2 B5/2 G5/2 | A5/8 | G5/2 A5/2 B5/2 G5/2 | A5/3 G5/1 F5/4 | G5/2 F5/2 G5/2 F5/2 | E5/8',
    bassA: 'E3 E3 A2 E3 C3 G2 A2 E3', bassB: 'G2 G2 C3 A2 E3 A2 G2 E3'
  },
  {
    id: 'pilgrim', name: ['Pilgrims on the Road', 'Pèlerins sur la Route'], u: 0.22, bar: 8, form: 'AABB', drone: 'F3',
    A: 'F4/2 A4/2 C5/2 A4/2 | B4/2 C5/2 D5/4 | C5/2 A4/2 G4/2 A4/2 | F4/4 C5/4 | D5/2 C5/2 B4/2 A4/2 | G4/2 A4/2 B4/4 | A4/2 G4/2 E4/2 G4/2 | F4/8',
    B: 'C5/2 C5/2 F5/2 E5/2 | D5/2 C5/2 D5/4 | E5/2 D5/2 C5/2 B4/2 | C5/8 | A4/2 B4/2 C5/2 D5/2 | C5/3 B4/1 A4/4 | G4/2 A4/2 G4/2 E4/2 | F4/8',
    bassA: 'F2 G2 F2 F2 G2 G2 C3 F2', bassB: 'F2 G2 C3 C3 F2 F2 C3 F2',
    drum: 'X.......'
  }
];
