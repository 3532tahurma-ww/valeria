/*
 * Valeria - 📚 Library (data: js/data/books.js)
 * Screens: library (shelves), book {id} (cover + contents), page {id, n} (chapter reader, ‹ › and swipe).
 * Generated books (book.gen) read the live data: events, questions, asks, topics, traits, origins, effects.
 * Last page read per book: localStorage 'valeria:bookpos'.
 */
window.Valeria = window.Valeria || {};

Valeria.Library = (() => {
  const V = Valeria;
  const POS = 'valeria:bookpos';
  const pos = () => { try { return JSON.parse(localStorage.getItem(POS)) || {}; } catch (e) { return {}; } };
  const setPos = (id, n) => { const p = pos(); p[id] = n; try { localStorage.setItem(POS, JSON.stringify(p)); } catch (e) {} };

  // ---------- generated chapters ----------
  function GEN(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const trig = ev => ['en', 'fr'].map(l => ((ev.when || ev.words || {})[l] || []).slice(0, 4).map(w => `<code>${esc(w.replace(/^=/, ''))}</code>`).join(' ')).filter(Boolean).join('<br>');
    const cond = r => [
      ...(r.traits || []).map(x => x.split('|').map(UI.traitLabel).join(' / ')),
      r.gender ? (r.gender === '♂' ? T('♂ men', '♂ hommes') : T('♀ women', '♀ femmes')) : '',
      ...(r.origin || []).map(o => o.startsWith('realm:') ? (V.REALMS[o.slice(6)] || { name: {} }).name[L] : ((V.REGIONS.find(x => x.id === o) || { name: {} }).name[L])),
      ...(r.chars || [])
    ].filter(Boolean).join(', ');
    const vars = ev => (ev.variants || []).map(cond).filter(Boolean);
    const sample = arr => (arr && arr.length ? `<i>“${esc(arr[0])}”</i>` : '');
    const table = (head, rows) => `<table class="bk-t"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
    const fxName = id => id ? `${V.FX.ICON[id] || ''} ${esc(UI.t('fx.' + id))}` : '';
    const CAT = { courtship: T('💐 Courtship', '💐 Galanterie'), tender: T('🫂 Tenderness', '🫂 Tendresse'), intimacy: T('🔥 Intimacy', '🔥 Intimité'), command: T('🗣️ Commands', '🗣️ Ordres') };

    return {
      events() {
        const evs = V.EVENTS.events.filter(e => e.cat !== 'question');
        const intro = { title: T('How events work', 'Comment fonctionnent les événements'), html: `
          <p>${T('When bot mode is on, every letter you send is read for <b>trigger words</b>, in English and in French, whatever her language. Accents, capitals and apostrophes do not matter, and a word only needs to <i>start</i> like the trigger: <code>kiss</code> also catches “kisses” and “kissing”.',
            'Quand le mode bot est actif, chaque lettre envoyée est lue à la recherche de <b>mots déclencheurs</b>, en anglais et en français, quelle que soit sa langue. Accents, majuscules et apostrophes ne comptent pas, et il suffit que le mot <i>commence</i> comme le déclencheur : <code>embrass</code> attrape aussi « embrasse » et « embrasser ».')}</p>
          <p>${T('<b>Talk</b> events are just answers. <b>Acts</b> change what is happening: a note like “❦ 💋 Kissing ❦” appears and the act continues until another one starts. <b>Intimacy</b> acts win over a simple kiss in the same letter. <b>Commands</b> (again, faster, slower, stop…) only work when nothing else matched; “again” repeats the current act.',
            'Les événements de <b>conversation</b> ne sont que des réponses. Les <b>actes</b> changent ce qui se passe : une note « ❦ 💋 Baiser ❦ » apparaît et l’acte continue jusqu’au suivant. Les actes d’<b>intimité</b> l’emportent sur un simple baiser dans la même lettre. Les <b>ordres</b> (encore, plus vite, doucement, arrête…) ne servent que si rien d’autre n’a été reconnu ; « encore » répète l’acte en cours.')}</p>
          <p>${T('Some events bring an effect (rose petals for a kiss, gold sparks at the climax). The “Variants” column lists who answers differently.', 'Certains événements apportent un effet (pétales de rose pour un baiser, étincelles d’or à l’extase). La colonne « Variantes » indique qui répond autrement.')}</p>` };
        const chs = ['courtship', 'tender', 'intimacy', 'command'].map(cat => ({
          title: CAT[cat],
          html: table([T('Event', 'Événement'), T('Write…', 'Écrivez…'), T('Effect', 'Effet'), T('Variants', 'Variantes')],
            evs.filter(e => e.cat === cat).map(e => `<tr><td>${e.icon} <b>${esc(e.name[L])}</b>${e.traits ? `<br><small>${T('only', 'seulement')}: ${esc(cond(e))}</small>` : ''}</td><td>${trig(e)}</td><td>${fxName(e.effect)}</td><td><small>${esc(vars(e).join(' · '))}</small></td></tr>`))
        }));
        return [intro, ...chs];
      },

      questions() {
        const qs = V.EVENTS.events.filter(e => e.cat === 'question');
        return [
          { title: T('Asking her', 'L’interroger'), html: `
            <p>${T('Ask her about her life and she answers from her own profile: her seat, her title, her age, her house, and from her <b>homeland</b> (its food, drink and customs, see the <i>Book of Realms</i>).',
              'Interrogez-la sur sa vie : elle répond à partir de son propre profil (son fief, son titre, son âge, sa maison) et de sa <b>terre natale</b> (mets, boisson et coutumes, voir le <i>Livre des royaumes</i>).')}</p>
            <p>${T('After answering, she sometimes asks the same question back (“And you?”). Your next letter is then read as your answer; see <i>Her Questions</i>.',
              'Après avoir répondu, elle vous retourne parfois la question (« Et vous ? »). Votre lettre suivante est alors lue comme votre réponse ; voir <i>Ses questions</i>.')}</p>` },
          { title: T('All the questions', 'Toutes les questions'), html: table([T('Question', 'Question'), T('Write…', 'Écrivez…'), T('Example', 'Exemple'), T('Variants', 'Variantes')],
            qs.map(q => `<tr><td>${q.icon} <b>${esc(q.name[L])}</b>${q.counter ? `<br><small>↩️ ${T('may ask back', 'peut la retourner')}</small>` : ''}</td><td>${trig(q)}</td><td><small>${sample(q.reply[L])}</small></td><td><small>${esc(vars(q).join(' · '))}</small></td></tr>`)) }
        ];
      },

      asks() {
        const ask = (V.ASKS || []);
        const grp = (w, title, intro) => ({ title, html: `<p>${intro}</p>` + table([T('She asks', 'Elle demande'), T('Answer', 'Réponse'), T('Only', 'Seulement')],
          ask.filter(a => a.when === w).map(a => `<tr><td><i>“${esc(a.q[L])}”</i></td><td>${a.kind === 'yn' ? T('yes / no', 'oui / non') : T('free answer', 'réponse libre')}${a.place ? `<br><small>🗺️ ${T('name a place!', 'nommez un lieu !')}</small>` : ''}</td><td><small>${esc(cond(a))}</small></td></tr>`)) });
        return [
          { title: T('How to answer her', 'Comment lui répondre'), html: `
            <p>${T('Sometimes she ends her letter with a question. Your <b>next letter</b> is read as the answer.', 'Parfois, elle termine sa lettre par une question. Votre <b>lettre suivante</b> est lue comme la réponse.')}</p>
            <p>${T('For yes/no questions she understands', 'Pour les questions oui/non, elle comprend')}: ${(V.YES || []).slice(0, 10).map(w => `<code>${esc(w)}</code>`).join(' ')} … ${T('and', 'et')} ${(V.NO || []).slice(0, 8).map(w => `<code>${esc(w)}</code>`).join(' ')} …</p>
            <p>${T('For open questions any answer works. If you name a place of the map (“I was born in Rouen”), she knows something about it.', 'Pour les questions ouvertes, toute réponse convient. Si vous nommez un lieu de la carte (« je suis né à Rouen »), elle en sait quelque chose.')}</p>
            <p>${T('If your letter starts an act instead (a kiss…), the question is forgotten.', 'Si votre lettre déclenche plutôt un acte (un baiser…), la question est oubliée.')}</p>` },
          grp('counter', T('↩️ Asked back', '↩️ Questions retournées'), T('After you ask her something, 40% of the time.', 'Après une de vos questions, 4 fois sur 10.')),
          grp('talk', T('🗨️ In conversation', '🗨️ En conversation'), T('Now and then in normal talk, and often when she has nothing to answer.', 'De temps en temps en conversation, et souvent quand elle n’a rien à répondre.')),
          grp('after', T('🌙 Afterwards', '🌙 Après'), T('After the climax or while cuddling.', 'Après l’extase ou pendant un câlin.'))
        ];
      },

      conversation() {
        return [
          { title: T('When she does not understand', 'Quand elle ne comprend pas'), html: `
            <p>${T('When your letter matches no event, question or command, she still answers, in this order:', 'Quand votre lettre ne correspond à aucun événement, question ou ordre, elle répond tout de même, dans cet ordre :')}</p>
            <ol><li>${T('<b>Topic</b>: a word of the list on the next page (horse, rain, king…) → she talks about it.', '<b>Sujet</b> : un mot de la liste page suivante (cheval, pluie, roi…) → elle en parle.')}</li>
            <li>${T('<b>In the middle of an act</b>: she hushes you and goes on.', '<b>Au milieu d’un acte</b> : elle vous fait taire et continue.')}</li>
            <li>${T('Otherwise one of: <b>her own question</b> (3 in 10), <b>echo</b> of the longest unusual word you wrote (“Falconry? Tell me more…”), a line about <b>her homeland</b>, or a general answer shaped by her personality.',
              'Sinon, au choix : <b>sa propre question</b> (3 fois sur 10), l’<b>écho</b> du mot le plus long que vous avez écrit (« Fauconnerie ? Parlez-m’en… »), une phrase sur <b>sa terre natale</b>, ou une réponse générale marquée par son caractère.')}</li></ol>` },
          { title: T('Topics she follows', 'Les sujets qu’elle suit'), html: table([T('Topic', 'Sujet'), T('Words', 'Mots'), T('Example', 'Exemple')],
            (V.TOPICS || []).map(tp => `<tr><td>${tp.icon} <b>${esc(tp.name[L])}</b></td><td>${trig(tp)}</td><td><small>${sample(tp.reply[L])}</small></td></tr>`)) },
          { title: T('Echo and silence', 'Écho et silence'), html: `
            <p>${T('Echo lines', 'Phrases d’écho')}: ${(V.ECHO[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>
            <p>${T('During an act', 'Pendant un acte')}: ${(V.DURING[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>
            <p>${T('General answers', 'Réponses générales')}: ${(V.EVENTS.fallback[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>` }
        ];
      },

      traits() {
        const evs = V.EVENTS.events.concat([Object.assign({ icon: '🔁', name: { en: 'General answers', fr: 'Réponses générales' } }, V.EVENTS.fallback)]);
        const row = tr => {
          const hits = evs.filter(e => (e.variants || []).some(v => (v.traits || []).some(x => x.split('|').includes(tr))));
          const asks = (V.ASKS || []).filter(a => (a.traits || []).some(x => x.split('|').includes(tr)));
          const ex = hits.length ? (hits[0].variants.find(v => (v.traits || []).some(x => x.split('|').includes(tr))).reply[L] || [])[0] : '';
          return `<tr><td><b>${esc(UI.traitLabel(tr))}</b></td><td>${hits.map(e => `<span title="${esc(e.name[L])}">${e.icon}</span>`).join(' ')}${asks.length ? ` · ❔×${asks.length}` : ''}</td><td><small>${ex ? `<i>“${esc(ex)}”</i>` : '—'}</small></td></tr>`;
        };
        const homes = V.REGIONS.map(r => `<tr><td><b>${esc(r.name[L])}</b></td><td>${((V.ORIGINS[r.id] || {}).traits || []).map(x => esc(UI.traitLabel(x))).join(', ')}</td></tr>`);
        return [
          { title: T('Temper shapes every answer', 'Le tempérament façonne chaque réponse'), html: `
            <p>${T('Many events and questions have <b>variants</b>: special lines for a shy, bold, pious or passionate character. When several fit, the most specific wins. Men also have their own lines where it matters.',
              'Beaucoup d’événements et de questions ont des <b>variantes</b> : des répliques propres à un caractère timide, audacieux, pieux ou passionné. Quand plusieurs conviennent, la plus précise l’emporte. Les hommes ont aussi leurs répliques là où cela compte.')}</p>
            <p>${T('Some things only certain characters do: only the cunning or mischievous take the bait of a secret plot, only the pious ask whether you went to mass.',
              'Certaines choses ne sont faites que par certains : seuls les rusés ou les malicieux mordent à l’hameçon d’un complot, seuls les pieux demandent si vous êtes allé à la messe.')}</p>` },
          { title: T('Personality', 'Caractère'), html: table([T('Trait', 'Trait'), T('Changes', 'Change'), T('Example', 'Exemple')], V.TRAITS.personality.map(row)) },
          { title: T('Writing style', "Style d'écriture"), html: table([T('Trait', 'Trait'), T('Changes', 'Change'), T('Example', 'Exemple')], V.TRAITS.style.map(row)) },
          { title: T('📏 Figure', '📏 Silhouette'), html: `<p>${T('Figure traits are chosen in the character form (or rolled with 🎲) and stored like Carmen’s: “Boob Size: 85”, “Pussy Size: Tight”. Your own “Dick Size” is set in 👑 Me. They change these answers:', 'Les traits de silhouette se choisissent dans le formulaire (ou au 🎲) et sont enregistrés comme dans Carmen : « Boob Size: 85 », « Pussy Size: Tight ». Votre propre « Dick Size » se règle dans 👑 Moi. Ils changent ces réponses :')}</p>` +
            table([T('Trait', 'Trait'), T('Values', 'Valeurs'), T('Changes', 'Change')], (V.FIGURE || []).concat([{ id: 'Dick Size', icon: '🍆', label: { en: 'Dick Size (you)', fr: 'Dick Size (vous)' }, items: V.USER_DICK || [] }]).map(g => {
              const uses = x => (x.traits || []).some(tr => tr.includes(g.id + ':'));
              const evs = V.EVENTS.events.filter(e => uses(e) || (e.variants || []).some(uses));
              const asks = (V.ASKS || []).filter(uses);
              return `<tr><td>${g.icon} <b>${esc(g.label[L])}</b></td><td><small>${esc(g.items.map(v => L === 'fr' ? (V.FIGURE_FR[v] || v) : v).join(' · '))}</small></td><td>${evs.map(e => `<span title="${esc(e.name[L])}">${e.icon}</span>`).join(' ')}${asks.length ? ` · ❔×${asks.length}` : ''}</td></tr>`;
            })) },
          { title: T('Born to it', 'De naissance'), html: `<p>${T('Random characters receive one trait typical of their homeland:', 'Les personnages tirés au hasard reçoivent un trait typique de leur terre natale :')}</p>` + table([T('Homeland', 'Terre natale'), T('Typical traits', 'Traits typiques')], homes) }
        ];
      },

      realms() {
        const court = UI.S().characters;
        return [
          { title: T('Lands and their people', 'Les terres et leurs gens'), html: `
            <p>${T('Every character belongs to a homeland: the region of the map chosen in the form, or found from her seat. The homeland gives her names, houses, one typical trait, and a voice: she speaks of her food and drink, swears by her saints, and sometimes adds a line about home.',
              'Chaque personnage appartient à une terre natale : la région choisie dans le formulaire, ou déduite de son fief. Elle lui donne ses noms, ses maisons, un trait typique et une voix : elle parle de ses mets et de sa boisson, jure par ses saints, et ajoute parfois une phrase sur son pays.')}</p>
            <p>${T('Ask her “where are you from?” or “favourite food?” to hear it.', 'Demandez-lui « d’où venez-vous ? » ou « plat préféré ? » pour l’entendre.')}</p>` },
          ...V.REGIONS.map(r => {
            const O = V.ORIGINS[r.id] || {}, i = L === 'fr' ? 1 : 0, here = court.filter(c => V.Gen.regionOf(c) === r.id);
            const kv = (k, v) => (v ? `<tr><th>${k}</th><td>${v}</td></tr>` : '');
            return {
              title: r.name[L],
              html: `<p class="bk-realm"><span style="background:${V.REALMS[r.realm].fill}"></span>${esc(V.REALMS[r.realm].name[L])}</p>
                <table class="bk-kv">${kv(T('Ruler', 'Souveraine'), esc(r.ruler[i]))}${kv(T('Cities', 'Villes'), esc(r.cities.map(c => c[0]).join(', ')))}
                ${kv(T('Houses', 'Maisons'), esc(r.houses.map(UI.houseLabel).join(', ')))}${kv(T('Tongue', 'Langue'), esc(UI.t('lang.' + r.lang)))}
                ${kv(T('Table', 'Table'), O.food ? `🍲 ${esc(O.food[i])} · 🍷 ${esc(O.drink[i])}` : '')}${kv(T('Oath', 'Juron'), O.oath ? `<i>${esc(O.oath[i])}</i>` : '')}
                ${kv(T('Custom', 'Coutume'), O.custom ? esc(O.custom[i]) : '')}${kv(T('Temper', 'Humeur'), esc((O.traits || []).map(UI.traitLabel).join(', ')))}
                ${kv(T('Your court', 'Votre cour'), here.length ? esc(here.map(c => c.name).join(', ')) : '—')}</table>
                ${O.lines ? `<p>${O.lines[L].map(s => `<i>“${esc(s.replace('{sen}', UI.S().user.name || UI.t('you')))}”</i>`).join('<br>')}</p>` : ''}
                <p><button class="btn ghost" data-act="lib-map" data-id="${r.id}">🗺️ ${T('Show on the map', 'Voir sur la carte')}</button></p>`
            };
          })
        ];
      },

      memory() {
        const M = V.MEMORY || {}, court = UI.S().characters;
        const ln = k => ((M[k] || {})[L] || []).map(s => `<i>“${esc(s)}”</i>`).join('<br>');
        const recall = Object.keys(M.recall || {}).map(id => { const a = (V.ASKS || []).find(x => x.id === id); return a ? `<tr><td><i>${esc(a.q[L])}</i></td><td><small>✅ ${esc(((M.recall[id].yes || {})[L] || [])[0] || '')}<br>❌ ${esc(((M.recall[id].no || {})[L] || [])[0] || '')}</small></td></tr>` : ''; });
        return [
          { title: T('What she remembers', 'Ce dont elle se souvient'), html: `
            <p>${T('Every character keeps her own memory of you, across all your correspondences with her:', 'Chaque personnage garde sa propre mémoire de vous, à travers toutes vos correspondances :')}</p>
            <ul><li>${T('🌟 the <b>first time</b> of every event, with its date;', '🌟 la <b>première fois</b> de chaque événement, avec sa date ;')}</li>
            <li>${T('❤️ <b>how often</b> you did each one;', '❤️ <b>combien de fois</b> vous avez fait chacun ;')}</li>
            <li>${T('❔ your <b>answers</b> to her questions;', '❔ vos <b>réponses</b> à ses questions ;')}</li>
            <li>${T('📮 the day of your <b>last letter</b>.', '📮 le jour de votre <b>dernière lettre</b>.')}</li></ul>
            <p>${T('You see it on her profile, under 🧠 Memory, and ✕ makes her forget one line.', 'Vous la voyez sur son profil, sous 🧠 Mémoire, et ✕ lui fait oublier une ligne.')}</p>` },
          { title: T('When she brings it up', 'Quand elle en parle'), html: `
            <ul><li>${T('A <b>first time</b>: one time in two she marks it.', 'Une <b>première fois</b> : une fois sur deux, elle le souligne.')}<br>${ln('first')}</li>
            <li>${T('From the <b>third time</b>: now and then she counts.', 'À partir de la <b>troisième fois</b> : de temps en temps, elle compte.')}<br>${ln('often')}</li>
            <li>${T('After <b>a day or more</b> without a letter, she says so first.', 'Après <b>un jour ou plus</b> sans lettre, elle le dit d’abord.')}<br>${ln('away')}</li>
            <li>${T('If you answer a question <b>differently</b> from last time, she notices.', 'Si vous répondez <b>autrement</b> que la dernière fois, elle le remarque.')}<br>${ln('contra')}</li>
            <li>${T('Ask “<b>do you remember…</b>” and she recalls a first time with its date, your favourite, or something you told her.', 'Demandez « <b>vous souvenez-vous…</b> » et elle évoque une première fois avec sa date, votre favori, ou ce que vous lui avez dit.')}<br>${ln('remember')}<br>${ln('fav')}</li></ul>` },
          { title: T('Things you told her', 'Ce que vous lui avez dit'), html: `<p>${T('When she has nothing to answer, 2 times in 10 she brings back one of your answers:', 'Quand elle n’a rien à répondre, 2 fois sur 10 elle revient sur l’une de vos réponses :')}</p>` + table([T('Her question', 'Sa question'), T('Later she says', 'Plus tard elle dit')], recall) },
          { title: T('Your court remembers', 'Votre cour se souvient'), html: court.length ? table([T('Character', 'Personnage'), '🌟', '❤️', '❔', '📮'], court.map(c => {
            const m = c.mem || {}, n = o => Object.keys(o || {}).length;
            return `<tr><td><button class="link" data-char="${esc(c.id)}">${esc(c.name)}</button></td><td>${n(m.first)}</td><td>${Object.values(m.count || {}).reduce((a, b) => a + b, 0)}</td><td>${n(m.asks)}</td><td><small>${m.last ? new Date(m.last).toLocaleDateString(L, { day: 'numeric', month: 'short' }) : '—'}</small></td></tr>`;
          })) : `<p class="muted">${T('No one at court yet.', 'Personne à la cour pour l’instant.')}</p>` }
        ];
      },

      effects() {
        const fx = ids => table([T('Effect', 'Effet'), T('What happens', 'Ce qui se passe')], ids.map(id => `<tr><td>${fxName(id)}</td><td><small>${esc(UI.t('fxd.' + id))}</small></td></tr>`));
        const byEv = V.EVENTS.events.filter(e => e.effect).map(e => `<tr><td>${e.icon} ${esc(e.name[L])}</td><td>${fxName(e.effect)}</td></tr>`);
        return [
          { title: T('Giving a letter an effect', 'Donner un effet à une lettre'), html: `
            <p>${T('In a correspondence, <b>✨</b> picks an effect for your next letter. To change a letter already sent, tap it and choose <b>✨ Effect</b>.', 'Dans une correspondance, <b>✨</b> choisit un effet pour votre prochaine lettre. Pour une lettre déjà envoyée, touchez-la puis <b>✨ Effet</b>.')}</p>
            <p>${T('Screen effects leave a small badge on the letter: tap it to play the effect again.', 'Les effets d’écran laissent un petit badge sur la lettre : touchez-le pour rejouer l’effet.')}</p>` },
          { title: T('On the letter', 'Sur la lettre'), html: fx(V.FX.BUBBLE) },
          { title: T('On the whole screen', "Sur tout l'écran"), html: fx(Object.keys(V.FX.SCREEN)) },
          { title: T('Brought by events', 'Apportés par les événements'), html: table([T('Event', 'Événement'), T('Effect', 'Effet')], byEv) }
        ];
      }
    };
  }

  const chaptersOf = (book, UI) => {
    const L = UI.lang();
    if (book.gen) return GEN(UI)[book.gen]();
    return book.chapters.map(c => ({ title: c.title[L], html: c.body[L] }));
  };
  const bookById = id => V.BOOKS.find(b => b.id === id);
  const cover = (b, L) => `<button class="tome" data-act="lib-open" data-id="${b.id}" style="--bk:${b.color}">
      <span class="tome-ic">${b.icon}</span><b>${b.title[L]}</b><small>${b.sub[L]}</small></button>`;

  function screens(UI) {
    const t = UI.t, esc = UI.esc;
    return {
      library() {
        const L = UI.lang();
        UI.main.innerHTML = `
          <header class="top"><h1 class="title">${t('nav.library')}</h1><p class="sub">${t('lib.sub')}</p></header>
          <button class="lab-banner" data-go="labs"><span>🧪</span><b>${t('labs.title')}</b><small>${t('labs.sub')}</small><em>›</em></button>
          ${V.SHELVES.map(s => `<section class="shelf"><h3 class="sec">${s.name[L]}</h3><div class="tomes">${V.BOOKS.filter(b => b.shelf === s.id).map(b => cover(b, L)).join('')}</div><div class="plank"></div></section>`).join('')}`;
      },
      book() {
        const L = UI.lang(), b = bookById(UI.view().id);
        if (!b) return UI.go('library');
        const chs = chaptersOf(b, UI), at = pos()[b.id];
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-go="library">‹</button><span></span></header>
          <section class="bk-cover" style="--bk:${b.color}"><span class="tome-ic">${b.icon}</span><h2>${b.title[L]}</h2><p>${b.sub[L]}</p></section>
          ${at != null && chs[at] ? `<div class="row-actions"><button class="btn" data-act="lib-page" data-n="${at}">📖 ${t('lib.continue')}: ${esc(chs[at].title)}</button></div>` : ''}
          <h3 class="sec">${t('lib.contents')}</h3>
          <ol class="toc">${chs.map((c, i) => `<li><button data-act="lib-page" data-n="${i}"><span>${esc(c.title)}</span><em>${i + 1}</em></button></li>`).join('')}</ol>`;
      },
      page() {
        const L = UI.lang(), b = bookById(UI.view().id);
        if (!b) return UI.go('library');
        const chs = chaptersOf(b, UI), n = Math.max(0, Math.min(chs.length - 1, UI.view().n || 0)), c = chs[n];
        setPos(b.id, n);
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-act="lib-open" data-id="${b.id}">‹</button><h2 class="bk-runner">${b.icon} ${b.title[L]}</h2><span></span></header>
          <article class="leaf" id="leaf">
            <h2 class="leaf-t">${esc(c.title)}</h2>
            <div class="leaf-b">${c.html}</div>
            <footer class="leaf-f">❦ ${n + 1} / ${chs.length} ❦</footer>
          </article>
          <nav class="leaf-nav">
            <button class="btn ghost" data-act="lib-page" data-n="${n - 1}" ${n === 0 ? 'disabled' : ''}>‹ ${t('lib.prev')}</button>
            <button class="btn ghost" data-act="lib-open" data-id="${b.id}">☰</button>
            <button class="btn ghost" data-act="lib-page" data-n="${n + 1}" ${n >= chs.length - 1 ? 'disabled' : ''}>${t('lib.next')} ›</button>
          </nav>`;
        // swipe to turn the page
        const leaf = document.getElementById('leaf');
        let x0 = null;
        leaf.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
        leaf.addEventListener('touchend', e => {
          if (x0 == null) return;
          const dx = e.changedTouches[0].clientX - x0; x0 = null;
          if (Math.abs(dx) > 60) { const to = n + (dx < 0 ? 1 : -1); if (to >= 0 && to < chs.length) UI.go('page', { id: b.id, n: to, turn: dx < 0 ? 'next' : 'prev' }); }
        });
        if (UI.view().turn) leaf.classList.add('turn-' + UI.view().turn);
      }
    };
  }

  const actions = UI => ({
    'lib-open': a => UI.go('book', { id: a.dataset.id }),
    'lib-page': a => { const v = UI.view(); UI.go('page', { id: v.id, n: +a.dataset.n, turn: +a.dataset.n > (v.n || 0) ? 'next' : 'prev' }); },
    'lib-map': a => { V.MapView.select(a.dataset.id); UI.go('map'); }
  });

  return { screens, actions, count: () => V.BOOKS.length };
})();
