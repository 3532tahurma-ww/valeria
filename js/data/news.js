/*
 * Valeria - 📯 The Herald (like Carmen's HOME_NEWS / Haberler, in medieval dress). Screens: js/news.js
 * PROCLAMATIONS: news of the app, newest first, told by Gautier the herald.
 *   { id, icon, cat: 'decree' | 'court' | 'realms', date, title, sum, go: [screen, params] | null,
 *     sections: [[heading, text]] (each [EN, FR]), story: { en: [paragraphs], fr: [paragraphs] } }
 *   A new feature = a new proclamation at the top (with its story), and the Guide chapter updated.
 * TIDINGS: daily news of the realms, generated (seeded by the date) from these templates:
 *   { icon, t: [EN, FR] headline, s: [EN, FR] story, home?: [region ids / 'realm:<id>'] only told of those lands,
 *     after?: [month, day] only told from that day of the year (⚔️ js/data/chronicle.js) }
 *   with {lady} {name} {title} {city} {region} {saint} {feast} {food}
 */
window.Valeria = window.Valeria || {};

Valeria.PROCLAMATIONS = [
  {
    id: 'italy', icon: '🦁', cat: 'realms', date: '2026-11-27', go: ['map', {}],
    title: ['Northern Italy and the Alps on the map', 'L’Italie du Nord et les Alpes sur la carte'],
    sum: ['Eight new lands in and beyond the Alps: the Swiss, Trent, Friuli, Milan, Venice, Ferrara and Mantua, Genoa and Florence, with their ladies, their saints and their gossip.', 'Huit nouvelles terres dans les Alpes et au-delà : les Suisses, Trente, le Frioul, Milan, Venise, Ferrare et Mantoue, Gênes et Florence, avec leurs dames, leurs saints et leurs rumeurs.'],
    sections: [
      [['🗺️ Five lands', '🗺️ Cinq terres'], ['Milan of the Visconti, Venice of the Doge, Ferrara and Mantua of the Este and the Gonzaga, Genoa of the bankers and Florence of the florin. The map now holds 45 regions, and the Ligurian Sea.', 'Milan des Visconti, Venise du doge, Ferrare et Mantoue des Este et des Gonzague, Gênes des banquiers et Florence du florin. La carte compte désormais 45 régions, et la mer Ligure.']],
      [['🏔️ The Alps filled in', '🏔️ Les Alpes comblées'], ['No more empty land south of Bavaria and Austria: the Swiss Confederation of Bern and Zürich, the Prince-Bishopric of Trent on the Adige, and Friuli and Istria of the Patriarch of Aquileia. Grüezi, and Mandi!', 'Plus de terre vide au sud de la Bavière et de l’Autriche : la Confédération suisse de Berne et Zurich, la principauté épiscopale de Trente sur l’Adige, et le Frioul et l’Istrie du patriarche d’Aquilée. Grüezi, et Mandi !']],
      [['🌹 Their own voice', '🌹 Leur propre voix'], ['Italian names and houses, their food and wine, “Dio vi salvi” and “State con Dio”, their sayings, and news of masks, armour, galleys, domes and palios.', 'Des noms et maisons italiens, leur table et leur vin, « Dio vi salvi » et « State con Dio », leurs dictons, et des nouvelles de masques, d’armures, de galères, de coupoles et de palios.']],
      [['📅 New saints', '📅 Nouveaux saints'], ['Saint Mark (25 April) for Venice, Saint Ambrose (7 December) for Milan, Saint Vigilius (26 June) for Trent, Saints Hermagoras and Fortunatus (12 July) for Friuli, Saints Felix and Regula (11 September) for the Swiss. Saint George is now also the saint of Genoa and Ferrara, and Saint John that of Florence.', 'Saint Marc (25 avril) pour Venise, saint Ambroise (7 décembre) pour Milan, saint Vigile (26 juin) pour Trente, saints Hermagore et Fortunat (12 juillet) pour le Frioul, saints Félix et Régula (11 septembre) pour les Suisses. Saint Georges est aussi celui de Gênes et de Ferrare, et saint Jean celui de Florence.']]
    ],
    story: {
      en: ['A Florentine merchant came to court this morning, my lord, with a mule of silk and a letter of credit nobody could read. He unrolled a map of his own country on the hall table and refused to roll it up again. So the chronicler glued it to ours.'],
      fr: ['Un marchand florentin est venu à la cour ce matin, messire, avec une mule chargée de soie et une lettre de change que personne ne savait lire. Il a déroulé une carte de son pays sur la table de la salle et a refusé de la rouler. Alors le chroniqueur l’a collée à la nôtre.']
    }
  },
  {
    id: 'chron-map', icon: '🗺️', cat: 'decree', date: '2026-11-27', go: ['map', {}],
    title: ['The chronicle comes to the map', 'La chronique arrive sur la carte'],
    sum: ['Every event of 1415 is now pinned where it happened, and King Henry’s road is drawn as far as he has gone.', 'Chaque événement de 1415 est désormais épinglé là où il s’est produit, et la route du roi Henri est tracée aussi loin qu’il est allé.'],
    sections: [
      [['📍 Pins of the year', '📍 Les épingles de l’année'], ['Constance, Harfleur, Agincourt, London… each place shows its event once its day has come; a pulsing pin is fresh news. Tap it to read what happened there.', 'Constance, Harfleur, Azincourt, Londres… chaque lieu montre son événement une fois son jour venu ; une épingle qui palpite est une nouvelle fraîche. Touchez-la pour lire ce qui s’y est passé.']],
      [['🥾 The king’s road', '🥾 La route du roi'], ['A dashed red line follows the English army from Southampton to Harfleur, the Somme, Agincourt, Calais and home to London.', 'Une ligne rouge pointillée suit l’armée anglaise de Southampton à Harfleur, la Somme, Azincourt, Calais, puis Londres.']],
      [['✉️ What does she say?', '✉️ Qu’en dit-elle ?'], ['Under each event, three ladies of your court give their opinion, each from her own side. Tap one to write to her with “What news?” ready to send.', 'Sous chaque événement, trois dames de votre cour donnent leur avis, chacune de son camp. Touchez-en une pour lui écrire, « Quelles nouvelles ? » prêt à envoyer.']]
    ],
    story: {
      en: ['The chronicler would not stay in his tower, my lord. He took the great map down from the hall and is sticking pins in it, one for each piece of news, and drawing the English king’s march in red ink. The steward says it is ruining a very costly map. The chronicler says that is what maps are for.'],
      fr: ['Le chroniqueur n’a pas voulu rester dans sa tour, messire. Il a décroché la grande carte de la salle et y plante des épingles, une par nouvelle, en traçant à l’encre rouge la marche du roi anglais. L’intendant dit qu’il abîme une carte fort coûteuse. Le chroniqueur répond que les cartes sont faites pour cela.']
    }
  },
  {
    id: 'chronicle', icon: '⚔️', cat: 'decree', date: '2026-11-27', go: ['news', { tab: 'chr' }],
    title: ['The Chronicle of 1415, the archive and the chests', 'La Chronique de 1415, les archives et les coffres'],
    sum: ['The true events of the year arrive on their own day, and she has her opinion of them. Every letter can now be searched, and kept in a sealed chest.', 'Les vrais événements de l’année arrivent à leur jour, et elle en a son avis. Chaque lettre peut désormais être cherchée, et gardée dans un coffre scellé.'],
    sections: [
      [['⚔️ The Chronicle of 1415', '⚔️ La Chronique de 1415'], ['Fifteen true events, from the flight of Pope John to the death of the Dauphin, each on its own day and month. A new “⚔️ 1415” tab of the Herald lists what has come to pass; what is still to come stays sealed. Ask her “What news?”: a Frenchwoman, an Englishwoman, a Burgundian or a lady of Bohemia will not tell it the same way.', 'Quinze événements véritables, de la fuite du pape Jean à la mort du dauphin, chacun à son jour et son mois. Un nouvel onglet « ⚔️ 1415 » du Héraut montre ce qui est arrivé ; le reste demeure scellé. Demandez-lui « Quelles nouvelles ? » : une Française, une Anglaise, une Bourguignonne ou une dame de Bohême ne le racontent pas de la même façon.']],
      [['🔍 The archive', '🔍 Les archives'], ['✉️ Letters → 🔍 Archive searches every letter you ever exchanged, received or sent. Tap a letter and choose 🗝️ to lock it in the sealed chest.', '✉️ Lettres → 🔍 Archives cherche dans toutes vos lettres, reçues ou envoyées. Touchez une lettre et choisissez 🗝️ pour l’enfermer dans le coffre scellé.']],
      [['💾 One chest per correspondence', '💾 Un coffre par correspondance'], ['Each correspondence is stored in its own place on your device, as in Carmen. Big Carmen backups fit more easily; 👑 Me shows the room used. Backups are unchanged.', 'Chaque correspondance est rangée à part sur votre appareil, comme dans Carmen. Les grosses sauvegardes Carmen y entrent plus facilement ; 👑 Moi indique la place utilisée. Les sauvegardes ne changent pas.']],
      [['🔥 Frank answers', '🔥 Des réponses franches'], ['Ask about her figure, her bosom, her hips or whether she is tight: she no longer laughs it off, she answers, and not modestly. A new question too: “Have you ever tried the other way?”', 'Interrogez-la sur sa silhouette, sa poitrine, ses hanches ou son étroitesse : elle ne se dérobe plus, elle répond, et sans pudeur. Et une nouvelle question : « Avez-vous déjà essayé l’autre chemin ? »']]
    ],
    story: {
      en: ['The chronicler of the court has moved into the tower, my lord, with his ink and his candles. He writes down each event the day it happens, and not a day before: he says a chronicler who writes the future is called a prophet, and prophets are burned. He also had the clerks build a chest for every correspondence. They grumbled, and then they built them.'],
      fr: ['Le chroniqueur de la cour s’est installé dans la tour, messire, avec son encre et ses chandelles. Il note chaque événement le jour où il arrive, et pas un jour avant : il dit qu’un chroniqueur qui écrit l’avenir s’appelle un prophète, et qu’on brûle les prophètes. Il a aussi fait construire par les clercs un coffre pour chaque correspondance. Ils ont grogné, puis ils les ont construits.']
    }
  },
  {
    id: 'lute', icon: '🪕', cat: 'court', date: '2026-11-26', go: ['me', {}],
    title: ['A lutenist joins the court', 'Un joueur de luth rejoint la cour'],
    sum: ['Six new pieces played live on the lute string you hear on every button, with bass, drone and tabor. Choose 🪕 Lute in Settings.', 'Six nouvelles pièces jouées en direct sur la corde de luth de chaque bouton, avec basse, bourdon et tambourin. Choisissez 🪕 Luth dans les Réglages.'],
    sections: [
      [['🎶 Six pieces', '🎶 Six pièces'], ['The Estampie of the Rose, the Pastourelle of the Meadow, the Lament for a Far Shore, the Tabor Dance, the Nocturne by Candlelight and Pilgrims on the Road, in the old modes. Each repeat is ornamented anew, so no two hearings are alike.', 'L’Estampie de la Rose, la Pastourelle du Pré, la Complainte du Rivage lointain, la Danse du Tambourin, le Nocturne à la Chandelle et Pèlerins sur la Route, dans les modes anciens. Chaque reprise est ornée à nouveau : jamais deux écoutes pareilles.']],
      [['🕯️ No road needed', '🕯️ Nul besoin de route'], ['The lute plays without the internet. Pick it in 👑 Me → Settings → Music; the minstrels’ recorded songs remain.', 'Le luth joue sans internet. Choisissez-le dans 👑 Moi → Réglages → Musique ; les chansons des ménestrels restent.']]
    ],
    story: {
      en: ['He came in from the rain with nothing but a lute and a borrowed cloak, my lord. He says he knows six tunes. The cooks say he knows only six tunes. Both are true, and yet he never plays them the same way twice.'],
      fr: ['Il est entré sous la pluie avec un luth et un manteau emprunté, messire. Il dit connaître six airs. Les cuisiniers disent qu’il n’en connaît que six. Les deux sont vrais, et pourtant il ne les joue jamais deux fois de la même façon.']
    }
  },
  {
    id: 'anno1415', icon: '📜', cat: 'decree', date: '2026-11-26', go: ['home', {}],
    title: ['It is the year of Our Lord 1415', 'Nous sommes en l’an de grâce 1415'],
    sum: ['The court now keeps its own year: days and feasts follow your calendar, but every date reads 1415.', 'La cour tient désormais sa propre année : les jours et les fêtes suivent votre calendrier, mais chaque date indique 1415.'],
    sections: [
      [['📅 A fixed year', '📅 Une année fixe'], ['The home page, her memories and the Herald’s decrees all read Anno Domini 1415. The day, the month and the weekday are your own.', 'L’accueil, ses souvenirs et les décrets du Héraut indiquent tous l’an de grâce 1415. Le jour, le mois et le jour de la semaine sont les vôtres.']],
      [['⚖️ True to its year', '⚖️ Fidèle à son année'], ['Ladies and tidings belong to 1415: the Duchess of Austria (not yet an archduchess), the Margravine of Meissen, the House of Garai in Hungary, Saint Coloman for Austria, Syrmian wine instead of Tokaji. And everyone still speaks of Agincourt.', 'Dames et nouvelles appartiennent à 1415 : la Duchesse d’Autriche (pas encore archiduchesse), la Margravine de Misnie, la maison Garai en Hongrie, saint Coloman pour l’Autriche, le vin de Syrmie au lieu du tokaj. Et tout le monde parle encore d’Azincourt.']]
    ],
    story: {
      en: ['The clerks of the chancery were tired of guessing, my lord. From this day every charter, every letter and every decree is dated in the year of Our Lord fourteen hundred and fifteen, and so it shall remain.'],
      fr: ['Les clercs de la chancellerie étaient las de deviner, messire. Désormais chaque charte, chaque lettre et chaque décret est daté de l’an de grâce mil quatre cent quinze, et il en sera toujours ainsi.']
    }
  },
  {
    id: 'north', icon: '⚓', cat: 'realms', date: '2026-11-26', go: ['map', {}],
    title: ['The map reaches the North Sea and the Baltic', 'La carte gagne la mer du Nord et la Baltique'],
    sum: ['Five new lands fill the north: Holland, Brunswick & Westphalia, Holstein & Mecklenburg, Brandenburg & Pomerania, and Denmark with its islands.', 'Cinq nouvelles terres remplissent le nord : la Hollande, Brunswick et Westphalie, Holstein et Mecklembourg, Brandebourg et Poméranie, et le Danemark avec ses îles.'],
    sections: [
      [['🗺️ Five new regions', '🗺️ Cinq nouvelles régions'], ['The Countess of Holland, the Duchess of Brunswick-Lüneburg, the Duchess of Mecklenburg, the Margravine of Brandenburg and the Queen of Denmark, whose land runs from Jutland to Scania and Bornholm.', 'La Comtesse de Hollande, la Duchesse de Brunswick-Lunebourg, la Duchesse de Mecklembourg, la Margravine de Brandebourg et la Reine de Danemark, dont la terre va du Jutland à la Scanie et à Bornholm.']],
      [['🏰 New houses and voices', '🏰 Nouvelles maisons et voix'], ['Welf, Mecklenburg, Hohenzollern and the Griffins of Pomerania; Danish names; “Moin”, “God dag” and “Goeden dag”; Saint Knud on 10 July; tidings of the Hanse, the herring of Scania and the margrave’s great cannon.', 'Guelfes, Mecklembourg, Hohenzollern et les Griffons de Poméranie ; des noms danois ; « Moin », « God dag » et « Goeden dag » ; saint Knud le 10 juillet ; des nouvelles de la Hanse, du hareng de Scanie et du grand canon du margrave.']]
    ],
    story: {
      en: ['A Lübeck cog brought the mapmakers a chest of charts and a barrel of herring, my lord. The charts went on the map. The herring went to the kitchens, and I am told the kitchens are not grateful.'],
      fr: ['Une cogue de Lübeck a apporté aux cartographes un coffre de cartes et un tonneau de harengs, messire. Les cartes sont allées sur la carte. Les harengs aux cuisines, et l’on me dit que les cuisines ne sont pas reconnaissantes.']
    }
  },
  {
    id: 'easternfeasts', icon: '🦁', cat: 'realms', date: '2026-11-26', go: ['book', { id: 'calendar' }],
    title: ['New saints, new tidings from the east', 'Nouveaux saints, nouvelles de l’Est'],
    sum: ['Eight saints’ days of the Empire and the eastern crowns, four new designs, and tidings that belong to those lands alone.', 'Huit fêtes de l’Empire et des couronnes de l’Est, quatre nouveaux décors, et des nouvelles propres à ces terres.'],
    sections: [
      [['📅 Eight saints', '📅 Huit saints'], ['Stanislaus (8 May), Stephen of Hungary (20 August), Maurice (22 September), Wenceslas (28 September), Hedwig (15 October), Willibrord (7 November), Coloman (13 October) and Elizabeth of Hungary (19 November). A lady of that land is prouder on her saint’s day; Cologne now keeps the Three Kings as its own.', 'Stanislas (8 mai), Étienne de Hongrie (20 août), Maurice (22 septembre), Venceslas (28 septembre), Hedwige (15 octobre), Willibrord (7 novembre), Coloman (13 octobre) et Élisabeth de Hongrie (19 novembre). Une dame de cette terre en est plus fière le jour de son saint ; Cologne fait désormais sienne la fête des Rois.']],
      [['🎨 Four designs', '🎨 Quatre décors'], ['The lion of Bohemia in red and silver, the crown of Hungary in green and red, the white eagle of Poland, and the red-white-red of Austria.', 'Le lion de Bohême en rouge et argent, la couronne de Hongrie en vert et rouge, l’aigle blanc de Pologne, et le rouge-blanc-rouge d’Autriche.']],
      [['🗞️ Tidings of their own', '🗞️ Des nouvelles bien à elles'], ['Hussite preachers in Bohemia, silver in the mountains, the Council of Constance, the electors, the Danube thaw, Hungarian horse races, truces with the Teutonic Order, closed Alpine passes, Bavarian brewers and Baltic amber.', 'Prédicateurs hussites en Bohême, argent dans les montagnes, concile de Constance, électeurs, dégel du Danube, courses hongroises, trêves avec l’ordre Teutonique, cols des Alpes fermés, brasseurs bavarois et ambre de la Baltique.']]
    ],
    story: {
      en: ['The almanac-makers had to buy a bigger book, my lord. The eastern courts sent their saints with their letters, and every one of them demands a procession.', 'And I am to report what happens in Prague, Buda and Kraków as well. My horse has already complained.'],
      fr: ['Les faiseurs d’almanachs ont dû acheter un plus gros livre, messire. Les cours de l’Est ont envoyé leurs saints avec leurs lettres, et chacun d’eux exige une procession.', 'Et je dois aussi rapporter ce qui se passe à Prague, à Buda et à Cracovie. Mon cheval s’en est déjà plaint.']
    }
  },
  {
    id: 'centraleurope', icon: '🦅', cat: 'realms', date: '2026-11-26', go: ['map', {}],
    title: ['The map reaches the Empire and the eastern crowns', 'La carte s’ouvre sur l’Empire et les couronnes de l’Est'],
    sum: ['Ten new lands from Luxembourg to Kraków: the Empire, Savoy, Bohemia, Hungary, Poland and Prussia, each with its ladies, houses, tongue and table.', 'Dix nouvelles terres de Luxembourg à Cracovie : l’Empire, la Savoie, la Bohême, la Hongrie, la Pologne et la Prusse, chacune avec ses dames, ses maisons, sa langue et sa table.'],
    sections: [
      [['🗺️ Ten new regions', '🗺️ Dix nouvelles régions'], ['Brabant & Luxembourg, the Rhineland, Bavaria, Saxony, Austria, Savoy, Bohemia, Hungary, Poland and Prussia. Tap one to meet its ruler: the Duchess of Austria, the Queen of Bohemia, the Queen of Poland…', 'Brabant et Luxembourg, la Rhénanie, la Bavière, la Saxe, l’Autriche, la Savoie, la Bohême, la Hongrie, la Pologne et la Prusse. Touchez-en une pour rencontrer sa souveraine : la Duchesse d’Autriche, la Reine de Bohême, la Reine de Pologne…']],
      [['🏰 New houses', '🏰 Nouvelles maisons'], ['Habsburg, Luxembourg, Wittelsbach, Wettin, Savoy, Garai, Jagiellon and the Teutonic Order, with their colours. The House of Anjou now reaches Hungary and Poland.', 'Habsbourg, Luxembourg, Wittelsbach, Wettin, Savoie, Garai, Jagellon et l’ordre Teutonique, avec leurs couleurs. La maison d’Anjou s’étend désormais à la Hongrie et à la Pologne.']],
      [['🌍 Their own voice', '🌍 Leur propre voix'], ['German, Czech, Hungarian and Polish names; greetings like “Grüß Gott”, “Dobrý den” or “Jó napot”; Syrmian wine, mead and Pilsen beer; saints Wenceslas, Stephen and Stanislaus.', 'Noms allemands, tchèques, hongrois et polonais ; des saluts comme « Grüß Gott », « Dobrý den » ou « Jó napot » ; vin de Syrmie, hydromel et bière de Pilsen ; saints Venceslas, Étienne et Stanislas.']]
    ],
    story: {
      en: ['A rider came in from the east this morning, my lord, his horse white with the dust of the Danube. He brought letters sealed in red, black and gold: from Vienna, from Prague, from Buda and from Kraków.', 'The cartographers have glued a second sheet to the old map. Mind the Alps when you fold it.'],
      fr: ['Un cavalier est arrivé de l’est ce matin, messire, son cheval blanc de la poussière du Danube. Il portait des lettres scellées de rouge, de noir et d’or : de Vienne, de Prague, de Buda et de Cracovie.', 'Les cartographes ont collé une seconde feuille à la vieille carte. Prenez garde aux Alpes en la pliant.']
    }
  },
  {
    id: 'scenelab', icon: '🎬', cat: 'decree', date: '2026-11-26', go: ['lab', { id: 'scene' }],
    title: ['A rehearsal room for scenes', 'Une salle de répétition pour les scènes'],
    sum: ['Play any scene step by step without a real letter: progress, breaking, the finish, episodes and feelings.', 'Jouez n’importe quelle scène pas à pas sans vraie lettre : progression, rupture, fin, épisodes et sentiments.'],
    sections: [
      [['🎬 Step by step', '🎬 Pas à pas'], ['Pick a scene and a character, tap the opening, the steps and the finish; the strip ●●○, the notes and her lines appear as in a real letter. Steps she cannot do are greyed.', 'Choisissez une scène et un personnage, touchez l’ouverture, les étapes et la fin ; la bande ●●○, les notes et ses répliques apparaissent comme dans une vraie lettre. Les étapes qu’elle ne peut faire sont grisées.']],
      [['💥 Break it', '💥 La briser'], ['Try another act, “stop”, or an early finish to see what ends a scene, and talk to see what never does.', 'Essayez un autre acte, « arrêtez » ou une fin précoce pour voir ce qui termine une scène, et la conversation pour voir ce qui ne la brise jamais.']],
      [['🧠 A sandbox', '🧠 Un bac à sable'], ['Feelings, completed scenes and episodes are kept in a sandbox memory: watch episodes unlock, then reset. Her real memory is untouched.', 'Sentiments, scènes accomplies et épisodes sont gardés dans une mémoire de bac à sable : regardez les épisodes s’ouvrir, puis réinitialisez. Sa vraie mémoire n’est pas touchée.']]
    ],
    story: {
      en: ['The players of the court asked for a place to rehearse before the great night, my lord. Dame Mathilde lent them the old chapel: they may play the ball, the bath or the silk ribbon as often as they like, and no one will remember a thing in the morning.'],
      fr: ['Les comédiens de la cour ont demandé un lieu pour répéter avant la grande nuit, messire. Dame Mathilde leur a prêté la vieille chapelle : ils peuvent y jouer le bal, le bain ou le ruban de soie autant qu’ils le veulent, et personne ne s’en souviendra au matin.']
    }
  },
  {
    id: 'feasts', icon: '📅', cat: 'decree', date: '2026-11-26', go: ['book', { id: 'calendar' }],
    title: ['Every saint’s day, the court dresses up', 'À chaque fête, la cour se pare'],
    sum: ['35 saints’ days and feasts, each with its own colours, drifting snow, petals or candles, a banner and a burst of joy. Ladies speak of them, and you may add your own days.', '35 fêtes et jours de saints, chacun avec ses couleurs, sa neige, ses pétales ou ses chandelles, une bannière et un éclat de joie. Les dames en parlent, et vous pouvez ajouter vos propres jours.'],
    sections: [
      [['🎨 A design for each day', '🎨 Un décor pour chaque jour'], ['Christmas in green and gold under the snow, Valentine in roses, Midsummer in flames, Martinmas in wine, Saint George in red, Saint Andrew in blue, Saint Patrick in shamrocks… The colours, the drifting ornaments and the Home banner change on the day.', 'Noël en vert et or sous la neige, la Saint-Valentin en roses, la Saint-Jean en flammes, la Saint-Martin en vin, saint Georges en rouge, saint André en bleu, saint Patrick en trèfles… Les couleurs, les ornements qui dérivent et la bannière de l’Accueil changent ce jour-là.']],
      [['💬 She remembers the day', '💬 Elle se souvient du jour'], ['In her first answer of the day she speaks of the feast; a Scot on Saint Andrew’s, a Welsh lady on Saint David’s, is prouder still. Easter, Whitsun and Shrove Tuesday move with the moon, as they should.', 'Dans sa première réponse du jour, elle parle de la fête ; une Écossaise à la Saint-André, une Galloise à la Saint-David, en sont plus fières encore. Pâques, la Pentecôte et Mardi gras suivent la lune, comme il se doit.']],
      [['🎉 Feast day lab', '🎉 Labo des jours de fête'], ['Celebrate any feast right now, switch the designs off, and add your own special days: a birthday, the day you met.', 'Fêtez n’importe quelle fête dès maintenant, coupez les décors, et ajoutez vos propres jours de fête : un anniversaire, le jour de votre rencontre.']]
    ],
    story: {
      en: ['The almanac-makers of Paris and the monks of Canterbury have finally agreed on one thing, my lord: the calendar. Every saint has his day, every day its colours, and on the great feasts I am told to ride through the palace throwing snow, petals or candles, whichever the season demands.', 'And if your heart keeps a day of its own, the day of a first letter, a first glance, tell the laboratory. The court will dress up for it too.'],
      fr: ['Les faiseurs d’almanachs de Paris et les moines de Cantorbéry se sont enfin accordés sur une chose, messire : le calendrier. Chaque saint a son jour, chaque jour ses couleurs, et aux grandes fêtes on me charge de traverser le palais en jetant neige, pétales ou chandelles, selon la saison.', 'Et si votre cœur garde un jour à lui, celui d’une première lettre, d’un premier regard, dites-le au laboratoire. La cour se parera pour lui aussi.']
    }
  },
  {
    id: 'heart', icon: '❤️', cat: 'court', date: '2026-11-26', go: ['book', { id: 'heart' }],
    title: ['Read her heart: trust, love, desire and status cards', 'Lisez son cœur : confiance, amour, désir et cartes d’humeur'],
    sum: ['Every letter now moves her heart, and you can see exactly how: a line under her answer, three meters above your letter, and cards in her own words.', 'Chaque lettre touche désormais son cœur, et vous voyez exactement comment : une ligne sous sa réponse, trois jauges au-dessus de votre lettre, et des cartes avec ses propres mots.'],
    sections: [
      [['🤝❤️🔥 Three feelings', '🤝❤️🔥 Trois sentiments'], ['Trust, love and desire, from 0 to 100, above the letter and on her profile. Her temper and her homeland change how fast they grow.', 'Confiance, amour et désir, de 0 à 100, au-dessus de la lettre et sur son profil. Son caractère et sa terre changent leur vitesse.']],
      [['📰 Status cards', '📰 Cartes d’humeur'], ['When a feeling crosses a threshold she tells you: “I think I can trust you” or “Something is not as it was…”. ⋮ sets them to Off, Cards, or Cards + changes.', 'Quand un sentiment franchit un seuil, elle vous le dit : « Je crois que je peux vous faire confiance » ou « Quelque chose n’est plus comme avant… ». ⋮ les règle : Aucune, Cartes, ou Cartes + changements.']],
      [['😟 Too soon', '😟 Trop tôt'], ['Some acts need her trust first. Rush her and she hesitates; Dame Mathilde will warn you, and tell you how to win her back.', 'Certains actes demandent d’abord sa confiance. Brusquez-la et elle hésite ; Dame Mathilde vous préviendra, et vous dira comment la regagner.']]
    ],
    story: {
      en: ['The ladies complained, my lord, that their suitors could never tell what they felt. “I wrote it plainly!” said one. “Between the lines!” So the court has decreed that hearts shall now be read in plain sight.', 'You will see it under every answer, small as a seal: what your letter gave her, and what it cost. And when something truly changes, she will say it herself. Listen. Ladies rarely say such things twice.'],
      fr: ['Les dames se sont plaintes, messire, que leurs prétendants ne savaient jamais ce qu’elles ressentaient. « Je l’ai écrit clairement ! » disait l’une. « Entre les lignes ! » La cour a donc décrété que les cœurs se liraient désormais au grand jour.', 'Vous le verrez sous chaque réponse, petit comme un sceau : ce que votre lettre lui a donné, et ce qu’elle a coûté. Et quand quelque chose change vraiment, elle le dira elle-même. Écoutez. Les dames disent rarement ces choses deux fois.']
    }
  },
  {
    id: 'scenes', icon: '🎬', cat: 'court', date: '2026-11-26', go: ['book', { id: 'scenes' }],
    title: ['Scenes, episodes, and Dame Mathilde at your ear', 'Scènes, épisodes, et Dame Mathilde à votre oreille'],
    sum: ['A dance becomes a ball, a bath becomes the bathhouse; scenes chain into episodes over many days, and an old confidante whispers what to do next.', 'Une danse devient un bal, un bain devient les étuves ; les scènes s’enchaînent en épisodes sur plusieurs jours, et une vieille confidente souffle la suite.'],
    sections: [
      [['🎬 15 scenes', '🎬 15 scènes'], ['Courtly Wooing, The Ball, Garden Tryst, By the Fire, The Bathhouse, Roll in the Hay, After the Feast, The Silk Ribbon, Penance, Till Dawn… One event opens each, a red strip shows the steps ●●○, and the finish completes it.', 'Cour courtoise, Le Bal, Rendez-vous au jardin, Au coin du feu, Les Étuves, Dans le foin, Après le festin, Le Ruban de soie, Pénitence, Jusqu’à l’aube… Un événement ouvre chacune, une bande rouge montre les étapes ●●○, et la fin l’accomplit.']],
      [['📖 9 episodes', '📖 9 épisodes'], ['The First Ball, The First Night, Harvest Feast, Winter Nights, Gifts from the East, The King’s Banquet, Sin and Penance, Champion of the Tourney, The Wedding Night: scenes in order, over several letters, opened rank by rank as you complete scenes with her.', 'Le premier bal, La première nuit, Fête des moissons, Nuits d’hiver, Présents d’Orient, Le banquet du roi, Péché et pénitence, Champion du tournoi, La nuit de noces : des scènes dans l’ordre, sur plusieurs lettres, ouvertes rang après rang à mesure que vous accomplissez des scènes avec elle.']],
      [['🕯️ Dame Mathilde', '🕯️ Dame Mathilde'], ['Above the shortcut bar, the old confidante gives one piece of advice for the moment, with chips to tap. ✕ sends her away; ⋮ calls her back.', 'Au-dessus de la barre de raccourcis, la vieille confidente donne un conseil pour le moment, avec des puces à toucher. ✕ la renvoie ; ⋮ la rappelle.']],
      [['🧠 Remembered', '🧠 En mémoire'], ['Every scene completed and every episode, finished or in progress, is kept in her memory on her profile. Come back days later: she will remind you where you stopped.', 'Chaque scène accomplie et chaque épisode, fini ou en cours, est gardé dans sa mémoire sur son profil. Revenez des jours plus tard : elle vous rappellera où vous en étiez.']]
    ],
    story: {
      en: ['A word from the court, my lord: the ladies are tired of letters that kiss once and forget. Now a dance leads to a ball, the ball to the garden, and the garden… well, you will see. The chroniclers call them scenes, and when the scenes follow one another over many nights, episodes.', 'And since no gentleman ever knew what to do next, the court has lent you Dame Mathilde, who raised half the ladies of France and knows exactly what each of them wants. Listen to her. She has never been wrong, and she will tell you so.'],
      fr: ['Un mot de la cour, messire : les dames sont lasses des lettres qui embrassent une fois et oublient. Désormais, une danse mène au bal, le bal au jardin, et le jardin… vous verrez. Les chroniqueurs appellent cela des scènes, et quand les scènes se suivent sur plusieurs nuits, des épisodes.', 'Et comme aucun gentilhomme n’a jamais su quoi faire ensuite, la cour vous prête Dame Mathilde, qui a élevé la moitié des dames de France et sait exactement ce que chacune désire. Écoutez-la. Elle ne s’est jamais trompée, et elle vous le dira.']
    }
  },
  {
    id: 'homelands', icon: '🌍', cat: 'realms', date: '2026-11-26', go: ['book', { id: 'realms' }],
    title: ['Every land now speaks with its own voice', 'Chaque terre parle désormais de sa propre voix'],
    sum: ['Greetings in Gaelic and Basque, patron saints, feasts, songs, sayings, and lands that love or frown upon what you do.', 'Salutations en gaélique et en basque, saints patrons, fêtes, chants, dictons, et des terres qui aiment ou désapprouvent ce que vous faites.'],
    sections: [
      [['What changes', 'Ce qui change'], ['Ladies greet you in their own tongue and bid you farewell the same way. They call you by a word of home, swear by their saints, quote the sayings of their land and speak of its feasts and songs.', 'Les dames vous saluent dans leur langue et vous disent adieu de même. Elles vous appellent d’un mot de chez elles, jurent par leurs saints, citent les dictons de leur terre et parlent de ses fêtes et de ses chants.']],
      [['Loves and frowns', 'Ce qu’on aime, ce qu’on désapprouve'], ['A Provençale loves a bath and a dance; a Breton lady frowns upon the table. Do what her land loves and she says so; do what it frowns upon and you will hear about it.', 'Une Provençale aime le bain et la danse ; une Bretonne désapprouve la table. Faites ce que sa terre aime et elle le dira ; faites ce qu’elle désapprouve et vous l’entendrez.']],
      [['New questions', 'Nouvelles questions'], ['Ask about her patron saint, a feast at home, a song, a saying or her tongue. She may invite you to her land, ask if you have tasted its food, or teach you a word.', 'Demandez son saint patron, une fête de chez elle, un chant, un dicton ou sa langue. Elle peut vous inviter chez elle, vous demander si vous avez goûté sa cuisine ou vous apprendre un mot.']]
    ],
    story: {
      en: ['I rode from Edinburgh to Pamplona to gather it all, my lord, and my horse has not forgiven me. In every hall I wrote down how they say good morrow and farewell, which saint they swear by when the soup is cold, and what they sing when the wine runs out.', 'Now every lady of the realm carries her land with her. Do not be surprised if your Welsh correspondent calls you “cariad” or if the lady from Navarre ends her letter with “Agur”. And never, ever, suggest the hayloft to a Parisienne.'],
      fr: ['J’ai chevauché d’Édimbourg à Pampelune pour tout rassembler, messire, et mon cheval ne me l’a pas pardonné. Dans chaque salle, j’ai noté comment on dit bonjour et adieu, par quel saint on jure quand la soupe est froide, et ce qu’on chante quand le vin vient à manquer.', 'Désormais, chaque dame du royaume porte sa terre avec elle. Ne soyez pas surpris si votre correspondante galloise vous appelle « cariad » ou si la dame de Navarre termine sa lettre par « Agur ». Et ne proposez jamais, au grand jamais, le grenier à foin à une Parisienne.']
    }
  },
  {
    id: 'herald', icon: '📯', cat: 'decree', date: '2026-11-26', go: ['news', {}],
    title: ['The Herald takes his post', 'Le héraut prend ses fonctions'],
    sum: ['Proclamations of the court and tidings from every land, fresh each morning.', 'Proclamations de la cour et nouvelles de toutes les terres, fraîches chaque matin.'],
    sections: [
      [['Proclamations', 'Proclamations'], ['Every novelty of Valeria is cried here first, with a page of its own.', 'Chaque nouveauté de Valeria est criée ici d’abord, avec sa propre page.']],
      [['Tidings of the realms', 'Nouvelles des royaumes'], ['Tourneys, weddings, skirmishes and scandals: new tidings every day, each with the lady or the land behind it. Tap to visit the land or to meet the lady.', 'Tournois, noces, escarmouches et scandales : de nouvelles chaque jour, chacune avec la dame ou la terre qui s’y rattache. Touchez pour visiter la terre ou rencontrer la dame.']]
    ],
    story: {
      en: ['Gautier, at your service. I have the loudest voice between the Thames and the Loire, and a horse that knows every road. My task is simple: when something new happens at court, you hear it from me first.', 'Each morning I also bring tidings from the realms. Some are grave, most are gossip. All of them are true, more or less.'],
      fr: ['Gautier, pour vous servir. J’ai la voix la plus forte entre la Tamise et la Loire, et un cheval qui connaît chaque route. Ma tâche est simple : quand il se passe quelque chose de nouveau à la cour, vous l’apprenez de moi d’abord.', 'Chaque matin, j’apporte aussi des nouvelles des royaumes. Certaines sont graves, la plupart sont des ragots. Toutes sont vraies, plus ou moins.']
    }
  },
  {
    id: 'memory', icon: '🧠', cat: 'court', date: '2026-11-26', go: ['book', { id: 'memory' }],
    title: ['The ladies now remember', 'Les dames se souviennent désormais'],
    sum: ['First times with their dates, favourites, your answers, and every day you did not write.', 'Les premières fois avec leur date, les favoris, vos réponses, et chaque jour sans lettre.'],
    sections: [
      [['What she keeps', 'Ce qu’elle garde'], ['The first time of every event, how often you did it, what you answered to her questions and the day of your last letter. It is all on her profile under 🧠 Memory.', 'La première fois de chaque événement, combien de fois, ce que vous avez répondu à ses questions et le jour de votre dernière lettre. Tout est sur son profil, sous 🧠 Mémoire.']],
      [['What she says', 'Ce qu’elle dit'], ['She marks first times, counts favourites, scolds you after a long silence, catches you when your answers change, and answers “do you remember…?”.', 'Elle souligne les premières fois, compte les favoris, vous gronde après un long silence, vous prend en défaut quand vos réponses changent, et répond à « vous souvenez-vous… ? ».']]
    ],
    story: {
      en: ['A word of warning, my lord: they forget nothing now. Promise a dance and you will owe a dance. Say you missed her, then say you did not, and she will quote you both.', 'If there is something you would rather she forgot, her profile has a little ✕. Use it wisely. Or better, write more often.'],
      fr: ['Un avertissement, messire : elles n’oublient plus rien. Promettez une danse et vous devrez une danse. Dites qu’elle vous a manqué, puis le contraire, et elle vous citera les deux fois.', 'S’il est quelque chose que vous préférez lui faire oublier, son profil a une petite ✕. Usez-en avec sagesse. Ou mieux : écrivez plus souvent.']
    }
  },
  {
    id: 'figure', icon: '📏', cat: 'court', date: '2026-11-26', go: ['book', { id: 'temper' }],
    title: ['The tailors’ decree: figures at court', 'Le décret des tailleurs : les silhouettes à la cour'],
    sum: ['Height, build, bosom, hips and more, as in Carmen. They change her answers, her questions and some events.', 'Taille, corpulence, poitrine, hanches et plus, comme dans Carmen. Cela change ses réponses, ses questions et certains événements.'],
    sections: [
      [['In the form', 'Dans le formulaire'], ['📏 Figure has one choice per trait; 🎲 rolls a figure that fits her build. Your own gender and size are set in 👑 Me.', '📏 Silhouette propose un choix par trait ; 🎲 tire une silhouette cohérente avec sa corpulence. Votre genre et votre taille se règlent dans 👑 Moi.']],
      [['Ten new events', 'Dix nouveaux événements'], ['Unbraiding, a silk ribbon, the window, her bosom, her hips, a spank, kisses lower, the other way, the hayloft and the table.', 'Cheveux dénoués, ruban de soie, la fenêtre, sa poitrine, ses hanches, une fessée, des baisers plus bas, l’autre chemin, le grenier à foin et la table.']]
    ],
    story: {
      en: ['The tailors of Paris and London met in Calais, for once without a war, and agreed on one thing: a lady should be described as she is. Short ladies now stand on tiptoe to kiss you; tall ones bend down.', 'And they ask questions of their own, my lord. Be ready to answer.'],
      fr: ['Les tailleurs de Paris et de Londres se sont réunis à Calais, pour une fois sans guerre, et se sont accordés sur une chose : une dame doit être décrite telle qu’elle est. Les petites se hissent désormais sur la pointe des pieds pour vous embrasser ; les grandes se penchent.', 'Et elles posent leurs propres questions, messire. Soyez prêt à répondre.']
    }
  },
  {
    id: 'events', icon: '🎭', cat: 'court', date: '2026-11-26', go: ['letters', {}],
    title: ['The book of all deeds, at your fingertips', 'Le livre de tous les gestes, au bout des doigts'],
    sum: ['In a letter, ⋮ → 🎭 Events lists everything she reacts to: what comes next, her favourites, a surprise.', 'Dans une lettre, ⋮ → 🎭 Événements liste tout ce à quoi elle réagit : la suite, ses favoris, une surprise.'],
    sections: [[['How', 'Comment'], ['Tabs by category, a search box, and chips that write the sentence for you. Tap again to send.', 'Des onglets par catégorie, une recherche, et des puces qui écrivent la phrase pour vous. Touchez encore pour envoyer.']]],
    story: { en: ['No more guessing the right words, my lord. The list knows them all, and it remembers what she likes best.'], fr: ['Fini de chercher les bons mots, messire. La liste les connaît tous, et elle se souvient de ce qu’elle préfère.'] }
  },
  {
    id: 'shortcuts', icon: '⚡', cat: 'court', date: '2026-11-26', go: ['lab', { id: 'quick' }],
    title: ['Whispers in your ear: shortcuts', 'Murmures à l’oreille : les raccourcis'],
    sum: ['Above your letter, suggestions of what to say next: answers to her question, the natural next step, questions not asked yet.', 'Au-dessus de votre lettre, des suggestions : réponses à sa question, la suite naturelle, les questions pas encore posées.'],
    sections: [[['How', 'Comment'], ['Tap to write, tap again to send. While you type, 🔮 completes your word.', 'Touchez pour écrire, touchez encore pour envoyer. Pendant que vous tapez, 🔮 complète votre mot.']]],
    story: { en: ['Think of it as a page standing behind your chair, whispering what a gallant would say. He is discreet. Mostly.'], fr: ['Imaginez un page derrière votre chaise, qui vous souffle ce que dirait un galant. Il est discret. Presque.'] }
  },
  {
    id: 'labs', icon: '🧪', cat: 'decree', date: '2026-11-26', go: ['labs', {}],
    title: ['The alchemists open their laboratory', 'Les alchimistes ouvrent leur laboratoire'],
    sum: ['Test the bot, temperaments, homelands, shortcuts and effects without writing a real letter.', 'Essayez le bot, les tempéraments, les terres natales, les raccourcis et les effets sans écrire de vraie lettre.'],
    sections: [[['Five labs', 'Cinq labos'], ['🤖 Bot, 🎭 Temperaments, 🌍 Homelands, ⚡ Shortcuts and ✨ Effects. In the Library, on Home and in Me.', '🤖 Bot, 🎭 Tempéraments, 🌍 Terres natales, ⚡ Raccourcis et ✨ Effets. Dans la Bibliothèque, sur l’Accueil et dans Moi.']]],
    story: { en: ['The alchemists swear nothing will explode. I keep my distance all the same.'], fr: ['Les alchimistes jurent que rien n’explosera. Je garde mes distances tout de même.'] }
  },
  {
    id: 'music', icon: '🎵', cat: 'decree', date: '2026-11-26', go: ['me', {}],
    title: ['Minstrels hired for the whole court', 'Des ménestrels engagés pour toute la cour'],
    sum: ['Music plays from your first tap; buttons answer with a lute string, letters with a wax seal and a chapel bell.', 'La musique joue dès votre premier geste ; les boutons répondent d’une corde de luth, les lettres d’un sceau de cire et d’une cloche.'],
    sections: [[['Settings', 'Réglages'], ['👑 Me → Settings: music, sounds and volume.', '👑 Moi → Réglages : musique, sons et volume.']]],
    story: { en: ['The minstrels asked to be paid in wine. The treasurer paid them in promises. They play anyway.'], fr: ['Les ménestrels ont demandé à être payés en vin. Le trésorier les a payés en promesses. Ils jouent quand même.'] }
  },
  {
    id: 'library', icon: '📚', cat: 'decree', date: '2026-11-26', go: ['library', {}],
    title: ['The library opens its doors', 'La bibliothèque ouvre ses portes'],
    sum: ['A guide, and books written from the living records of the court: events, questions, temperaments, realms, memory.', 'Un guide, et des livres tirés des registres vivants de la cour : événements, questions, tempéraments, royaumes, mémoire.'],
    sections: [[['Always up to date', 'Toujours à jour'], ['Most books are written from the app itself: when something new arrives, the books know at once.', 'La plupart des livres sont écrits à partir de l’application elle-même : quand une nouveauté arrive, les livres le savent aussitôt.']]],
    story: { en: ['The monks were horrified that the books rewrite themselves. I told them it was a miracle. They are still debating.'], fr: ['Les moines furent horrifiés que les livres se réécrivent seuls. Je leur ai dit que c’était un miracle. Ils en débattent encore.'] }
  },
  {
    id: 'questions', icon: '❓', cat: 'court', date: '2026-11-26', go: ['book', { id: 'asks' }],
    title: ['She asks, you answer', 'Elle demande, vous répondez'],
    sum: ['Ask about her life; she answers from her profile and her land. She asks you back, and your next letter is the answer.', 'Interrogez-la sur sa vie ; elle répond selon son profil et sa terre. Elle vous retourne la question, et votre lettre suivante est la réponse.'],
    sections: [[['Tip', 'Astuce'], ['A plain “yes” or “no” is enough. Name a place of the map and she knows something about it.', 'Un simple « oui » ou « non » suffit. Nommez un lieu de la carte et elle en saura quelque chose.']]],
    story: { en: ['Answer carefully, my lord. She will remember.'], fr: ['Répondez avec soin, messire. Elle s’en souviendra.'] }
  },
  {
    id: 'map', icon: '🗺️', cat: 'realms', date: '2026-11-26', go: ['map', {}],
    title: ['A new map of the realms', 'Une nouvelle carte des royaumes'],
    sum: ['Twenty-two lands from the Highlands to Navarre, each with its ruler and five notables to invite.', 'Vingt-deux terres des Highlands à la Navarre, chacune avec sa souveraine et cinq notables à inviter.'],
    sections: [[['How', 'Comment'], ['Tap a land to zoom in; tap the sea to see all. 🎲 New faces shows other ladies.', 'Touchez une terre pour zoomer ; touchez la mer pour tout revoir. 🎲 Autres visages montre d’autres dames.']]],
    story: { en: ['Drawn by a monk who had never left his abbey. The coasts are… approximate. The ladies are not.'], fr: ['Dessinée par un moine qui n’avait jamais quitté son abbaye. Les côtes sont… approximatives. Les dames, non.'] }
  }
];

Valeria.TIDINGS = [
  { icon: '🏹', after: [10, 25], home: ['realm:fr', 'realm:en', 'realm:bur'], t: ['Still they speak of Agincourt', 'On parle encore d’Azincourt'], s: ['Every hall in {region} has its own story of the field of mud and the English bows. {name} listens to all of them, and believes none.', 'Chaque salle de {region} a sa propre histoire du champ de boue et des arcs anglais. {name} les écoute toutes, et n’en croit aucune.'] },
  { icon: '⚓', home: ['mecklenburg', 'brandenburg', 'prussia'], t: ['The Hanse closes its harbours', 'La Hanse ferme ses ports'], s: ['The merchants of {city} have voted: no ship sails until the king pays his debts. {name} says she has never seen the quays so quiet, nor the merchants so pleased with themselves.', 'Les marchands de {city} ont voté : aucun navire ne partira tant que le roi n’aura pas payé ses dettes. {name} dit n’avoir jamais vu les quais si calmes, ni les marchands si contents d’eux.'] },
  { icon: '🐟', home: ['denmark'], t: ['The herring run off Scania', 'Le hareng arrive au large de la Scanie'], s: ['So thick is the shoal this year that, they say, an axe would stand upright in the sea. {name} went to the market at Skanør and came back with a merchant’s heart.', 'Le banc est si épais cette année qu’une hache, dit-on, tiendrait debout dans la mer. {name} est allée au marché de Skanør et en est revenue avec le cœur d’un marchand.'] },
  { icon: '💣', home: ['brandenburg'], t: ['The margrave’s great cannon at work', 'Le grand canon du margrave à l’œuvre'], s: ['They call it Lazy Greta, and it took four days to drag it before the robber knights’ walls near {city}. The walls fell in one. {name} has asked to fire it.', 'On l’appelle Grete la paresseuse, et il a fallu quatre jours pour la traîner devant les murs des chevaliers brigands près de {city}. Les murs sont tombés en un seul. {name} a demandé à tirer.'] },
  { icon: '🔥', home: ['bohemia'], t: ['Hussite preachers fill the squares of {city}', 'Des prédicateurs hussites remplissent les places de {city}'], s: ['They preach in Czech, not Latin, and the crowds sing back. {name} was seen at the edge of the square, hood up, lips moving with the hymn.', 'Ils prêchent en tchèque et non en latin, et la foule chante avec eux. On a vu {name} au bord de la place, capuche baissée, les lèvres suivant l’hymne.'] },
  { icon: '🪙', home: ['bohemia', 'saxony'], t: ['A new silver vein near {city}', 'Un nouveau filon d’argent près de {city}'], s: ['The miners struck silver below {city} and the whole town drank to it. {name} has already ordered a new gown, with silver thread, of course.', 'Les mineurs ont trouvé de l’argent sous {city} et toute la ville a bu à leur santé. {name} a déjà commandé une robe neuve, brodée d’argent, bien sûr.'] },
  { icon: '⛪', home: ['bavaria', 'rhineland'], t: ['The Council at Constance argues on', 'Le concile de Constance se dispute encore'], s: ['Three popes, a thousand bishops and not one agreement. The couriers ride through {city} every day, and {name} slips her own letters into their bags.', 'Trois papes, mille évêques et pas un seul accord. Les courriers traversent {city} chaque jour, et {name} glisse ses propres lettres dans leurs sacoches.'] },
  { icon: '👑', home: ['rhineland', 'saxony', 'luxembourg'], t: ['The prince-electors gather', 'Les princes électeurs se réunissent'], s: ['Seven electors, one crown, and every inn of {city} full of envoys. {name} danced with two of them and learned more than any spy.', 'Sept électeurs, une couronne, et chaque auberge de {city} pleine d’envoyés. {name} a dansé avec deux d’entre eux et en a appris plus qu’aucun espion.'] },
  { icon: '⛵', home: ['austria', 'hungary', 'bavaria'], t: ['The ice breaks on the Danube', 'La glace se rompt sur le Danube'], s: ['The first barges of salt and wine reached {city} this morning. {name} stood on the quay for an hour; she says she was watching the boats.', 'Les premières barges de sel et de vin sont arrivées à {city} ce matin. {name} est restée une heure sur le quai ; elle dit qu’elle regardait les bateaux.'] },
  { icon: '🐎', home: ['hungary'], t: ['{lady} wins the great horse race', '{lady} remporte la grande course'], s: ['Before half the nobility of {region}, {name} rode bareback and beat every man. They say she laughed the whole way.', 'Devant la moitié de la noblesse de {region}, {name} a monté à cru et battu tous les hommes. On dit qu’elle a ri tout du long.'] },
  { icon: '⚔️', home: ['poland', 'prussia'], t: ['A truce on the border of the Order', 'Une trêve à la frontière de l’Ordre'], s: ['Polish lords and knights of the Order feasted together near {city}, swords left at the door. {name} danced with the enemy, twice.', 'Seigneurs polonais et chevaliers de l’Ordre ont festoyé ensemble près de {city}, les épées laissées à la porte. {name} a dansé avec l’ennemi, deux fois.'] },
  { icon: '🎭', home: ['venice'], t: ['Masks on the canals of {city}', 'Des masques sur les canaux de {city}'], s: ['A masked lady was seen stepping into a gondola at midnight with a stranger. Everyone swears it was {name}. {name} swears she was asleep.', 'On a vu une dame masquée monter dans une gondole à minuit avec un inconnu. Tout le monde jure que c’était {name}. {name} jure qu’elle dormait.'] },
  { icon: '🛡️', home: ['milan'], t: ['The armourers of {city} unveil a new harness', 'Les armuriers de {city} dévoilent une armure nouvelle'], s: ['Steel so bright it shows your face, and so fine a lady could wear it. {name} has asked for one, “for riding”, she says.', 'Un acier si clair qu’on s’y voit, et si fin qu’une dame pourrait le porter. {name} en a demandé une, « pour monter à cheval », dit-elle.'] },
  { icon: '⛵', home: ['genoa'], t: ['The galleys are back in {city} from the Black Sea', 'Les galères sont rentrées à {city} de la mer Noire'], s: ['Silk, alum and sailors’ tales from Caffa. {name} was on the quay before dawn, waiting for one ship in particular.', 'De la soie, de l’alun et des récits de marins de Caffa. {name} était sur le quai avant l’aube, à attendre un navire en particulier.'] },
  { icon: '🏛️', home: ['florence'], t: ['A contest for the great dome of {city}', 'Un concours pour la grande coupole de {city}'], s: ['The wool guild still cannot decide how to close the cathedral’s roof. {name} says she knows a goldsmith who could do it, and that nobody listens to her.', 'La guilde de la laine ne sait toujours pas comment fermer le toit de la cathédrale. {name} dit connaître un orfèvre qui y arriverait, et que personne ne l’écoute.'] },
  { icon: '🐎', home: ['este'], t: ['The Palio is run in {city}', 'Le Palio est couru à {city}'], s: ['Horses, donkeys and then the young women ran through the streets for a bolt of scarlet cloth. {name} came second and has not stopped arguing.', 'Des chevaux, des ânes puis les jeunes femmes ont couru dans les rues pour une pièce d’écarlate. {name} est arrivée deuxième et n’a pas fini de protester.'] },
  { icon: '⚔️', home: ['swiss'], t: ['The cantons drill their halberdiers outside {city}', 'Les cantons exercent leurs hallebardiers devant {city}'], s: ['Farmers, butchers and cowherds, in rows like a wall. {name} watched the whole morning and says no knight of Austria will ever break that line.', 'Paysans, bouchers et vachers, alignés comme un mur. {name} a regardé toute la matinée et dit qu’aucun chevalier d’Autriche ne brisera jamais cette ligne.'] },
  { icon: '🌉', home: ['trent'], t: ['A new toll on the Adige bridge at {city}', 'Un nouveau péage sur le pont de l’Adige à {city}'], s: ['The bishop’s men and the Tyrolean’s men both want the coins. {name} paid neither: she crossed by boat, at night.', 'Les gens de l’évêque et ceux du Tyrolien veulent tous deux les pièces. {name} n’a payé personne : elle a traversé en barque, de nuit.'] },
  { icon: '🦅', home: ['friuli'], t: ['Venetian envoys seen in {city}', 'Des envoyés vénitiens aperçus à {city}'], s: ['They smiled, bowed, and counted the towers. {name} counted the envoys, and wrote down their names.', 'Ils ont souri, salué, et compté les tours. {name} a compté les envoyés, et noté leurs noms.'] },
  { icon: '🏔️', home: ['savoy', 'austria', 'swiss', 'trent'], t: ['Snow closes the pass above {city}', 'La neige ferme le col au-dessus de {city}'], s: ['No courier will cross the mountains for a week. {name} is furious: she was expecting a letter, and will not say from whom.', 'Aucun courrier ne passera les montagnes avant une semaine. {name} est furieuse : elle attendait une lettre, et ne dira pas de qui.'] },
  { icon: '🍺', home: ['bavaria'], t: ['The brewers of {city} defy the duke', 'Les brasseurs de {city} défient le duc'], s: ['The duke wants only barley, hops and water in the beer; the brewers want honey and herbs. {name} has taken the brewers’ side, loudly.', 'Le duc ne veut que de l’orge, du houblon et de l’eau dans la bière ; les brasseurs veulent du miel et des herbes. {name} a pris le parti des brasseurs, haut et fort.'] },
  { icon: '🟠', home: ['prussia'], t: ['Amber on the shore after the storm', 'De l’ambre sur la grève après la tempête'], s: ['The whole coast near {city} was out at dawn gathering amber. {name} found a piece with a tiny fly inside, and is keeping it for someone.', 'Toute la côte près de {city} était dehors à l’aube pour ramasser l’ambre. {name} a trouvé un morceau avec une petite mouche dedans, et le garde pour quelqu’un.'] },
  { icon: '💃', t: ['A ball at {city}: {lady} danced until dawn', 'Un bal à {city} : {lady} a dansé jusqu’à l’aube'], s: ['The musicians of {city} played until the candles died. {name} was seen slipping into the garden with a partner no one could name. Her maid found rose petals in her hair.', 'Les musiciens de {city} ont joué jusqu’à l’extinction des chandelles. On a vu {name} se glisser au jardin avec un cavalier que nul n’a su nommer. Sa servante a trouvé des pétales de rose dans ses cheveux.'] },
  { icon: '💍', t: ['Wedding bells at {city}?', 'Des cloches de noces à {city} ?'], s: ['The banns are not read yet, but {name} has ordered a gown and asked the priest of {city} about the feast of {saint}. Her household whispers of a wedding night already planned to the last candle.', 'Les bans ne sont pas encore publiés, mais {name} a commandé une robe et interrogé le curé de {city} sur la fête de {saint}. Sa maison chuchote qu’une nuit de noces est déjà prévue jusqu’à la dernière chandelle.'] },
  { icon: '🌾', t: ['Harvest feast at {city}: the barns are full', 'Fête des moissons à {city} : les granges sont pleines'], s: ['The harvest is in around {city} and the whole village danced round the bonfire. By midnight half the dancers had vanished into the barns. {name} swears she went home early.', 'La moisson est rentrée autour de {city} et tout le village a dansé autour du feu. À minuit, la moitié des danseurs avaient disparu dans les granges. {name} jure qu’elle est rentrée tôt.'] },
  { icon: '📯', t: ['{lady} seeks a gallant correspondent', '{lady} cherche un correspondant galant'], s: ['Word from {city}: {name} has let it be known that her letters go unanswered. Her ladies say she reads every one twice, then sighs.', 'On dit à {city} que {name} n’a personne à qui écrire. Ses dames assurent qu’elle lit chaque lettre deux fois, puis soupire.'] },
  { icon: '⚔️', t: ['Skirmish near {city}: the roads are unsafe', 'Escarmouche près de {city} : les routes sont dangereuses'], s: ['Archers and men-at-arms clashed at dawn near {city}. Messengers are told to ride in pairs. {name} has barred her gates and prays to {saint}.', 'Archers et gens d’armes se sont heurtés à l’aube près de {city}. Les messagers doivent chevaucher par deux. {name} a fermé ses portes et prie {saint}.'] },
  { icon: '🏇', t: ['A tourney is proclaimed at {city}', 'Un tournoi est proclamé à {city}'], s: ['Knights from both crowns are expected at {city} next Sunday. {name} has promised her sleeve to the winner, or so the rumour goes.', 'On attend des chevaliers des deux couronnes à {city} dimanche prochain. {name} aurait promis sa manche au vainqueur, dit la rumeur.'] },
  { icon: '💍', t: ['Wedding in {region}: the bells ring for three days', 'Noces en {region} : les cloches sonnent trois jours'], s: ['A cousin of {name} was wed in {city}. {food} was served until dawn, and {name} danced with no one. People wonder why.', 'Une cousine de {name} s’est mariée à {city}. On a servi {food} jusqu’à l’aube, et {name} n’a dansé avec personne. On se demande pourquoi.'] },
  { icon: '🐎', t: ['A messenger lost his horse near {city}', 'Un messager a perdu son cheval près de {city}'], s: ['Letters for {region} will be late this week. The messenger swears the horse ran off after a mare; the horse declined to comment.', 'Les lettres pour {region} auront du retard cette semaine. Le messager jure que le cheval a suivi une jument ; le cheval n’a pas souhaité commenter.'] },
  { icon: '🍷', t: ['New wine has reached {city}', 'Le vin nouveau est arrivé à {city}'], s: ['The taverns of {city} are full and the watch is tired. {name} was seen tasting it with a smile that worried her chaplain.', 'Les tavernes de {city} sont pleines et le guet est fatigué. On a vu {name} y goûter avec un sourire qui inquiète son chapelain.'] },
  { icon: '🕯️', t: ['Pilgrims crowd the roads of {region}', 'Les pèlerins se pressent sur les routes de {region}'], s: ['For the feast of {saint}, the roads to {city} are full of pilgrims. {name} has opened her kitchens to them; {food} for everyone.', 'Pour la fête de {saint}, les routes de {city} sont pleines de pèlerins. {name} leur a ouvert ses cuisines ; {food} pour tous.'] },
  { icon: '🎭', t: ['Minstrels bring a scandalous song to {city}', 'Des ménestrels apportent une chanson scandaleuse à {city}'], s: ['The song tells of a lady of {region} and a knight from across the sea. Everyone in {city} swears it is about {name}. She has not denied it.', 'La chanson parle d’une dame de {region} et d’un chevalier d’outre-mer. Tout {city} jure qu’il s’agit de {name}. Elle n’a pas démenti.'] },
  { icon: '🌹', t: ['Rumour at court: {lady} refused another suitor', 'Rumeur à la cour : {lady} a refusé un nouveau prétendant'], s: ['The suitor was rich, old and very sure of himself. {name} sent back his ring with a single line. Nobody knows what she wrote, but he left {city} that night.', 'Le prétendant était riche, vieux et très sûr de lui. {name} a renvoyé sa bague avec une seule ligne. Nul ne sait ce qu’elle a écrit, mais il a quitté {city} le soir même.'] },
  { icon: '🎉', t: ['{region} prepares {feast}', '{region} prépare {feast}'], s: ['In {city}, the streets are hung with banners for {feast}. {name} is said to be sewing a new gown for it and will not say for whom.', 'À {city}, les rues se couvrent de bannières pour {feast}. On dit que {name} coud une nouvelle robe pour l’occasion et refuse de dire pour qui.'] },
  { icon: '❄️', t: ['Early frost in {region}', 'Gelées précoces en {region}'], s: ['The rivers near {city} froze overnight. {name} writes that her ink froze too, and asks who will keep her warm this winter.', 'Les rivières près de {city} ont gelé dans la nuit. {name} écrit que son encre aussi a gelé, et demande qui la réchauffera cet hiver.'] },
  { icon: '🗝️', t: ['A letter stolen in {city}', 'Une lettre volée à {city}'], s: ['A sealed letter of {name} vanished from the messenger’s bag in {city}. She offers a reward and promises the thief a very cold welcome.', 'Une lettre scellée de {name} a disparu du sac du messager à {city}. Elle offre une récompense et promet au voleur un accueil glacial.'] }
];
