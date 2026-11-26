# Changelog

## 0.5.0 (2026-11-26) — sw `valeria-v5`
- 🎭 Olaylar düğmesi + liste (sonraki, favoriler, sürpriz, sekmeler, arama).
- 🧠 Hafıza: `c.mem`, ilk kez / sık / uzun ayrılık / çelişki / hatırlatma satırları, "do you remember", profil kartı, Book of Memory.
- 📏 Beden özellikleri (Carmen dizgileri) + kullanıcı cinsiyeti / Dick Size; 10 yeni olay, 7 yeni soru, 6 yeni onun sorusu (`on`), beden varyantları; `js/data/body.js`.
- Mizaç kitabına 📏 bölümü, rehbere "Figure and memory"; deneylerde test hanımı beden seçimleri ve Dick Size.

## 0.4.0 (2026-11-26) — sw `valeria-v4`
- ⚡ Kısayollar (`js/suggest.js`): puanlı öneri çipleri, cevap çipleri, 🔮 yazarken tamamlama, "⋯" aramalı tam liste, ⋮ menüde aç/kapa; `state.botLog`.
- 🧪 Laboratuvar (`js/labs.js`): bot, mizaç, memleket, kısayol, efekt deneyleri; `Bot.explain`, `Bot.match`.
- 🎵 Arka plan müziği (`Music/`, `js/data/music.js`) + WebAudio sesleri (ut, mühür, çan, sayfa) (`js/sound.js`); Me ayarları.
- Guide'a 3 bölüm (Shortcuts, Laboratory, Music and sounds); FR tetikleyiciler "des anglais / des français".

## 0.3.0 (2026-11-26) — sw `valeria-v3`
- 🏠 Ana sayfa (`js/home.js`): tarih/dua saati/hava/aziz günü, haberci şeridi, günün hanımı, saray rayı, son mektuplar, ilanlar, diyarların hanımları, kütüphane/harita kartları. Açılış ekranı.
- 📚 Kütüphane (`js/library.js`, `js/data/books.js`): 3 raf, 8 kitap (1 elle yazılmış rehber + 7 canlı üretilen), sayfa çevirme.
- ⋮ Sohbet menüsü (bot, sırayla, yeniden adlandır, profil, sil); 🤖 bot modu varsayılan açık (`state.bot[id] === false` = kapalı).
- ❓ Sorular (13) + ❔ onun soruları (`ASKS` 18, `state.botAsk`), konuya bağlı yedek cevap (`TOPICS` 15, `DURING`, `ECHO`).
- 🌍 Yöre (`js/data/origins.js`): 22 bölgenin yemeği, içkisi, yemini, geleneği, tipik kişiliği, cümleleri; `origin` şartı; profilde Homeland kartı.
- Alt menü: Home · Map · Letters · Library · Me.

## 0.2.0 (2026-11-26) — sw `valeria-v2`
- Bot: şartlar (`traits`, `gender`, `chars`) ve `variants`; 24 yeni olay (farewell, gift, poem, jealousy, war, tourney, feast, meet, tease, pray, scheme, dance, bath, lapsit, massage, reverse, faceface, wall, edge, name, look…); olay `effect`.
- Efektler: `js/effects.js` (7 baloncuk + 7 ekran efekti), ambiyans, sancak, yaldız, mühür, unroll animasyonu.
- `js/gen.js` + `js/data/pools.js`: rastgele karakter, alan zarları, Summon a stranger.
- `chars/` portreleri: `js/data/portraits.js` (`portreleri-guncelle.bat`), form seçici.
- `js/map.js` + `js/data/map.js`: Batı Avrupa haritası, bölge kartları, notables, davet. Yeni sekme 🗺️ Map.
- Yeni state alanları: `world` (`seed`, `rolls`), `characters[].region`.

## 0.1.0 (2026-11-26) — sw `valeria-v1`
- Sıfırdan kurulum: ekranlar (court, letters, profile, edit, group, chat, me), store, EN/FR i18n, PWA.
- Bot modu motoru + temel olaylar: Greeting, Compliment, Love, Longing, Hand kiss, Holding hands, Embrace, Kissing, Neck kisses, Caressing, Undressing, Missionary, Cowgirl, From behind, Spooning, Climax, Cuddling; komutlar Again, Faster, Slower, Stop.
- Carmen (`amor-stories-backup` v1) ile uyumlu yedek.
