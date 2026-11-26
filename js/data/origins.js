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
  },
  luxembourg: {
    food: ['smoked pork with broad beans', 'porc fumé aux fèves'], drink: ['white wine of the Moselle', 'vin blanc de Moselle'], oath: ['By Saint Willibrord!', 'Par saint Willibrord !'],
    custom: ['our house wears the crowns of Germany, Bohemia and Hungary at once, and still counts its debts', 'notre maison porte à la fois les couronnes d’Allemagne, de Bohême et de Hongrie, et compte encore ses dettes'], traits: ['Proud', 'Courtly', 'Learned'],
    lines: { en: ['Luxembourg is a rock, {sen}, and we are as stubborn as it is.', 'In Brussels the cloth halls are taller than the churches. Nobody minds.'], fr: ['Luxembourg est un rocher, {sen}, et nous sommes aussi têtus que lui.', 'À Bruxelles, les halles aux draps sont plus hautes que les églises. Personne ne s’en plaint.'] }
  },
  rhineland: {
    food: ['sauerbraten and black bread', 'bœuf mariné et pain noir'], drink: ['Rhenish wine', 'vin du Rhin'], oath: ['By the Three Kings of Cologne!', 'Par les Rois mages de Cologne !'],
    custom: ['every castle on the Rhine takes a toll from every boat', 'chaque château du Rhin prélève un péage sur chaque bateau'], traits: ['Learned', 'Pious', 'Witty'],
    lines: { en: ['*hums a boatman’s song from the Rhine*', 'In Heidelberg the scholars argue all night. I sometimes win.'], fr: ['*fredonne un chant de bateliers du Rhin*', 'À Heidelberg, les savants se disputent toute la nuit. Il m’arrive de gagner.'] }
  },
  savoy: {
    food: ['Alpine cheese and roasted chestnuts', 'fromage des Alpes et châtaignes grillées'], drink: ['wine of the Aosta valley', "vin du val d'Aoste"], oath: ['By Saint Maurice!', 'Par saint Maurice !'],
    custom: ['we keep the passes of the Alps, and everyone pays to cross', 'nous gardons les cols des Alpes, et chacun paie pour passer'], traits: ['Cunning', 'Loyal', 'Courtly'],
    lines: { en: ['From Chambéry to Turin, {sen}, every road crosses a mountain and every mountain is ours.', '*pulls her fur closer* Snow already, on the Great Saint Bernard.'], fr: ['De Chambéry à Turin, {sen}, chaque route franchit une montagne et chaque montagne est à nous.', '*resserre sa fourrure* Déjà la neige, au Grand-Saint-Bernard.'] }
  },
  bavaria: {
    food: ['roast pork and pretzels', 'rôti de porc et bretzels'], drink: ['monastery beer', "bière d'abbaye"], oath: ['Himmelherrgott!', 'Himmelherrgott !'],
    custom: ['the monks brew better beer than the dukes can drink', 'les moines brassent une meilleure bière que les ducs ne peuvent en boire'], traits: ['Bold', 'Pious', 'Plain speech'],
    lines: { en: ['*laughs, cheeks red* We Bavarians do everything a little louder.', 'In Nuremberg they build clocks that tell the hour better than the bells.'], fr: ['*rit, les joues rouges* Nous autres Bavarois faisons tout un peu plus fort.', 'À Nuremberg, on construit des horloges qui disent l’heure mieux que les cloches.'] }
  },
  saxony: {
    food: ['Thuringian sausages', 'saucisses de Thuringe'], drink: ['wine of the Elbe valley', "vin de la vallée de l'Elbe"], oath: ['By Saint Boniface!', 'Par saint Boniface !'],
    custom: ['silver from the Ore Mountains pays for every feast in Meissen', 'l’argent des monts Métallifères paie chaque fête à Meissen'], traits: ['Stern', 'Learned', 'Loyal'],
    lines: { en: ['A Saxon keeps her word and her accounts, {sen}. Both to the penny.', 'They tell of a minstrels’ contest at the Wartburg. I would have won it.'], fr: ['Une Saxonne tient sa parole et ses comptes, {sen}. Les deux au denier près.', 'On raconte un tournoi de ménestrels à la Wartbourg. Je l’aurais gagné.'] }
  },
  austria: {
    food: ['roast capon and dumplings', 'chapon rôti et quenelles'], drink: ['new wine from the Vienna hills', 'vin nouveau des collines de Vienne'], oath: ['By Saint Coloman!', 'Par saint Coloman !'],
    custom: ['our dukes call themselves archdukes, and keep a charter with five seals to prove it', 'nos ducs se disent archiducs, et gardent une charte à cinq sceaux pour le prouver'], traits: ['Courtly', 'Cunning', 'Proud'],
    lines: { en: ['*smiles* Let others fight, {sen}. We prefer to marry.', 'The Danube at Vienna is wider than any quarrel.'], fr: ['*sourit* Que d’autres fassent la guerre, {sen}. Nous préférons nous marier.', 'Le Danube à Vienne est plus large que toutes les querelles.'] }
  },
  bohemia: {
    food: ['roast goose with dumplings', 'oie rôtie et quenelles'], drink: ['beer of Pilsen', 'bière de Pilsen'], oath: ['By Saint Wenceslas!', 'Par saint Venceslas !'],
    custom: ['the silver of Kutná Hora pays for the stone bridge of Prague', 'l’argent de Kutná Hora paie le pont de pierre de Prague'], traits: ['Rebellious', 'Learned', 'Passionate'],
    lines: { en: ['*says something in Czech, softly* It sounds like water over stones, no?', 'Prague has a hundred spires, {sen}, and a secret under every one.'], fr: ['*dit quelque chose en tchèque, doucement* On dirait de l’eau sur des pierres, non ?', 'Prague a cent clochers, {sen}, et un secret sous chacun.'] }
  },
  hungary: {
    food: ['goulash of the herdsmen', 'goulash des bouviers'], drink: ['wine of Syrmia, the wine of kings', 'vin de Syrmie, vin des rois'], oath: ['By Saint Stephen!', 'Par saint Étienne !'],
    custom: ['a Hungarian learns to ride before she learns to walk', 'une Hongroise apprend à monter à cheval avant de marcher'], traits: ['Bold', 'Proud', 'Passionate'],
    lines: { en: ['*laughs* On the puszta, {sen}, the sky is so big you can hear it.', 'At Visegrád the fountains run with wine on feast days. Truly.'], fr: ['*rit* Dans la puszta, {sen}, le ciel est si grand qu’on l’entend.', 'À Visegrád, les fontaines coulent de vin les jours de fête. Vraiment.'] }
  },
  poland: {
    food: ['pierogi and hunter’s stew', 'pierogi et ragoût du chasseur'], drink: ['honey mead', 'hydromel'], oath: ['By Saint Stanislaus!', 'Par saint Stanislas !'],
    custom: ['a queen of Poland is crowned a king, so nobody may question her', "une reine de Pologne est couronnée roi, pour que nul ne puisse la contester"], traits: ['Proud', 'Pious', 'Bold'],
    lines: { en: ['In Kraków the trumpeter plays from the tower every hour, and stops mid-note. Ask me why.', '*raises a cup of mead* To your health, {sen}! In Poland we never toast just once.'], fr: ['À Cracovie, le trompette joue du haut de la tour chaque heure, et s’arrête au milieu d’une note. Demandez-moi pourquoi.', '*lève une coupe d’hydromel* À votre santé, {sen} ! En Pologne, on ne trinque jamais qu’une seule fois.'] }
  },
  prussia: {
    food: ['smoked eel from the lagoon', 'anguille fumée de la lagune'], drink: ['Danzig Jopen beer', 'bière Jopen de Dantzig'], oath: ['By the Virgin of Marienburg!', 'Par la Vierge de Marienbourg !'],
    custom: ['the knights pray seven times a day and count amber in between', 'les chevaliers prient sept fois par jour et comptent l’ambre entre-temps'], traits: ['Stern', 'Pious', 'Loyal'],
    lines: { en: ['*turns a bead of amber in her fingers* The sea gives it after every storm.', 'Marienburg has more bricks than Paris has stones, {sen}.'], fr: ['*fait tourner une perle d’ambre entre ses doigts* La mer la donne après chaque tempête.', 'Marienbourg a plus de briques que Paris n’a de pierres, {sen}.'] }
  },
  holland: {
    food: ['herring and cheese of Gouda', 'hareng et fromage de Gouda'], drink: ['beer of Haarlem', 'bière de Haarlem'], oath: ['By Saint Jerome of Noordwijk!', 'Par saint Jérôme de Noordwijk !'],
    custom: ['the Hooks and the Cods have quarrelled for sixty years, and nobody remembers why', 'les Hameçons et les Cabillauds se querellent depuis soixante ans, et nul ne sait plus pourquoi'], traits: ['Plain speech', 'Stern', 'Witty'],
    lines: { en: ['In Holland we argue with the sea every winter, {sen}. Princes do not frighten us.', '*smells faintly of peat smoke and salt*'], fr: ['En Hollande, nous nous disputons avec la mer chaque hiver, {sen}. Les princes ne nous font pas peur.', '*sent légèrement la tourbe et le sel*'] }
  },
  brunswick: {
    food: ['Westphalian ham and rye bread', 'jambon de Westphalie et pain de seigle'], drink: ['Brunswick mumme beer', 'bière mumme de Brunswick'], oath: ['By Saint Blaise!', 'Par saint Blaise !'],
    custom: ['salt from Lüneburg pays for half the churches of the north', 'le sel de Lunebourg paie la moitié des églises du Nord'], traits: ['Proud', 'Loyal', 'Plain speech'],
    lines: { en: ['Our lion has stood in Brunswick for two hundred years. He has seen many suitors leave.', 'In Bremen the merchants have a stone Roland to guard their freedoms. I have my own guardians.'], fr: ['Notre lion se dresse à Brunswick depuis deux cents ans. Il a vu partir bien des prétendants.', 'À Brême, les marchands ont un Roland de pierre pour garder leurs libertés. J’ai mes propres gardiens.'] }
  },
  mecklenburg: {
    food: ['smoked fish of the Baltic', 'poisson fumé de la Baltique'], drink: ['beer of Wismar', 'bière de Wismar'], oath: ['By the Holy Blood of Wilsnack!', 'Par le Saint-Sang de Wilsnack !'],
    custom: ['the Diet of the Hanse meets in Lübeck, and kings wait at its door', 'la diète de la Hanse se réunit à Lübeck, et les rois attendent à sa porte'], traits: ['Cunning', 'Bold', 'Learned'],
    lines: { en: ['In Lübeck a merchant’s word is worth more than a duke’s seal. I have both.', '*counts on her fingers* Herring, salt, furs, amber… everything passes through Lübeck, {sen}.'], fr: ['À Lübeck, la parole d’un marchand vaut plus que le sceau d’un duc. J’ai les deux.', '*compte sur ses doigts* Hareng, sel, fourrures, ambre… tout passe par Lübeck, {sen}.'] }
  },
  brandenburg: {
    food: ['carp from the Havel and turnips', 'carpe de la Havel et navets'], drink: ['beer of Bernau', 'bière de Bernau'], oath: ['By Saint Otto of Pomerania!', 'Par saint Otton de Poméranie !'],
    custom: ['this very year the Emperor gave the March to a Hohenzollern, and the robber knights are not pleased', 'cette année même, l’Empereur a donné la Marche à un Hohenzollern, et les chevaliers brigands ne sont pas contents'], traits: ['Stern', 'Rebellious', 'Bold'],
    lines: { en: ['Sand, pines and lakes, {sen}. Brandenburg is poor, but it is proud.', 'The new margrave brought cannon to knock down the Quitzows’ castles. I watched from the walls.'], fr: ['Du sable, des pins et des lacs, {sen}. Le Brandebourg est pauvre, mais il est fier.', 'Le nouveau margrave a amené des canons pour abattre les châteaux des Quitzow. J’ai regardé du haut des remparts.'] }
  },
  denmark: {
    food: ['herring of the Sound and rye porridge', 'hareng du Sund et bouillie de seigle'], drink: ['mead and Rostock beer', 'hydromel et bière de Rostock'], oath: ['By Saint Knud!', 'Par saint Knud !'],
    custom: ['one king wears three crowns, and the queen is an English princess', 'un seul roi porte trois couronnes, et la reine est une princesse anglaise'], traits: ['Bold', 'Proud', 'Loyal'],
    lines: { en: ['Every ship that enters the Baltic passes under our eyes, {sen}. Every one.', '*draws her fur closer* The Sound froze last winter. We walked to Scania.'], fr: ['Chaque navire qui entre dans la Baltique passe sous nos yeux, {sen}. Chacun.', '*resserre sa fourrure* Le Sund a gelé l’hiver dernier. Nous sommes allés à pied en Scanie.'] }
  }
};
