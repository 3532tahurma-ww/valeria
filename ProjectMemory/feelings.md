# 🤝❤️🔥 Duygular ve 📰 durum kartları

Carmen'in Güven / Aşk / Şehvet parametreleri ve "Durum kartları"nın Valeria karşılığı. Amaç: her mesajda karakterin ne hissettiği açıkça görünsün.

## Dosyalar
- Veri `js/data/feelings.js`: `FEELINGS`, `FEEL_STEPS` (25/50/75/100), `DESIRE_STEPS` (50/80), `FEEL_INIT` (taban + özellik), `FEEL_MUL` (özellik çarpanı), `FEEL_CAT`, `FEEL_EV`, `FEEL_NEED(_CAT)`, `FEEL_MORE`, `FEEL_SAY` ("emoji|cümle", EN/FR).
- Motor `js/feel.js` (`Valeria.Feel`): `init`, `step`, `tooSoon`, `needOf`, `of`, `meta`.
- Bağlantı: `app.js` `botReply` (Scenes.step'ten sonra), `drawFeel` (`#feelbar`), `msgHTML` (`m.feel` çipi, `m.st` kart stili), `memoryCard` (profilde göstergeler), eylem `cards-cycle`; `suggest.js` `tips` (trop tôt / arzu ≥ 80 / güven < 15 / aşk < 5 tavsiyeleri); `library.js` GEN `feelings` (Book of the Heart).

## Hesap (`Feel.step`)
- Olay: `FEEL_EV[id]`, yoksa `FEEL_CAT[kategori]` (talk/soru/komut dahil; `Bot.match` id'si).
- `act` için `FEEL_NEED` altındaysa → `tooSoon` (güven −3) + kart.
- Son 3 mesajda aynı olay → güven/aşk artışı yarım.
- Yöre `likes` → aşk +2, `dislikes` → güven −2. Soruya cevap +1 güven. Sahne bitti/bozuldu, bölüm bitti (`Scenes.step().kinds`). 2+ gün sessizlik aşk −2.
- `FEEL_MUL` yalnız artışları çarpar. 0–100 arası; sıfırdan farklı küçük artış en az 1.
- Climax arzuyu −40 düşürür.

## Kartlar
- Güven/Aşk eşik geçişi (yukarı/aşağı), Arzu 50/80 (yukarı), too soon, climax sonrası `fin`. En çok 2 kart/mesaj. Sys mesajı `st: 1` (kesik çerçeve).
- Erkek karakterde FR cümleler eril (`MASC` değişimi).
- Seviye `localStorage valeria:cards`: `0` kapalı, `1` kartlar, yok = kartlar + değişim çipi (`m.feel`, ilk baloncukta). ⋮ → 📰 ile döner.

## Saklama
- `characters[].feel = { trust, love, desire }` (ilk görüldüğünde `FEEL_INIT`'ten). Mesaj alanları `feel`, `st` (Carmen yok sayar).
