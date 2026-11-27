/*
 * Valeria - ⚔️ Chronicle of 1415: real events of the year, on their real day and month (the court's year is always 1415).
 * CHRONICLE: { id, m, d, icon, t: [EN, FR] title, s: [EN, FR] chronicle text,
 *              her: { en|fr|bur|boh|far: [EN, FR] } what she says of it, by the side of her land (missing side → far),
 *              at?: CHRONICLE_PLACES key → a pin on the 🗺️ map (js/map.js); no `at` = off the map }
 * CHRONICLE_PLACES: { key: { at: [lon, lat], name: [EN, FR] } }. CHRONICLE_ROUTE: King Henry's road, [[event id, [lon, lat]]],
 *   each point drawn once its event has come to pass.
 * Sides (by realm of her region): en = England + Ireland, fr = France, Scotland, Brittany, Navarre, bur = Burgundy,
 *   boh = Bohemia, far = the rest of the Empire and the north, and ladies without a land.
 * Chronicle helpers: past(now) newest first, sealed(now) still to come, latest(now), side(char), line(char, L, now) → {chron},
 *   fresh(char, L, now) → a line only within 7 days of the event (she brings it up herself).
 * Used by: 📯 Herald tab "⚔️ 1415" (js/news.js), Home Herald card, bot question q_news and the fallback ({chron}, js/bot.js).
 */
window.Valeria = window.Valeria || {};

(() => {
  const V = Valeria;

  V.CHRONICLE = [
    { id: 'pope-flees', m: 3, d: 20, icon: '🏃',
      t: ['Pope John flees Constance by night', 'Le pape Jean s’enfuit de Constance de nuit'],
      s: ['Disguised as a groom, Pope John XXIII slipped out of Constance during a tournament, hoping to break the Council. The fathers stay, and declare they will sit without him.', 'Déguisé en palefrenier, le pape Jean XXIII a quitté Constance pendant un tournoi, espérant briser le concile. Les pères restent, et déclarent siéger sans lui.'],
      her: { far: ['A pope dressed as a stable boy! The world has gone mad, {sen}.', 'Un pape vêtu en garçon d’écurie ! Le monde est devenu fou, {sen}.'], boh: ['The pope runs away, and Master Hus stays in his cell. Tell me where the justice is.', 'Le pape s’enfuit, et maître Hus reste dans sa cellule. Dites-moi où est la justice.'] } },
    { id: 'haec-sancta', m: 4, d: 6, icon: '⛪',
      t: ['The Council declares itself above the pope', 'Le concile se déclare au-dessus du pape'],
      s: ['With the decree Haec Sancta, the Council of Constance proclaims that its power comes straight from Christ, and that even a pope must obey it.', 'Par le décret Haec Sancta, le concile de Constance proclame que son pouvoir vient directement du Christ, et que même un pape doit lui obéir.'],
      her: { far: ['Bishops above the pope… my confessor has not stopped muttering since.', 'Des évêques au-dessus du pape… mon confesseur ne cesse de marmonner depuis.'], fr: ['The Paris doctors are proud: it was their idea, they say.', 'Les docteurs de Paris sont fiers : c’était leur idée, disent-ils.'] } },
    { id: 'brandenburg', m: 4, d: 30, icon: '🦅',
      t: ['Frederick of Hohenzollern made Elector of Brandenburg', 'Frédéric de Hohenzollern fait électeur de Brandebourg'],
      s: ['King Sigismund grants the March of Brandenburg and its electoral vote to Frederick of Nuremberg, who has tamed its robber knights with cannon.', 'Le roi Sigismond accorde la marche de Brandebourg et sa voix d’électeur à Frédéric de Nuremberg, qui a dompté ses chevaliers brigands au canon.'],
      her: { far: ['A Franconian ruling Brandenburg. The old families are furious, and I am delighted.', 'Un Franconien à la tête du Brandebourg. Les vieilles familles enragent, et moi je me réjouis.'] } },
    { id: 'pope-deposed', m: 5, d: 29, icon: '📜',
      t: ['John XXIII deposed', 'Jean XXIII déposé'],
      s: ['Caught and brought back, Pope John is tried by the Council on fifty-four charges and deposed. He accepts the sentence in silence.', 'Rattrapé et ramené, le pape Jean est jugé par le concile sur cinquante-quatre chefs d’accusation et déposé. Il accepte la sentence en silence.'],
      her: { far: ['One pope fewer. Only two left to argue over. 😏', 'Un pape de moins. Plus que deux à se disputer. 😏'] } },
    { id: 'gregory', m: 7, d: 4, icon: '🕊️',
      t: ['Pope Gregory XII resigns', 'Le pape Grégoire XII abdique'],
      s: ['The old Roman pope gives up the tiara of his own will, so the Church may be one again. Only Benedict, in Spain, still refuses.', 'Le vieux pape de Rome renonce de lui-même à la tiare, pour que l’Église soit à nouveau une. Seul Benoît, en Espagne, refuse encore.'],
      her: { far: ['An old man giving up his crown for the peace of all. If only kings did the same.', 'Un vieil homme qui renonce à sa couronne pour la paix de tous. Si seulement les rois en faisaient autant.'] } },
    { id: 'hus', m: 7, d: 6, icon: '🔥',
      t: ['Jan Hus burned at Constance', 'Jan Hus brûlé à Constance'],
      s: ['Despite the safe-conduct of King Sigismund, Master Jan Hus of Prague is condemned as a heretic and burned outside the walls. He sang until the smoke took him.', 'Malgré le sauf-conduit du roi Sigismond, maître Jan Hus de Prague est condamné comme hérétique et brûlé hors des murs. Il a chanté jusqu’à ce que la fumée l’emporte.'],
      her: { boh: ['They burned him, {sen}. A safe-conduct with the king’s seal, and they burned him. Bohemia will not forgive this.', 'Ils l’ont brûlé, {sen}. Un sauf-conduit scellé par le roi, et ils l’ont brûlé. La Bohême ne pardonnera pas.'], far: ['They say he sang in the flames. I could not sleep after hearing it.', 'On dit qu’il chantait dans les flammes. Je n’ai pas pu dormir après l’avoir appris.'] } },
    { id: 'southampton', m: 7, d: 31, icon: '🗡️',
      t: ['A plot against King Henry uncovered at Southampton', 'Un complot contre le roi Henri découvert à Southampton'],
      s: ['The Earl of Cambridge, Lord Scrope and Sir Thomas Grey meant to put the Earl of March on the throne. March himself told the king. All three lose their heads.', 'Le comte de Cambridge, lord Scrope et sir Thomas Grey voulaient mettre le comte de March sur le trône. March lui-même a tout dit au roi. Les trois perdent la tête.'],
      her: { en: ['Lord Scrope slept in the king’s own chamber. Trust no one, {sen}. Except me.', 'Lord Scrope dormait dans la chambre même du roi. Ne vous fiez à personne, {sen}. Sauf à moi.'], fr: ['Even the English cannot trust the English. Good.', 'Même les Anglais ne peuvent se fier aux Anglais. Tant mieux.'], far: ['A plot, a confession, three heads. The English do things quickly.', 'Un complot, un aveu, trois têtes. Les Anglais vont vite en besogne.'] } },
    { id: 'sails', m: 8, d: 11, icon: '⛵',
      t: ['King Henry sails for France', 'Le roi Henri fait voile vers la France'],
      s: ['Some fifteen hundred ships leave Southampton water carrying the King of England, his archers, his guns and his horses. Where will they land? No one in France knows.', 'Quelque quinze cents navires quittent Southampton avec le roi d’Angleterre, ses archers, ses canons et ses chevaux. Où débarqueront-ils ? Personne en France ne le sait.'],
      her: { en: ['My brothers sailed with the king. Pray for them with me, {sen}.', 'Mes frères ont embarqué avec le roi. Priez pour eux avec moi, {sen}.'], fr: ['The English are at sea. Every coast town is ringing its bells. I am afraid, {sen}.', 'Les Anglais sont en mer. Chaque ville de la côte sonne ses cloches. J’ai peur, {sen}.'], bur: ['My lord of Burgundy watches and says nothing. That frightens me more than the ships.', 'Monseigneur de Bourgogne observe et ne dit rien. Cela m’effraie plus que les navires.'], far: ['They say the sea was white with sails. Is it true?', 'On dit que la mer était blanche de voiles. Est-ce vrai ?'] } },
    { id: 'harfleur', m: 8, d: 18, icon: '🏰',
      t: ['The English besiege Harfleur', 'Les Anglais assiègent Harfleur'],
      s: ['Landed at the mouth of the Seine, the English ring Harfleur and turn their great guns on its walls. Inside, Raoul de Gaucourt has only a few hundred men.', 'Débarqués à l’embouchure de la Seine, les Anglais encerclent Harfleur et tournent leurs grosses bombardes vers ses murs. À l’intérieur, Raoul de Gaucourt n’a que quelques centaines d’hommes.'],
      her: { fr: ['Harfleur is besieged. My cousin is inside those walls, {sen}.', 'Harfleur est assiégée. Mon cousin est derrière ces murs, {sen}.'], en: ['The guns at Harfleur are heard all day, the letters say. Henry will not leave without it.', 'On entend les canons d’Harfleur toute la journée, disent les lettres. Henri ne partira pas sans elle.'], far: ['Harfleur… is that far from you? Tell me you are safe.', 'Harfleur… est-ce loin de vous ? Dites-moi que vous êtes en sûreté.'] } },
    { id: 'ceuta', m: 8, d: 21, icon: '⚓',
      t: ['The Portuguese take Ceuta', 'Les Portugais prennent Ceuta'],
      s: ['King John of Portugal and his sons cross the strait and take Ceuta from the Moors in a single day. Prince Henry is knighted in the great mosque.', 'Le roi Jean de Portugal et ses fils traversent le détroit et prennent Ceuta aux Maures en un seul jour. Le prince Henri est fait chevalier dans la grande mosquée.'],
      her: { far: ['A city across the sea, taken in a day. The merchants already talk of gold from Africa.', 'Une ville outre-mer, prise en un jour. Les marchands parlent déjà de l’or d’Afrique.'], en: ['Queen Philippa’s sons took Ceuta! English blood in Portugal, {sen}. 😏', 'Les fils de la reine Philippa ont pris Ceuta ! Du sang anglais au Portugal, {sen}. 😏'] } },
    { id: 'harfleur-falls', m: 9, d: 22, icon: '🏳️',
      t: ['Harfleur surrenders', 'Harfleur capitule'],
      s: ['After five weeks of bombardment and no relief from the Dauphin, Harfleur opens its gates. But the dysentery has killed more English than the walls did.', 'Après cinq semaines de bombardements et aucun secours du dauphin, Harfleur ouvre ses portes. Mais la dysenterie a tué plus d’Anglais que les murailles.'],
      her: { fr: ['Harfleur has fallen and the Dauphin did nothing. Nothing! I could spit.', 'Harfleur est tombée et le dauphin n’a rien fait. Rien ! J’en cracherais.'], en: ['Harfleur is ours. But the flux takes our men faster than any French sword.', 'Harfleur est à nous. Mais la dysenterie emporte nos hommes plus vite qu’aucune épée française.'], far: ['A town taken, and half the army sick. Is that a victory, {sen}?', 'Une ville prise, et la moitié de l’armée malade. Est-ce une victoire, {sen} ?'] } },
    { id: 'march', m: 10, d: 8, icon: '🥾',
      t: ['Henry marches for Calais', 'Henri marche sur Calais'],
      s: ['Against the advice of his council, the king leaves Harfleur with a tired, hungry army to march overland to Calais. The French gather on the Somme to stop him.', 'Contre l’avis de son conseil, le roi quitte Harfleur avec une armée épuisée et affamée pour gagner Calais par la terre. Les Français se rassemblent sur la Somme pour l’arrêter.'],
      her: { fr: ['Now we have them. Every lord of France is riding north, {sen}.', 'Cette fois nous les tenons. Tous les seigneurs de France chevauchent vers le nord, {sen}.'], en: ['Eight days of food for the march, they say. I cannot eat thinking of it.', 'Huit jours de vivres pour la marche, dit-on. Je ne peux rien avaler en y pensant.'], bur: ['The duke has forbidden his son to ride with the Armagnacs. Wise, or shameful? I cannot decide.', 'Le duc a défendu à son fils de chevaucher avec les Armagnacs. Sage, ou honteux ? Je n’arrive pas à décider.'] } },
    { id: 'agincourt', m: 10, d: 25, icon: '🏹',
      t: ['The battle of Agincourt', 'La bataille d’Azincourt'],
      s: ['On Saint Crispin’s day, in a ploughed field soaked by rain, the English archers break the charge of the French chivalry. The Constable, three dukes and the flower of France lie dead; Charles of Orléans is taken.', 'Le jour de la Saint-Crépin, dans un champ labouré détrempé par la pluie, les archers anglais brisent la charge de la chevalerie française. Le connétable, trois ducs et la fleur de France gisent morts ; Charles d’Orléans est pris.'],
      her: { fr: ['*the ink is blotted with tears* Agincourt, {sen}. So many of our houses are in mourning. Write to me, I beg you.', '*l’encre est tachée de larmes* Azincourt, {sen}. Tant de nos maisons sont en deuil. Écrivez-moi, je vous en supplie.'], en: ['A miracle on Saint Crispin’s day! The bells of every church are ringing, {sen}.', 'Un miracle le jour de la Saint-Crépin ! Les cloches de toutes les églises sonnent, {sen}.'], bur: ['Burgundy stayed home, and still the duke lost two brothers in the mud. God has a cruel humour.', 'La Bourgogne est restée chez elle, et le duc a quand même perdu deux frères dans la boue. Dieu a un humour cruel.'], far: ['They say a few thousand archers beat the whole of France. Can it be true?', 'On dit que quelques milliers d’archers ont battu toute la France. Est-ce possible ?'] } },
    { id: 'london', m: 11, d: 23, icon: '👑',
      t: ['London welcomes the victor of Agincourt', 'Londres accueille le vainqueur d’Azincourt'],
      s: ['Giants on London Bridge, fountains running with wine, choirs of maidens on every tower: the city greets King Henry. He rides through it in plain purple, and gives the glory to God.', 'Des géants sur le pont de Londres, des fontaines de vin, des chœurs de jeunes filles sur chaque tour : la ville accueille le roi Henri. Il la traverse en simple pourpre, et rend la gloire à Dieu.'],
      her: { en: ['I saw him pass, {sen}! Not a jewel on him. The whole of Cheapside wept.', 'Je l’ai vu passer, {sen} ! Pas un joyau sur lui. Tout Cheapside pleurait.'], fr: ['They parade our dukes through London like bears at a fair. I will not speak of it.', 'Ils promènent nos ducs dans Londres comme des ours à la foire. Je n’en parlerai pas.'], far: ['Fountains of wine in London! I would go just for that. 😏', 'Des fontaines de vin à Londres ! J’irais rien que pour ça. 😏'] } },
    { id: 'dauphin', m: 12, d: 18, icon: '🕯️',
      t: ['Louis, Dauphin of France, is dead', 'Louis, dauphin de France, est mort'],
      s: ['The eldest son of the mad King Charles dies of a fever at eighteen. His brother John, raised in Hainault far from the court, becomes the heir.', 'Le fils aîné du roi fou Charles meurt d’une fièvre à dix-huit ans. Son frère Jean, élevé en Hainaut loin de la cour, devient l’héritier.'],
      her: { fr: ['The Dauphin is dead, and the king does not even know it. What a year, {sen}. What a year.', 'Le dauphin est mort, et le roi ne le sait même pas. Quelle année, {sen}. Quelle année.'], bur: ['The new Dauphin was raised in Hainault, among our friends. My lord of Burgundy smiles again.', 'Le nouveau dauphin a été élevé en Hainaut, parmi nos amis. Monseigneur de Bourgogne sourit de nouveau.'], far: ['A prince of eighteen, dead of a fever. Crowns do not keep anyone alive.', 'Un prince de dix-huit ans, mort d’une fièvre. Les couronnes ne gardent personne en vie.'] } }
  ];

  V.CHRONICLE_PLACES = {
    constance: { at: [9.17, 47.66], name: ['Constance', 'Constance'] },
    brandenburg: { at: [12.55, 52.41], name: ['Brandenburg', 'Brandebourg'] },
    southampton: { at: [-1.40, 50.90], name: ['Southampton', 'Southampton'] },
    harfleur: { at: [0.20, 49.51], name: ['Harfleur', 'Harfleur'] },
    somme: { at: [1.90, 49.95], name: ['The Somme', 'La Somme'] },
    agincourt: { at: [2.14, 50.46], name: ['Agincourt', 'Azincourt'] },
    london: { at: [-0.10, 51.51], name: ['London', 'Londres'] },
    paris: { at: [2.35, 48.86], name: ['Paris', 'Paris'] }
  };
  const AT = { 'pope-flees': 'constance', 'haec-sancta': 'constance', brandenburg: 'brandenburg', 'pope-deposed': 'constance', gregory: 'constance',
    hus: 'constance', southampton: 'southampton', sails: 'southampton', harfleur: 'harfleur', 'harfleur-falls': 'harfleur', march: 'somme',
    agincourt: 'agincourt', london: 'london', dauphin: 'paris' };
  V.CHRONICLE.forEach(e => { if (AT[e.id]) e.at = AT[e.id]; });
  V.CHRONICLE_ROUTE = [['sails', [-1.40, 50.90]], ['harfleur', [0.20, 49.51]], ['march', [1.90, 49.95]], ['agincourt', [2.14, 50.46]],
    ['london', [1.86, 50.95]], ['london', [-0.10, 51.51]]];

  // before the first event of the year
  const QUIET = ['The year is quiet yet: the Council argues at Constance and the English king counts his ships.', 'L’année est encore calme : le concile se dispute à Constance et le roi anglais compte ses navires.'];
  const SIDE = { en: 'en', irl: 'en', fr: 'fr', sco: 'fr', bri: 'fr', nav: 'fr', bur: 'bur', boh: 'boh' };
  const key = e => e.m * 100 + e.d;
  const todayKey = now => { const d = now ? new Date(now) : new Date(); return (d.getMonth() + 1) * 100 + d.getDate(); };
  const fillS = (s, you) => s.replace(/\{sen\}/g, you || '');

  V.Chronicle = {
    past: now => V.CHRONICLE.filter(e => key(e) <= todayKey(now)).sort((a, b) => key(b) - key(a)),
    sealed: now => V.CHRONICLE.filter(e => key(e) > todayKey(now)),
    latest: now => V.Chronicle.past(now)[0] || null,
    isToday: (e, now) => key(e) === todayKey(now),
    side(char) {
      const id = char && V.Gen && V.Gen.regionOf(char), r = id && (V.REGIONS || []).find(x => x.id === id);
      return (r && SIDE[r.realm]) || 'far';
    },
    // what she says of the latest event, from her side
    line(char, L, now, you) {
      const e = V.Chronicle.latest(now), i = L === 'fr' ? 1 : 0;
      if (!e) return QUIET[i];
      const h = e.her[V.Chronicle.side(char)] || e.her.far || Object.values(e.her)[0];
      return `${e.icon} ${e.t[i]}… ${fillS(h[i], you)}`;
    },
    // only within 7 days of the event
    fresh(char, L, now, you) {
      const e = V.Chronicle.latest(now);
      if (!e) return '';
      const d = now ? new Date(now) : new Date(), ev = new Date(d.getFullYear(), e.m - 1, e.d);
      return (d - ev) / 864e5 <= 7 ? V.Chronicle.line(char, L, now, you) : '';
    }
  };

  // ---------- 📯 question: "what news?" ----------
  V.EVENTS.events.push({
    id: 'q_news', kind: 'talk', cat: 'question', icon: '⚔️', name: { en: 'What news?', fr: 'Quelles nouvelles ?' },
    when: { en: ['what news', 'any news', 'news of the war', 'what is happening', 'heard the news', 'what do people say'], fr: ['quelles nouvelles', 'des nouvelles', 'nouvelles de la guerre', 'que se passe-t-il', 'que dit-on'] },
    reply: { en: ['{chron}'], fr: ['{chron}'] }
  });
})();
