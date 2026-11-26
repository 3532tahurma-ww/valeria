# 🏠 Ana sayfa, 📚 Kütüphane, ⋮ sohbet menüsü

## Ana sayfa (`js/home.js`, ekran `home`, açılış ekranı)
Carmen'in portal ana sayfası gibi. Günlük her şey tarihle tohumlanır (`Gen.rng(YYYY-MM-DD + tuz)`): gün boyunca aynı, ertesi gün değişir.
- Üst: tarih · dua saati (Matins…Compline, saate göre) · hava (mevsime göre) · slogan · bugünkü/sıradaki aziz günü (`FEASTS` gerçek tarihler).
- 📯 Haberci şeridi (`NEWS` şablonları, notable + şehir/bölge; dokun → haritada o bölge).
- 🌹 Günün hanımı: saraydan biri, yoksa bir notable. Alıntı yöre cümlesinden (`ORIGINS.lines`).
- 👑 Sarayın (kaydırmalı kartlar + New + Summon), ✉️ son 3 mektup, 📜 iki ilan (`PROCLAIM`; **Answer her** = saraya davet + mektup aç), 🗺️ diyarların hanımları (8 notable → haritada bölge), kütüphane ve harita kartları.
- Notables `MapView.notables(UI, bölge)` ile haritadakiyle aynı kişiler.

## Kütüphane (`js/library.js`, veri `js/data/books.js`)
- Ekranlar: `library` (raflar `SHELVES`), `book {id}` (kapak + içindekiler + "Continue"), `page {id, n}` (bölüm; ‹ › ve kaydırma, sayfa çevirme animasyonu). Son okunan sayfa `localStorage['valeria:bookpos']`.
- Kitaplar: 🧭 Courier's Guide (elle yazılmış EN/FR, 6 bölüm) · ✨ Book of Wonders (efektler) · 💋 Book of Events · ❓ Book of Questions · ❔ Her Questions · 🔁 The Art of Conversation · 🎭 Book of Temperaments · 🌍 Book of Realms (22 bölge bölümü, "Show on the map").
- `gen` kitapları `GEN(UI)[ad]()` ile canlı veriden üretilir (olaylar, sorular, ASKS, TOPICS, varyantlar, ORIGINS, FX): veri değişince kitap kendiliğinden güncel. Elle yazılan Guide değişen özellikle birlikte güncellenmeli.

## ⋮ Sohbet menüsü
- Sohbet başlığında sağda ⋮: 🤖 Bot mode (On/Off), ⇄ Take turns, ✎ Rename, 👤 Profile (tekli), 🔥 Burn this correspondence. Dışarı dokununca kapanır. Bot açıkken başlıkta 🤖 rozeti.
- **Bot modu varsayılan açık**: `botOn(id) = state.bot[id] !== false` (kapatılınca `false` yazılır).

## Alt menü
🏰 Home · 🗺️ Map · ✉️ Letters · 📚 Library · 👑 Me. Court (karakter ızgarası) ana sayfadan "All ›" ile; profile/edit/court sekmesi Home olarak işaretlenir.
