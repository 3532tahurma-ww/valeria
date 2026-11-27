/*
 * Valeria - 🤝❤️🔥 her feelings and 📰 status cards (like Carmen's Güven / Aşk / Şehvet and its Durum kartları). Engine: js/feel.js
 * character.feel = { trust, love, desire } 0–100 (Valeria-only field). Starting values: FEEL_INIT (base + her traits).
 * Each letter you send (bot mode) changes them:
 *   FEEL_EV[id] (or FEEL_CAT[category] when the event has no row of its own) · FEEL_MORE: answering her question, scenes, episodes,
 *   what her homeland loves / frowns upon, a long silence, too soon · the same act again within 3 letters: half the trust / love
 *   FEEL_NEED: acts that need enough trust (or love) first; below it she lets it happen but hesitates (tooSoon: trust falls)
 *   FEEL_MUL: her temper multiplies the gains (a Romantic lady's love grows faster)
 * 📰 Cards (FEEL_SAY, "emoji|her line", {sen} = your name): trust / love crossing FEEL_STEPS up or down, desire crossing DESIRE_STEPS,
 *   too soon, after the climax. At most 2 per letter.
 */
window.Valeria = window.Valeria || {};

Valeria.FEELINGS = [
  { id: 'trust', icon: '🤝', name: { en: 'Trust', fr: 'Confiance' } },
  { id: 'love', icon: '❤️', name: { en: 'Love', fr: 'Amour' } },
  { id: 'desire', icon: '🔥', name: { en: 'Desire', fr: 'Désir' } }
];
Valeria.FEEL_STEPS = [25, 50, 75, 100];
Valeria.DESIRE_STEPS = [50, 80];

Valeria.FEEL_INIT = {
  base: { trust: 20, love: 10, desire: 5 },
  traits: {
    Romantic: { love: 10 }, Passionate: { desire: 15 }, Bold: { desire: 10 }, Shy: { trust: -5 }, Proud: { trust: -5 },
    Gentle: { trust: 5 }, Loyal: { trust: 5 }, Jealous: { love: 5 }, Melancholic: { love: 5 }, Stern: { trust: -5 }, Pious: { desire: -5 }
  }
};
Valeria.FEEL_MUL = {
  Romantic: { love: 1.5 }, Passionate: { desire: 1.5 }, Bold: { desire: 1.3 }, Shy: { desire: 0.6, trust: 1.2 }, Pious: { desire: 0.7 },
  Proud: { trust: 0.7 }, Stern: { trust: 0.7 }, Gentle: { trust: 1.3 }, Loyal: { love: 1.2 }, Melancholic: { love: 1.2 }, Rebellious: { desire: 1.2 }
};

Valeria.FEEL_CAT = {
  courtship: { love: 1, trust: 1 }, question: { trust: 1 }, tender: { love: 1, desire: 2 }, intimacy: { desire: 4 }, command: { desire: 1 }
};
Valeria.FEEL_EV = {
  greet: { trust: 1 }, howareyou: { trust: 1 }, compliment: { love: 2 }, love: { love: 3, trust: 1 }, missyou: { love: 2 }, farewell: { love: 1 },
  thanks: { trust: 1 }, sorry: { trust: 3 }, gift: { love: 3, trust: 1 }, poem: { love: 3 }, jealousy: { trust: -2, love: 1 }, war: { love: 1, trust: -1 },
  tourney: { love: 1, desire: 1 }, feast: { love: 1 }, meet: { love: 1, desire: 1 }, tease: { desire: 2 }, pray: { trust: 2 }, scheme: { trust: 2 },
  handkiss: { love: 1, trust: 1 }, handhold: { trust: 2, love: 1 }, hug: { trust: 2, love: 1 }, kiss: { love: 2, desire: 2 }, neckkiss: { desire: 3 },
  caress: { desire: 2, trust: 1 }, dance: { love: 2 }, bath: { trust: 1, desire: 3 }, lapsit: { love: 1, desire: 2 }, massage: { trust: 2, desire: 2 },
  undress: { desire: 5 }, cuddle: { trust: 3, love: 2, desire: -5 }, hairplay: { trust: 2, love: 1 }, blindfold: { trust: 2, desire: 3 },
  window: { love: 2 }, breasts: { desire: 4 }, bottom: { desire: 3 }, spank: { desire: 3, trust: -1 }, lower: { desire: 5, trust: 1 },
  anal: { desire: 4, trust: 1 }, hayloft: { desire: 4, love: 1 }, table: { desire: 5 }, edge: { desire: 6 },
  climax: { love: 2, trust: 1, desire: -40 }, slower: { trust: 1 }, stop: { desire: -5, trust: 1 }, name: { love: 1, desire: 1 }, look: { love: 1 },
  q_memory: { love: 1 }, q_dream: { trust: 1, love: 1 }, q_fear: { trust: 2 }, q_lover: { trust: -1 }, q_mysize: { desire: 2 }, q_news: { trust: 1 }, q_anal: { desire: 2 }
};
// acts she wants to know you better for: all intimacy, plus these
Valeria.FEEL_NEED_CAT = { intimacy: { trust: 30 } };
Valeria.FEEL_NEED = {
  undress: { trust: 25 }, breasts: { trust: 25 }, lower: { trust: 35 }, blindfold: { trust: 40 }, spank: { trust: 45 },
  anal: { trust: 60, love: 40 }, wall: { trust: 35 }, table: { trust: 35 }, hayloft: { trust: 35 },
  climax: null // the end of what she already allowed: never "too soon"
};
Valeria.FEEL_MORE = {
  tooSoon: { trust: -3 }, answer: { trust: 1 }, like: { love: 2 }, dislike: { trust: -2 }, away: { love: -2 },
  sceneEnd: { love: 3, trust: 2 }, sceneFail: { trust: -1 }, epEnd: { love: 6, trust: 4 }
};

Valeria.FEEL_SAY = {
  trustUp: {
    en: ['🤝|I think I can trust you, {sen}.', '🫶|I feel safe when your letters come.', '🗝️|I could tell you my secrets, I believe.', '🛡️|You would never betray me. Would you?'],
    fr: ['🤝|Je crois que je peux vous faire confiance, {sen}.', '🫶|Je me sens en sûreté quand vos lettres arrivent.', '🗝️|Je pourrais vous confier mes secrets, je crois.', '🛡️|Vous ne me trahiriez jamais. N’est-ce pas ?']
  },
  trustDn: {
    en: ['😕|I do not know whether to trust you anymore…', '🥀|That wounded me, I confess.', '😒|I did not expect this of you.', '🚪|I must keep my door barred a little.'],
    fr: ['😕|Je ne sais plus si je dois vous croire…', '🥀|Cela m’a blessée, je l’avoue.', '😒|Je n’attendais pas cela de vous.', '🚪|Je dois garder ma porte un peu fermée.']
  },
  loveUp: {
    en: ['❤️|I think my heart is yours, {sen}.', '💞|I cannot stop thinking of you, even at Mass.', '🥰|My heart races when the courier comes.', '💘|It grows, this feeling. Every day.'],
    fr: ['❤️|Je crois que mon cœur est à vous, {sen}.', '💞|Je ne cesse de penser à vous, même à la messe.', '🥰|Mon cœur s’emballe quand le messager arrive.', '💘|Il grandit, ce sentiment. Chaque jour.']
  },
  loveDn: {
    en: ['💔|Something is not as it was…', '🥶|I feel colder towards you, I fear.', '😔|My heart is heavy tonight.', '💔|I am not as sure as I was.'],
    fr: ['💔|Quelque chose n’est plus comme avant…', '🥶|Je me sens plus froide envers vous, je le crains.', '😔|J’ai le cœur lourd ce soir.', '💔|Je ne suis plus aussi sûre qu’avant.']
  },
  desireUp50: {
    en: ['🔥|I am warm… and it is not the fire.', '😳|My thoughts are not proper ones tonight.', '🌹|Come closer. Closer still.'],
    fr: ['🔥|J’ai chaud… et ce n’est pas le feu.', '😳|Mes pensées ne sont guère convenables ce soir.', '🌹|Approchez. Plus près encore.']
  },
  desireUp80: {
    en: ['🔥|I cannot bear it any longer, {sen}.', '🥵|My whole body is calling for you.', '😩|Do not make me beg… or do.'],
    fr: ['🔥|Je n’en peux plus, {sen}.', '🥵|Tout mon corps vous réclame.', '😩|Ne me faites pas supplier… ou bien si.']
  },
  tooSoon: {
    en: ['😟|So soon? I barely know you, {sen}…', '🙈|I am not ready for that yet.', '😰|Gently… I need to trust you first.'],
    fr: ['😟|Si tôt ? Je vous connais à peine, {sen}…', '🙈|Je ne suis pas encore prête pour cela.', '😰|Doucement… il me faut d’abord vous faire confiance.']
  },
  fin: {
    en: ['💫|My legs are still trembling…', '🥵|I cannot catch my breath.', '💞|Come here. Hold me.', '✨|I saw every star in heaven.'],
    fr: ['💫|Mes jambes tremblent encore…', '🥵|Je n’arrive pas à reprendre mon souffle.', '💞|Venez là. Serrez-moi.', '✨|J’ai vu toutes les étoiles du ciel.']
  }
};
