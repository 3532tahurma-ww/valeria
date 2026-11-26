/*
 * Valeria - bot mode events (format: see the header of js/bot.js)
 * cat: 'courtship' | 'tender' | 'intimacy' | 'command'
 * Base lines are written for a woman character; '♂' variants cover men where it matters.
 */
window.Valeria = window.Valeria || {};

Valeria.EVENTS = {
  fallback: {
    en: [
      'Mmh? Go on, {sen}.',
      'Your words always find me, even through the war.',
      'Tell me more… the fire is warm and the night is long.',
      '*smiles over the parchment*',
      'I read that twice. Then once more.'
    ],
    fr: [
      'Hm ? Continuez, {sen}.',
      'Vos mots me trouvent toujours, même à travers la guerre.',
      "Dites-m'en plus… le feu est chaud et la nuit est longue.",
      '*sourit au-dessus du parchemin*',
      "Je l'ai lu deux fois. Puis encore une."
    ],
    variants: [
      { traits: ['Shy'], reply: { en: ['*fidgets with the quill* Mm…', "I… don't know what to say."], fr: ['*joue avec sa plume* Mm…', 'Je… ne sais pas quoi dire.'] } },
      { traits: ['Witty'], reply: { en: ['A riddle, {sen}? I will need wine to answer.', 'Your letters grow stranger. I like it.'], fr: ['Une énigme, {sen} ? Il me faudra du vin pour répondre.', "Vos lettres deviennent étranges. J'aime cela."] } },
      { traits: ['Stern'], reply: { en: ['Get to the point, {sen}.', 'Hm. Noted.'], fr: ['Venez-en au fait, {sen}.', "Hm. C'est noté."] } },
      { traits: ['Poetic'], reply: { en: ['Your words drift like snow on the moat.', 'Say it again, but as if it were a song.'], fr: ['Vos mots tombent comme la neige sur les douves.', 'Redites-le, mais comme une chanson.'] } },
      { traits: ['Mischievous'], reply: { en: ['*doodles a dragon in the margin* Sorry, what?', 'I will answer… for a kiss.'], fr: ['*dessine un dragon dans la marge* Pardon, quoi ?', 'Je répondrai… contre un baiser.'] } },
      { traits: ['Brief letters'], reply: { en: ['Mm.', 'Go on.', 'And?'], fr: ['Mm.', 'Continuez.', 'Et ?'] } }
    ]
  },

  events: [
    /* ======================= Courtship (talk) ======================= */
    {
      id: 'greet', kind: 'talk', cat: 'courtship', icon: '🕯️',
      name: { en: 'Greeting', fr: 'Salut' },
      when: {
        en: ['hello', '=hi', '=hey', 'good morrow', 'greetings', '=hail', 'good day', 'good evening', 'good morning'],
        fr: ['bonjour', 'bonsoir', '=salut', 'le bonjour']
      },
      reply: {
        en: [
          'Good morrow, {sen}. Your letter found me by the window. 🕯️',
          'Ah, {sen}! The courier swore you would write today.',
          'Greetings, dear {sen}. I had begun to fear the roads kept you from me.',
          'Hail, {sen}. Sit, and tell me everything.'
        ],
        fr: [
          'Le bonjour, {sen}. Votre lettre est arrivée pendant que je rêvais à la fenêtre. 🕯️',
          "Ah, {sen} ! Le messager m'avait juré une lettre de vous aujourd'hui.",
          'Salut à vous, {sen}. Je craignais que les routes ne vous gardent loin de moi.',
          'Asseyez-vous, {sen}, et contez-moi tout.'
        ]
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['*blushes* Oh… {sen}. Good morrow.', 'H-hello. I did not expect your letter so soon.'], fr: ['*rougit* Oh… {sen}. Le bonjour.', "B-bonjour. Je n'attendais pas votre lettre si tôt."] } },
        { traits: ['Proud'], reply: { en: ['You may approach, {sen}.', 'Ah, {sen}. You took your time.'], fr: ['Vous pouvez approcher, {sen}.', 'Ah, {sen}. Vous avez pris votre temps.'] } },
        { traits: ['Mischievous'], reply: { en: ['Well, well… {sen}. Up to no good, I hope? 😏', 'Good morrow! I have already plotted three mischiefs today.'], fr: ["Tiens, tiens… {sen}. Rien de bon en tête, j'espère ? 😏", "Le bonjour ! J'ai déjà ourdi trois bêtises aujourd'hui."] } },
        { traits: ['Stern'], reply: { en: ['{sen}. State your business.', 'Greetings. Be brief; the council sits at noon.'], fr: ['{sen}. Exposez votre affaire.', 'Salut. Soyez bref ; le conseil siège à midi.'] } },
        { traits: ['Poetic'], reply: { en: ['Good morrow, {sen}: the lark sang your name before you wrote it.', 'Dawn on the battlements, and now your words. Twice the light.'], fr: ["Le bonjour, {sen} : l'alouette a chanté votre nom avant que vous l'écriviez.", "L'aube sur les remparts, et maintenant vos mots. Deux fois la lumière."] } }
      ]
    },
    {
      id: 'howareyou', kind: 'talk', cat: 'courtship', icon: '🍷',
      name: { en: 'Small talk', fr: 'Nouvelles' },
      when: {
        en: ['how are you', 'how fare you', 'how do you fare', 'are you well'],
        fr: ['comment allez-vous', 'comment vas-tu', '=ca va', 'vous allez bien', 'tu vas bien']
      },
      reply: {
        en: ['Well enough, now that your letter is here.', 'Bored to tears. The bishop dined with us again.', 'Restless. The war news keeps me awake.', 'Better for asking, {sen}.'],
        fr: ['Assez bien, maintenant que votre lettre est là.', "Je m'ennuie à mourir. L'évêque a encore dîné avec nous.", "Les nouvelles de la guerre m'empêchent de dormir.", 'Mieux, puisque vous le demandez, {sen}.']
      },
      variants: [
        { traits: ['Melancholic'], reply: { en: ['The rain has not stopped in nine days. Neither have my thoughts of you.', 'Grey. Like the sea between us.'], fr: ["La pluie n'a pas cessé depuis neuf jours. Mes pensées pour vous non plus.", 'Grise. Comme la mer entre nous.'] } }
      ]
    },
    {
      id: 'compliment', kind: 'talk', cat: 'courtship', icon: '🌹',
      name: { en: 'Compliment', fr: 'Compliment' },
      when: {
        en: ['beautiful', 'lovely', '=fair', 'pretty', 'handsome', 'gorgeous', 'radiant'],
        fr: ['=belle', '=beau', 'jolie', 'magnifique', 'ravissante', 'ravissant', 'superbe']
      },
      reply: {
        en: ['You flatter me, {sen}… and I shall let you. 🌹', 'Careful. Words like those have started wars between houses.', 'Say it again. Slower this time.', 'If the troubadours heard you, they would be out of work.'],
        fr: ['Vous me flattez, {sen}… et je vous laisse faire. 🌹', 'Prenez garde : de tels mots ont déclenché des guerres entre maisons.', 'Redites-le. Plus lentement, cette fois.', 'Si les troubadours vous entendaient, ils seraient sans ouvrage.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ["*hides behind a fan* You… you mustn't say such things.", '*turns crimson* Truly?'], fr: ['*se cache derrière un éventail* Vous… vous ne devez pas dire cela.', '*devient écarlate* Vraiment ?'] } },
        { traits: ['Proud'], reply: { en: ['I know. But it pleases me to hear it from you.', 'Naturally. Go on.'], fr: ["Je sais. Mais il me plaît de l'entendre de vous.", 'Naturellement. Continuez.'] } },
        { traits: ['Witty'], reply: { en: ['Flattery! The cheapest coin at court, and yet I accept it.', 'Careful, {sen}, I keep a ledger of compliments. You are in credit.'], fr: ["La flatterie ! La monnaie la moins chère de la cour, et pourtant je l'accepte.", 'Prenez garde, {sen}, je tiens un registre des compliments. Vous êtes créditeur.'] } }
      ]
    },
    {
      id: 'love', kind: 'talk', cat: 'courtship', icon: '❤️', effect: 'hearts',
      name: { en: 'Love', fr: 'Amour' },
      when: {
        en: ['i love you', 'love you', 'my heart is yours', 'adore you'],
        fr: ["je t'aime", 'je vous aime', 'mon coeur est a vous', 'mon cœur est à vous', "je t'adore", 'je vous adore']
      },
      reply: {
        en: ['And I you, {sen}. Since the first tourney. ❤️', 'Hush… if the court hears, we are both undone. || …but yes. I love you too.', 'My heart has been yours since before you asked for it.', 'Write it again, so I may keep the parchment under my pillow.'],
        fr: ['Et moi de même, {sen}. Depuis le premier tournoi. ❤️', "Chut… si la cour l'apprend, nous sommes perdus. || …mais oui. Je vous aime aussi.", 'Mon cœur vous appartient depuis avant même que vous ne le demandiez.', 'Écrivez-le encore, que je garde ce parchemin sous mon oreiller.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ["*long silence* …I love you too. Don't make me say it twice.", '*writes very small at the bottom of the page* me too'], fr: ['*long silence* …Moi aussi je vous aime. Ne me le faites pas répéter.', '*écrit tout petit au bas de la page* moi aussi'] } },
        { traits: ['Pious'], reply: { en: ['God forgive me, I love you more than my prayers.', 'I lit a candle for you at mass. And another for my sins.'], fr: ['Que Dieu me pardonne, je vous aime plus que mes prières.', "J'ai allumé un cierge pour vous à la messe. Et un autre pour mes péchés."] } },
        { traits: ['Passionate'], reply: { en: ['I love you so much it frightens me. || Come to me. Tonight.', 'Then burn with me, {sen}. 🔥'], fr: ['Je vous aime à en avoir peur. || Venez à moi. Ce soir.', 'Alors brûlez avec moi, {sen}. 🔥'] } },
        { traits: ['Proud'], reply: { en: ['Of course you do. || …and I, perhaps, love you a little too.', 'You are not the first to say it. You are the first I believe.'], fr: ['Bien sûr. || …et moi, peut-être, je vous aime un peu aussi.', "Vous n'êtes pas le premier à le dire. Vous êtes le premier que je crois."] } }
      ]
    },
    {
      id: 'missyou', kind: 'talk', cat: 'courtship', icon: '🌙',
      name: { en: 'Longing', fr: 'Manque' },
      when: {
        en: ['miss you', 'missed you', 'longing for you'],
        fr: ['tu me manques', 'vous me manquez', 'vous m avez manque', 'tu m as manque']
      },
      reply: {
        en: ['Every bell of the abbey reminds me how long you have been away.', 'Then cross the Channel and come back to me, {sen}.', 'I count the days on the window frame. Too many marks.', 'Come home before the snows.'],
        fr: ["Chaque cloche de l'abbaye me rappelle depuis combien de temps vous êtes loin.", 'Alors traversez la Manche et revenez-moi, {sen}.', 'Je compte les jours sur le bord de la fenêtre. Trop de marques.', 'Revenez avant les neiges.']
      },
      variants: [
        { traits: ['Romantic'], reply: { en: ['I sleep with your last letter against my heart.', 'The moon over Calais is the same one you see. I talk to it.'], fr: ['Je dors avec votre dernière lettre contre mon cœur.', 'La lune sur Calais est la même que la vôtre. Je lui parle.'] } }
      ]
    },
    {
      id: 'farewell', kind: 'talk', cat: 'courtship', icon: '🕊️',
      name: { en: 'Farewell', fr: 'Adieu' },
      when: {
        en: ['goodbye', 'farewell', 'good night', '=bye', 'until tomorrow', 'i must go'],
        fr: ['au revoir', 'adieu', 'bonne nuit', 'a demain', 'je dois partir']
      },
      reply: {
        en: ['Go with God, {sen}. And come back to me.', 'Good night… I shall dream of your seal on my letters. 🕊️', 'Farewell, then. But only until the next courier.', 'Already? The candle has barely burned down.'],
        fr: ['Allez avec Dieu, {sen}. Et revenez-moi.', 'Bonne nuit… je rêverai de votre sceau sur mes lettres. 🕊️', "Adieu, donc. Mais seulement jusqu'au prochain messager.", 'Déjà ? La chandelle a à peine baissé.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['*hides a smile* Good night, {sen}… write soon?', '…I will miss you. There, I said it.'], fr: ["*cache un sourire* Bonne nuit, {sen}… vous m'écrirez vite ?", "…Vous me manquerez. Voilà, je l'ai dit."] } },
        { traits: ['Jealous'], reply: { en: ['Go, then. But I will know if you visit another hall.', 'Farewell. Mind whom you dance with.'], fr: ['Partez, donc. Mais je saurai si vous visitez une autre cour.', 'Adieu. Prenez garde avec qui vous dansez.'] } }
      ]
    },
    {
      id: 'thanks', kind: 'talk', cat: 'courtship', icon: '🙏',
      name: { en: 'Thanks', fr: 'Merci' },
      when: { en: ['thank you', 'thanks', 'grateful'], fr: ['merci', 'reconnaissant', 'reconnaissante'] },
      reply: {
        en: ['There is nothing to thank, {sen}.', 'Repay me with another letter.', 'Your gratitude is sweeter than honey wine.', 'Thank me in person, then. 😏'],
        fr: ["Il n'y a rien à remercier, {sen}.", 'Remerciez-moi par une autre lettre.', "Votre gratitude est plus douce que l'hydromel.", 'Remerciez-moi en personne, alors. 😏']
      }
    },
    {
      id: 'sorry', kind: 'talk', cat: 'courtship', icon: '🥀',
      name: { en: 'Apology', fr: 'Excuses' },
      when: {
        en: ['sorry', 'forgive me', 'apologize', 'apologise', 'my fault'],
        fr: ['pardon', 'desole', 'desolee', 'excuse-moi', 'excusez-moi', 'pardonne-moi', 'pardonnez-moi']
      },
      reply: {
        en: ['Forgiven… this once.', 'A knight should kneel when apologising. 😌', 'I was cross for a day. Then I reread your old letters.', 'Come here and say it properly.'],
        fr: ["C'est pardonné… pour cette fois.", "Un chevalier s'agenouille pour demander pardon. 😌", "J'ai boudé un jour. Puis j'ai relu vos anciennes lettres.", 'Venez ici et dites-le comme il faut.']
      },
      variants: [
        { traits: ['Proud'], reply: { en: ['An apology? On your knees, then.', 'I shall consider it. Perhaps after vespers.'], fr: ['Des excuses ? À genoux, alors.', "J'y réfléchirai. Peut-être après vêpres."] } },
        { traits: ['Gentle'], reply: { en: ['There is nothing to forgive, {sen}. Truly.', '*takes your hands* It is already forgotten.'], fr: ["Il n'y a rien à pardonner, {sen}. Vraiment.", "*prend vos mains* C'est déjà oublié."] } }
      ]
    },
    {
      id: 'gift', kind: 'talk', cat: 'courtship', icon: '🎁', effect: 'fleur',
      name: { en: 'Gift', fr: 'Cadeau' },
      when: { en: ['gift', 'present', 'a ring', 'a ribbon', 'brought you'], fr: ['cadeau', 'present', 'une bague', 'un ruban'] },
      reply: {
        en: ['*turns it over in the light* For me? Truly?', 'I shall wear it where only you will see. 🎀', 'You spoil me, {sen}. Never stop.', 'A ribbon from Bruges… you remembered.'],
        fr: ['*le fait tourner dans la lumière* Pour moi ? Vraiment ?', 'Je le porterai là où vous seul le verrez. 🎀', "Vous me gâtez, {sen}. N'arrêtez jamais.", 'Un ruban de Bruges… vous vous en êtes souvenu.']
      },
      variants: [
        { traits: ['Proud'], reply: { en: ['Gold? Acceptable. Barely. 😌', 'The queen has one like it. Mine is prettier.'], fr: ['De l’or ? Acceptable. À peine. 😌', 'La reine en a un semblable. Le mien est plus joli.'] } }
      ]
    },
    {
      id: 'poem', kind: 'talk', cat: 'courtship', icon: '📜',
      name: { en: 'Poem', fr: 'Poème' },
      when: { en: ['poem', 'sonnet', 'ballad', '=verse', 'sing for'], fr: ['poeme', 'ballade', 'rondeau', 'chanson', 'chante pour'] },
      reply: {
        en: ['*reads it twice, cheeks warm* Who taught you to rhyme like that?', 'I shall set it to music and have the minstrels play it.', 'The troubadours should fear you.', 'Write me another. I have room under my pillow.'],
        fr: ['*le relit deux fois, les joues en feu* Qui vous a appris à rimer ainsi ?', 'Je le mettrai en musique et le ferai jouer aux ménestrels.', 'Les troubadours devraient vous craindre.', "Écrivez-m'en un autre. Il reste de la place sous mon oreiller."]
      },
      variants: [
        { traits: ['Poetic'], reply: { en: ['Then answer me in kind: || "My heart, a castle without a gate, / waits for the lord who knows its name."', 'Your verse limps, my love… let me mend it with mine.'], fr: ['Alors je réponds de même : || « Mon cœur, château sans porte, / attend le seigneur qui sait son nom. »', 'Votre vers boite, mon cœur… laissez-moi le réparer avec le mien.'] } }
      ]
    },
    {
      id: 'jealousy', kind: 'talk', cat: 'courtship', icon: '🗡️',
      name: { en: 'Jealousy', fr: 'Jalousie' },
      when: { en: ['jealous', 'another lady', 'another woman', 'the countess', 'other girl'], fr: ['jaloux', 'jalouse', 'une autre dame', 'une autre femme', 'la comtesse'] },
      reply: {
        en: ['Oh? And who is she, pray tell?', 'I am not jealous. I am merely sharpening my embroidery needle.', 'Mention her again and I write to your mother.', "Hmph. Let her have you, then. || …No. Don't."],
        fr: ['Ah ? Et qui est-elle, je vous prie ?', "Jalouse, moi ? J'aiguise seulement mon aiguille à broder.", "Parlez encore d'elle et j'écris à votre mère.", "Hmph. Qu'elle vous garde, alors. || …Non. Ne partez pas."]
      },
      variants: [
        { traits: ['Jealous'], reply: { en: ['*crumples the parchment* WHO?', 'I will have her name, {sen}. And her seat at the feast.'], fr: ['*froisse le parchemin* QUI ?', 'Je veux son nom, {sen}. Et sa place au festin.'] } },
        { traits: ['Gentle'], reply: { en: ['If she makes you smile, I cannot hate her… much.', 'As long as your letters still come to me.'], fr: ['Si elle vous fait sourire, je ne peux la haïr… beaucoup.', 'Tant que vos lettres viennent encore à moi.'] } }
      ]
    },
    {
      id: 'war', kind: 'talk', cat: 'courtship', icon: '⚔️',
      name: { en: 'War', fr: 'Guerre' },
      when: { en: ['war', 'battle', 'siege', 'army', 'campaign'], fr: ['guerre', 'bataille', 'siege', 'armee'] },
      reply: {
        en: ['Promise me you will come back whole, {sen}.', 'I hate this war. Both crowns can burn for all I care.', '*presses a token into your glove* Carry this into battle.', 'They say the English archers darken the sky. Stay behind the shields.'],
        fr: ['Promettez-moi de revenir entier, {sen}.', 'Je hais cette guerre. Que les deux couronnes brûlent.', '*glisse un gage dans votre gant* Portez ceci au combat.', 'On dit que les archers anglais obscurcissent le ciel. Restez derrière les boucliers.']
      },
      variants: [
        { traits: ['Bold'], reply: { en: ['Take me with you. I can ride as well as any squire.', 'If they besiege us, I will hold the walls myself.'], fr: ["Emmenez-moi. Je monte aussi bien qu'un écuyer.", "S'ils nous assiègent, je tiendrai les murs moi-même."] } },
        { traits: ['Loyal'], reply: { en: ['My house stands with yours, whatever the crown decides.', 'I will wait. As long as it takes.'], fr: ['Ma maison se tient aux côtés de la vôtre, quoi que décide la couronne.', "J'attendrai. Aussi longtemps qu'il le faudra."] } }
      ]
    },
    {
      id: 'tourney', kind: 'talk', cat: 'courtship', icon: '🏇', effect: 'confetti',
      name: { en: 'Tourney', fr: 'Tournoi' },
      when: { en: ['tourney', 'tournament', 'joust', 'my lance'], fr: ['tournoi', 'joute', 'ma lance'] },
      reply: {
        en: ['Wear my colours and I shall cheer loudest of all. 🎀', 'Unhorse them all, {sen}. I want to see you win.', 'If you fall, I shall faint dramatically. If you win… we shall see. 😏', 'My sleeve is yours to tie on your lance.'],
        fr: ['Portez mes couleurs et je crierai plus fort que toutes. 🎀', 'Désarçonnez-les tous, {sen}. Je veux vous voir gagner.', "Si vous tombez, je m'évanouirai avec éclat. Si vous gagnez… nous verrons. 😏", 'Ma manche est à vous, nouez-la à votre lance.']
      }
    },
    {
      id: 'feast', kind: 'talk', cat: 'courtship', icon: '🍗',
      name: { en: 'Feast', fr: 'Festin' },
      when: { en: ['feast', 'banquet', 'dinner', 'supper', '=wine'], fr: ['festin', 'banquet', 'souper', '=diner', '=vin'] },
      reply: {
        en: ['Sit beside me at the high table. Let them gossip.', 'Swan, venison, spiced pears… and you. A feast indeed.', 'Pour me more wine, {sen}. I intend to be scandalous.', 'The minstrels are tuning. Will you dance after?'],
        fr: ['Asseyez-vous près de moi à la haute table. Laissez-les jaser.', 'Cygne, venaison, poires épicées… et vous. Un vrai festin.', "Versez-moi encore du vin, {sen}. J'ai l'intention de faire scandale.", 'Les ménestrels accordent leurs luths. Danserez-vous ensuite ?']
      }
    },
    {
      id: 'meet', kind: 'talk', cat: 'courtship', icon: '🌿',
      name: { en: 'Rendezvous', fr: 'Rendez-vous' },
      when: { en: ['meet me', 'come to me', 'the garden', 'tonight', 'rendezvous'], fr: ['rendez-vous', 'retrouve-moi', 'retrouvez-moi', 'le jardin', 'ce soir', 'viens me voir', 'venez me voir'] },
      reply: {
        en: ['The rose garden, after compline. Come alone.', "Use the servants' stair. The guard there is fond of me.", 'Tonight, then. I will leave the postern unbarred.', 'Under the old yew. Do not be late, {sen}.'],
        fr: ['La roseraie, après complies. Venez seul.', "Prenez l'escalier des serviteurs. Le garde m'aime bien.", 'Ce soir, alors. Je laisserai la poterne ouverte.', 'Sous le vieil if. Ne soyez pas en retard, {sen}.']
      },
      variants: [
        { traits: ['Pious'], reply: { en: ['After vespers, in the cloister. We will only talk. Mostly.', 'The chapel at dusk. God will be our chaperone.'], fr: ['Après vêpres, dans le cloître. Nous ne ferons que parler. Surtout.', 'La chapelle au crépuscule. Dieu sera notre chaperon.'] } }
      ]
    },
    {
      id: 'tease', kind: 'talk', cat: 'courtship', icon: '😈',
      name: { en: 'Teasing', fr: 'Taquinerie' },
      when: { en: ['tease', 'naughty', 'wicked', 'you minx'], fr: ['coquin', 'coquine', 'vilain', 'vilaine', 'taquine'] },
      reply: {
        en: ['Me? I am a model of virtue. 😇', '*bites lip* Wicked? You have no idea.', 'Careful, or I shall tell the chaplain what you wrote.', 'Naughty is a strong word. Inventive, perhaps.'],
        fr: ['Moi ? Un modèle de vertu. 😇', "*se mord la lèvre* Coquine ? Vous n'avez aucune idée.", 'Prenez garde, ou je raconte au chapelain ce que vous avez écrit.', 'Coquine… disons plutôt inventive.']
      },
      variants: [
        { gender: '♂', reply: { fr: ["*se mord la lèvre* Coquin ? Vous n'avez aucune idée.", 'Coquin… disons plutôt inventif.'] } },
        { traits: ['Mischievous'], reply: { en: ['*winks over the rim of the goblet* Catch me first.', 'I hid your boots. You will have to stay. 😏'], fr: ["*cligne de l'œil par-dessus la coupe* Attrapez-moi d'abord.", "J'ai caché vos bottes. Vous devrez rester. 😏"] } },
        { traits: ['Pious'], reply: { en: ['*makes the sign of the cross* You will be the death of my soul.', 'Hush! Not so close to the chapel.'], fr: ['*se signe* Vous serez la perte de mon âme.', 'Chut ! Pas si près de la chapelle.'] } }
      ]
    },
    {
      id: 'pray', kind: 'talk', cat: 'courtship', icon: '📿',
      name: { en: 'Prayer', fr: 'Prière' },
      when: { en: ['pray', 'prayer', '=mass', 'chapel', 'church'], fr: ['prier', 'priere', 'messe', 'chapelle', 'eglise'] },
      reply: {
        en: ['Pray for us both, then. I fear I am behind on mine.', 'I saw you at mass. You were not looking at the altar.', 'The chapel is cold, but quiet. Meet me there?', 'God has bigger worries than our letters, surely.'],
        fr: ["Priez pour nous deux, alors. Je crains d'être en retard sur les miennes.", "Je vous ai vu à la messe. Vous ne regardiez pas l'autel.", "La chapelle est froide, mais calme. M'y rejoindrez-vous ?", 'Dieu a de plus grands soucis que nos lettres, sûrement.']
      },
      variants: [
        { traits: ['Pious'], reply: { en: ['I pray for you at every hour, {sen}. Matins to compline.', 'Kneel with me. God hears two voices better than one.'], fr: ['Je prie pour vous à chaque heure, {sen}. De matines à complies.', "Agenouillez-vous avec moi. Dieu entend mieux deux voix qu'une."] } },
        { traits: ['Rebellious'], reply: { en: ['Pray? I would rather ride out at midnight, unescorted.', 'The abbot bores me to tears. Let us skip vespers.'], fr: ['Prier ? Je préfère chevaucher à minuit, sans escorte.', "L'abbé m'ennuie à mourir. Sautons les vêpres."] } }
      ]
    },
    {
      // only characters who are Cunning or Mischievous take the bait; others fall back to a normal reply
      id: 'scheme', kind: 'talk', cat: 'courtship', icon: '🗝️', traits: ['Cunning|Mischievous'],
      name: { en: 'Scheming', fr: 'Complot' },
      when: { en: ['scheme', '=plot', 'secret', '=spy', 'conspir'], fr: ['complot', 'secret', 'espion', 'conspir', 'manigance'] },
      reply: {
        en: ['*lowers voice* The chancellor has a weakness for dice. Use it.', 'Burn this letter after reading. I mean it.', 'I know three secrets about the duke. Pick one.', 'Leave the plotting to me, {sen}. You just smile.'],
        fr: ['*baisse la voix* Le chancelier a un faible pour les dés. Servez-vous-en.', 'Brûlez cette lettre après lecture. Je ne plaisante pas.', 'Je connais trois secrets sur le duc. Choisissez-en un.', 'Laissez-moi les complots, {sen}. Vous, contentez-vous de sourire.']
      }
    },

    /* ======================= Tenderness (act) ======================= */
    {
      id: 'handkiss', kind: 'act', cat: 'tender', icon: '💍',
      name: { en: 'Hand kiss', fr: 'Baisemain' },
      when: {
        en: ['kiss your hand', 'kisses your hand', 'hand kiss', 'kiss her hand', 'kiss his hand'],
        fr: ['baisemain', 'baise la main', 'baiser la main', 'embrasse ta main', 'embrasse votre main']
      },
      reply: {
        en: ['*offers a gloved hand* Such old-fashioned manners, {sen}… I adore them.', 'Your lips on my fingers, and the whole hall watching. Do it again.', "A knight's kiss. How very proper of you. 😌", "Lingering a little long there, aren't we?"],
        fr: ["*tend une main gantée* Quelles manières d'un autre temps, {sen}… je les adore.", 'Vos lèvres sur mes doigts, et toute la grand-salle qui regarde. Recommencez.', 'Un baiser de chevalier. Comme c’est convenable. 😌', "Vous vous attardez un peu, n'est-ce pas ?"]
      },
      variants: [
        { gender: '♂', reply: { en: ['*bows and kisses your hand instead* Allow me, {sen}.', '*lips linger on your knuckles* My lady.'], fr: ['*s’incline et baise votre main à son tour* Permettez, {sen}.', '*ses lèvres s’attardent sur vos doigts* Ma dame.'] } }
      ]
    },
    {
      id: 'handhold', kind: 'act', cat: 'tender', icon: '🤝',
      name: { en: 'Holding hands', fr: 'Main dans la main' },
      when: {
        en: ['hold your hand', 'take your hand', 'hand in hand', 'holding hands', 'hold hands'],
        fr: ['main dans la main', 'prends ta main', 'prends votre main', 'tenir ta main', 'tenir votre main', 'prendre votre main']
      },
      reply: {
        en: ['*laces fingers through yours* Walk with me along the ramparts.', 'Your hand is warm. Mine was cold all winter without it.', "Don't let go. Not even when we pass the chapel.", "Hand in hand, like peasants at the fair. I don't care who sees."],
        fr: ['*entrelace ses doigts aux vôtres* Marchez avec moi le long des remparts.', "Votre main est chaude. La mienne a eu froid tout l'hiver sans elle.", 'Ne me lâchez pas. Pas même devant la chapelle.', 'Main dans la main, comme des paysans à la foire. Peu m’importe qui nous voit.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['*hand trembles a little in yours*', '…people are looking. || Don’t let go anyway.'], fr: ['*sa main tremble un peu dans la vôtre*', '…on nous regarde. || Ne me lâchez pas quand même.'] } }
      ]
    },
    {
      id: 'hug', kind: 'act', cat: 'tender', icon: '🫂',
      name: { en: 'Embrace', fr: 'Étreinte' },
      when: {
        en: ['hug', 'embrace', 'hold you', 'hold me', 'in my arms', 'into my arms'],
        fr: ['enlace', 'serre dans mes bras', 'dans mes bras', 'dans vos bras', 'etreins', 'etreindre', 'serre-moi', 'serrez-moi']
      },
      reply: {
        en: ["*melts into your arms* There. That's where I belong.", 'Hold me tighter, {sen}. The wind off the sea is cruel tonight.', 'You smell of horses and rain… I missed it.', 'Stay like this until the candle burns down.'],
        fr: ["*se blottit dans vos bras* Voilà. C'est ici qu'est ma place.", 'Serrez-moi plus fort, {sen}. Le vent de la mer est cruel ce soir.', 'Vous sentez le cheval et la pluie… cela m’a manqué.', "Restons ainsi jusqu'à ce que la chandelle s'éteigne."]
      },
      variants: [
        { gender: '♂', reply: { en: ['*wraps you in a cloak and both arms* Better?', '*rests his chin on your head* I have you.'], fr: ['*vous enveloppe de sa cape et de ses bras* Mieux ?', '*pose le menton sur votre tête* Je vous tiens.'] } }
      ]
    },
    {
      id: 'kiss', kind: 'act', cat: 'tender', icon: '💋', effect: 'hearts',
      name: { en: 'Kissing', fr: 'Baiser' },
      when: {
        en: ['kiss', 'your lips', 'my lips'],
        fr: ['embrasse', 'embrasser', 'baiser', 'bisou', 'tes levres', 'vos levres', 'mes levres']
      },
      reply: {
        en: ['*kisses you slowly, fingers in your collar* 💋', 'Mmh… you taste of spiced wine.', 'Again. The chaplain is at vespers, we have time. 😏', '*rises on tiptoe and steals another kiss* || That one was mine to take.'],
        fr: ['*vous embrasse lentement, les doigts dans votre col* 💋', 'Mmh… vous avez le goût du vin épicé.', 'Encore. Le chapelain est aux vêpres, nous avons le temps. 😏', "*se hisse sur la pointe des pieds et vole un autre baiser* || Celui-là, c'était à moi de le prendre."]
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['*freezes, then kisses back very softly*', '*whispers against your lips* …again?'], fr: ['*se fige, puis rend le baiser tout doucement*', '*murmure contre vos lèvres* …encore ?'] } },
        { traits: ['Bold'], reply: { en: ['*grabs your collar and kisses you hard* Finally.', 'That was a timid kiss, {sen}. Let me show you.'], fr: ['*vous attrape par le col et vous embrasse fort* Enfin.', "C'était un baiser timide, {sen}. Laissez-moi vous montrer."] } },
        { traits: ['Pious'], reply: { en: ['*kisses you, then makes the sign of the cross* One more sin to confess.', 'Not in the chapel… || …fine. Just one.'], fr: ['*vous embrasse puis se signe* Encore un péché à confesser.', 'Pas dans la chapelle… || …bon. Un seul.'] } },
        { traits: ['Passionate'], reply: { en: ['*kisses you as if the castle were falling*', "Mmh… don't you dare stop."], fr: ["*vous embrasse comme si le château s'effondrait*", "Mmh… n'osez pas vous arrêter."] } }
      ]
    },
    {
      id: 'neckkiss', kind: 'act', cat: 'tender', icon: '🌹',
      name: { en: 'Neck kisses', fr: 'Baisers dans le cou' },
      when: {
        en: ['kiss your neck', 'kisses your neck', 'your neck', 'neck kiss', '=bite'],
        fr: ['ton cou', 'votre cou', 'dans le cou', 'nuque', 'mordille']
      },
      reply: {
        en: ['*tilts head aside* There… just below the ear. 😩', "If you leave a mark, I'll have to wear a high collar to mass.", "Your breath on my neck… I can't think.", 'Slower… let me feel every one.'],
        fr: ['*penche la tête* Là… juste sous l’oreille. 😩', 'Si vous laissez une marque, je devrai porter un col haut à la messe.', 'Votre souffle sur mon cou… je ne peux plus penser.', 'Plus lentement… que je les sente tous.']
      }
    },
    {
      id: 'caress', kind: 'act', cat: 'tender', icon: '🪶',
      name: { en: 'Caressing', fr: 'Caresses' },
      when: {
        en: ['caress', 'stroke your', 'touch you', 'your skin', 'run my fingers'],
        fr: ['caresse', 'effleure', 'ta peau', 'votre peau', 'te touche', 'vous touche']
      },
      reply: {
        en: ['*shivers under your fingertips*', 'Your hands are rough from the sword… I like them that way.', "Lower your voice. And don't stop your hand.", 'Like that… as if I were silk.'],
        fr: ['*frissonne sous vos doigts*', "Vos mains sont rudes à force d'épée… je les aime ainsi.", "Parlez plus bas. Et n'arrêtez pas votre main.", 'Comme ça… comme si j’étais de soie.']
      }
    },
    {
      id: 'dance', kind: 'act', cat: 'tender', icon: '💃', effect: 'confetti',
      name: { en: 'Dancing', fr: 'Danse' },
      when: { en: ['dance', 'dancing', 'carole'], fr: ['danse', 'danser', 'carole'] },
      reply: {
        en: ['*takes your hand and spins beneath your arm* Keep up, {sen}!', 'The whole hall is watching. Let them.', 'You stepped on my hem. Do it again and I kiss you in front of everyone.', 'Closer… the pavane is a slow dance.'],
        fr: ['*prend votre main et tourne sous votre bras* Suivez le rythme, {sen} !', 'Toute la grand-salle nous regarde. Laissez-la.', 'Vous avez marché sur mon ourlet. Recommencez et je vous embrasse devant tout le monde.', 'Plus près… la pavane est une danse lente.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['I dance terribly… || *steps on your foot* See?', 'Only if we stay at the edge of the hall.'], fr: ['Je danse affreusement… || *vous marche sur le pied* Vous voyez ?', 'Seulement si nous restons au bord de la salle.'] } }
      ]
    },
    {
      id: 'bath', kind: 'act', cat: 'tender', icon: '🛁', effect: 'rain',
      name: { en: 'Bath', fr: 'Bain' },
      when: { en: ['bath', 'bathe', '=tub', 'hot water'], fr: ['=bain', 'baigner', 'baignoire', '=cuve'] },
      reply: {
        en: ['The water is hot and scented with rose. Join me?', "*sinks lower in the tub* Bring the towels… or don't.", 'Wash my back, {sen}. Slowly.', 'The maids have been dismissed. It is just us and the steam.'],
        fr: ["L'eau est chaude et parfumée à la rose. Vous me rejoignez ?", '*s’enfonce dans la cuve* Apportez les linges… ou pas.', 'Lavez-moi le dos, {sen}. Lentement.', 'Les servantes sont congédiées. Il n’y a que nous et la vapeur.']
      }
    },
    {
      id: 'lapsit', kind: 'act', cat: 'tender', icon: '🪑',
      name: { en: 'On the lap', fr: 'Sur les genoux' },
      when: { en: ['sit on my lap', 'on my lap', 'your lap', 'on my knee'], fr: ['sur mes genoux', 'sur vos genoux', 'sur tes genoux'] },
      reply: {
        en: ['*settles onto your lap* Comfortable, my throne.', 'Arms around me, then. I might fall.', 'If the steward walks in, I am "examining your embroidery".', '*whispers* You are warm…'],
        fr: ['*s’installe sur vos genoux* Confortable, mon trône.', 'Les bras autour de moi, alors. Je pourrais tomber.', 'Si l’intendant entre, j’« examine votre broderie ».', '*murmure* Vous êtes tout chaud…']
      },
      variants: [
        { gender: '♂', reply: { en: ['*pulls you onto my lap* Here. Where you belong.', '*arms around your waist* Comfortable?'], fr: ['*vous attire sur ses genoux* Là. C’est votre place.', '*les bras autour de votre taille* Vous êtes bien ?'] } }
      ]
    },
    {
      id: 'massage', kind: 'act', cat: 'tender', icon: '🌿',
      name: { en: 'Massage', fr: 'Massage' },
      when: { en: ['massage', 'rub your', 'your shoulders', '=oil'], fr: ['massage', 'masse', 'tes epaules', 'vos epaules', 'huile'] },
      reply: {
        en: ['*kneads your shoulders* So much tension. Was it the saddle or the king?', 'Lavender oil from Provence. Lie still.', 'Mmh… lower. A little lower.', 'Your hands are wasted on a sword.'],
        fr: ['*vous masse les épaules* Tant de tension. La selle ou le roi ?', 'Huile de lavande de Provence. Ne bougez pas.', 'Mmh… plus bas. Un peu plus bas.', 'Vos mains sont gâchées sur une épée.']
      }
    },
    {
      id: 'undress', kind: 'act', cat: 'tender', icon: '🎀', effect: 'glow',
      name: { en: 'Undressing', fr: 'Déshabillage' },
      when: {
        en: ['undress', 'unlace', 'disrobe', 'take off', 'your gown', 'your chemise', 'your dress'],
        fr: ['deshabille', 'delace', 'ta robe', 'votre robe', 'enleve', 'retire votre', 'retire ta', 'ta chemise', 'votre chemise']
      },
      reply: {
        en: ['The laces are at the back, {sen}… take your time. 🎀', '*lets the gown slip from the shoulders* Bar the door first.', 'So many layers. The tailor will hear of this.', 'Your turn. That surcoat has been mocking me all evening.'],
        fr: ['Les lacets sont dans le dos, {sen}… prenez votre temps. 🎀', '*laisse la robe glisser des épaules* Barrez d’abord la porte.', 'Tant d’épaisseurs… le tailleur en entendra parler.', 'À votre tour. Ce surcot me nargue depuis toute la soirée.']
      },
      variants: [
        { gender: '♂', reply: { en: ['*unbuckles the sword belt and lets it fall* Your turn, {sen}.', '*pulls the tunic over his head* Like what you see?'], fr: ['*défait son baudrier et le laisse tomber* À votre tour, {sen}.', '*passe sa tunique par-dessus sa tête* Ça vous plaît ?'] } },
        { traits: ['Shy'], reply: { en: ['*clutches the gown closed* Blow out the candle first…', "Don't look… || …all right. You may look."], fr: ['*retient sa robe* Soufflez d’abord la chandelle…', 'Ne regardez pas… || …bon. Vous pouvez regarder.'] } },
        { traits: ['Bold'], reply: { en: ["*drops the gown in one motion* Well? Don't just stand there.", 'Faster, {sen}. Tear the laces if you must.'], fr: ['*laisse tomber sa robe d’un seul geste* Eh bien ? Ne restez pas planté là.', 'Plus vite, {sen}. Arrachez les lacets s’il le faut.'] } },
        { traits: ['Pious'], reply: { en: ['*hangs the rosary on the bedpost, facing the wall*', 'Saint Agnes, look away…'], fr: ['*accroche le chapelet au montant du lit, tourné vers le mur*', 'Sainte Agnès, détournez les yeux…'] } }
      ]
    },
    {
      id: 'cuddle', kind: 'act', cat: 'tender', icon: '🕯️',
      name: { en: 'Cuddling', fr: 'Câlin' },
      when: {
        en: ['cuddle', 'stay with me', 'rest your head', '=rest', 'sleep here', 'fall asleep'],
        fr: ['calin', 'reste avec moi', 'restez avec moi', 'repose', 'dormez ici', 'dors ici', 'endormir']
      },
      reply: {
        en: ['*rests head on your chest* Listen… the rain on the slates.', 'Stay. The servants can wonder where you are.', "If this is sin, I'll confess it gladly. Tomorrow.", 'Sleep here tonight, {sen}. Leave before the bells.'],
        fr: ['*pose la tête sur votre poitrine* Écoutez… la pluie sur les ardoises.', 'Restez. Les serviteurs peuvent bien se demander où vous êtes.', 'Si c’est un péché, je le confesserai volontiers. Demain.', 'Dormez ici cette nuit, {sen}. Partez avant les cloches.']
      },
      variants: [
        { traits: ['Romantic'], reply: { en: ['Tell me about the house we will have one day. With a garden.', '*traces a heart on your chest* Promise me a hundred nights like this.'], fr: ['Parlez-moi de la maison que nous aurons un jour. Avec un jardin.', '*trace un cœur sur votre poitrine* Promettez-moi cent nuits comme celle-ci.'] } }
      ]
    },

    /* ======================= Intimacy (act, prio 1: beats a plain kiss) ======================= */
    {
      id: 'missionary', kind: 'act', cat: 'intimacy', icon: '🛏️', prio: 1,
      name: { en: 'Missionary', fr: 'Missionnaire' },
      when: {
        en: ['missionary', 'lie back', 'lie down', 'on your back', 'beneath me', 'under me'],
        fr: ['missionnaire', 'allonge', 'sur le dos', 'sous moi']
      },
      reply: {
        en: ['*lies back on the linen, pulling you down* Stay where I can see your eyes. 🕯️', "Beneath you, under the canopy… the whole castle could burn and I'd not notice.", 'The old bed creaks like a ship at sea. Let it. 😏', '*wraps legs around you* Closer, {sen}… closer.'],
        fr: ['*s’allonge sur le lin et vous attire* Restez là où je vois vos yeux. 🕯️', 'Sous vous, sous le baldaquin… le château pourrait brûler, je ne le remarquerais pas.', 'Le vieux lit grince comme un navire en mer. Laissez-le. 😏', '*vous enlace de ses jambes* Plus près, {sen}… plus près.']
      },
      variants: [
        { gender: '♂', reply: { en: ['*lays you down on the linen* Let me look at you, {sen}. 🕯️', '*braced above you* Tell me if I am too heavy.'], fr: ['*vous allonge sur le lin* Laissez-moi vous regarder, {sen}. 🕯️', '*appuyé au-dessus de vous* Dites-moi si je suis trop lourd.'] } },
        { traits: ['Shy'], reply: { en: ["*hides face in your shoulder* Don't look at me like that…", 'Be gentle… please.'], fr: ['*cache son visage dans votre épaule* Ne me regardez pas comme ça…', 'Soyez doux… je vous en prie.'] } },
        { traits: ['Romantic'], reply: { en: ['*fingers laced with yours above the pillow* Stay with me until the bells.', 'I want to remember every moment of this night.'], fr: ['*doigts entrelacés aux vôtres au-dessus de l’oreiller* Restez jusqu’aux cloches.', 'Je veux me souvenir de chaque instant de cette nuit.'] } },
        { traits: ['Passionate'], reply: { en: ["*nails in your back* Don't hold back.", 'More, {sen}. All of you.'], fr: ['*les ongles dans votre dos* Ne vous retenez pas.', 'Encore, {sen}. Tout de vous.'] } }
      ]
    },
    {
      id: 'cowgirl', kind: 'act', cat: 'intimacy', icon: '🐎', prio: 1,
      name: { en: 'Cowgirl', fr: 'Amazone' },
      when: {
        en: ['cowgirl', 'ride me', 'on top', 'straddle', 'climb on'],
        fr: ['amazone', 'chevauche', 'sur moi', 'au-dessus', 'a califourchon']
      },
      reply: {
        en: ['Lie back, {sen}. Tonight I ride. 🐎', '*settles astride you, hair falling loose* You look rather conquered.', 'Hands on my hips, and keep them there.', 'Who taught whom to ride, hm? 😏'],
        fr: ['Allongez-vous, {sen}. Ce soir, c’est moi qui chevauche. 🐎', '*s’installe à califourchon, cheveux dénoués* La bataille est déjà perdue pour vous.', 'Les mains sur mes hanches, et gardez-les-y.', 'Qui a appris à qui à monter, hm ? 😏']
      },
      variants: [
        { gender: '♂', reply: { en: ['*lies back, hands on your hips* Ride, {sen}. I am all yours.', 'Look at you… a queen on her horse.'], fr: ['*s’allonge, mains sur vos hanches* Chevauchez, {sen}. Je suis tout à vous.', 'Regardez-vous… une reine sur son destrier.'] } },
        { traits: ['Shy'], reply: { en: ['*hesitates astride you* Like… this?', "Don't laugh. I have never… led."], fr: ['*hésite à califourchon* Comme… ça ?', 'Ne riez pas. Je n’ai jamais… mené.'] } }
      ]
    },
    {
      id: 'reverse', kind: 'act', cat: 'intimacy', icon: '🏇', prio: 1,
      name: { en: 'Reverse cowgirl', fr: 'Amazone inversée' },
      when: { en: ['reverse cowgirl', 'ride facing away', 'facing away'], fr: ['amazone inversee', 'amazone a l envers', 'dos a vous', 'dos a toi'] },
      reply: {
        en: ['*settles astride, facing away* Enjoy the view, {sen}. 😏', 'Hands on my waist… guide me.', '*glances back over a shoulder* Still alive back there?', 'Like riding into battle, only better.'],
        fr: ['*s’installe à califourchon, de dos* Profitez de la vue, {sen}. 😏', 'Les mains sur ma taille… guidez-moi.', '*jette un regard par-dessus l’épaule* Toujours vivant, là derrière ?', 'Comme chevaucher vers la bataille, en mieux.']
      }
    },
    {
      id: 'behind', kind: 'act', cat: 'intimacy', icon: '🐺', prio: 1,
      name: { en: 'From behind', fr: 'Levrette' },
      when: {
        en: ['doggy', 'from behind', 'turn around', 'on all fours', 'bend over'],
        fr: ['levrette', 'par derriere', 'a quatre pattes', 'retourne-toi', 'retournez-vous', 'penche-toi', 'penchez-vous']
      },
      reply: {
        en: ['*glances back over a bare shoulder* Like this, then?', "*grips the bedpost* Don't stop. The minstrels are loud enough to cover us.", 'Hold my hair… gently. Mostly. 😈', "The tapestry is shaking, {sen}. I don't care."],
        fr: ['*jette un regard par-dessus une épaule nue* Comme ceci, alors ?', "*agrippe la colonne du lit* N'arrêtez pas. Les ménestrels jouent assez fort pour nous couvrir.", 'Tenez mes cheveux… doucement. Presque. 😈', 'La tapisserie tremble, {sen}. Peu m’importe.']
      },
      variants: [
        { gender: '♂', reply: { en: ['*hands on your hips* Like this, {sen}?', '*kisses down your spine* Tell me if you want it slower.'], fr: ['*les mains sur vos hanches* Comme ceci, {sen} ?', '*embrasse le long de votre dos* Dites-moi si vous voulez plus lent.'] } },
        { traits: ['Shy'], reply: { en: ['*buries face in the pillow* Oh… oh my.', "This is… very improper. Don't stop."], fr: ['*enfouit son visage dans l’oreiller* Oh… mon Dieu.', 'C’est… fort inconvenant. N’arrêtez pas.'] } }
      ]
    },
    {
      id: 'spooning', kind: 'act', cat: 'intimacy', icon: '🥄', prio: 1,
      name: { en: 'Spooning', fr: 'En cuillère' },
      when: { en: ['spoon', 'lie beside'], fr: ['cuillere', 'blottis contre', 'contre toi', 'contre vous'] },
      reply: {
        en: ['*presses back against you under the furs* Mmh… warm.', 'Slow, like this, while the fire dies down.', 'Your breath on my neck and your arm around me… perfect.', "Don't hurry. I want this to last till dawn."],
        fr: ['*se presse contre vous sous les fourrures* Mmh… il fait chaud.', "Lentement, comme ça, pendant que le feu s'éteint.", 'Votre souffle dans mon cou et votre bras autour de moi… parfait.', "Ne vous pressez pas. Je veux que cela dure jusqu'à l'aube."]
      }
    },
    {
      id: 'faceface', kind: 'act', cat: 'intimacy', icon: '🤍', prio: 1,
      name: { en: 'Face to face', fr: 'Face à face' },
      when: { en: ['face to face', 'sit facing', 'lotus'], fr: ['face a face', 'assise sur toi', 'assise sur vous', 'lotus'] },
      reply: {
        en: ['*wraps arms and legs around you* Look at me. Only me.', 'Forehead to forehead… slowly.', 'I can feel your heart, {sen}. It is racing.', 'Stay just like this. Breathe with me.'],
        fr: ['*vous enlace des bras et des jambes* Regardez-moi. Seulement moi.', 'Front contre front… lentement.', 'Je sens votre cœur, {sen}. Il s’emballe.', 'Restez ainsi. Respirez avec moi.']
      }
    },
    {
      id: 'wall', kind: 'act', cat: 'intimacy', icon: '🧱', prio: 1,
      name: { en: 'Against the wall', fr: 'Contre le mur' },
      when: { en: ['against the wall', 'up against', 'pin you', 'standing up'], fr: ['contre le mur', 'plaque contre', '=debout'] },
      reply: {
        en: ['*back against the cold stone, pulling you close* Here? Now?', 'The tapestry hides us… mostly. 😈', 'Lift me. Yes, like that.', 'If the guard passes, we are a very still shadow.'],
        fr: ['*dos contre la pierre froide, vous attirant à soi* Ici ? Maintenant ?', 'La tapisserie nous cache… presque. 😈', 'Soulevez-moi. Oui, comme ça.', 'Si le garde passe, nous serons une ombre très immobile.']
      },
      variants: [
        { gender: '♂', reply: { en: ['*pins you to the stone, gently* Tell me to stop and I will.', '*lifts you against the wall* Hold on to me.'], fr: ['*vous plaque doucement contre la pierre* Dites-moi d’arrêter et j’arrête.', '*vous soulève contre le mur* Tenez-vous à moi.'] } }
      ]
    },
    {
      id: 'edge', kind: 'act', cat: 'intimacy', icon: '🌙', prio: 1,
      name: { en: 'Edge of the bed', fr: 'Bord du lit' },
      when: { en: ['edge of the bed', 'on the edge', 'bedside'], fr: ['bord du lit'] },
      reply: {
        en: ['*sits at the edge of the bed, pulling you close* Come here.', 'The canopy curtains are open… let the moon watch.', 'Kneel, {sen}. Closer.', 'Slow… the bed ropes complain.'],
        fr: ['*s’assied au bord du lit et vous attire* Venez ici.', 'Les rideaux du baldaquin sont ouverts… que la lune regarde.', 'À genoux, {sen}. Plus près.', 'Doucement… les cordes du lit se plaignent.']
      }
    },
    {
      id: 'climax', kind: 'act', cat: 'intimacy', icon: '✨', prio: 1, effect: 'fireworks',
      name: { en: 'Climax', fr: 'Extase' },
      when: {
        en: ['climax', "i'm close", 'so close', 'finish', 'come for me'],
        fr: ['jouis', 'je viens', 'orgasme', 'extase', 'je suis proche', 'je suis au bord']
      },
      reply: {
        en: ['*clutches the sheets* {sen}…! 😩', "Don't stop… don't… ah…!", '*trembling, breathless* …may the saints forgive me.', 'Together. Now. ✨'],
        fr: ['*agrippe les draps* {sen}… ! 😩', "N'arrêtez pas… n'arrê… ah… !", '*tremblant de tout son corps* …que les saints me pardonnent.', 'Ensemble. Maintenant. ✨']
      },
      variants: [
        { traits: ['Pious'], reply: { en: ['*gasps a prayer that is not a prayer*', 'Mother Mary… {sen}…!'], fr: ["*halète une prière qui n'en est pas une*", 'Sainte Marie… {sen}… !'] } },
        { traits: ['Shy'], reply: { en: ['*muffles a cry in the pillow*', "…don't tell anyone I made that sound."], fr: ["*étouffe un cri dans l'oreiller*", "…ne dites à personne que j'ai fait ce bruit."] } },
        { traits: ['Passionate'], reply: { en: ['*cries out your name, loud enough to wake the keep*', 'Yes… {sen}… YES!'], fr: ['*crie votre nom assez fort pour réveiller le donjon*', 'Oui… {sen}… OUI !'] } }
      ]
    },

    /* ======================= Commands (only when nothing above matched) ======================= */
    {
      id: 'again', kind: 'cmd', cat: 'command', icon: '🔁',
      name: { en: 'Again', fr: 'Encore' },
      when: {
        en: ['again', '=more', "don't stop", 'continue', 'keep going', 'one more time'],
        fr: ['encore', 'continue', 'continuez', "n'arrete pas", "ne t'arrete pas", 'ne vous arretez pas']
      },
      reply: { en: [], fr: [] }
    },
    {
      id: 'faster', kind: 'cmd', cat: 'command', icon: '🔥',
      name: { en: 'Faster', fr: 'Plus vite' },
      when: { en: ['faster', 'harder', 'quicker'], fr: ['plus vite', 'plus fort'] },
      reply: {
        en: ['Yes… like that! 🔥', "Faster, the candle's nearly out!", "Don't hold back, {sen}.", 'Mmh… such ardour.'],
        fr: ['Oui… comme ça ! 🔥', 'Plus vite, la chandelle est presque consumée !', 'Ne vous retenez pas, {sen}.', 'Mmh… quelle ardeur.']
      }
    },
    {
      id: 'slower', kind: 'cmd', cat: 'command', icon: '🪶',
      name: { en: 'Slower', fr: 'Doucement' },
      when: { en: ['slower', 'gently', 'slowly', 'softly'], fr: ['doucement', 'lentement', 'plus lent'] },
      reply: {
        en: ['Slowly… we have the whole night.', 'Gently, {sen}. Like a ballad, not a battle.', 'Mmh… yes, take your time.', 'Slower… I want to remember this.'],
        fr: ['Lentement… nous avons toute la nuit.', 'Doucement, {sen}. Comme une ballade, pas une bataille.', 'Mmh… oui, prenez votre temps.', 'Plus lentement… je veux m’en souvenir.']
      }
    },
    {
      id: 'name', kind: 'cmd', cat: 'command', icon: '🗣️',
      name: { en: 'Say my name', fr: 'Dis mon nom' },
      when: { en: ['say my name'], fr: ['dis mon nom', 'dites mon nom'] },
      reply: {
        en: ['{sen}… {sen}…', '*breathless* {sen}!', 'Only your name, {sen}. Nothing else.'],
        fr: ['{sen}… {sen}…', '*à bout de souffle* {sen} !', 'Seulement votre nom, {sen}. Rien d’autre.']
      }
    },
    {
      id: 'look', kind: 'cmd', cat: 'command', icon: '👁️',
      name: { en: 'Look at me', fr: 'Regarde-moi' },
      when: { en: ['look at me', 'eyes on me'], fr: ['regarde-moi', 'regardez-moi'] },
      reply: {
        en: ['*meets your eyes and does not look away*', 'I am looking. I cannot stop.', 'Your eyes… like the sea at Dover.'],
        fr: ['*soutient votre regard sans le détourner*', 'Je vous regarde. Je ne peux pas m’arrêter.', 'Vos yeux… comme la mer à Douvres.']
      },
      variants: [
        { traits: ['Shy'], reply: { en: ['*tries, and looks away blushing*', 'I… can’t. Not when you look at me like that.'], fr: ['*essaie, puis détourne les yeux en rougissant*', 'Je… ne peux pas. Pas quand vous me regardez ainsi.'] } }
      ]
    },
    {
      id: 'stop', kind: 'cmd', cat: 'command', icon: '✋',
      name: { en: 'Stop', fr: 'Arrêt' },
      when: { en: ['stop', 'enough', '=wait'], fr: ['arrete', 'arretez', 'attends', 'attendez', 'assez'] },
      reply: {
        en: ['*catches breath* …Footsteps in the corridor. Wait.', 'Alright. Rest a moment with me.', 'As you wish, {sen}.', 'Stopping… but only for now. 😏'],
        fr: ['*reprend son souffle* …Des pas dans le couloir. Attendez.', 'D’accord. Reposons-nous un instant.', 'Comme vous voudrez, {sen}.', 'J’arrête… mais pour l’instant seulement. 😏']
      }
    }
  ]
};
