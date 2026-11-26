/*
 * Valeria - 📚 Library: shelves and books (reader: js/library.js)
 * Book: { id, shelf, icon, color, title: {en, fr}, sub: {en, fr}, chapters: [{ title: {en, fr}, body: {en, fr} }] }
 *   or gen: '<name>' → chapters are built live from the app data (js/library.js GEN), so they never go out of date.
 * Body is trusted HTML written here (not user input). When a feature changes, update its chapter too.
 */
window.Valeria = window.Valeria || {};

Valeria.SHELVES = [
  { id: 'guides', name: { en: '🧭 Guides', fr: '🧭 Guides' } },
  { id: 'talk', name: { en: '💬 Conversation', fr: '💬 Conversation' } },
  { id: 'world', name: { en: '🌍 The World', fr: '🌍 Le Monde' } }
];

Valeria.BOOKS = [
  {
    id: 'guide', shelf: 'guides', icon: '🧭', color: '#7a1f2b',
    title: { en: "The Courier's Guide", fr: 'Le Guide du messager' },
    sub: { en: 'How Valeria works, page by page', fr: 'Comment fonctionne Valeria, page après page' },
    chapters: [
      {
        title: { en: 'Welcome to Valeria', fr: 'Bienvenue à Valeria' },
        body: {
          en: `<p>Valeria is a story told in letters. You write to the ladies and lords of France, England and their neighbours, and they write back.</p>
<p>The <b>🏠 Home</b> page shows the lady of the day, news from the herald, your court and the notables of the realms. <b>🗺️ Map</b> lets you visit every region. <b>✉️ Letters</b> lists your correspondence, <b>📚 Library</b> is where you are now, and <b>👑 Me</b> holds your name, language, theme and backups.</p>
<p>Everything stays in your browser. Nothing is sent anywhere.</p>`,
          fr: `<p>Valeria est une histoire racontée en lettres. Vous écrivez aux dames et seigneurs de France, d'Angleterre et de leurs voisins, et ils vous répondent.</p>
<p>La page <b>🏠 Accueil</b> montre la dame du jour, les nouvelles du héraut, votre cour et les notables des royaumes. <b>🗺️ Carte</b> permet de visiter chaque région. <b>✉️ Lettres</b> réunit votre correspondance, <b>📚 Bibliothèque</b> est l'endroit où vous êtes, et <b>👑 Moi</b> garde votre nom, la langue, le thème et les sauvegardes.</p>
<p>Tout reste dans votre navigateur. Rien n'est envoyé ailleurs.</p>`
        }
      },
      {
        title: { en: 'Your court', fr: 'Votre cour' },
        body: {
          en: `<p><b>✒️ New character</b> opens with a random suggestion: name, age, house, title, seat, motto, story and personality. Tap <b>🎲</b> next to a field to roll only that field, or <b>🎲 All</b> to roll everything again. Gender, language and region are kept.</p>
<p>Pick a face in the <b>Portraits</b> strip. A portrait already used by someone else is greyed and marked “in use”.</p>
<p>The <b>region</b> decides the homeland: names, houses and one personality trait typical of that land. Read the <i>Book of Realms</i> to see what each land brings.</p>
<p><b>🎲 Summon a stranger</b> brings a ready-made character straight to your court.</p>`,
          fr: `<p><b>✒️ Nouveau personnage</b> s'ouvre avec une suggestion au hasard : nom, âge, maison, titre, fief, devise, histoire et caractère. Touchez <b>🎲</b> à côté d'un champ pour ne tirer que celui-ci, ou <b>🎲 Tout</b> pour tout retirer. Le genre, la langue et la région sont conservés.</p>
<p>Choisissez un visage dans la bande <b>Portraits</b>. Un portrait déjà pris est grisé et marqué « pris ».</p>
<p>La <b>région</b> fixe la terre natale : les noms, les maisons et un trait de caractère typique du pays. Le <i>Livre des royaumes</i> détaille chaque terre.</p>
<p><b>🎲 Faire venir un inconnu</b> amène directement un personnage tout prêt à votre cour.</p>`
        }
      },
      {
        title: { en: 'Writing letters', fr: 'Écrire des lettres' },
        body: {
          en: `<p>Open a character and tap <b>✒️ Write</b>. One character can have several named correspondences.</p>
<p>Write and tap <b>🔏</b> to seal and send. When bot mode is off, a crest appears at the bottom left: tap it to choose who is writing.</p>
<p>Tap a letter to edit it, move it to the other side, give it an effect or delete it.</p>
<p>Everything else is in the <b>⋮</b> menu at the top right: <b>🎭 Events</b>, <b>✨ Effect</b> for the next letter (the seal glows while one is waiting), <b>📜 Narration</b> (a line in the middle), <b>🤖 Bot mode</b>, <b>⚡ Shortcuts</b>, <b>⇄ Take turns</b>, <b>✎ Rename</b>, the profile and <b>🔥 Burn this correspondence</b>.</p>`,
          fr: `<p>Ouvrez un personnage et touchez <b>✒️ Écrire</b>. Un personnage peut avoir plusieurs correspondances nommées.</p>
<p>Écrivez puis touchez <b>🔏</b> pour sceller et envoyer. Quand le mode bot est coupé, un blason apparaît en bas à gauche : touchez-le pour choisir qui écrit.</p>
<p>Touchez une lettre pour la modifier, la passer de l'autre côté, lui donner un effet ou la supprimer.</p>
<p>Tout le reste est dans le menu <b>⋮</b> en haut à droite : <b>🎭 Événements</b>, <b>✨ Effet</b> pour la prochaine lettre (le sceau brille tant qu'il attend), <b>📜 Narration</b> (une ligne au centre), <b>🤖 Mode bot</b>, <b>⚡ Raccourcis</b>, <b>⇄ Chacun son tour</b>, <b>✎ Renommer</b>, le profil et <b>🔥 Brûler cette correspondance</b>.</p>`
        }
      },
      {
        title: { en: 'Bot mode', fr: 'Le mode bot' },
        body: {
          en: `<p>Bot mode is <b>on by default</b> in every correspondence: you write, she answers, in her own language, carried by a messenger on horseback.</p>
<p>What she says depends on what you write (<i>Book of Events</i>), on her personality and gender (<i>Book of Temperaments</i>) and on her homeland (<i>Book of Realms</i>).</p>
<p>You can ask her questions (<i>Book of Questions</i>). She asks you questions too (<i>Her Questions</i>): your next letter is read as the answer, a plain “yes” or “no” is enough.</p>
<p>When she does not recognise anything, she still follows the topic: horses, rain, the king, your family… (<i>The Art of Conversation</i>).</p>
<p>Turn it off in <b>⋮ → 🤖 Bot mode</b> to write both sides yourself.</p>`,
          fr: `<p>Le mode bot est <b>activé par défaut</b> dans chaque correspondance : vous écrivez, elle répond, dans sa propre langue, portée par un messager à cheval.</p>
<p>Ce qu'elle dit dépend de ce que vous écrivez (<i>Livre des événements</i>), de son caractère et de son genre (<i>Livre des tempéraments</i>) et de sa terre natale (<i>Livre des royaumes</i>).</p>
<p>Vous pouvez lui poser des questions (<i>Livre des questions</i>). Elle vous en pose aussi (<i>Ses questions</i>) : votre lettre suivante est lue comme la réponse, un simple « oui » ou « non » suffit.</p>
<p>Quand elle ne reconnaît rien, elle suit tout de même le sujet : chevaux, pluie, le roi, votre famille… (<i>L'Art de la conversation</i>).</p>
<p>Coupez-le dans <b>⋮ → 🤖 Mode bot</b> pour écrire vous-même les deux côtés.</p>`
        }
      },
      {
        title: { en: 'Homelands', fr: 'Terres natales' },
        body: {
          en: `<p>Every character comes from one of the 37 lands of the map, and her land shows in everything she writes. She greets and says farewell in her own tongue, calls you by a word of home, swears by her saints, speaks of her food, her feasts and her songs, and quotes the sayings of her land.</p>
<p>Each land <b>loves</b> some things and <b>frowns upon</b> others: a Provençale loves a bath and a dance, a lady of Navarre frowns upon teasing. She tells you so when you do them.</p>
<p>Her profile shows her homeland card; the <i>Book of Realms</i> describes every land, and the 🌍 Homeland lab lets you hear a lady of any land.</p>`,
          fr: `<p>Chaque personnage vient de l'une des 37 terres de la carte, et sa terre se voit dans tout ce qu'elle écrit. Elle salue et dit adieu dans sa langue, vous appelle d'un mot de chez elle, jure par ses saints, parle de sa cuisine, de ses fêtes et de ses chants, et cite les dictons de sa terre.</p>
<p>Chaque terre <b>aime</b> certaines choses et en <b>désapprouve</b> d'autres : une Provençale aime le bain et la danse, une dame de Navarre désapprouve la taquinerie. Elle vous le dit quand vous les faites.</p>
<p>Son profil montre la fiche de sa terre ; le <i>Livre des royaumes</i> décrit chaque terre, et le labo 🌍 Terres natales fait entendre une dame de n'importe quelle terre.</p>`
        }
      },
      {
        title: { en: 'The Herald', fr: 'Le Héraut' },
        body: {
          en: `<p><b>📯 The Herald</b> is on Home (the card under the ticker, and "All ›"). Gautier cries two kinds of news:</p>
<ul><li><b>📜 Proclamations</b>: every novelty of Valeria, each with its own page and Gautier's own account. 🆕 marks the ones you have not read.</li>
<li><b>🗺️ Tidings of the realms</b>: tourneys, weddings, frosts and scandals, new every morning. Each tiding names a lady: visit her land on the map or answer her letter.</li></ul>
<p>The scrolling ticker on Home shows the same tidings; tap one to read it.</p>`,
          fr: `<p><b>📯 Le Héraut</b> se trouve sur l'Accueil (la fiche sous le bandeau, et « Tout › »). Gautier crie deux sortes de nouvelles :</p>
<ul><li><b>📜 Proclamations</b> : chaque nouveauté de Valeria, avec sa propre page et le récit de Gautier. 🆕 marque celles que vous n'avez pas lues.</li>
<li><b>🗺️ Nouvelles des royaumes</b> : tournois, noces, gelées et scandales, nouvelles chaque matin. Chaque nouvelle nomme une dame : visitez sa terre sur la carte ou répondez à sa lettre.</li></ul>
<p>Le bandeau défilant de l'Accueil montre les mêmes nouvelles ; touchez-en une pour la lire.</p>`
        }
      },
      {
        title: { en: 'Figure and memory', fr: 'Silhouette et mémoire' },
        body: {
          en: `<p>In the character form, <b>📏 Figure</b> sets her height, build, bosom, hips and intimate sizes (the same values as Carmen). 🎲 rolls a figure that fits her build. In <b>👑 Me</b> you set your own gender and size. All of these change her answers, her questions and some events: see the <i>Book of Temperaments</i>.</p>
<p>Each character also has a <b>🧠 memory</b>: first times with their dates, favourites, your answers to her questions and your last letter. She brings them up herself, and you can ask “do you remember…?”. Read the <i>Book of Memory</i>; the memory is shown on her profile, where ✕ makes her forget a line.</p>
<p>In a letter, <b>⋮ → 🎭 Events</b> (or <b>⋯</b> in the shortcut bar) opens the list of everything she reacts to: what comes next, her favourites, a surprise, and every event by category with a search box.</p>`,
          fr: `<p>Dans le formulaire, <b>📏 Silhouette</b> fixe sa taille, sa corpulence, sa poitrine, ses hanches et ses mesures intimes (les mêmes valeurs que Carmen). 🎲 tire une silhouette cohérente avec sa corpulence. Dans <b>👑 Moi</b>, vous réglez votre genre et votre taille. Tout cela change ses réponses, ses questions et certains événements : voir le <i>Livre des tempéraments</i>.</p>
<p>Chaque personnage a aussi une <b>🧠 mémoire</b> : premières fois avec leur date, favoris, vos réponses à ses questions et votre dernière lettre. Elle en parle d'elle-même, et vous pouvez demander « vous souvenez-vous… ? ». Lisez le <i>Livre de la mémoire</i> ; la mémoire est visible sur son profil, où ✕ lui fait oublier une ligne.</p>
<p>Dans une lettre, <b>⋮ → 🎭 Événements</b> (ou <b>⋯</b> dans la barre de raccourcis) ouvre la liste de tout ce à quoi elle réagit : la suite, ses favoris, une surprise, et chaque événement par catégorie avec une recherche.</p>`
        }
      },
      {
        title: { en: 'Shortcuts', fr: 'Les raccourcis' },
        body: {
          en: `<p>Above the letter you write, the <b>⚡ shortcut bar</b> suggests what to say next. Tap a chip to put the sentence in your letter; tap it again to send it.</p>
<p>It thinks like a courtier: when she has asked you a question, <b>Yes / No</b> come first; during a kiss it offers what naturally follows; it suggests questions you have not asked yet, things that suit her temper and talk of her homeland, and avoids what you just did. Hold your finger on a chip (or hover it) to see why it was chosen.</p>
<p>While you type, <b>🔮</b> shows events and questions that start like your word. <b>⋯</b> opens the full list of everything she understands, with a search box.</p>
<p>Turn the bar off in <b>⋮ → ⚡ Shortcuts</b>.</p>`,
          fr: `<p>Au-dessus de la lettre que vous écrivez, la <b>barre de raccourcis ⚡</b> propose quoi dire ensuite. Touchez une puce pour mettre la phrase dans votre lettre ; touchez-la encore pour l'envoyer.</p>
<p>Elle pense comme un courtisan : quand elle vous a posé une question, <b>Oui / Non</b> viennent d'abord ; pendant un baiser, elle propose la suite naturelle ; elle suggère les questions pas encore posées, ce qui convient à son caractère et à sa terre natale, et évite ce que vous venez de faire. Gardez le doigt sur une puce (ou survolez-la) pour savoir pourquoi elle a été choisie.</p>
<p>Pendant que vous tapez, <b>🔮</b> montre les événements et questions qui commencent comme votre mot. <b>⋯</b> ouvre la liste complète de tout ce qu'elle comprend, avec une recherche.</p>
<p>Coupez la barre dans <b>⋮ → ⚡ Raccourcis</b>.</p>`
        }
      },
      {
        title: { en: 'Feast days', fr: 'Les jours de fête' },
        body: {
          en: `<p>Saints' days and the great feasts (Christmas, Easter, May Day, Midsummer, Martinmas, Saint George, Saint Andrew, Saint Patrick…) each have their own <b>design</b>: on the day, Valeria changes colours, snow, petals, candles or shamrocks drift across the screen, a banner appears on the Home page and the feast's effect plays once.</p>
<p>Your correspondents speak of the feast in their first answer of the day, and a lady is proud when it is the saint of her own land. Dame Mathilde reminds you to wish her well.</p>
<p>In <b>🧪 Laboratory → 🎉 Feast day lab</b>, celebrate any feast now (a preview until you stop it), switch the designs off, or <b>add your own special days</b>: a birthday, the day you met. The <i>Calendar of Saints</i> lists them all.</p>`,
          fr: `<p>Les jours des saints et les grandes fêtes (Noël, Pâques, le Premier Mai, la Saint-Jean, la Saint-Martin, saint Georges, saint André, saint Patrick…) ont chacun leur <b>décor</b> : ce jour-là, Valeria change de couleurs, neige, pétales, chandelles ou trèfles dérivent à l'écran, une bannière apparaît sur l'Accueil et l'effet de la fête se joue une fois.</p>
<p>Vos correspondants parlent de la fête dans leur première réponse du jour, et une dame est fière quand c'est le saint de sa propre terre. Dame Mathilde vous rappelle de lui souhaiter bonne fête.</p>
<p>Dans <b>🧪 Laboratoire → 🎉 Labo des jours de fête</b>, fêtez n'importe quelle fête maintenant (un aperçu jusqu'à ce que vous l'arrêtiez), coupez les décors, ou <b>ajoutez vos propres jours de fête</b> : un anniversaire, le jour de votre rencontre. Le <i>Calendrier des saints</i> les réunit tous.</p>`
        }
      },
      {
        title: { en: 'Her heart and the status cards', fr: 'Son cœur et les cartes d’humeur' },
        body: {
          en: `<p>Each character has <b>🤝 Trust</b>, <b>❤️ Love</b> and <b>🔥 Desire</b>, from 0 to 100, shown above the letter and on her profile. Under her answer, a small line like <code>🤝+2 ❤️+1</code> says what your letter changed.</p>
<p>When a feeling crosses 25, 50, 75 or 100 (desire: 50, 80), a <b>📰 status card</b> appears in her own words. Some acts need her trust first; too soon, and she hesitates and trusts you less. <b>⋮ → 📰 Status cards</b> chooses Off, Cards, or Cards + changes. Everything is in the <i>Book of the Heart</i>.</p>`,
          fr: `<p>Chaque personnage a une <b>🤝 Confiance</b>, un <b>❤️ Amour</b> et un <b>🔥 Désir</b>, de 0 à 100, affichés au-dessus de la lettre et sur son profil. Sous sa réponse, une petite ligne comme <code>🤝+2 ❤️+1</code> dit ce que votre lettre a changé.</p>
<p>Quand un sentiment franchit 25, 50, 75 ou 100 (désir : 50, 80), une <b>📰 carte d'humeur</b> apparaît avec ses propres mots. Certains actes demandent d'abord sa confiance ; trop tôt, elle hésite et vous fait moins confiance. <b>⋮ → 📰 Cartes d'humeur</b> choisit Aucune, Cartes ou Cartes + changements. Tout est dans le <i>Livre du cœur</i>.</p>`
        }
      },
      {
        title: { en: 'Scenes, episodes and Dame Mathilde', fr: 'Scènes, épisodes et Dame Mathilde' },
        body: {
          en: `<p>Some events open a <b>🎬 scene</b>: a dance opens <i>The Ball</i>, a bath <i>The Bathhouse</i>, the silk ribbon <i>The Silk Ribbon</i>. A red strip above the ⚡ bar shows its steps ●●○; do enough of them (some scenes want them in order), then the finish 🏁, and the scene is completed. ✕ on the strip ends it; too many other acts break it.</p>
<p>Scenes chain into <b>📖 episodes</b> (<i>The First Ball</i>, <i>Harvest Feast</i>, <i>The Wedding Night</i>…), played over several letters or days. Finishing an episode's first scene starts it; the more scenes you complete with her, the more episodes open. She offers them herself, and her profile keeps every scene and episode in her 🧠 memory.</p>
<p><b>🕯️ Dame Mathilde</b>, above the ⚡ bar, gives one piece of advice for the moment with a few chips, like Lia in Carmen. ✕ hides her, <b>⋮ → 🕯️ Dame Mathilde</b> brings her back. Every scene and episode is in the <i>Book of Scenes</i>.</p>`,
          fr: `<p>Certains événements ouvrent une <b>🎬 scène</b> : une danse ouvre <i>Le Bal</i>, un bain <i>Les Étuves</i>, le ruban de soie <i>Le Ruban de soie</i>. Une bande rouge au-dessus de la barre ⚡ montre ses étapes ●●○ ; faites-en assez (certaines scènes les veulent dans l'ordre), puis la fin 🏁, et la scène est accomplie. Le ✕ de la bande la termine ; trop d'autres actes la brisent.</p>
<p>Les scènes s'enchaînent en <b>📖 épisodes</b> (<i>Le premier bal</i>, <i>Fête des moissons</i>, <i>La nuit de noces</i>…), joués sur plusieurs lettres ou plusieurs jours. Accomplir la première scène d'un épisode le commence ; plus vous accomplissez de scènes avec elle, plus d'épisodes s'ouvrent. Elle les propose elle-même, et son profil garde chaque scène et épisode dans sa 🧠 mémoire.</p>
<p><b>🕯️ Dame Mathilde</b>, au-dessus de la barre ⚡, donne un conseil pour le moment avec quelques puces, comme Lia dans Carmen. ✕ la cache, <b>⋮ → 🕯️ Dame Mathilde</b> la fait revenir. Chaque scène et épisode est dans le <i>Livre des scènes</i>.</p>`
        }
      },
      {
        title: { en: 'The laboratory', fr: 'Le laboratoire' },
        body: {
          en: `<p>The <b>🧪 Laboratory</b> (Library, Home or Me) lets you test without writing real letters:</p>
<ul><li><b>🤖 Bot lab</b>: type a letter, choose who reads it (one of your court or a test lady with any traits), the act in progress and the question she asked. You see which path wins, every candidate with its score, the variant used and three sample answers.</li>
<li><b>🎭 Temperament lab</b>: all lines of one event, personality by personality, and which ones your court would get.</li>
<li><b>🌍 Homeland lab</b>: a lady from the land you choose answers five questions; invite her if you like her.</li>
<li><b>⚡ Shortcut lab</b>: the shortcuts of any situation, with their reasons.</li>
<li><b>✨ Effects lab</b>: every effect and sound.</li>
<li><b>🎬 Scene lab</b>: play any scene step by step on a sandbox: progress, what breaks it, the finish, the episodes it opens, and how her feelings move.</li>
<li><b>🎉 Feast day lab</b>: celebrate any saint's day now, hear her speak of it, add your own special days.</li></ul>`,
          fr: `<p>Le <b>🧪 Laboratoire</b> (Bibliothèque, Accueil ou Moi) permet d'essayer sans écrire de vraies lettres :</p>
<ul><li><b>🤖 Labo du bot</b> : écrivez une lettre, choisissez qui la lit (quelqu'un de votre cour ou une dame de test aux traits de votre choix), l'acte en cours et la question qu'elle a posée. Vous voyez quel chemin l'emporte, chaque candidat avec son score, la variante utilisée et trois réponses d'exemple.</li>
<li><b>🎭 Labo des tempéraments</b> : toutes les répliques d'un événement, caractère par caractère, et celles que recevrait votre cour.</li>
<li><b>🌍 Labo des terres natales</b> : une dame de la terre choisie répond à cinq questions ; invitez-la si elle vous plaît.</li>
<li><b>⚡ Labo des raccourcis</b> : les raccourcis de n'importe quelle situation, avec leurs raisons.</li>
<li><b>✨ Labo des effets</b> : chaque effet et chaque son.</li>
<li><b>🎬 Labo des scènes</b> : jouez n'importe quelle scène pas à pas dans un bac à sable : progression, ce qui la brise, la fin, les épisodes qu'elle ouvre et l'effet sur ses sentiments.</li>
<li><b>🎉 Labo des jours de fête</b> : fêtez n'importe quel saint maintenant, écoutez-la en parler, ajoutez vos propres jours de fête.</li></ul>`
        }
      },
      {
        title: { en: 'Music and sounds', fr: 'Musique et sons' },
        body: {
          en: `<p>Valeria plays its own music once you first tap the screen (browsers do not allow music before that). Every button answers with a lute string, a sent letter with a wax seal, an arriving letter with a small chapel bell, and the Library pages rustle.</p>
<p>Choose the music in <b>👑 Me → Settings</b>: <b>Minstrels</b> (recorded songs, they need the internet), <b>🪕 Lute</b> (six pieces in the old modes, played live on the same lute string as the buttons, with bass, drone and tabor; never twice the same and it works offline) or <b>Off</b>. Sounds and the volume are set there too.</p>`,
          fr: `<p>Valeria joue sa propre musique dès que vous touchez l'écran pour la première fois (les navigateurs n'autorisent pas la musique avant). Chaque bouton répond par une corde de luth, une lettre envoyée par un sceau de cire, une lettre reçue par une petite cloche de chapelle, et les pages de la Bibliothèque bruissent.</p>
<p>Choisissez la musique dans <b>👑 Moi → Réglages</b> : <b>Ménestrels</b> (chansons enregistrées, il faut internet), <b>🪕 Luth</b> (six pièces dans les modes anciens, jouées en direct sur la même corde de luth que les boutons, avec basse, bourdon et tambourin ; jamais deux fois pareilles et hors ligne) ou <b>Coupé</b>. Les sons et le volume se règlent là aussi.</p>`
        }
      },
      {
        title: { en: 'The map', fr: 'La carte' },
        body: {
          en: `<p>The map shows 37 regions, from the Highlands to Navarre and from Brittany to Kraków, Denmark included. Tap one to zoom in; tap the sea to see the whole map again.</p>
<p>The card below lists who from your court lives there and five <b>notables</b>: the ruler first (Queen of France, Duchess of Normandy…), then ladies of every rank. <b>✉️ Invite to court</b> brings one to your court, <b>🎲 New faces</b> shows others.</p>
<p>The red badge on a region counts your court members living there.</p>`,
          fr: `<p>La carte montre 37 régions, des Highlands à la Navarre et de la Bretagne à Cracovie, Danemark compris. Touchez-en une pour zoomer ; touchez la mer pour revoir toute la carte.</p>
<p>La fiche en dessous indique qui de votre cour y vit et cinq <b>notables</b> : d'abord la souveraine (Reine de France, Duchesse de Normandie…), puis des dames de tout rang. <b>✉️ Inviter à la cour</b> en amène une à votre cour, <b>🎲 Autres visages</b> en montre d'autres.</p>
<p>Le badge rouge sur une région compte les membres de votre cour qui y vivent.</p>`
        }
      },
      {
        title: { en: 'Anno Domini 1415', fr: 'Anno Domini 1415' },
        body: {
          en: `<p>The court lives in the year <b>1415</b>. Days, months and feasts follow your own calendar, but the year never changes: every date in Valeria (the home page, her memories, the Herald) reads 1415.</p>
<p>It is the year of Agincourt and of the Council of Constance, with three popes at once; Hus is burned in Constance, the Emperor gives Brandenburg to a Hohenzollern, and Eric of Pomerania rules Denmark with an English queen. The ladies, their houses and their news belong to that year.</p>`,
          fr: `<p>La cour vit en l'an <b>1415</b>. Les jours, les mois et les fêtes suivent votre propre calendrier, mais l'année ne change jamais : chaque date de Valeria (l'accueil, ses souvenirs, le Héraut) indique 1415.</p>
<p>C'est l'année d'Azincourt et du concile de Constance, avec trois papes à la fois ; Hus est brûlé à Constance, l'Empereur donne le Brandebourg à un Hohenzollern, et Éric de Poméranie règne sur le Danemark avec une reine anglaise. Les dames, leurs maisons et leurs nouvelles appartiennent à cette année-là.</p>`
        }
      },
      {
        title: { en: 'Backups and Carmen', fr: 'Sauvegardes et Carmen' },
        body: {
          en: `<p><b>👑 Me → 💾 Download backup</b> saves everything to a file. <b>📂 Load backup</b> replaces all data on this device with the file.</p>
<p>The file has the same format as Carmen: a Carmen backup can be loaded here and a Valeria backup can be loaded in Carmen. Fields one app does not know are kept untouched.</p>`,
          fr: `<p><b>👑 Moi → 💾 Télécharger la sauvegarde</b> enregistre tout dans un fichier. <b>📂 Charger une sauvegarde</b> remplace toutes les données de cet appareil par le fichier.</p>
<p>Le fichier a le même format que Carmen : une sauvegarde Carmen se charge ici et une sauvegarde Valeria se charge dans Carmen. Les champs inconnus de l'une ou l'autre application sont conservés tels quels.</p>`
        }
      }
    ]
  },
  { id: 'wonders', shelf: 'guides', icon: '✨', color: '#b08d3c', gen: 'effects', title: { en: 'Book of Wonders', fr: 'Livre des merveilles' }, sub: { en: 'Effects on letters and on the screen', fr: "Effets sur les lettres et à l'écran" } },
  { id: 'events', shelf: 'talk', icon: '💋', color: '#8a2633', gen: 'events', title: { en: 'Book of Events', fr: 'Livre des événements' }, sub: { en: 'Every word that starts something', fr: 'Chaque mot qui déclenche quelque chose' } },
  { id: 'heart', shelf: 'talk', icon: '❤️', color: '#a3243b', gen: 'feelings', title: { en: 'Book of the Heart', fr: 'Livre du cœur' }, sub: { en: 'Trust, love, desire and the status cards', fr: 'Confiance, amour, désir et cartes d’humeur' } },
  { id: 'scenes', shelf: 'talk', icon: '🎬', color: '#7a3b1f', gen: 'scenes', title: { en: 'Book of Scenes', fr: 'Livre des scènes' }, sub: { en: 'Scenes, episodes and Dame Mathilde', fr: 'Scènes, épisodes et Dame Mathilde' } },
  { id: 'questions', shelf: 'talk', icon: '❓', color: '#1f3a6b', gen: 'questions', title: { en: 'Book of Questions', fr: 'Livre des questions' }, sub: { en: 'What you can ask her', fr: 'Ce que vous pouvez lui demander' } },
  { id: 'asks', shelf: 'talk', icon: '❔', color: '#2f5d3a', gen: 'asks', title: { en: 'Her Questions', fr: 'Ses questions' }, sub: { en: 'What she asks you, and how to answer', fr: 'Ce qu’elle vous demande, et comment répondre' } },
  { id: 'conversation', shelf: 'talk', icon: '🔁', color: '#6b4f2f', gen: 'conversation', title: { en: 'The Art of Conversation', fr: "L'Art de la conversation" }, sub: { en: 'How she keeps to the topic', fr: 'Comment elle suit le sujet' } },
  { id: 'memory', shelf: 'talk', icon: '🧠', color: '#5a3a6b', gen: 'memory', title: { en: 'Book of Memory', fr: 'Livre de la mémoire' }, sub: { en: 'What she remembers, and when she says so', fr: 'Ce dont elle se souvient, et quand elle le dit' } },
  { id: 'temper', shelf: 'talk', icon: '🎭', color: '#4a2b5e', gen: 'traits', title: { en: 'Book of Temperaments', fr: 'Livre des tempéraments' }, sub: { en: 'Personality changes every answer', fr: 'Le caractère change chaque réponse' } },
  { id: 'calendar', shelf: 'world', icon: '📅', color: '#2a4f8a', gen: 'calendar', title: { en: 'Calendar of Saints', fr: 'Calendrier des saints' }, sub: { en: 'Feast days, their designs, and your own days', fr: 'Jours de fête, leurs décors, et vos propres jours' } },
  { id: 'realms', shelf: 'world', icon: '🌍', color: '#1d3a8a', gen: 'realms', title: { en: 'Book of Realms', fr: 'Livre des royaumes' }, sub: { en: '37 lands, their tables and their tempers', fr: '37 terres, leurs tables et leurs humeurs' } }
];
