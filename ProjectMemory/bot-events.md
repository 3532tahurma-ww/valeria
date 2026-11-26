# Bot modu: olaylar

Motor `js/bot.js`, veri `js/data/events.js`. Sohbette 🤖 ile açılır; açıkken her zaman kullanıcı yazar, karakter cevap verir (grupta rastgele bir üye).

## Olay biçimi
```js
{ id: 'missionary', kind: 'act', cat: 'intimacy', icon: '🛏️', prio: 1, effect: '',
  traits: [], gender: '', chars: [],            // olay şartı (yoksa herkes)
  name:  { en: 'Missionary', fr: 'Missionnaire' },
  when:  { en: ['missionary', 'lie back'], fr: ['missionnaire', 'allonge'] },
  reply: { en: ['…', 'a || b'], fr: ['…'] },
  variants: [ { traits: ['Shy'], gender: '♂', chars: [], reply: { en: [], fr: [] } } ] }
```
- `kind`: `talk` (sadece cevap), `act` (o anki olayı değiştirir, değişince "❦ icon ad ❦" notu), `cmd` (hiçbir talk/act tutmazsa: `again` o anki olayı tekrarlar, `stop` bitirir, diğerleri kendi cevapları).
- **Şartlar** (`traits` hepsi; "a|b" biri yeter, `gender`, `chars` ad ya da ilk ad):
  - Olayın üstünde: sadece bu karakterlerde eşleşir (ör. `scheme` sadece Cunning|Mischievous). Puana +10 × özgüllük.
  - `variants`: şartı tutan en özel varyantın cevapları kullanılır (trait ×2, gender 1, chars 3). Varyantta o dil yoksa temel cevap (ör. sadece FR'si olan ♂ varyantı).
- Temel cevaplar kadın karakter için yazıldı; erkek karakterler için önemli olaylarda `gender: '♂'` varyantı var.
- Tetikleyiciler iki dilde de aranır. `kiss` = "kiss" ile başlayan kelime; `=fair` = tam kelime. Aksan, büyük/küçük harf, kesme işareti yok sayılır. Puan: en uzun tetikleyici; `prio` her seviye +100.
- `effect`: olay başlarken ilk baloncuğa (bkz. effects.md).
- Cevap karakterin dilinde (`lang`), `||` ayrı baloncuk, `{sen}`/`{you}` kullanıcı adı, `{ben}`/`{me}` karakter adı.
- Yedek cevap (`fallback`) da kişilik varyantlı (Shy, Witty, Stern, Poetic, Mischievous, Brief letters).

## Mevcut olaylar (45)
| Kategori | Olaylar |
|---|---|
| courtship (talk) | greet, howareyou, compliment, love, missyou, farewell, thanks, sorry, gift, poem, jealousy, war, tourney, feast, meet, tease, pray, scheme* |
| tender (act) | handkiss, handhold, hug, kiss, neckkiss, caress, dance, bath, lapsit, massage, undress, cuddle |
| intimacy (act, prio 1) | missionary, cowgirl, reverse, behind, spooning, faceface, wall, edge, climax |
| command (cmd) | again, faster, slower, name, look, stop |

\* yalnızca Cunning ya da Mischievous karakterler.

Varyantlı kişilikler: Shy, Bold, Proud, Pious, Passionate, Romantic, Mischievous, Stern, Poetic, Witty, Jealous, Gentle, Loyal, Melancholic, Rebellious, Brief letters.

## Konuşma sırası (`respond`, ayrıntı `js/bot.js` başı)
1. Karakter önceki turda soru sorduysa (`state.botAsk[sohbet]`) ve mesaj bir act başlatmıyorsa → **onun sorusu** cevaplanır: `yn` için evet/hayır (`YES`/`NO` kelimeleri), `open` için her cevap; haritadan bir yer adı geçerse `place` satırı (`{place}`, `{placecustom}`, o yerin yemeği).
2. Olay/soru eşleşirse cevabı; **sorularda** %40 karşı soru (`counter`), normal konuşmada %10 kendi sorusu, %15 yöre cümlesi; climax/cuddle sonrası %35 "after" sorusu.
3. Komut.
4. **Konuya bağlı yedek**: `TOPICS` kelimesi (at, yağmur, kral, aile…) → konu cümlesi; act sırasında `DURING`; yoksa %30 kendi sorusu, %25 `ECHO` (mesajdaki en uzun sıradışı kelimeyi geri sorar), %15 yöre cümlesi, kalan genel yedek (kişilik varyantlı).

## Sorular (`js/data/talk.js`)
- **Sen soruyorsun** (cat `question`, 13): q_from, q_age, q_title, q_house, q_food, q_drink, q_lover, q_faith, q_english, q_french, q_like, q_fear, q_dream. Cevaplar profilden ve yöreden: `{city} {region} {house} {title} {age} {food} {drink} {oath} {custom}`.
- **O soruyor** (`ASKS`, 18): `when` = `counter` (senin sorundan sonra), `talk`, `after`; bazıları şartlı (a_mass sadece Pious, a_love Romantic|Passionate, a_secret Cunning|Mischievous).
- Konular `TOPICS` (15). Kelime listesi eşleşmesi olaylarla aynı (`=` tam kelime).

## 🌍 Yöre (`js/data/origins.js`)
- 22 bölge: `food`, `drink`, `oath`, `custom`, tipik `traits`, `lines` (yöre cümleleri).
- Şart `origin: ['scotland', 'realm:fr']` hem olayda hem varyantta çalışır (ör. q_english İskoç/İngiliz farklı).
- Rastgele karakter bölgesinin tipik özelliklerinden birini alır. Profilde "Homeland" kartı.

## Henüz yok (Carmen'de vardı)
- Kelime grupları (`@grup`), sıralı çoklu kelime, 🪄 otomatik ekler, kural editörü.
