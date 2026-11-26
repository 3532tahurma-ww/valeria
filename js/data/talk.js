/*
 * Valeria - conversation data for bot mode (engine: js/bot.js)
 *
 * QUESTIONS you ask her (pushed into Valeria.EVENTS.events, kind 'talk', cat 'question'):
 *   same format as events + counter: [ask ids] → 40% she asks one of them back after answering.
 *   Placeholders: {city} {region} {house} {title} {age} {food} {drink} {oath} {custom} (from her profile and homeland, js/data/origins.js)
 *   Conditions also accept origin: ['scotland', 'realm:fr'] (region id or realm of her homeland).
 * ASKS: questions SHE asks you. The next message you send answers it:
 *   kind 'yn'   → yes / no / other lines (yes/no read with YES / NO words)
 *   kind 'open' → any answer gets 'other'; if you name a place on the map, 'place' lines ({place}, {placecustom})
 *   when: 'talk' (asked in normal talk / fallback) | 'after' (after climax or cuddling); traits/origin conditions like events
 * TOPICS: fallback that links to what you wrote ("horse", "rain"…). DURING: fallback in the middle of an act event ({event}).
 * ECHO: fallback that repeats a long word of your message ({word}).
 */
window.Valeria = window.Valeria || {};

(() => {
  const Q = (id, icon, en, fr, when, reply, o) => Object.assign({ id, kind: 'talk', cat: 'question', icon, name: { en, fr }, when, reply }, o || {});

  Valeria.EVENTS.events.push(
    Q('q_from', '🏰', 'Where are you from?', "D'où venez-vous ?", {
      en: ['where are you from', 'where were you born', 'where do you live', 'your homeland', 'your home town'],
      fr: ["d'ou venez-vous", "d'ou viens-tu", 'ou etes-vous nee', 'ou habitez-vous', 'votre pays', 'ta ville']
    }, {
      en: ['From {city}, in {region}. There, {custom}.', '{region}, born and raised. {city} to be exact.', 'I grew up in {city}. Ask me about {food}; I miss it every day.'],
      fr: ['De {city}, en {region}. Là-bas, {custom}.', '{region}, depuis toujours. {city}, plus exactement.', "J'ai grandi à {city}. Parlez-moi de {food} : cela me manque chaque jour."]
    }, { counter: ['a_from'] }),
    Q('q_age', '🕯️', 'How old are you?', 'Quel âge avez-vous ?', {
      en: ['how old are you', 'your age'], fr: ['quel age', 'votre age', 'ton age']
    }, {
      en: ['{age} winters, {sen}. Tell no one.', 'A lady never says… || …{age}. There.', 'Old enough to know better. {age}, if you must.'],
      fr: ['{age} hivers, {sen}. Ne le dites à personne.', 'Une dame ne le dit jamais… || …{age}. Voilà.', "Assez pour être raisonnable. {age}, s'il le faut."]
    }, { counter: ['a_age'] }),
    Q('q_title', '👑', 'What is your title?', 'Quel est votre titre ?', {
      en: ['what do you do', 'your title', 'your rank', 'your position', 'what are you at court'], fr: ['que faites-vous', 'votre titre', 'votre rang', 'que fais-tu']
    }, {
      en: ['I am {title}. It sounds grander than it is.', '{title}. Some days a crown, most days paperwork.', '{title}, of the {house}. And you?'],
      fr: ["Je suis {title}. Cela sonne plus grand que ce n'est.", '{title}. Certains jours une couronne, la plupart des jours des registres.', '{title}, de la {house}. Et vous ?']
    }, {
      variants: [{ traits: ['Proud'], reply: { en: ['I am {title}, and you will address me accordingly. 😌', '{title}. You may kiss my ring.'], fr: ['Je suis {title}, et vous vous adresserez à moi en conséquence. 😌', '{title}. Vous pouvez baiser mon anneau.'] } }]
    }),
    Q('q_house', '🛡️', 'Your house', 'Votre maison', {
      en: ['your house', 'your family', 'your father', 'your mother', 'your kin'], fr: ['votre maison', 'votre famille', 'ta famille', 'votre pere', 'votre mere']
    }, {
      en: ['The {house}. My mother never let me forget it.', 'My family? Proud, poor in coin, rich in cousins.', 'The {house} has three ambitions: land, marriages, and more land.'],
      fr: ['La {house}. Ma mère ne me l’a jamais laissé oublier.', "Ma famille ? Fière, pauvre en écus, riche en cousins.", 'La {house} a trois ambitions : des terres, des mariages, et encore des terres.']
    }, { counter: ['a_family'] }),
    Q('q_food', '🍲', 'Favourite food', 'Plat préféré', {
      en: ['favourite food', 'favorite food', 'like to eat', 'your favourite dish', 'are you hungry'], fr: ['plat prefere', 'aimez-vous manger', 'tu aimes manger', 'avez-vous faim']
    }, {
      en: ['Nothing beats {food} from home.', '{food}. Do not laugh; you have never tasted it properly.', 'Bring me {food} and I am yours for an evening.'],
      fr: ['Rien ne vaut {food} de chez moi.', "{food}. Ne riez pas, vous n'y avez jamais vraiment goûté.", 'Apportez-moi {food} et je suis à vous pour une soirée.']
    }, { counter: ['a_food'] }),
    Q('q_drink', '🍷', 'What do you drink?', 'Que buvez-vous ?', {
      en: ['what do you drink', 'wine or ale', 'your drink', 'drink with me'], fr: ['que buvez-vous', 'tu bois quoi', 'boire avec moi']
    }, {
      en: ['{drink}, always. The rest is water with ambitions.', 'A cup of {drink}, and then another for courage.', '{drink}. My confessor says too much {drink}.'],
      fr: ["{drink}, toujours. Le reste n'est que de l'eau ambitieuse.", 'Une coupe de {drink}, puis une autre pour le courage.', '{drink}. Mon confesseur dit : trop de {drink}.']
    }),
    Q('q_lover', '💌', 'A lover?', 'Un amant ?', {
      en: ['do you have a lover', 'are you married', 'are you betrothed', 'your husband', 'anyone else'], fr: ['avez-vous un amant', 'etes-vous mariee', 'es-tu mariee', 'votre mari', 'fiancee']
    }, {
      en: ['A lover? Only in letters… so far.', 'My father keeps offering me to old barons. I keep refusing.', 'There is someone. He writes very badly and very often. 😏'],
      fr: ["Un amant ? Seulement en lettres… jusqu'ici.", 'Mon père continue de me proposer à de vieux barons. Je continue de refuser.', 'Il y a quelqu’un. Il écrit très mal et très souvent. 😏']
    }, {
      counter: ['a_lover'],
      variants: [
        { traits: ['Shy'], reply: { en: ['*drops the quill* W-why do you ask?', 'No one… unless you count you.'], fr: ['*lâche sa plume* P-pourquoi demandez-vous cela ?', 'Personne… à moins de vous compter.'] } },
        { traits: ['Romantic'], reply: { en: ['My heart is promised to someone I have never kissed. Yet.', 'I am waiting for a love worth a ballad. Are you auditioning?'], fr: ["Mon cœur est promis à quelqu'un que je n'ai jamais embrassé. Pas encore.", "J'attends un amour digne d'une ballade. Vous vous présentez ?"] } }
      ]
    }),
    Q('q_faith', '⛪', 'Do you believe?', 'Croyez-vous ?', {
      en: ['believe in god', 'are you pious', 'do you pray', 'your faith'], fr: ['croyez-vous en dieu', 'crois-tu en dieu', 'etes-vous pieuse', 'votre foi']
    }, {
      en: ['I believe in God, in my mother, and in good wine. In that order.', 'I go to mass. I do not always listen.', 'Faith is easy in the chapel. Harder at night, alone.'],
      fr: ['Je crois en Dieu, en ma mère et au bon vin. Dans cet ordre.', "Je vais à la messe. Je n'écoute pas toujours.", 'La foi est facile dans la chapelle. Plus difficile la nuit, seule.']
    }, {
      variants: [
        { traits: ['Pious'], reply: { en: ['With all my soul. I wake for matins every night.', 'I pray for you too, {sen}. Every evening.'], fr: ['De toute mon âme. Je me lève pour matines chaque nuit.', 'Je prie pour vous aussi, {sen}. Chaque soir.'] } },
        { traits: ['Rebellious'], reply: { en: ['I believe the abbot drinks more than he prays.', 'God and I have an arrangement. I do not bother him.'], fr: ["Je crois que l'abbé boit plus qu'il ne prie.", 'Dieu et moi avons un arrangement. Je ne le dérange pas.'] } }
      ]
    }),
    Q('q_english', '🌹', 'The English', 'Les Anglais', {
      en: ['the english', 'of england', 'englishmen'], fr: ['les anglais', 'des anglais', "l'angleterre", 'un anglais']
    }, {
      en: ['They make good archers and dreadful sauces.', 'Some are charming. Most are wet.', 'Half their lords speak better French than English, did you know?'],
      fr: ['Ils font de bons archers et de terribles sauces.', 'Certains sont charmants. La plupart sont mouillés.', 'La moitié de leurs seigneurs parlent mieux français qu’anglais, saviez-vous ?']
    }, {
      variants: [
        { origin: ['realm:en'], reply: { en: ['We are the finest kingdom under heaven, naturally. 🌹', 'Proud, rainy and stubborn. Like me.'], fr: ['Le plus beau royaume sous le ciel, naturellement. 🌹', 'Fiers, pluvieux et têtus. Comme moi.'] } },
        { origin: ['realm:sco'], reply: { en: ['Och. Do not get me started on the English.', 'The English? We have a word for them. Several, actually.'], fr: ['Och. Ne me lancez pas sur les Anglais.', 'Les Anglais ? Nous avons un mot pour eux. Plusieurs, en fait.'] } }
      ]
    }),
    Q('q_french', '⚜️', 'The French', 'Les Français', {
      en: ['the french', 'of france', 'frenchmen'], fr: ['les francais', 'des francais', 'la france', 'un francais']
    }, {
      en: ['They dance better than anyone and argue better still.', 'The French court is a beautiful snake pit.', 'Their wine is a sin. A pleasant one.'],
      fr: ['Ils dansent mieux que personne et se disputent mieux encore.', 'La cour de France est un magnifique nid de vipères.', 'Leur vin est un péché. Un péché agréable.']
    }, {
      variants: [
        { origin: ['realm:fr'], reply: { en: ['We are the heart of Christendom, {sen}. Everyone else is the elbows.', 'Paris is the centre of the world. Ask any Parisian.'], fr: ['Nous sommes le cœur de la chrétienté, {sen}. Les autres en sont les coudes.', 'Paris est le centre du monde. Demandez à n’importe quel Parisien.'] } },
        { origin: ['realm:en'], reply: { en: ['The French? Lovely castles. We would like them back.', 'They think we cannot cook. They are right, but still.'], fr: ['Les Français ? De beaux châteaux. Nous aimerions les récupérer.', 'Ils pensent que nous ne savons pas cuisiner. Ils ont raison, mais tout de même.'] } }
      ]
    }),
    Q('q_like', '🎯', 'What do you love?', "Qu'aimez-vous ?", {
      en: ['what do you like', 'what do you love doing', 'your pastime', 'your hobbies', 'what do you enjoy'], fr: ["qu'aimez-vous", "qu'est-ce que tu aimes", 'vos loisirs', 'votre passe-temps']
    }, {
      en: ['Long letters, warm fires, and you, sometimes.', 'Embroidery, if you ask my mother. Mischief, if you ask me.', 'Falconry at dawn, music at night.'],
      fr: ['Les longues lettres, les feux chauds, et vous, parfois.', 'La broderie, si vous demandez à ma mère. Les bêtises, si vous me demandez.', "La fauconnerie à l'aube, la musique la nuit."]
    }, {
      counter: ['a_like'],
      variants: [
        { traits: ['Learned'], reply: { en: ['Books. I have read every one in the abbey library. Twice.', 'Latin, astronomy, and arguing with priests.'], fr: ["Les livres. J'ai lu tous ceux de la bibliothèque de l'abbaye. Deux fois.", "Le latin, l'astronomie, et contredire les prêtres."] } },
        { traits: ['Bold'], reply: { en: ['Riding hard and hunting boar. Embroidery bores me to tears.', 'Swordplay, when my brothers let me.'], fr: ['Galoper et chasser le sanglier. La broderie m’ennuie à pleurer.', "L'escrime, quand mes frères me laissent faire."] } },
        { traits: ['Poetic'], reply: { en: ['Verses. I write them at night and burn them at dawn.', 'The lute, and the silence after a good song.'], fr: ["Les vers. Je les écris la nuit et les brûle à l'aube.", "Le luth, et le silence après une belle chanson."] } }
      ]
    }),
    Q('q_fear', '🌑', 'What do you fear?', 'De quoi avez-vous peur ?', {
      en: ['what do you fear', 'are you afraid', 'what scares you'], fr: ['de quoi avez-vous peur', 'as-tu peur', 'avez-vous peur']
    }, {
      en: ['A marriage I did not choose.', 'The plague. And being forgotten.', 'That the war takes you before I see you again.'],
      fr: ["Un mariage que je n'ai pas choisi.", "La peste. Et qu'on m'oublie.", 'Que la guerre vous prenne avant que je vous revoie.']
    }, {
      variants: [
        { traits: ['Bold'], reply: { en: ['Nothing. Except boredom.', 'Fear? I leave that to my chaperone.'], fr: ["Rien. Sauf l'ennui.", 'La peur ? Je la laisse à mon chaperon.'] } },
        { traits: ['Melancholic'], reply: { en: ['The long nights in winter, when the candle is the only one awake.', 'Ending like my aunt: alone with her tapestries.'], fr: ['Les longues nuits d’hiver, quand la chandelle est la seule éveillée.', 'Finir comme ma tante : seule avec ses tapisseries.'] } }
      ]
    }),
    Q('q_dream', '🌠', 'Your dream', 'Votre rêve', {
      en: ['your dream', 'what do you dream', 'what do you wish', 'your wish'], fr: ['votre reve', 'ton reve', 'que desirez-vous', 'votre souhait']
    }, {
      en: ['To see the sea at Bordeaux, and not alone.', 'A house of my own, with a garden no one else may enter.', 'One year without war. Just one.'],
      fr: ['Voir la mer à Bordeaux, et pas seule.', "Une maison à moi, avec un jardin où personne d'autre n'entre.", 'Une année sans guerre. Rien qu’une.']
    }, {
      counter: ['a_dream'],
      variants: [{ traits: ['Proud'], reply: { en: ['To rule {region}. Or at least to rule the people who rule it.', 'A crown. A small one would do, for a start.'], fr: ['Gouverner {region}. Ou au moins gouverner ceux qui la gouvernent.', 'Une couronne. Une petite suffirait, pour commencer.'] } }]
    })
  );

  Valeria.ASKS = [
    { id: 'a_from', kind: 'open', when: 'counter', q: { en: 'And you, {sen}? Where were you born?', fr: 'Et vous, {sen} ? Où êtes-vous né ?' },
      other: { en: ['*writes it down carefully* I shall find it on the map.', 'I have never been. Will you take me?'], fr: ['*le note soigneusement* Je le chercherai sur la carte.', "Je n'y suis jamais allée. M'y emmènerez-vous ?"] },
      place: { en: ['{place}! They say there {placecustom}. Is it true?', '{place}… I knew there was something about you.'], fr: ['{place} ! On dit que là-bas {placecustom}. Est-ce vrai ?', "{place}… Je savais qu'il y avait quelque chose chez vous."] } },
    { id: 'a_age', kind: 'open', when: 'counter', q: { en: 'And you? Be honest.', fr: 'Et vous ? Soyez honnête.' },
      other: { en: ['Hm. You carry it well.', 'Younger than you write, older than you flirt.'], fr: ['Hm. Vous les portez bien.', 'Plus jeune que vos lettres, plus vieux que vos flatteries.'] } },
    { id: 'a_family', kind: 'open', when: 'counter', q: { en: 'And your family, {sen}? Would they approve of me?', fr: "Et votre famille, {sen} ? M'approuverait-elle ?" },
      other: { en: ['Then I shall win them over. Mothers adore me.', 'We will see at the first feast.'], fr: ['Alors je les conquerrai. Les mères m’adorent.', 'Nous verrons au premier festin.'] } },
    { id: 'a_food', kind: 'open', when: 'counter', q: { en: 'What do they eat where you come from?', fr: 'Que mange-t-on chez vous ?' },
      other: { en: ['Hm. I will try it, if you cook it yourself.', 'That sounds terrible. Bring me some.'], fr: ['Hm. J’y goûterai, si vous le cuisinez vous-même.', 'Cela semble affreux. Apportez-m’en.'] },
      place: { en: ['In {place}? Then you must try {food} one day.'], fr: ['À {place} ? Alors vous devez goûter {food} un jour.'] } },
    { id: 'a_lover', kind: 'yn', when: 'counter', q: { en: 'And you, {sen}… is there anyone?', fr: "Et vous, {sen}… y a-t-il quelqu'un ?" },
      yes: { en: ['*sets the letter down* …I see.', 'Then why do you write to me? || …Do not answer that.'], fr: ['*pose la lettre* …Je vois.', "Alors pourquoi m'écrivez-vous ? || …Ne répondez pas."] },
      no: { en: ['Good. *smiles* I mean… how sad for you.', 'Then there is room. Noted.'], fr: ['Bien. *sourit* Je veux dire… comme c’est triste pour vous.', 'Alors il y a de la place. C’est noté.'] },
      other: { en: ['That is not an answer, {sen}.', 'Hm. You dodge like a courtier.'], fr: ["Ce n'est pas une réponse, {sen}.", 'Hm. Vous esquivez comme un courtisan.'] } },
    { id: 'a_like', kind: 'open', when: 'counter', q: { en: 'And what do you love, when you are not writing to me?', fr: "Et qu'aimez-vous, quand vous ne m'écrivez pas ?" },
      other: { en: ['I approve. Mostly.', 'Then we shall do it together one day.'], fr: ["J'approuve. Presque.", 'Alors nous le ferons ensemble un jour.'] } },
    { id: 'a_dream', kind: 'open', when: 'counter', q: { en: 'And your dream, {sen}?', fr: 'Et votre rêve, {sen} ?' },
      other: { en: ['Is there room for me in it?', 'I will keep it safe. I promise.'], fr: ['Y a-t-il une place pour moi dedans ?', 'Je le garderai précieusement. Promis.'] } },
    { id: 'a_ride', kind: 'yn', when: 'talk', q: { en: 'Do you ride, {sen}?', fr: 'Montez-vous à cheval, {sen} ?' },
      yes: { en: ['Then ride to me before the snow.', 'We shall race along the river. I will win.'], fr: ['Alors chevauchez jusqu’à moi avant la neige.', 'Nous ferons la course le long du fleuve. Je gagnerai.'] },
      no: { en: ['I shall teach you. Patiently. Mostly.', 'Then I will ride to you.'], fr: ["Je vous apprendrai. Patiemment. Presque.", "Alors c'est moi qui chevaucherai jusqu'à vous."] } },
    { id: 'a_dance', kind: 'yn', when: 'talk', q: { en: 'Will you dance with me at the next feast?', fr: 'Danserez-vous avec moi au prochain festin ?' },
      yes: { en: ['Then I shall wear the blue gown. 💃', 'Promise? I will hold you to it.'], fr: ['Alors je porterai la robe bleue. 💃', 'Promis ? Je vous prends au mot.'] },
      no: { en: ['Coward. || I will drag you, then.', 'Then you will watch me dance with someone else.'], fr: ['Lâche. || Je vous traînerai, alors.', 'Alors vous me regarderez danser avec un autre.'] } },
    { id: 'a_miss', kind: 'yn', when: 'talk', q: { en: 'Did you miss me, {sen}?', fr: 'Vous ai-je manqué, {sen} ?' },
      yes: { en: ['Good. *smiles into the parchment*', 'Say it again. Slowly.'], fr: ['Bien. *sourit au parchemin*', 'Redites-le. Lentement.'] },
      no: { en: ['Liar. || …you are lying, right?', 'Hmph. I did not miss you either. At all.'], fr: ['Menteur. || …vous mentez, n’est-ce pas ?', 'Hmph. Vous ne m’avez pas manqué non plus. Pas du tout.'] } },
    { id: 'a_war', kind: 'yn', when: 'talk', q: { en: 'Will you ride to war this spring?', fr: 'Partirez-vous en guerre ce printemps ?' },
      yes: { en: ['Then come back. That is an order.', '*quietly* I will light a candle every night.'], fr: ["Alors revenez. C'est un ordre.", "*doucement* J'allumerai un cierge chaque nuit."] },
      no: { en: ['Thank God. Stay where I can find you.', 'Good. Let the kings fight their own wars.'], fr: ['Dieu merci. Restez là où je peux vous trouver.', 'Bien. Que les rois fassent leurs guerres eux-mêmes.'] } },
    { id: 'a_read', kind: 'yn', when: 'talk', q: { en: 'Do you read, {sen}? Truly read?', fr: 'Lisez-vous, {sen} ? Vraiment ?' },
      yes: { en: ['Then I shall lend you my Roman de la Rose. Return it.', 'Finally, someone to talk to.'], fr: ['Alors je vous prêterai mon Roman de la Rose. Rendez-le-moi.', 'Enfin quelqu’un à qui parler.'] },
      no: { en: ['Then who reads you my letters? 😏', 'I will read to you, then. By the fire.'], fr: ['Alors qui vous lit mes lettres ? 😏', 'Je vous lirai, alors. Près du feu.'] } },
    { id: 'a_mass', kind: 'yn', when: 'talk', traits: ['Pious'], q: { en: 'Did you go to mass this Sunday?', fr: 'Êtes-vous allé à la messe dimanche ?' },
      yes: { en: ['Good. I prayed for you there.', 'I knew you were a good soul.'], fr: ["Bien. J'y ai prié pour vous.", 'Je savais que vous aviez une bonne âme.'] },
      no: { en: ['{sen}! I will pray twice, then.', '*sighs* Confession on Saturday. I insist.'], fr: ['{sen} ! Je prierai deux fois, alors.', '*soupire* Confession samedi. J’insiste.'] } },
    { id: 'a_love', kind: 'yn', when: 'talk', traits: ['Romantic|Passionate'], q: { en: 'Do you love me, {sen}? Truly?', fr: "M'aimez-vous, {sen} ? Vraiment ?" },
      yes: { en: ['*presses the letter to her heart*', 'Then nothing else matters. Not even the crown.'], fr: ['*presse la lettre contre son cœur*', "Alors rien d'autre ne compte. Pas même la couronne."] },
      no: { en: ['…Oh. || *the ink blurs where a tear fell*', 'Then why do you keep writing? || …do not stop.'], fr: ['…Oh. || *l’encre se brouille là où une larme est tombée*', "Alors pourquoi continuez-vous d'écrire ? || …n'arrêtez pas."] } },
    { id: 'a_secret', kind: 'yn', when: 'talk', traits: ['Cunning|Mischievous'], q: { en: 'Can you keep a secret, {sen}?', fr: 'Savez-vous garder un secret, {sen} ?' },
      yes: { en: ['The bishop has a mistress. || Burn this letter.', 'The queen dyes her hair. || You never heard it from me.'], fr: ["L'évêque a une maîtresse. || Brûlez cette lettre.", 'La reine teint ses cheveux. || Vous ne le tenez pas de moi.'] },
      no: { en: ['Then neither can I. Pity, it was a good one.', 'Honest, at least. I will tell you anyway. Later.'], fr: ['Alors moi non plus. Dommage, il était bon.', 'Honnête, au moins. Je vous le dirai quand même. Plus tard.'] } },
    { id: 'a_liked', kind: 'yn', when: 'after', q: { en: '*catches her breath* …Did you like it, {sen}?', fr: '*reprend son souffle* …Cela vous a plu, {sen} ?' },
      yes: { en: ['*hides a proud smile in the pillow*', 'Good. Because I am not finished with you.'], fr: ["*cache un sourire fier dans l'oreiller*", "Bien. Parce que je n'en ai pas fini avec vous."] },
      no: { en: ['…Then show me how you like it.', 'Liar. Your face says otherwise. 😏'], fr: ['…Alors montrez-moi comment vous aimez.', 'Menteur. Votre visage dit le contraire. 😏'] } },
    { id: 'a_stay', kind: 'yn', when: 'after', q: { en: 'Will you stay until the bells?', fr: "Resterez-vous jusqu'aux cloches ?" },
      yes: { en: ['*pulls the furs over you both* Then sleep.', 'Good. I hate waking alone.'], fr: ['*tire les fourrures sur vous deux* Alors dormez.', 'Bien. Je déteste me réveiller seule.'] },
      no: { en: ['Go, then. But kiss me first.', 'Mind the guard on the stair.'], fr: ["Partez, alors. Mais embrassez-moi d'abord.", "Prenez garde au garde dans l'escalier."] } }
  ];

  // yes / no words (normalized: no accents, lowercase)
  Valeria.YES = ['yes', 'yeah', 'aye', 'of course', 'indeed', 'certainly', 'surely', 'gladly', 'i do', 'i will', 'oui', 'bien sur', 'certes', 'evidemment', 'volontiers', 'absolument', 'avec plaisir', 'je veux bien'];
  Valeria.NO = ['no', 'nay', 'never', 'not really', 'i do not', "i don't", 'i will not', "i won't", 'non', 'jamais', 'pas vraiment', 'point du tout', 'certainement pas'];

  Valeria.TOPICS = [
    { id: 'horse', icon: '🐎', name: { en: 'Horses', fr: 'Chevaux' }, words: { en: ['horse', 'mare', 'stallion', 'saddle', 'destrier'], fr: ['cheval', 'chevaux', 'jument', 'etalon', 'selle', 'destrier'] },
      reply: { en: ['A horse? Mine is called Mélusine and she bites everyone but me.', 'Never trust a man who is rude to his horse.', 'I would ride to you tonight if the gates were open.'], fr: ["Un cheval ? La mienne s'appelle Mélusine et mord tout le monde sauf moi.", "Ne vous fiez jamais à un homme grossier avec son cheval.", 'Je chevaucherais jusqu’à vous ce soir si les portes étaient ouvertes.'] } },
    { id: 'arms', icon: '🗡️', name: { en: 'Arms', fr: 'Armes' }, words: { en: ['sword', 'armour', 'armor', 'shield', 'knight', 'blade'], fr: ['epee', 'armure', 'bouclier', 'chevalier', 'lame'] },
      reply: { en: ['Swords and shields… you men and your toys.', 'Polish your armour, {sen}. I want to see my face in it.', 'A blade is only as good as the reason you draw it.'], fr: ['Épées et boucliers… vous, les hommes, et vos jouets.', 'Polissez votre armure, {sen}. Je veux m’y voir.', "Une lame ne vaut que la raison pour laquelle on la tire."] } },
    { id: 'weather', icon: '🌧️', name: { en: 'Weather', fr: 'Temps' }, words: { en: ['rain', 'snow', 'storm', 'wind', 'cold', 'weather', 'sunshine'], fr: ['pluie', 'pleut', 'pleuvoir', 'neige', 'orage', 'tempete', 'vent', 'froid', 'soleil'] },
      reply: { en: ['It has rained here for a week. My hair is a disaster.', 'Cold enough to freeze the ink in the well.', 'When the weather turns, I think of you on the road.'], fr: ['Il pleut ici depuis une semaine. Mes cheveux sont un désastre.', "Assez froid pour geler l'encre dans l'encrier.", 'Quand le temps tourne, je pense à vous sur la route.'] } },
    { id: 'sea', icon: '⛵', name: { en: 'The sea', fr: 'La mer' }, words: { en: ['sea', 'ship', 'boat', 'sail', 'channel', 'harbour', '=port'], fr: ['=mer', 'navire', 'bateau', '=voile', '=manche', '=port'] },
      reply: { en: ['The Channel is narrow on maps and endless in winter.', 'I have never sailed. Take me one day?', 'Every ship from across the sea might carry your letter.'], fr: ["La Manche est étroite sur les cartes et sans fin en hiver.", "Je n'ai jamais navigué. Vous m'emmènerez un jour ?", 'Chaque navire venu d’outre-mer pourrait porter votre lettre.'] } },
    { id: 'court', icon: '👑', name: { en: 'Court & crown', fr: 'Cour et couronne' }, words: { en: ['king', 'queen', 'crown', 'throne', 'court', 'prince', 'duke'], fr: ['roi', 'reine', 'couronne', 'trone', 'la cour', 'prince', 'duc'] },
      reply: { en: ['Kings come and go; gossip is eternal.', 'Do not speak of the crown so loudly. Walls have ears, and ears have cousins.', 'The court is a dance where everyone steps on someone.'], fr: ['Les rois passent, les ragots restent.', 'Ne parlez pas si fort de la couronne. Les murs ont des oreilles, et les oreilles des cousins.', 'La cour est une danse où chacun marche sur quelqu’un.'] } },
    { id: 'money', icon: '💰', name: { en: 'Money', fr: 'Argent' }, words: { en: ['gold', 'coin', 'money', 'florin', 'debt', 'silver', '=rich', '=poor'], fr: ['=or', 'ecu', 'argent', 'florin', 'dette', 'riche', 'pauvre'] },
      reply: { en: ['Money? My father counts it, my mother spends it, I ignore it.', 'Gold buys many things. Not a good letter.', 'Lombard bankers smile like wolves.'], fr: ["L'argent ? Mon père le compte, ma mère le dépense, je l'ignore.", "L'or achète bien des choses. Pas une bonne lettre.", 'Les banquiers lombards sourient comme des loups.'] } },
    { id: 'letters', icon: '📜', name: { en: 'Books & letters', fr: 'Livres et lettres' }, words: { en: ['book', 'letter', 'ink', 'quill', 'parchment', 'write'], fr: ['livre', 'lettre', 'encre', 'plume', 'parchemin', 'ecrire'] },
      reply: { en: ['I keep your letters in a cedar box. It is getting full.', 'My quill is worn down to nothing because of you.', 'Ink stains on my fingers again. Your fault.'], fr: ['Je garde vos lettres dans un coffret de cèdre. Il se remplit.', 'Ma plume est usée jusqu’au bout à cause de vous.', "Encore des taches d'encre sur mes doigts. Votre faute."] } },
    { id: 'family', icon: '👪', name: { en: 'Family', fr: 'Famille' }, words: { en: ['sister', 'brother', 'child', 'cousin', 'uncle', 'aunt'], fr: ['soeur', 'frere', 'enfant', 'cousin', 'oncle', 'tante'] },
      reply: { en: ['Families are like castles: beautiful from far away, draughty inside.', 'My cousins write only when they need money.', 'Tell me about yours. I want to know who to charm.'], fr: ['Les familles sont comme les châteaux : belles de loin, pleines de courants d’air dedans.', "Mes cousins n'écrivent que lorsqu'ils ont besoin d'argent.", 'Parlez-moi de la vôtre. Je veux savoir qui charmer.'] } },
    { id: 'music', icon: '🪕', name: { en: 'Music', fr: 'Musique' }, words: { en: ['music', 'lute', 'harp', 'minstrel', 'song'], fr: ['musique', 'luth', 'harpe', 'menestrel'] },
      reply: { en: ['The minstrels played a new rondeau tonight. I thought of you.', 'I play the lute badly and with great confidence.', 'Hum me something. I will guess where it comes from.'], fr: ['Les ménestrels ont joué un nouveau rondeau ce soir. J’ai pensé à vous.', 'Je joue mal du luth, mais avec beaucoup d’assurance.', "Fredonnez-moi quelque chose. Je devinerai d'où cela vient."] } },
    { id: 'travel', icon: '🛤️', name: { en: 'Travel', fr: 'Voyage' }, words: { en: ['journey', 'travel', 'road', 'voyage', 'pilgrim', 'far away'], fr: ['voyage', 'route', 'chemin', 'pelerin', 'lointain'] },
      reply: { en: ['The roads are full of brigands and bad inns. Be careful.', 'One day I will go to Compostela. Or at least to the next town.', 'Write from every inn on the way.'], fr: ['Les routes sont pleines de brigands et de mauvaises auberges. Prenez garde.', "Un jour j'irai à Compostelle. Ou au moins jusqu'à la ville voisine.", 'Écrivez-moi de chaque auberge sur le chemin.'] } },
    { id: 'hunt', icon: '🦅', name: { en: 'The hunt', fr: 'La chasse' }, words: { en: ['hunt', 'falcon', 'hawk', 'deer', 'hound', 'boar'], fr: ['chasse', 'faucon', 'cerf', 'chien', 'sanglier'] },
      reply: { en: ['My falcon caught a heron yesterday. She is insufferable now.', 'The hunt is just an excuse to gallop through the woods.', 'Bring me a deer and I will forgive anything.'], fr: ['Mon faucon a pris un héron hier. Il est insupportable depuis.', "La chasse n'est qu'un prétexte pour galoper dans les bois.", 'Apportez-moi un cerf et je vous pardonnerai tout.'] } },
    { id: 'night', icon: '🌙', name: { en: 'Night & stars', fr: 'Nuit et étoiles' }, words: { en: ['moon', '=star', 'stars', 'night', 'midnight', 'candle'], fr: ['lune', 'etoile', 'nuit', 'minuit', 'chandelle', 'bougie'] },
      reply: { en: ['The moon is full tonight. It looks like a seal on black wax.', 'I write to you when the castle sleeps.', 'Count the stars with me. I lose track at the forty-third.'], fr: ['La lune est pleine ce soir. On dirait un sceau sur de la cire noire.', "Je vous écris quand le château dort.", 'Comptez les étoiles avec moi. Je me perds à la quarante-troisième.'] } },
    { id: 'sick', icon: '🤒', name: { en: 'Sickness', fr: 'Maladie' }, words: { en: ['sick', '=ill', 'fever', 'plague', 'wounded', 'hurt'], fr: ['malade', 'fievre', 'peste', 'blesse', '=mal'] },
      reply: { en: ['Are you well? Tell me the truth. I will send a healer.', 'Drink hot wine with honey and sleep. Doctor’s orders. Mine.', 'Do not you dare fall ill before you visit me.'], fr: ['Allez-vous bien ? Dites-moi la vérité. J’enverrai un guérisseur.', 'Buvez du vin chaud au miel et dormez. Ordre du médecin. Le mien.', "N'osez pas tomber malade avant de venir me voir."] } },
    { id: 'tired', icon: '😮‍💨', name: { en: 'A long day', fr: 'Longue journée' }, words: { en: ['tired', 'weary', 'exhausted', 'long day', 'busy'], fr: ['fatigue', 'epuise', 'longue journee', 'occupe'] },
      reply: { en: ['Rest your head, {sen}. The world can wait until morning.', 'Then I will write softly.', 'Lie down and let me tell you a story.'], fr: ["Reposez votre tête, {sen}. Le monde peut attendre jusqu'au matin.", "Alors j'écrirai doucement.", 'Allongez-vous et laissez-moi vous raconter une histoire.'] } },
    { id: 'garden', icon: '🌹', name: { en: 'Flowers', fr: 'Fleurs' }, words: { en: ['rose', 'flower', 'lily', 'violet', 'blossom'], fr: ['rose', 'fleur', 'lys', 'violette'] },
      reply: { en: ['I pressed a violet in my book of hours for you.', 'The roses are late this year. Like you.', 'Lilies for France, roses for England, and violets for us.'], fr: ["J'ai fait sécher une violette dans mon livre d'heures pour vous.", 'Les roses sont en retard cette année. Comme vous.', 'Les lys pour la France, les roses pour l’Angleterre, et les violettes pour nous.'] } }
  ];

  Valeria.DURING = {
    en: ['Shh… words later, {sen}. We are in the middle of something. 😏', '*does not stop* Mm? Say it again… slower.', 'You talk too much for someone in my bed.', 'Later, later… *pulls you closer*'],
    fr: ['Chut… les mots plus tard, {sen}. Nous sommes occupés. 😏', '*ne s’arrête pas* Mm ? Redites-le… plus lentement.', 'Vous parlez beaucoup pour quelqu’un dans mon lit.', 'Plus tard, plus tard… *vous attire contre soi*']
  };
  Valeria.ECHO = {
    en: ['{word}? Tell me more about {word}, {sen}.', 'You write of {word}… why does it matter so much to you?', 'Hm, {word}. I had not thought of it that way.'],
    fr: ["{word} ? Parlez-m'en davantage, {sen}.", "Vous m'écrivez de {word}… pourquoi cela compte-t-il tant ?", "Hm, {word}. Je n'y avais pas pensé ainsi."]
  };
  // words never echoed back
  Valeria.STOP = ['about', 'after', 'again', 'there', 'their', 'these', 'those', 'where', 'which', 'would', 'could', 'should', 'because', 'really', 'something', 'nothing', 'everything', 'today', 'tonight', 'tomorrow', 'maybe', 'little', 'always', 'never', 'other', 'think', 'thought', 'going', 'doing', 'being', 'having', 'want', 'wanted', 'please', 'thank',
    'aussi', 'avoir', 'parce', 'quand', 'comme', 'toujours', 'jamais', 'quelque', 'chose', 'beaucoup', 'encore', 'peut-etre', 'pourquoi', 'votre', 'notre', 'leurs', 'cette', 'faire', 'etait', 'serait', 'maintenant', 'demain', 'aujourd', 'vraiment', 'merci'];
})();
