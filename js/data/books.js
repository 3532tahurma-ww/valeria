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
<p>The crest at the bottom left shows who is writing. Tap it to change side when bot mode is off. <b>📜</b> adds a narration line in the middle, <b>✨</b> chooses an effect for the next letter, <b>🔏</b> seals and sends.</p>
<p>Tap a letter to edit it, move it to the other side, give it an effect or delete it.</p>
<p>The <b>⋮</b> menu at the top right holds <b>🤖 Bot mode</b>, <b>⇄ Take turns</b>, <b>✎ Rename</b>, the profile and <b>🔥 Burn this correspondence</b>.</p>`,
          fr: `<p>Ouvrez un personnage et touchez <b>✒️ Écrire</b>. Un personnage peut avoir plusieurs correspondances nommées.</p>
<p>Le blason en bas à gauche montre qui écrit. Touchez-le pour changer de côté quand le mode bot est coupé. <b>📜</b> ajoute une ligne de narration au centre, <b>✨</b> choisit un effet pour la prochaine lettre, <b>🔏</b> scelle et envoie.</p>
<p>Touchez une lettre pour la modifier, la passer de l'autre côté, lui donner un effet ou la supprimer.</p>
<p>Le menu <b>⋮</b> en haut à droite contient <b>🤖 Mode bot</b>, <b>⇄ Chacun son tour</b>, <b>✎ Renommer</b>, le profil et <b>🔥 Brûler cette correspondance</b>.</p>`
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
        title: { en: 'Figure and memory', fr: 'Silhouette et mémoire' },
        body: {
          en: `<p>In the character form, <b>📏 Figure</b> sets her height, build, bosom, hips and intimate sizes (the same values as Carmen). 🎲 rolls a figure that fits her build. In <b>👑 Me</b> you set your own gender and size. All of these change her answers, her questions and some events: see the <i>Book of Temperaments</i>.</p>
<p>Each character also has a <b>🧠 memory</b>: first times with their dates, favourites, your answers to her questions and your last letter. She brings them up herself, and you can ask “do you remember…?”. Read the <i>Book of Memory</i>; the memory is shown on her profile, where ✕ makes her forget a line.</p>
<p>In a letter, <b>🎭</b> opens the list of everything she reacts to: what comes next, her favourites, a surprise, and every event by category with a search box.</p>`,
          fr: `<p>Dans le formulaire, <b>📏 Silhouette</b> fixe sa taille, sa corpulence, sa poitrine, ses hanches et ses mesures intimes (les mêmes valeurs que Carmen). 🎲 tire une silhouette cohérente avec sa corpulence. Dans <b>👑 Moi</b>, vous réglez votre genre et votre taille. Tout cela change ses réponses, ses questions et certains événements : voir le <i>Livre des tempéraments</i>.</p>
<p>Chaque personnage a aussi une <b>🧠 mémoire</b> : premières fois avec leur date, favoris, vos réponses à ses questions et votre dernière lettre. Elle en parle d'elle-même, et vous pouvez demander « vous souvenez-vous… ? ». Lisez le <i>Livre de la mémoire</i> ; la mémoire est visible sur son profil, où ✕ lui fait oublier une ligne.</p>
<p>Dans une lettre, <b>🎭</b> ouvre la liste de tout ce à quoi elle réagit : la suite, ses favoris, une surprise, et chaque événement par catégorie avec une recherche.</p>`
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
        title: { en: 'The laboratory', fr: 'Le laboratoire' },
        body: {
          en: `<p>The <b>🧪 Laboratory</b> (Library, Home or Me) lets you test without writing real letters:</p>
<ul><li><b>🤖 Bot lab</b>: type a letter, choose who reads it (one of your court or a test lady with any traits), the act in progress and the question she asked. You see which path wins, every candidate with its score, the variant used and three sample answers.</li>
<li><b>🎭 Temperament lab</b>: all lines of one event, personality by personality, and which ones your court would get.</li>
<li><b>🌍 Homeland lab</b>: a lady from the land you choose answers five questions; invite her if you like her.</li>
<li><b>⚡ Shortcut lab</b>: the shortcuts of any situation, with their reasons.</li>
<li><b>✨ Effects lab</b>: every effect and sound.</li></ul>`,
          fr: `<p>Le <b>🧪 Laboratoire</b> (Bibliothèque, Accueil ou Moi) permet d'essayer sans écrire de vraies lettres :</p>
<ul><li><b>🤖 Labo du bot</b> : écrivez une lettre, choisissez qui la lit (quelqu'un de votre cour ou une dame de test aux traits de votre choix), l'acte en cours et la question qu'elle a posée. Vous voyez quel chemin l'emporte, chaque candidat avec son score, la variante utilisée et trois réponses d'exemple.</li>
<li><b>🎭 Labo des tempéraments</b> : toutes les répliques d'un événement, caractère par caractère, et celles que recevrait votre cour.</li>
<li><b>🌍 Labo des terres natales</b> : une dame de la terre choisie répond à cinq questions ; invitez-la si elle vous plaît.</li>
<li><b>⚡ Labo des raccourcis</b> : les raccourcis de n'importe quelle situation, avec leurs raisons.</li>
<li><b>✨ Labo des effets</b> : chaque effet et chaque son.</li></ul>`
        }
      },
      {
        title: { en: 'Music and sounds', fr: 'Musique et sons' },
        body: {
          en: `<p>Valeria plays its own music once you first tap the screen (browsers do not allow music before that). Every button answers with a lute string, a sent letter with a wax seal, an arriving letter with a small chapel bell, and the Library pages rustle.</p>
<p>Switch music and sounds on or off and set the volume in <b>👑 Me → Settings</b>. Music needs the internet; everything else works offline.</p>`,
          fr: `<p>Valeria joue sa propre musique dès que vous touchez l'écran pour la première fois (les navigateurs n'autorisent pas la musique avant). Chaque bouton répond par une corde de luth, une lettre envoyée par un sceau de cire, une lettre reçue par une petite cloche de chapelle, et les pages de la Bibliothèque bruissent.</p>
<p>Activez ou coupez musique et sons et réglez le volume dans <b>👑 Moi → Réglages</b>. La musique demande internet ; tout le reste marche hors ligne.</p>`
        }
      },
      {
        title: { en: 'The map', fr: 'La carte' },
        body: {
          en: `<p>The map shows 22 regions, from the Highlands to Navarre. Tap one to zoom in; tap the sea to see the whole map again.</p>
<p>The card below lists who from your court lives there and five <b>notables</b>: the ruler first (Queen of France, Duchess of Normandy…), then ladies of every rank. <b>✉️ Invite to court</b> brings one to your court, <b>🎲 New faces</b> shows others.</p>
<p>The red badge on a region counts your court members living there.</p>`,
          fr: `<p>La carte montre 22 régions, des Highlands à la Navarre. Touchez-en une pour zoomer ; touchez la mer pour revoir toute la carte.</p>
<p>La fiche en dessous indique qui de votre cour y vit et cinq <b>notables</b> : d'abord la souveraine (Reine de France, Duchesse de Normandie…), puis des dames de tout rang. <b>✉️ Inviter à la cour</b> en amène une à votre cour, <b>🎲 Autres visages</b> en montre d'autres.</p>
<p>Le badge rouge sur une région compte les membres de votre cour qui y vivent.</p>`
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
  { id: 'questions', shelf: 'talk', icon: '❓', color: '#1f3a6b', gen: 'questions', title: { en: 'Book of Questions', fr: 'Livre des questions' }, sub: { en: 'What you can ask her', fr: 'Ce que vous pouvez lui demander' } },
  { id: 'asks', shelf: 'talk', icon: '❔', color: '#2f5d3a', gen: 'asks', title: { en: 'Her Questions', fr: 'Ses questions' }, sub: { en: 'What she asks you, and how to answer', fr: 'Ce qu’elle vous demande, et comment répondre' } },
  { id: 'conversation', shelf: 'talk', icon: '🔁', color: '#6b4f2f', gen: 'conversation', title: { en: 'The Art of Conversation', fr: "L'Art de la conversation" }, sub: { en: 'How she keeps to the topic', fr: 'Comment elle suit le sujet' } },
  { id: 'memory', shelf: 'talk', icon: '🧠', color: '#5a3a6b', gen: 'memory', title: { en: 'Book of Memory', fr: 'Livre de la mémoire' }, sub: { en: 'What she remembers, and when she says so', fr: 'Ce dont elle se souvient, et quand elle le dit' } },
  { id: 'temper', shelf: 'talk', icon: '🎭', color: '#4a2b5e', gen: 'traits', title: { en: 'Book of Temperaments', fr: 'Livre des tempéraments' }, sub: { en: 'Personality changes every answer', fr: 'Le caractère change chaque réponse' } },
  { id: 'realms', shelf: 'world', icon: '🌍', color: '#1d3a8a', gen: 'realms', title: { en: 'Book of Realms', fr: 'Livre des royaumes' }, sub: { en: '22 lands, their tables and their tempers', fr: '22 terres, leurs tables et leurs humeurs' } }
];
