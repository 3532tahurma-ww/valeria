/*
 * Valeria - pools for 🎲 random characters (js/gen.js)
 * first[pool][f|m], surname[pool]: pool = region.names ('en', 'fr', 'scot', 'wales', 'irl', 'nav', 'flem')
 * titles.f / titles.m: [EN, FR] ordinary titles (rulers come from map regions)
 * mottos, origins, secrets, hopes: [EN, FR]; {name} = first name, {city} = seat
 */
window.Valeria = window.Valeria || {};

Valeria.POOLS = {
  first: {
    en: {
      f: ['Eleanor', 'Isabel', 'Matilda', 'Joan', 'Margery', 'Alys', 'Cecily', 'Rosamund', 'Edith', 'Agnes', 'Philippa', 'Constance', 'Beatrice', 'Juliana', 'Maud', 'Avice', 'Rowena', 'Catherine', 'Elaine', 'Emma', 'Mabel', 'Isolde', 'Hawise', 'Lettice', 'Sybil', 'Idony', 'Margaret', 'Anne', 'Elizabeth', 'Alienor'],
      m: ['Edmund', 'Richard', 'Geoffrey', 'Henry', 'Thomas', 'William', 'Hugh', 'Robert', 'Walter', 'Roger', 'Gilbert', 'Ralph', 'Edward', 'John', 'Humphrey', 'Lionel']
    },
    fr: {
      f: ['Isabeau', 'Aliénor', 'Blanche', 'Jehanne', 'Marguerite', 'Béatrice', 'Clémence', 'Yolande', 'Héloïse', 'Agnès', 'Mahaut', 'Ysabel', 'Adèle', 'Bérengère', 'Sybille', 'Guillemette', 'Perrine', 'Catherine', 'Valentine', 'Aude', 'Ermengarde', 'Oriane', 'Mélisende', 'Constance', 'Margot', 'Colette', 'Églantine', 'Bonne', 'Jacquette', 'Avoye'],
      m: ['Louis', 'Philippe', 'Charles', 'Jean', 'Guillaume', 'Gauthier', 'Thibaut', 'Raoul', 'Enguerrand', 'Bertrand', 'Olivier', 'Arnaud', 'Gaston', 'Hugues', 'Amaury', 'Aymeric']
    },
    scot: {
      f: ['Isobel', 'Mairead', 'Euphemia', 'Christina', 'Marjorie', 'Ada', 'Eithne', 'Muriel', 'Elspeth', 'Annabella'],
      m: ['Alexander', 'Duncan', 'Malcolm', 'Archibald', 'Kenneth', 'Fergus', 'Angus', 'Robert']
    },
    wales: {
      f: ['Gwenllian', 'Angharad', 'Nest', 'Efa', 'Gwladys', 'Tangwystl', 'Lleucu', 'Marared', 'Morfudd', 'Elen'],
      m: ['Owain', 'Rhys', 'Dafydd', 'Llywelyn', 'Gruffudd', 'Madog', 'Iorwerth', 'Hywel']
    },
    irl: {
      f: ['Aoife', 'Siobhan', 'Gormlaith', 'Orla', 'Niamh', 'Sadhbh', 'Fionnuala', 'Mór', 'Derbforgaill', 'Úna'],
      m: ['Brian', 'Conor', 'Donal', 'Turlough', 'Cormac', 'Niall', 'Felim', 'Aodh']
    },
    nav: {
      f: ['Sancha', 'Urraca', 'Toda', 'Elvira', 'Leonor', 'Blanca', 'Teresa', 'Mencía', 'Oneca', 'Jimena'],
      m: ['Sancho', 'García', 'Teobaldo', 'Carlos', 'Íñigo', 'Fortún', 'Rodrigo', 'Martín']
    },
    flem: {
      f: ['Margriet', 'Machteld', 'Clementia', 'Jacoba', 'Godelieve', 'Aleidis', 'Beatrijs', 'Ida', 'Hadewijch', 'Liedewij'],
      m: ['Boudewijn', 'Diederik', 'Gwijde', 'Jan', 'Lodewijk', 'Willem', 'Arnulf', 'Filips']
    }
  },

  surname: {
    en: ['Ashby', 'Thorne', 'Whitmore', 'Langley', 'Marlowe', 'Ravenscroft', 'Ashcombe', 'Holloway', 'Fairfax', 'Blackwood', 'Lisle', 'Stanhope', 'Wyndham', 'of Wakefield', 'of Ludlow', 'of Ely', 'Rookwood', 'Hartley'],
    fr: ['de Valcourt', 'de Montclair', 'de Rochebrune', 'de Beaulieu', 'de Saint-Aubin', "d'Aubrac", 'de Vaudrey', 'de Mirecourt', 'de Belleval', 'de Fontenay', 'de Malestroit', 'de Clairmont', 'de Lusigny', 'de Verneuil', 'de Montagny', 'de Sainte-Croix', 'de Châtelneuf', "d'Orvanne"],
    scot: ['Lindsay', 'Kerr', 'Ramsay', 'MacLeod', 'Drummond', 'Hay', 'Fraser', 'of Moray'],
    wales: ['of Gwynedd', 'of Powys', 'of Dyfed', 'of Gower', 'of Brecon', 'of Anglesey'],
    irl: ['of Desmond', 'of Ormond', 'of Leinster', 'of Connacht', 'of Thomond', 'of Ulster'],
    nav: ['de Olite', 'de Estella', 'de Tafalla', 'de Sangüesa', 'de Lizarra', 'de Viana'],
    flem: ['van Gistel', 'van Brugge', 'van Gent', 'van der Straeten', 'van Halewyn', 'van Rijsel', 'van Ieper']
  },

  titles: {
    f: [['Lady', 'Dame'], ['Baroness', 'Baronne'], ['Lady-in-waiting', 'Dame de compagnie'], ['Abbess', 'Abbesse'],
      ['Healer', 'Guérisseuse'], ['Merchant', 'Marchande'], ['Seamstress', 'Couturière'], ['Trobairitz', 'Trobairitz'],
      ['Innkeeper', 'Aubergiste'], ['Spy', 'Espionne'], ['Countess', 'Comtesse'], ['Herbalist', 'Herboriste'],
      ['Falconer', 'Fauconnière'], ['Scribe', 'Scribe'], ['Weaver', 'Tisserande'], ['Ward of the crown', 'Pupille de la couronne']],
    m: [['Knight', 'Chevalier'], ['Squire', 'Écuyer'], ['Baron', 'Baron'], ['Count', 'Comte'], ['Minstrel', 'Ménestrel'],
      ['Scribe', 'Scribe'], ['Archer', 'Archer'], ['Merchant', 'Marchand'], ['Falconer', 'Fauconnier'],
      ['Herald', 'Héraut'], ['Steward', 'Intendant'], ['Spy', 'Espion']]
  },

  mottos: [
    ['Faithful in all things', 'Fidélité en toute chose'], ['Hold fast', 'Tiens bon'], ['By sword and by quill', "Par l'épée et la plume"],
    ['The rose remembers', 'La rose se souvient'], ['Neither fear nor favour', 'Ni peur ni faveur'], ['In hope', 'En espérance'],
    ['Without fear', 'Sans peur'], ['As long as I can', 'Tant que je puis'], ['My will', 'Ma volonté'],
    ['Love conquers all', "L'amour vainc tout"], ['Silence is my shield', 'Le silence est mon bouclier'],
    ['Ever onward', 'Toujours plus loin'], ['Better to bend than break', 'Mieux vaut plier que rompre'],
    ['Spes mea Deus', 'Spes mea Deus'], ['Plus est en vous', 'Plus est en vous'], ['I burn, I shine', 'Je brûle, je brille']
  ],

  origins: [
    ['{name} grew up behind the walls of {city}, where the bells rule every hour.', '{name} a grandi derrière les remparts de {city}, où les cloches règlent chaque heure.'],
    ['{name} learned Latin, falconry and silence in {city} before the age of ten.', 'À {city}, {name} a appris le latin, la fauconnerie et le silence avant ses dix ans.'],
    ["Everyone in {city} knows {name}'s laugh: it carries across the market square.", 'Tout {city} connaît le rire de {name} : il traverse la place du marché.'],
    ['{name} came to {city} with one trunk, two languages and no intention of leaving.', '{name} a débarqué à {city} avec une malle, deux langues et nulle intention de repartir.'],
    ["The war took {name}'s family lands near {city}; the pride stayed.", 'La guerre a pris les terres familiales de {name} près de {city} ; la fierté est restée.'],
    ['{name} spends more time in the library of {city} than at court.', "{name} passe plus de temps dans la bibliothèque de {city} qu'à la cour."]
  ],
  secrets: [
    ['Secretly writes to someone on the other side of the Channel.', "Écrit en secret à quelqu'un de l'autre côté de la Manche."],
    ['Hides love poems inside a book of hours.', "Cache des poèmes d'amour dans un livre d'heures."],
    ['Owes a dangerous sum to a Lombard banker.', 'Doit une somme dangereuse à un banquier lombard.'],
    ['Keeps a dagger sewn into one sleeve.', 'Garde une dague cousue dans une manche.'],
    ['Has refused three marriage offers, and kept the rings.', 'A refusé trois demandes en mariage, et gardé les bagues.'],
    ['Sneaks out at night dressed as a page.', "Sort la nuit en cachette, sous l'habit d'un page."],
    ['Reads forbidden romances by candlelight.', 'Lit des romans interdits à la chandelle.'],
    ["Knows the queen's secret, and has told no one. Yet.", "Connaît le secret de la reine et ne l'a dit à personne. Pour l'instant."]
  ],
  hopes: [
    ['Dreams of seeing the sea at Bordeaux.', 'Rêve de voir la mer à Bordeaux.'],
    ['Wants, more than anything, a letter that is not about politics.', 'Veut, plus que tout, une lettre qui ne parle pas de politique.'],
    ['Prays the war ends before next harvest.', 'Prie pour que la guerre finisse avant la prochaine moisson.'],
    ['Longs for a love worth a ballad.', "Rêve d'un amour digne d'une ballade."],
    ['Plans, quietly, to rule something one day.', 'Compte, discrètement, régner un jour sur quelque chose.'],
    ['Would trade every jewel for one night without a chaperone.', 'Échangerait tous ses bijoux contre une nuit sans chaperon.']
  ]
};
