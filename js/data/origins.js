/*
 * Valeria - homeland flavour per map region (key = Valeria.REGIONS id)
 * food, drink, oath, custom: [EN, FR] → bot placeholders {food} {drink} {oath} {custom}
 * traits: likely personality for people from there (js/gen.js gives one of them to random characters)
 * lines: { en, fr } flavour bubbles the bot sometimes adds after a normal reply ({sen} = user's name)
 */
window.Valeria = window.Valeria || {};

Valeria.ORIGINS = {
  scotland: {
    food: ['haggis and oatcakes', "haggis et galettes d'avoine"], drink: ['uisge beatha', 'uisge beatha'], oath: ['Och!', 'Och !'],
    custom: ['the pipes play at every wedding on the moor', 'les cornemuses jouent à chaque noce sur la lande'], traits: ['Bold', 'Stern', 'Loyal'],
    lines: { en: ['*mutters something in Gaelic* …Forgive me, old habit.', 'Och, if you saw the Highlands in autumn, you would never leave.'], fr: ["*marmonne quelque chose en gaélique* …Pardon, vieille habitude.", 'Och, si vous voyiez les Highlands en automne, vous ne partiriez jamais.'] }
  },
  north: {
    food: ['mutton pie and oatcakes', "tourte au mouton et galettes d'avoine"], drink: ['dark ale', 'bière brune'], oath: ['By Saint William!', 'Par saint Guillaume !'],
    custom: ['the Minster bells carry three valleys away', "les cloches de la cathédrale portent jusqu'à trois vallées"], traits: ['Stern', 'Loyal', 'Plain speech'],
    lines: { en: ['Up north we say what we mean, {sen}. Southerners find it rude.', 'The wind off the moors would freeze your ink.'], fr: ['Dans le Nord, nous disons ce que nous pensons, {sen}. Ceux du Sud trouvent cela grossier.', 'Le vent des landes gèlerait votre encre.'] }
  },
  wales: {
    food: ['cawl and laverbread', 'cawl et pain de varech'], drink: ['mead', 'hydromel'], oath: ['Duw!', 'Duw !'],
    custom: ['every hall keeps a harper, and every harper keeps a grudge', 'chaque grand-salle a son harpiste, et chaque harpiste sa rancune'], traits: ['Poetic', 'Passionate', 'Rebellious'],
    lines: { en: ['*hums a Welsh air under her breath*', 'In Wales even the hills sing, {sen}. You should hear them.'], fr: ['*fredonne un air gallois*', 'Au pays de Galles, même les collines chantent, {sen}. Il faudrait les entendre.'] }
  },
  london: {
    food: ['eel pie and spiced wafers', 'tourte aux anguilles et gaufres épicées'], drink: ['hippocras', 'hypocras'], oath: ['By Saint George!', 'Par saint Georges !'],
    custom: ['the court drifts between Westminster and the Tower like a restless cat', 'la cour va de Westminster à la Tour comme un chat inquiet'], traits: ['Proud', 'Cunning', 'Witty'],
    lines: { en: ['At Westminster, gossip travels faster than the Thames.', 'Londoners would sell their own mother for a good rumour. I would only lend mine.'], fr: ['À Westminster, les ragots courent plus vite que la Tamise.', 'Les Londoniens vendraient leur mère pour une bonne rumeur. Moi, je ne ferais que la prêter.'] }
  },
  wessex: {
    food: ['pasties and clotted cream', 'pâtés en croûte et crème épaisse'], drink: ['cider', 'cidre'], oath: ["By King Arthur's bones!", 'Par les os du roi Arthur !'],
    custom: ['old women still leave milk out for the piskies', 'les vieilles laissent encore du lait pour les lutins'], traits: ['Gentle', 'Romantic', 'Mischievous'],
    lines: { en: ['In Cornwall they swear Arthur sleeps under the hills. I half believe it.', '*smells of apple blossom and sea salt*'], fr: ["En Cornouailles, on jure qu'Arthur dort sous les collines. J'y crois à moitié.", '*sent la fleur de pommier et le sel marin*'] }
  },
  ireland: {
    food: ['oatcakes and smoked salmon', "galettes d'avoine et saumon fumé"], drink: ['uisce beatha', 'uisce beatha'], oath: ['Mother of God!', 'Mère de Dieu !'],
    custom: ['a bard can still shame a lord into silence', 'un barde peut encore réduire un seigneur au silence'], traits: ['Witty', 'Rebellious', 'Passionate'],
    lines: { en: ["My grandmother would say: a kind word never broke anyone's mouth.", '*laughs* The English call us wild. They have never seen us at a wake.'], fr: ["Ma grand-mère disait : un mot gentil n'a jamais cassé la bouche de personne.", '*rit* Les Anglais nous disent sauvages. Ils ne nous ont jamais vus à une veillée.'] }
  },
  flanders: {
    food: ['waterzooi and gingerbread', "waterzooi et pain d'épices"], drink: ['Flemish beer', 'bière flamande'], oath: ['Heer God!', 'Heer God !'],
    custom: ['the cloth halls of Bruges are richer than many kings', 'les halles aux draps de Bruges sont plus riches que bien des rois'], traits: ['Learned', 'Cunning', 'Proud'],
    lines: { en: ['In Bruges, merchants are lords and lords are in debt to merchants.', '*smooths a sleeve of fine Ypres wool*'], fr: ['À Bruges, les marchands sont des seigneurs, et les seigneurs leurs débiteurs.', "*lisse une manche de fine laine d'Ypres*"] }
  },
  picardy: {
    food: ["duck pâté from Amiens", "pâté de canard d'Amiens"], drink: ['cervoise', 'cervoise'], oath: ['By Saint Firmin!', 'Par saint Firmin !'],
    custom: ['the cathedral of Amiens could swallow a whole village', "la cathédrale d'Amiens pourrait avaler un village entier"], traits: ['Loyal', 'Bold', 'Plain speech'],
    lines: { en: ['From Calais you can see the English cliffs on a clear day. I never wave.', 'We Picards have been trampled by every army. We still dance.'], fr: ['De Calais, on voit les falaises anglaises par temps clair. Je ne leur fais jamais signe.', 'Nous, Picards, avons été piétinés par toutes les armées. Nous dansons encore.'] }
  },
  normandy: {
    food: ['apple tarts with thick cream', 'tartes aux pommes à la crème épaisse'], drink: ['cider and perry', 'cidre et poiré'], oath: ['By Saint Michael!', 'Par saint Michel !'],
    custom: ['Normans conquered England once and remind everyone of it', "les Normands ont conquis l'Angleterre une fois et le rappellent à tous"], traits: ['Proud', 'Bold', 'Cunning'],
    lines: { en: ['Remember, {sen}: it was a Norman who taught the English their manners.', '*pours cider* Normandy has two seasons: rain, and apples.'], fr: ["Souvenez-vous, {sen} : c'est un Normand qui a appris les bonnes manières aux Anglais.", '*verse du cidre* La Normandie a deux saisons : la pluie et les pommes.'] }
  },
  brittany: {
    food: ['buckwheat galettes and salted butter', 'galettes de sarrasin et beurre salé'], drink: ['cider', 'cidre'], oath: ['Doue!', 'Doue !'],
    custom: ['they say the Ankou walks the roads at night with his cart', "on dit que l'Ankou parcourt les routes la nuit avec sa charrette"], traits: ['Stern', 'Melancholic', 'Loyal'],
    lines: { en: ['*whispers a Breton charm against the Ankou*', 'The sea at Brest is never the same grey twice.'], fr: ["*murmure une formule bretonne contre l'Ankou*", "La mer à Brest n'a jamais deux fois le même gris."] }
  },
  ile: {
    food: ['wafers from the Petit-Pont and spiced pears', 'oublies du Petit-Pont et poires épicées'], drink: ["wine of Argenteuil", "vin d'Argenteuil"], oath: ['By Saint Denis!', 'Par saint Denis !'],
    custom: ['students brawl with the watch on every feast day', 'les étudiants se battent avec le guet à chaque fête'], traits: ['Courtly', 'Proud', 'Witty'],
    lines: { en: ['In Paris, a lady is judged by her sleeves and her silences.', '*arches a very Parisian eyebrow*'], fr: ['À Paris, une dame se juge à ses manches et à ses silences.', '*hausse un sourcil très parisien*'] }
  },
  champagne: {
    food: ['Brie and gingerbread of Reims', "brie et pain d'épices de Reims"], drink: ['the still wine of Reims', 'le vin tranquille de Reims'], oath: ['By Saint Remi!', 'Par saint Remi !'],
    custom: ['every king of France is crowned in our cathedral', 'tous les rois de France sont sacrés dans notre cathédrale'], traits: ['Courtly', 'Pious', 'Romantic'],
    lines: { en: ['The fairs of Troyes bring silk from Venice and gossip from everywhere.', 'A king is not a king until Reims says so.'], fr: ['Les foires de Troyes apportent la soie de Venise et les ragots du monde entier.', "Un roi n'est roi que lorsque Reims le dit."] }
  },
  lorraine: {
    food: ['bacon tart from Nancy', 'tarte au lard de Nancy'], drink: ['Moselle wine', 'vin de Moselle'], oath: ['By Saint Nicholas!', 'Par saint Nicolas !'],
    custom: ['we speak French at court and German at market', 'on parle français à la cour et allemand au marché'], traits: ['Loyal', 'Stern', 'Learned'],
    lines: { en: ['Between the Empire and France, Lorraine learns to bow to both and kneel to neither.', '*says something in German, then smiles* Old habit.'], fr: ["Entre l'Empire et la France, la Lorraine apprend à saluer l'un et l'autre et à ne s'agenouiller devant aucun.", '*dit quelque chose en allemand, puis sourit* Vieille habitude.'] }
  },
  burgundy: {
    food: ['beef stewed in red wine', 'bœuf mijoté au vin rouge'], drink: ['wine of Beaune', 'vin de Beaune'], oath: ['By Saint Andrew!', 'Par saint André !'],
    custom: ['the Burgundian court dines more lavishly than the King of France', 'la cour de Bourgogne dîne plus fastueusement que le roi de France'], traits: ['Proud', 'Passionate', 'Courtly'],
    lines: { en: ['Our duke keeps a hundred minstrels and a thousand debts. Charming, no?', '*swirls a cup of Beaune* Taste this before you speak of Paris.'], fr: ['Notre duc entretient cent ménestrels et mille dettes. Charmant, non ?', '*fait tourner une coupe de Beaune* Goûtez ceci avant de parler de Paris.'] }
  },
  loire: {
    food: ['rillettes of Tours', 'rillettes de Tours'], drink: ["wine of Anjou", "vin d'Anjou"], oath: ['By Saint Martin!', 'Par saint Martin !'],
    custom: ['the castles along the Loire compete for the prettiest gardens', 'les châteaux de la Loire rivalisent pour les plus beaux jardins'], traits: ['Gentle', 'Romantic', 'Courtly'],
    lines: { en: ['They say the purest French is spoken on the Loire. I agree, naturally.', '*describes the river at dawn as one speaks of a lover*'], fr: ["On dit que le plus pur français se parle sur la Loire. J'en conviens, naturellement.", "*décrit le fleuve à l'aube comme on parle d'un amant*"] }
  },
  poitou: {
    food: ['goat cheese and walnut bread', 'fromage de chèvre et pain aux noix'], drink: ['wine of Saintonge', 'vin de Saintonge'], oath: ['By Saint Hilary!', 'Par saint Hilaire !'],
    custom: ['Queen Eleanor once held her courts of love in Poitiers', "la reine Aliénor tint jadis ses cours d'amour à Poitiers"], traits: ['Romantic', 'Poetic', 'Witty'],
    lines: { en: ['In Poitiers, ladies once judged lovers in courts of love. I would have made a fine judge.', 'La Rochelle smells of salt and English coin.'], fr: ["À Poitiers, les dames jugeaient jadis les amants en cours d'amour. J'aurais fait un bon juge.", 'La Rochelle sent le sel et la monnaie anglaise.'] }
  },
  aquitaine: {
    food: ['lamprey in red wine', 'lamproie à la bordelaise'], drink: ['claret of Bordeaux', 'clairet de Bordeaux'], oath: ['Diable!', 'Diable !'],
    custom: ['half the wine England drinks leaves from our quays', "la moitié du vin que boit l'Angleterre part de nos quais"], traits: ['Bold', 'Passionate', 'Rebellious'],
    lines: { en: ['We Gascons fight for whoever pays, and love for nothing.', '*laughs loudly, like a true Gascon*'], fr: ['Nous, Gascons, nous battons pour qui paie, et aimons pour rien.', '*rit bruyamment, en vraie Gasconne*'] }
  },
  auvergne: {
    food: ['cheese and lentils of Le Puy', 'fromage et lentilles du Puy'], drink: ['spring water from the old volcanoes', 'eau des sources volcaniques'], oath: ['By the Black Virgin!', 'Par la Vierge noire !'],
    custom: ['shepherds light fires on the old volcanoes at midsummer', 'les bergers allument des feux sur les vieux volcans à la Saint-Jean'], traits: ['Stern', 'Pious', 'Plain speech'],
    lines: { en: ['Mountain folk speak little and remember everything.', 'The cold in Clermont gets into your bones and stays until Easter.'], fr: ['Les gens des montagnes parlent peu et se souviennent de tout.', "Le froid de Clermont vous entre dans les os et y reste jusqu'à Pâques."] }
  },
  dauphine: {
    food: ['walnuts of Grenoble and Lyon pastries', 'noix de Grenoble et pâtisseries lyonnaises'], drink: ['wine of the Rhône', 'vin du Rhône'], oath: ['By Saint John!', 'Par saint Jean !'],
    custom: ['the bankers of Lyon lend to popes and princes alike', 'les banquiers de Lyon prêtent aux papes comme aux princes'], traits: ['Learned', 'Cunning', 'Gentle'],
    lines: { en: ['From Grenoble you can watch the Alps blush at sunset.', 'In Lyon we count florins faster than prayers.'], fr: ['De Grenoble, on voit les Alpes rougir au couchant.', 'À Lyon, on compte les florins plus vite que les prières.'] }
  },
  provence: {
    food: ['olives, figs and garlic soup', "olives, figues et soupe à l'ail"], drink: ["wine of Avignon", "vin d'Avignon"], oath: ['By Saint Martha!', 'Par sainte Marthe !'],
    custom: ["the Pope's palace in Avignon has more cooks than priests", "le palais des Papes d'Avignon compte plus de cuisiniers que de prêtres"], traits: ['Passionate', 'Romantic', 'Mischievous'],
    lines: { en: ['*smells of lavender and sun*', 'In Provence the cicadas sing all summer. I learned to sing louder.'], fr: ['*sent la lavande et le soleil*', "En Provence, les cigales chantent tout l'été. J'ai appris à chanter plus fort."] }
  },
  languedoc: {
    food: ['cassoulet of Carcassonne', 'cassoulet de Carcassonne'], drink: ['wine of the Minervois', 'vin du Minervois'], oath: ['Mila Dieus!', 'Mila Dieus !'],
    custom: ['the troubadours were born here, and never truly left', 'les troubadours sont nés ici et ne sont jamais vraiment partis'], traits: ['Poetic', 'Rebellious', 'Passionate'],
    lines: { en: ["*slips into Occitan* …it sounds better in the langue d'oc, believe me.", 'Toulouse turns pink at dusk, like a blush.'], fr: ["*passe à l'occitan* …c'est plus beau en langue d'oc, croyez-moi.", 'Toulouse devient rose au crépuscule, comme une joue qui rougit.'] }
  },
  navarre: {
    food: ['roast lamb with chestnuts', 'agneau rôti aux châtaignes'], drink: ["wine of Olite", "vin d'Olite"], oath: ['Santiago!', 'Santiago !'],
    custom: ['pilgrims to Compostela cross our bridges every day', 'les pèlerins de Compostelle traversent nos ponts chaque jour'], traits: ['Bold', 'Pious', 'Proud'],
    lines: { en: ['Navarre is small, {sen}, but the mountains make it tall.', '*makes the sign of the cross* For the pilgrims on the road tonight.'], fr: ['La Navarre est petite, {sen}, mais les montagnes la grandissent.', '*se signe* Pour les pèlerins sur la route ce soir.'] }
  }
};
