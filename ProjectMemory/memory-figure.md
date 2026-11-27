# 🧠 Hafıza, 📏 Beden özellikleri, 🎭 Olaylar listesi

## 📏 Beden (`js/data/body.js`)
- `FIGURE` grupları, karakterde `"Grup: Değer"` olarak `traits` içinde (Carmen'le aynı dizgiler): Height, Weight (7 değer, Carmen'deki gibi), Boob Size (70–95), Butt Size (XS–XL), Pussy Size, Anal Size (Extremely Tight … Very Loose). `gender: '♀'` olanlar sadece kadınlarda.
- Kullanıcı (👑 Me): `user.gender` (♂/♀) ve `user.dick` (`USER_DICK`: Small, Average, Large, Very Large) → bota `"Dick Size: X"` sahte özelliği (`userTraits()`, `Bot.respond({ userTraits })`), Carmen'deki gibi.
- Form: "📏 Figure" seçimleri (`data-fig`), 🎲 `figure` (kiloya uygun göğüs/kalça). Profil: Figure kartı; normal çiplerde gösterilmez (`isFig`). Etiket `traitLabel` → "🍒 Bosom: 85", FR değerler `FIGURE_FR`.
- Yeni olaylar: hairplay, blindfold, window, breasts (♀), bottom (♀), spank, lower (♀, prio 1), anal (♀, prio 1), hayloft, table.
- Var olanlara beden varyantları: hug/kiss (Height), compliment (Weight), missionary/cowgirl/climax (Pussy Size + Dick Size), behind (Butt Size).
- Sorular: q_height, q_figure, q_bust, q_hips, q_tight, q_anal (Anal Size, `prio: 1` = `anal` olayıyla eşit; uzun tetikleyici kazanır), q_mysize (Dick Size), q_memory. v0.13.0'dan beri beden soruları geçiştirmez: varsayılan cevap da açık sözlü/erotik; her değer grubunun varyantı var (Height Average, Weight Average, Butt Size M|M/L, Pussy Size Average, Dick Size Average dahil).
- Onun soruları `on: [olay id]` = o olaydan sonra %35: a_bust, a_bustbig (breasts), a_hips (bottom/behind), a_gentle (missionary/cowgirl/anal, dar), a_tall (hug/kiss, kısa), a_curvy (talk, dolgun).

## 🧠 Hafıza (karakterde `c.mem`, `botReply` yazar)
- `{ first: {olayId: ts}, count: {olayId: n}, asks: {askId: 'yes'|'no'|metin}, last: ts }`. Bütün sohbetlerde ortak. Carmen alanlarıyla (`anilar`, `memory`) çakışmaz.
- `Bot.respond({ mem, gapDays })` → `rec { ev, ans }` döner, app kaydeder.
- Kullanım (`MEMORY` satırları): ilk kez act → %50 `first`; 3. seferden sonra %20 `often` ({n}); ≥1 gün mektupsuz → önce `away` ({days}); evet/hayır önceki cevaptan farklıysa `contra`; yedek cevapta %20 `recall` (a_ride, a_dance, a_war, a_read, a_lover, a_miss); "do you remember" (`q_memory`) → ilk kez + tarih, favori ya da hatırlatma.
- Profil: 🧠 Memory kartı (ilk kezler + tarih, favoriler, cevapların, son mektup); ✕ `mem-del` siler.
- Kütüphane: 🧠 Book of Memory (4 bölüm, canlı).

## 🎭 Olaylar listesi (sohbette ⋮ → 🎭 Events ya da ⚡ çubuğundaki "⋯")
- Üstte (sadece "All" sekmesinde): 🔗 Next from here (`FLOW`), ❤️ Her favourites (hafızadan), 🎲 Surprise me (uygun rastgele act).
- Sekmeler: All · Questions · Courtship · Tenderness · Intimacy · Commands; arama kutusu. Çip → yazma alanına; tekrar dokun → gönder.
