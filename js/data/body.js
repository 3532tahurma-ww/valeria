/*
 * Valeria - 📏 figure traits, body events, body questions and 🧠 memory lines
 * FIGURE: single-choice groups stored in character.traits as "Group: Value" (same strings as Carmen: "Pussy Size: Tight").
 *   gender: only shown / rolled for that gender. Bot conditions use them like any trait: traits: ['Boob Size: 90|Boob Size: 95'].
 * USER_DICK: your own size (👑 Me), given to the bot as the pseudo-trait "Dick Size: Large" (like Carmen).
 * This file also pushes new events and questions into Valeria.EVENTS, adds figure variants to existing events (VARIANTS),
 * new ASKS (on: [event ids] → she may ask after that event) and MEMORY lines (js/bot.js memory).
 */
window.Valeria = window.Valeria || {};

(() => {
  const V = Valeria;
  const TIGHT = 'Extremely Tight|Very Tight|Tight';
  const any = (g, list) => list.split('|').map(x => `${g}: ${x}`).join('|');

  V.FIGURE = [
    { id: 'Height', icon: '📏', label: { en: 'Height', fr: 'Taille' }, items: ['Very Short', 'Short', 'Average', 'Tall', 'Very Tall'] },
    { id: 'Weight', icon: '⚖️', label: { en: 'Build', fr: 'Corpulence' }, items: ['Very Thin', 'Thin', 'Slim', 'Average', 'Curvy', 'Chubby', 'Overweight'] },
    { id: 'Boob Size', icon: '🍒', label: { en: 'Bosom', fr: 'Poitrine' }, items: ['70', '75', '80', '85', '90', '95'], gender: '♀' },
    { id: 'Butt Size', icon: '🍑', label: { en: 'Hips', fr: 'Hanches' }, items: ['XS', 'S', 'M', 'M/L', 'L', 'XL'], gender: '♀' },
    { id: 'Pussy Size', icon: '🌸', label: { en: 'Pussy Size', fr: 'Intimité' }, items: ['Extremely Tight', 'Very Tight', 'Tight', 'Average', 'Relaxed', 'Loose', 'Very Loose'], gender: '♀' },
    { id: 'Anal Size', icon: '🌹', label: { en: 'Anal Size', fr: 'Intimité arrière' }, items: ['Extremely Tight', 'Very Tight', 'Tight', 'Average', 'Relaxed', 'Loose', 'Very Loose'], gender: '♀' }
  ];
  V.USER_DICK = ['Small', 'Average', 'Large', 'Very Large'];
  // FR labels of the values
  V.FIGURE_FR = {
    'Very Short': 'Très petite', 'Short': 'Petite', 'Average': 'Moyenne', 'Tall': 'Grande', 'Very Tall': 'Très grande',
    'Very Thin': 'Très mince', 'Thin': 'Mince', 'Slim': 'Svelte', 'Curvy': 'Pulpeuse', 'Chubby': 'Ronde', 'Overweight': 'Forte',
    'Extremely Tight': 'Extrêmement étroite', 'Very Tight': 'Très étroite', 'Tight': 'Étroite', 'Relaxed': 'Détendue', 'Loose': 'Large', 'Very Loose': 'Très large',
    'Small': 'Petit', 'Large': 'Grand', 'Very Large': 'Très grand'
  };

  // ---------- new events ----------
  const E = (id, kind, cat, icon, en, fr, when, reply, o) => Object.assign({ id, kind, cat, icon, name: { en, fr }, when, reply }, o || {});
  V.EVENTS.events.push(
    E('hairplay', 'act', 'tender', '💇', 'Unbraiding', 'Cheveux dénoués', {
      en: ['your hair', 'unbraid', 'let your hair down', 'your braids'], fr: ['vos cheveux', 'tes cheveux', 'vos tresses', 'denouez', 'denoue']
    }, {
      en: ['*pulls the pins out one by one* There… it falls to my waist.', 'Run your fingers through it. Slowly.', 'My maid spends an hour on these braids. Ruin them.'],
      fr: ['*retire les épingles une à une* Voilà… ils tombent jusqu’à ma taille.', 'Passez-y les doigts. Lentement.', 'Ma servante passe une heure sur ces tresses. Défaites-les.']
    }),
    E('blindfold', 'act', 'tender', '🎗️', 'Silk ribbon', 'Ruban de soie', {
      en: ['blindfold', 'cover your eyes', 'close your eyes', 'silk ribbon'], fr: ['bandeau', 'fermez les yeux', 'ferme les yeux', 'ruban de soie']
    }, {
      en: ['*the silk slides over her eyes* Now I can only feel you.', 'I cannot see… so tell me what you are doing.', '*laughs nervously* Where are your hands? || …oh. There.'],
      fr: ['*la soie glisse sur ses yeux* Maintenant je ne peux que vous sentir.', 'Je ne vois rien… alors dites-moi ce que vous faites.', '*rit nerveusement* Où sont vos mains ? || …oh. Là.']
    }, { variants: [{ traits: ['Shy'], reply: { en: ['*holds her breath under the ribbon*', 'Promise me you are still there… {sen}?'], fr: ['*retient son souffle sous le ruban*', 'Promettez-moi que vous êtes là… {sen} ?'] } }] }),
    E('window', 'act', 'tender', '🌙', 'By the window', 'À la fenêtre', {
      en: ['by the window', 'at the window', 'the moonlight'], fr: ['a la fenetre', 'pres de la fenetre', 'clair de lune']
    }, {
      en: ['*leans against the window, moonlight on her skin*', 'The whole town sleeps. Only the moon sees us.', 'Hold me here. I want to watch the river with you.'],
      fr: ['*s’appuie contre la fenêtre, la lune sur sa peau*', 'Toute la ville dort. Seule la lune nous voit.', 'Tenez-moi ici. Je veux regarder le fleuve avec vous.']
    }),
    E('breasts', 'act', 'tender', '🍒', 'Her bosom', 'Sa poitrine', {
      en: ['your breasts', 'your bosom', 'kiss your breasts', 'touch your breasts'], fr: ['vos seins', 'tes seins', 'votre poitrine', 'ta poitrine']
    }, {
      en: ['*loosens the bodice* Gently…', '*gasps* Your hands are cold! || …do not stop.', 'The neckline was cut low for a reason, {sen}.'],
      fr: ['*desserre son corsage* Doucement…', '*sursaute* Vos mains sont froides ! || …n’arrêtez pas.', 'Le décolleté était échancré pour une raison, {sen}.']
    }, {
      gender: '♀',
      variants: [
        { traits: [any('Boob Size', '70|75')], reply: { en: ['*covers them shyly* They are small… do you mind?', 'Small, but they are yours tonight.'], fr: ['*les couvre timidement* Elle est menue… cela vous dérange ?', 'Menue, mais elle est à vous ce soir.'] } },
        { traits: [any('Boob Size', '90|95')], reply: { en: ['*the laces strain* Careful, this bodice was not made for your hands.', 'The tailor despairs of me every season. 😏'], fr: ['*les lacets se tendent* Prudence, ce corsage n’a pas été taillé pour vos mains.', 'Le tailleur désespère de moi chaque saison. 😏'] } },
        { traits: ['Shy'], reply: { en: ['*crosses her arms over her chest* …Slowly.', '*blushes down to the collarbone*'], fr: ['*croise les bras sur sa poitrine* …Lentement.', '*rougit jusqu’aux clavicules*'] } }
      ]
    }),
    E('bottom', 'act', 'tender', '🍑', 'Her hips', 'Ses hanches', {
      en: ['your bottom', 'your behind', 'your hips', 'your rear'], fr: ['vos fesses', 'tes fesses', 'vos hanches', 'votre derriere']
    }, {
      en: ['*sways a little on purpose* Like what you see?', 'Hands where I can feel them, {sen}.', 'My dressmaker calls them "noble hips". 😏'],
      fr: ['*ondule un peu exprès* Cela vous plaît ?', 'Les mains là où je les sens, {sen}.', 'Ma couturière les appelle « des hanches nobles ». 😏']
    }, {
      gender: '♀',
      variants: [
        { traits: [any('Butt Size', 'XS|S')], reply: { en: ['Slim hips, says the dressmaker. Boyish, says my mother. *rolls her eyes*', 'There is not much to hold… hold it anyway.'], fr: ['Des hanches fines, dit la couturière. Garçonnières, dit ma mère. *lève les yeux au ciel*', 'Il n’y a pas grand-chose à tenir… tenez-le quand même.'] } },
        { traits: [any('Butt Size', 'L|XL')], reply: { en: ['*glances back* Generous, are they not? 😏', 'Every gown has to be let out at the hips. Worth it?'], fr: ['*jette un regard en arrière* Généreuses, n’est-ce pas ? 😏', 'Chaque robe doit être élargie aux hanches. Cela en vaut la peine ?'] } }
      ]
    }),
    E('spank', 'act', 'tender', '👋', 'Spanking', 'Fessée', { en: ['spank', 'smack your'], fr: ['fessee', 'claque'] }, {
      en: ['*yelps, then laughs* {sen}!', 'Again… and harder. 😈', 'That will leave a mark under my skirts.'],
      fr: ['*pousse un cri, puis rit* {sen} !', 'Encore… et plus fort. 😈', 'Cela laissera une marque sous mes jupes.']
    }, {
      variants: [
        { traits: ['Shy'], reply: { en: ['*squeaks* …w-what was that for?'], fr: ['*couine* …p-pourquoi cela ?'] } },
        { traits: ['Proud'], reply: { en: ['How DARE you. || …do it again.'], fr: ['Comment OSEZ-vous. || …recommencez.'] } }
      ]
    }),
    E('lower', 'act', 'intimacy', '👅', 'Kisses lower', 'Baisers plus bas', {
      en: ['kiss lower', 'go lower', 'between your thighs', 'taste you', 'go down on'], fr: ['plus bas', 'entre vos cuisses', 'entre tes cuisses', 'vous gouter', 'te gouter']
    }, {
      en: ['*grips the sheets* Lower… yes, there.', 'Mmh… where did a knight learn that? 😳', '*fingers in your hair* Do not stop, {sen}.'],
      fr: ['*agrippe les draps* Plus bas… oui, là.', 'Mmh… où un chevalier a-t-il appris cela ? 😳', '*les doigts dans vos cheveux* N’arrêtez pas, {sen}.']
    }, {
      prio: 1, gender: '♀',
      variants: [
        { traits: ['Shy'], reply: { en: ['*covers her face with a pillow* …Oh. Oh.'], fr: ['*se cache le visage sous un oreiller* …Oh. Oh.'] } },
        { traits: ['Pious'], reply: { en: ['*bites the rosary* Saints preserve me…'], fr: ['*mord son chapelet* Que les saints me gardent…'] } }
      ]
    }),
    E('anal', 'act', 'intimacy', '🌹', 'The other way', "Par l'autre chemin", {
      en: ['anal', 'the other way', 'back door'], fr: ['sodomie', "l'autre chemin", 'anal']
    }, {
      en: ['*breath catches* Slowly, {sen}… very slowly.', 'This is a sin even the bishop has not heard of. 😈', '*buries her face in the pillow* …go on.'],
      fr: ['*retient son souffle* Lentement, {sen}… très lentement.', "Voilà un péché dont même l'évêque n'a jamais entendu parler. 😈", "*enfouit son visage dans l'oreiller* …continuez."]
    }, {
      prio: 1, gender: '♀',
      variants: [
        { traits: [any('Anal Size', TIGHT)], reply: { en: ['*gasps* Wait… slowly. I have never… slowly.', 'Gently… *trembles* gently, {sen}.'], fr: ['*halète* Attendez… lentement. Je n’ai jamais… lentement.', 'Doucement… *tremble* doucement, {sen}.'] } },
        { traits: [any('Anal Size', 'Relaxed|Loose|Very Loose')], reply: { en: ['Do not be so careful, {sen}. I am not made of glass.', '*pushes back against you* You are not my first secret. 😏'], fr: ['Ne soyez pas si prudent, {sen}. Je ne suis pas de verre.', '*se presse contre vous* Vous n’êtes pas mon premier secret. 😏'] } },
        { traits: ['Shy'], reply: { en: ['*barely a whisper* …only for you.'], fr: ['*dans un souffle* …seulement pour vous.'] } }
      ]
    }),
    E('hayloft', 'act', 'intimacy', '🌾', 'In the hayloft', 'Dans le foin', { en: ['hayloft', 'in the hay', 'the stables'], fr: ['grenier a foin', 'dans le foin', "l'ecurie", 'les ecuries'] }, {
      en: ['*laughs, straw in her hair* If the stable boy climbs up…', 'It itches everywhere. I do not care.', '*pulls you down into the hay* Shh, the horses are listening.'],
      fr: ['*rit, de la paille dans les cheveux* Si le palefrenier monte…', 'Ça gratte partout. Peu m’importe.', '*vous attire dans le foin* Chut, les chevaux écoutent.']
    }, { prio: 1 }),
    E('table', 'act', 'intimacy', '🍷', 'On the table', 'Sur la table', { en: ['on the table', 'the high table', 'sweep the table'], fr: ['sur la table'] }, {
      en: ['*sweeps the goblets aside* The feast is over. Mostly.', 'The table is oak. It will hold. 😈', 'If the steward comes in, we were… inspecting the silver.'],
      fr: ['*balaie les coupes* Le festin est terminé. Presque.', 'La table est en chêne. Elle tiendra. 😈', "Si l'intendant entre, nous étions… en train d'inspecter l'argenterie."]
    }, { prio: 1 })
  );

  // ---------- figure variants on existing events ----------
  const VARIANTS = {
    hug: [
      { traits: [any('Height', 'Very Short|Short')], reply: { en: ['*stands on tiptoe and still only reaches your chin*', 'Lift me up, {sen}. I am tired of hugging your belt.'], fr: ['*se met sur la pointe des pieds et n’atteint que votre menton*', 'Soulevez-moi, {sen}. J’en ai assez d’étreindre votre ceinture.'] } },
      { traits: [any('Height', 'Tall|Very Tall')], reply: { en: ['*bends to rest her cheek on your head* Comfortable down there?', 'I am taller than half the knights at court. Hold me anyway.'], fr: ['*se penche pour poser sa joue sur votre tête* Bien installé, là-dessous ?', 'Je suis plus grande que la moitié des chevaliers. Serrez-moi quand même.'] } }
    ],
    kiss: [
      { traits: [any('Height', 'Very Short|Short')], reply: { en: ['*climbs onto the bench to reach your lips* There.'], fr: ['*monte sur le banc pour atteindre vos lèvres* Voilà.'] } },
      { traits: [any('Height', 'Tall|Very Tall')], reply: { en: ['*tilts your chin up* Come here.'], fr: ['*vous relève le menton* Venez ici.'] } }
    ],
    compliment: [
      { traits: [any('Weight', 'Curvy|Chubby|Overweight')], reply: { en: ['Curves are the fashion at the Burgundian court, you know.', 'My mother says I eat too much marzipan. I say: look.'], fr: ['Les rondeurs sont à la mode à la cour de Bourgogne, savez-vous.', 'Ma mère dit que je mange trop de massepain. Moi je dis : regardez.'] } },
      { traits: [any('Weight', 'Very Thin|Thin')], reply: { en: ['My nurse says I eat like a sparrow. Feed me, then.'], fr: ['Ma nourrice dit que je mange comme un moineau. Nourrissez-moi, alors.'] } }
    ],
    missionary: [
      { traits: [any('Pussy Size', TIGHT)], reply: { en: ['*gasps* Slowly… slowly, {sen}… let me get used to you.', '*digs her nails into your shoulders* So… full…'], fr: ['*halète* Lentement… lentement, {sen}… laissez-moi m’habituer à vous.', '*plante ses ongles dans vos épaules* Si… pleine…'] } },
      { traits: [any('Dick Size', 'Large|Very Large')], reply: { en: ['*eyes widen* By all the saints… be gentle, {sen}.', 'Generous, are we? *breathless laugh*'], fr: ['*écarquille les yeux* Par tous les saints… soyez doux, {sen}.', 'Généreux, n’est-ce pas ? *rit à bout de souffle*'] } },
      { traits: [any('Pussy Size', TIGHT), any('Dick Size', 'Large|Very Large')], reply: { en: ['*whimpers* Too much… no, do not stop… just slowly.'], fr: ['*gémit* C’est trop… non, n’arrêtez pas… juste lentement.'] } },
      { traits: [any('Pussy Size', 'Relaxed|Loose|Very Loose')], reply: { en: ['Do not hold back, {sen}. I am no blushing novice. 😏'], fr: ['Ne vous retenez pas, {sen}. Je ne suis pas une novice rougissante. 😏'] } }
    ],
    cowgirl: [
      { traits: [any('Pussy Size', TIGHT)], reply: { en: ['*sinks down slowly, biting her lip* Wait… let me…'], fr: ['*descend lentement, se mordant la lèvre* Attendez… laissez-moi…'] } },
      { traits: [any('Dick Size', 'Large|Very Large')], reply: { en: ['*lowers herself carefully* All of it? Saints…'], fr: ['*s’abaisse avec précaution* Tout ? Saints du ciel…'] } }
    ],
    behind: [
      { traits: [any('Butt Size', 'L|XL')], reply: { en: ['*glances back* Enjoying the view? There is plenty of it. 😏'], fr: ['*jette un regard en arrière* La vue vous plaît ? Il y a de quoi. 😏'] } }
    ],
    climax: [
      { traits: [any('Pussy Size', TIGHT)], reply: { en: ['*trembles from head to toe, clinging to you*'], fr: ['*tremble de la tête aux pieds, accrochée à vous*'] } }
    ]
  };
  Object.keys(VARIANTS).forEach(id => {
    const e = V.EVENTS.events.find(x => x.id === id);
    if (e) e.variants = (e.variants || []).concat(VARIANTS[id]);
  });

  // ---------- body questions (you ask her) ----------
  const Q = (id, icon, en, fr, when, reply, o) => Object.assign({ id, kind: 'talk', cat: 'question', icon, name: { en, fr }, when, reply }, o || {});
  // questions must come before the "your …" acts in the list so equal scores go to them; longer triggers win anyway
  V.EVENTS.events.push(
    Q('q_height', '📏', 'How tall are you?', 'Quelle est votre taille ?', {
      en: ['how tall are you', 'are you tall', 'are you short'], fr: ['quelle est votre taille', 'etes-vous grande', 'etes-vous petite']
    }, { en: ['Neither tall nor short. Exactly right for you.', 'Tall enough that my lips reach your neck without trying. 😏'], fr: ['Ni grande ni petite. Juste comme il vous faut.', 'Assez grande pour que mes lèvres atteignent votre cou sans effort. 😏'] }, {
      variants: [
        { traits: [any('Height', 'Very Short|Short')], reply: { en: ['Small enough to hide behind a tapestry. Useful, sometimes. 😏', 'Small enough that you could lift me against the wall, {sen}. Would you?', 'Little, everywhere. You would have to bend down for all of me.'], fr: ['Assez petite pour me cacher derrière une tapisserie. Utile, parfois. 😏', 'Assez petite pour que vous me souleviez contre le mur, {sen}. Le feriez-vous ?', 'Menue, de partout. Il faudrait vous pencher pour tout de moi.'] } },
        { traits: [any('Height', 'Average')], reply: { en: ['Just the height where my mouth meets yours without anyone stretching.', 'Average, they say. In bed nobody measures. 😏'], fr: ['Juste la taille où ma bouche rencontre la vôtre sans que personne ne s’étire.', 'Moyenne, dit-on. Au lit, personne ne mesure. 😏'] } },
        { traits: [any('Height', 'Tall|Very Tall')], reply: { en: ["I see over every head at mass. Including the bishop's.", 'Long legs, {sen}. Long enough to wrap twice around you.', 'Tall. Lying down it is a great deal of me to kiss. 😏'], fr: ["Je vois par-dessus toutes les têtes à la messe. Y compris celle de l'évêque.", 'De longues jambes, {sen}. Assez longues pour vous enlacer deux fois.', 'Grande. Allongée, cela fait beaucoup de moi à embrasser. 😏'] } }
      ]
    }),
    Q('q_figure', '⚖️', 'Your figure', 'Votre silhouette', {
      en: ['your figure', 'your body', 'are you slim', 'are you thin'], fr: ['votre silhouette', 'votre corps', 'etes-vous mince']
    }, { en: ['Warm, smooth, and wasted under all this velvet. Imagine it without. 😏', 'Picture me in nothing but my shift, {sen}, the candle behind me. That is my figure.'], fr: ['Chaude, lisse, et gâchée sous tout ce velours. Imaginez-la sans. 😏', 'Imaginez-moi en simple chemise, {sen}, la chandelle derrière moi. Voilà ma silhouette.'] }, {
      variants: [
        { traits: [any('Weight', 'Very Thin|Thin|Slim')], reply: { en: ['Slender, they say. Your hands would meet around my waist.', 'Slim and light. Easy to carry to bed, {sen}. 😏'], fr: ['Svelte, dit-on. Vos mains se rejoindraient autour de ma taille.', 'Mince et légère. Facile à porter jusqu’au lit, {sen}. 😏'] } },
        { traits: [any('Weight', 'Average')], reply: { en: ['A waist to hold, hips to grip. Nothing missing, nothing spare.', 'Just enough of me to fill your arms. Come and check. 😏'], fr: ['Une taille à tenir, des hanches à saisir. Rien ne manque, rien de trop.', 'Juste assez de moi pour remplir vos bras. Venez vérifier. 😏'] } },
        { traits: [any('Weight', 'Curvy|Chubby|Overweight')], reply: { en: ['Soft and round where it matters. No complaints so far. 😏', 'Plenty of me to hold, {sen}. Your hands will not know where to start.'], fr: ['Douce et ronde là où il faut. Aucune plainte jusqu’ici. 😏', 'Beaucoup de moi à tenir, {sen}. Vos mains ne sauront pas par où commencer.'] } }
      ]
    }),
    Q('q_bust', '🍒', 'Her bosom?', 'Sa poitrine ?', {
      en: ['how big are your breasts', 'bosom size', 'size of your breasts', 'are your breasts'], fr: ['taille de vos seins', 'vos seins sont', 'taille de votre poitrine']
    }, { en: ['*loosens her laces a little* Round, soft, and very sensitive, {sen}. Write me what you would do with them.', 'They ache under this bodice when I read your letters. Is that answer enough? 😏'], fr: ['*desserre un peu son lacet* Ronde, douce, et très sensible, {sen}. Écrivez-moi ce que vous en feriez.', 'Elle me fait mal sous ce corsage quand je lis vos lettres. Cela vous suffit-il ? 😏'] }, {
      gender: '♀',
      variants: [
        { traits: [any('Boob Size', '70|75')], reply: { en: ['Small. They fit in one hand. Yours, perhaps.', 'Small and pert, and so sensitive one kiss makes me gasp. 😳'], fr: ['Menue. Elle tient dans une main. La vôtre, peut-être.', 'Menue et ferme, et si sensible qu’un seul baiser me fait haleter. 😳'] } },
        { traits: [any('Boob Size', '80|85')], reply: { en: ['Just enough to fill a bodice properly. And your palms.', 'Full and soft, {sen}. They spill a little when the laces come undone. 😏'], fr: ['Juste assez pour remplir un corsage comme il faut. Et vos paumes.', 'Pleine et douce, {sen}. Elle déborde un peu quand le lacet se défait. 😏'] } },
        { traits: [any('Boob Size', '90|95')], reply: { en: ['Enough that my bodices need two maids to lace.', 'Heavy and full. You would need both hands, and your mouth. 😏'], fr: ['Assez pour qu’il faille deux servantes pour lacer mes corsages.', 'Lourde et pleine. Il vous faudrait les deux mains, et votre bouche. 😏'] } }
      ]
    }),
    Q('q_hips', '🍑', 'Her hips?', 'Ses hanches ?', {
      en: ['how big is your bottom', 'how are your hips', 'size of your hips'], fr: ['taille de vos hanches', 'vos hanches sont']
    }, { en: ['Round enough to fill your hands when you pull me close. 😏', '*turns slowly in front of the mirror* Made to be gripped, {sen}.'], fr: ['Assez rondes pour remplir vos mains quand vous m’attirez à vous. 😏', '*se tourne lentement devant le miroir* Faites pour être saisies, {sen}.'] }, {
      gender: '♀',
      variants: [
        { traits: [any('Butt Size', 'XS|S')], reply: { en: ['Narrow. I could pass for a page in breeches.', 'Small and firm. One palm covers it, {sen}. Try. 😏'], fr: ["Étroites. Je pourrais passer pour un page en chausses.", 'Petites et fermes. Une paume suffit à les couvrir, {sen}. Essayez. 😏'] } },
        { traits: [any('Butt Size', 'M|M/L')], reply: { en: ['Round and firm, the kind that sways when I climb the stairs ahead of you.', 'Just right to fill your hands, {sen}. Not a finger wasted. 😏'], fr: ['Rondes et fermes, de celles qui ondulent quand je monte l’escalier devant vous.', 'Juste de quoi remplir vos mains, {sen}. Pas un doigt de perdu. 😏'] } },
        { traits: [any('Butt Size', 'L|XL')], reply: { en: ['Wide enough to make the priests pray harder. 😏', 'Generous, {sen}. Soft enough to sink your fingers into.'], fr: ['Assez larges pour faire prier les prêtres plus fort. 😏', 'Généreuses, {sen}. Assez douces pour y enfoncer les doigts.'] } }
      ]
    }),
    Q('q_tight', '🌸', 'Is she tight?', 'Est-elle étroite ?', { en: ['are you tight', 'how tight'], fr: ['etes-vous etroite', 'es-tu etroite'] }, {
      en: ['*blushes, but answers* Tight enough to hold you, wet enough to welcome you, {sen}.', 'Warm and snug. Just thinking of you makes it worse. 😳'], fr: ['*rougit, mais répond* Assez étroite pour vous retenir, assez humide pour vous accueillir, {sen}.', 'Chaude et serrée. Rien que de penser à vous, c’est pire. 😳']
    }, {
      gender: '♀',
      variants: [
        { traits: [any('Pussy Size', TIGHT)], reply: { en: ['Tighter than the purse of a Lombard banker. 😳', 'Very. You would have to go slowly, and I would feel every bit of you.', 'So tight it almost hurts at first, {sen}. Then it does not. 😳'], fr: ['Plus serrée que la bourse d’un banquier lombard. 😳', 'Très. Il faudrait y aller lentement, et je vous sentirais tout entier.', 'Si étroite que cela fait presque mal au début, {sen}. Puis plus du tout. 😳'] } },
        { traits: [any('Pussy Size', 'Average')], reply: { en: ['Snug and warm, {sen}. I hold on to what I like.', 'Tight enough to grip you, soft enough to take all of you. 😏'], fr: ['Serrée et chaude, {sen}. Je retiens ce qui me plaît.', 'Assez étroite pour vous serrer, assez souple pour vous prendre tout entier. 😏'] } },
        { traits: [any('Pussy Size', 'Relaxed|Loose|Very Loose')], reply: { en: ['I am a woman of some experience, {sen}. Does it frighten you?', 'Not a nun, if that is what you ask. 😏', 'Soft and open. I take you easily, and I want you deep.'], fr: ["Je suis une femme d'expérience, {sen}. Cela vous effraie ?", "Pas une nonne, si c'est ce que vous demandez. 😏", 'Douce et ouverte. Je vous prends sans peine, et je vous veux profond.'] } }
      ]
    }),
    Q('q_anal', '🌹', 'The other way?', "Par l'autre chemin ?", {
      en: ['is your ass tight', 'how tight is your ass', 'tight back there', 'have you done anal', 'ever tried anal', 'ever tried the other way', 'have you tried the other way'],
      fr: ['votre cul est etroit', 'ton cul est serre', 'deja essaye la sodomie', "deja essaye l'autre chemin", 'serree par derriere']
    }, {
      en: ['*bites her lip* Nobody asks a lady that… but since it is you: I have wondered, {sen}. Often.', 'Curious, are you? So am I. Come and be curious with me. 😈'],
      fr: ['*se mord la lèvre* On ne demande pas cela à une dame… mais puisque c’est vous : je me le suis demandé, {sen}. Souvent.', 'Curieux, hein ? Moi aussi. Venez l’être avec moi. 😈']
    }, {
      gender: '♀', prio: 1,   // same prio as the 'anal' act, so the longer question triggers win
      variants: [
        { traits: [any('Anal Size', TIGHT)], reply: { en: ['Untouched there, {sen}. Very tight. You would have to be patient… and I would let you. 😳', 'So tight I tremble just thinking of it. Slowly, and with oil, if ever.'], fr: ['Jamais touchée là, {sen}. Très serrée. Il faudrait être patient… et je vous laisserais faire. 😳', 'Si serrée que je tremble rien que d’y penser. Lentement, et avec de l’huile, si jamais.'] } },
        { traits: [any('Anal Size', 'Average')], reply: { en: ['Tight, but not a stranger to it. With care, I like it more than I should confess. 😈', 'Snug, {sen}. Take your time and I will take all of you.'], fr: ['Serrée, mais pas étrangère à la chose. Avec douceur, j’aime cela plus que je ne devrais l’avouer. 😈', 'Étroite, {sen}. Prenez votre temps et je vous prendrai tout entier.'] } },
        { traits: [any('Anal Size', 'Relaxed|Loose|Very Loose')], reply: { en: ['The other way holds no fear for me, {sen}. I rather crave it. 😈', 'Experienced there too. Do not be gentle unless I beg.'], fr: ['L’autre chemin ne me fait pas peur, {sen}. J’en ai plutôt envie. 😈', 'Expérimentée là aussi. Ne soyez doux que si je vous en supplie.'] } }
      ]
    }),
    Q('q_mysize', '🍆', 'Am I too big?', 'Suis-je trop gros ?', {
      en: ['am i too big', 'too big for you', 'do you like my size'], fr: ['suis-je trop gros', 'trop gros pour vous', 'ma taille vous plait']
    }, { en: ["Size is a man's worry. I care how you use it. 😏", 'Too big? I want to feel all of you, {sen}. That is my answer.'], fr: ["La taille, c'est un souci d'homme. Moi, je regarde comment vous vous en servez. 😏", 'Trop gros ? Je veux vous sentir tout entier, {sen}. Voilà ma réponse.'] }, {
      variants: [
        { traits: [any('Dick Size', 'Large|Very Large')], reply: { en: ['*blushes* You are… generous. I am not complaining.', 'Too big? Saints, ask me again in the morning.', 'You fill me until I cannot think. Too big? Never stop.'], fr: ['*rougit* Vous êtes… généreux. Je ne me plains pas.', 'Trop gros ? Saints du ciel, redemandez-moi demain matin.', 'Vous me comblez au point que je ne pense plus. Trop gros ? Ne vous arrêtez jamais.'] } },
        { traits: [any('Dick Size', 'Average')], reply: { en: ['Not too big. Exactly the size I ache for. 😏', 'You fit me as if you were made for me, {sen}.'], fr: ['Pas trop gros. Exactement la taille qui me fait languir. 😏', 'Vous m’allez comme si vous étiez fait pour moi, {sen}.'] } },
        { traits: [any('Dick Size', 'Small')], reply: { en: ['It is the knight, not the lance, {sen}. 😌', 'Too big? No. Just right to tease me for hours. 😏'], fr: ["C'est le chevalier qui compte, pas la lance, {sen}. 😌", 'Trop gros ? Non. Juste ce qu’il faut pour me tourmenter des heures. 😏'] } }
      ]
    }),
    Q('q_memory', '🧠', 'Do you remember?', 'Vous souvenez-vous ?', {
      en: ['do you remember', 'remember when', 'remember our', 'our first'], fr: ['vous souvenez-vous', 'te souviens-tu', 'tu te souviens', 'notre premier', 'notre premiere']
    }, { en: ['We have so few memories yet… let us make some.'], fr: ['Nous avons encore si peu de souvenirs… créons-en.'] })
  );

  // ---------- her questions after body events ----------
  V.ASKS.push(
    { id: 'a_bust', kind: 'yn', on: ['breasts'], traits: [any('Boob Size', '70|75')], q: { en: 'Are they… too small for you?', fr: 'Est-elle… trop menue pour vous ?' },
      yes: { en: ['*pouts* Then go and find a Burgundian.', 'Honest or cruel, I cannot decide.'], fr: ['*boude* Alors allez trouver une Bourguignonne.', "Honnête ou cruel, je n'arrive pas à décider."] },
      no: { en: ['*smiles* Good answer.', 'Then kiss them again.'], fr: ['*sourit* Bonne réponse.', 'Alors embrassez-la encore.'] } },
    { id: 'a_bustbig', kind: 'yn', on: ['breasts'], traits: [any('Boob Size', '90|95')], q: { en: 'Too much for one man to handle?', fr: 'Trop pour un seul homme ?' },
      yes: { en: ['Then use both hands. 😏'], fr: ['Alors servez-vous des deux mains. 😏'] }, no: { en: ['Prove it.'], fr: ['Prouvez-le.'] } },
    { id: 'a_hips', kind: 'yn', on: ['bottom', 'behind'], gender: '♀', q: { en: 'Do you like my hips, {sen}?', fr: 'Mes hanches vous plaisent, {sen} ?' },
      yes: { en: ['*sways them again*', 'Good. They like you too.'], fr: ['*les fait onduler encore*', 'Bien. Elles vous aiment aussi.'] },
      no: { en: ['*turns around sharply* Then look at my face instead.'], fr: ['*se retourne vivement* Alors regardez mon visage.'] } },
    { id: 'a_gentle', kind: 'yn', on: ['missionary', 'cowgirl', 'anal'], traits: [any('Pussy Size', TIGHT)], q: { en: 'Will you be gentle with me?', fr: 'Serez-vous doux avec moi ?' },
      yes: { en: ['*relaxes against you* …thank you.'], fr: ['*se détend contre vous* …merci.'] }, no: { en: ['*shivers* …then do not stop.'], fr: ['*frissonne* …alors ne vous arrêtez pas.'] } },
    { id: 'a_tall', kind: 'yn', on: ['hug', 'kiss'], traits: [any('Height', 'Very Short|Short')], q: { en: 'Will you always have to bend down to kiss me?', fr: 'Devrez-vous toujours vous pencher pour m’embrasser ?' },
      yes: { en: ['Then bend, {sen}. Often.'], fr: ['Alors penchez-vous, {sen}. Souvent.'] }, no: { en: ['*climbs onto the bench* Problem solved.'], fr: ['*monte sur le banc* Problème réglé.'] } },
    { id: 'a_curvy', kind: 'yn', when: 'talk', traits: [any('Weight', 'Curvy|Chubby|Overweight')], q: { en: 'Do you like a woman with curves, {sen}?', fr: 'Aimez-vous les femmes aux formes généreuses, {sen} ?' },
      yes: { en: ['Good. I am not giving up marzipan.'], fr: ['Bien. Je ne renonce pas au massepain.'] }, no: { en: ['*crosses her arms* Then why do you keep writing?'], fr: ["*croise les bras* Alors pourquoi continuez-vous d'écrire ?"] } }
  );

  // ---------- 🧠 memory lines ({event} {n} {days} {date} {was} {now}) ----------
  V.MEMORY = {
    first: { en: ['Our first time: {event}. I will remember this.', '*quietly* The first time: {event}. Write it in your book of hours.'], fr: ['Notre premier moment — {event}… je m’en souviendrai.', "*doucement* La première fois : {event}. Écrivez-le dans votre livre d'heures."] },
    often: { en: ['{event} again? You never tire of it. 😏', 'That makes {n} times, {sen}. I keep count.'], fr: ['{event}, encore ? Vous ne vous en lassez pas. 😏', 'Cela fait {n} fois, {sen}. Je compte.'] },
    away: { en: ['{days} days without a letter, {sen}. I was beginning to worry.', 'You vanished for {days} days. Explain yourself.'], fr: ['{days} jours sans lettre, {sen}. Je commençais à m’inquiéter.', 'Vous avez disparu {days} jours. Expliquez-vous.'] },
    remember: { en: ['I remember our first {event}, on {date}.', 'How could I forget? Our first {event}, {date}…'], fr: ['Je me souviens de notre premier moment — {event} — le {date}.', 'Comment oublier ? {event}, la première fois, le {date}…'] },
    fav: { en: ['You always come back to {event}. {n} times now.', 'I remember {event} best. We have done it {n} times.'], fr: ['Vous revenez toujours à {event}. {n} fois déjà.', 'Je me souviens surtout de {event}. {n} fois, déjà.'] },
    contra: { en: ['Last time you answered "{was}". Now "{now}"? Hm.', '"{now}"? You told me "{was}" before. Which is it, {sen}?'], fr: ['La dernière fois vous avez répondu « {was} ». Maintenant « {now} » ? Hm.', '« {now} » ? Vous m’aviez dit « {was} ». Lequel est-ce, {sen} ?'] },
    recall: {
      a_ride: { yes: { en: ['You told me you ride. When will you ride to me?'], fr: ['Vous m’avez dit monter à cheval. Quand chevaucherez-vous jusqu’à moi ?'] }, no: { en: ['Have you learned to ride yet? I am still waiting.'], fr: ['Avez-vous appris à monter ? J’attends toujours.'] } },
      a_dance: { yes: { en: ['You promised me a dance. I have not forgotten.'], fr: ['Vous m’avez promis une danse. Je n’ai pas oublié.'] }, no: { en: ['You still owe me a dance, coward. 😏'], fr: ['Vous me devez toujours une danse, lâche. 😏'] } },
      a_war: { yes: { en: ['Is the war still taking you this spring? I pray it does not.'], fr: ['La guerre vous prend-elle toujours ce printemps ? Je prie que non.'] }, no: { en: ['I am still glad you are not riding to war.'], fr: ['Je suis toujours heureuse que vous ne partiez pas en guerre.'] } },
      a_read: { yes: { en: ['Have you finished the Roman de la Rose yet?'], fr: ['Avez-vous fini le Roman de la Rose ?'] }, no: { en: ['Shall I read to you again tonight?'], fr: ['Vous lirai-je encore quelque chose ce soir ?'] } },
      a_lover: { yes: { en: ['And… is there still someone else, {sen}?'], fr: ["Et… y a-t-il toujours quelqu'un d'autre, {sen} ?"] }, no: { en: ['Still no one else? Good. *smiles*'], fr: ["Toujours personne d'autre ? Bien. *sourit*"] } },
      a_miss: { yes: { en: ['You said you missed me. Prove it.'], fr: ['Vous avez dit que je vous manquais. Prouvez-le.'] }, no: { en: ['Last time you did not miss me. And now?'], fr: ['La dernière fois je ne vous manquais pas. Et maintenant ?'] } }
    }
  };
})();
