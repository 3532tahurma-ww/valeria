# 🎬 Sahneler, 📖 bölümler, 🕯️ Dame Mathilde

Carmen'in `Stories.SCENES` / `EPISODES` ve 💡 Lia önerilerinin Valeria karşılığı. Valeria'da parametre (şehvet, güven…) yok; ödül = hafıza + efekt + bölüm ilerlemesi.

## Dosyalar
- Veri `js/data/scenes.js`: `SCENES`, `EP_TIERS`, `EPISODES`, `SCENE_NOTES` (❦ notları), `SCENE_LINES` (onun cümleleri: ready / fail / early). Biçim dosya başında.
- Motor `js/scenes.js` (`Valeria.Scenes`): `step`, `offer`, `next`, `progress`, `epNext`, `epOk`, `usable`.
- Bağlantılar: `app.js` `botReply` (step + teklif), `drawQuick` (sahne şeridi), `drawTips` (Mathilde), `memoryCard`, eylemler `sc-end`, `tips-toggle`; `suggest.js` `quick` (ctx.scene) ve `tips`; `library.js` GEN `scenes`.

## Sahne
- `open` olayı (Bot.match ile bulunan id: olay, soru ya da komut) sahneyi açar; aynı anda tek sahne (`state.botScene[thread] = { id, done, idle }`).
- `free`: `need` adım, sıra serbest · `seq`: bütün adımlar sırayla (yalnız sıradaki sayılır).
- Adımlar dolunca `fin` (🏁, çoğu `climax`) tamamlar; `fin` yoksa hemen tamamlanır. Erken `fin` → biter (tamamlanmaz), `stop` → biter, ✕ → biter; başka `act` olayları `idle`'ı artırır, `idle > ttl` → bozulur. Talk / soru / komut bozmaz.
- Karaktere uymayan adımlar (cinsiyet / beden şartı) atlanır; yeterli adım yoksa sahne açılmaz (♂: `oils`, `otherway` yok).
- Tamamlanınca `mem.scenes[id]++`, 🌹 efekt, bölüm ilerler.

## Bölüm
- `mem.ep = { id, i }` (i = sıradaki sahne), `mem.eps[id] = bitiş zamanı`, `mem.epSeen` = teklif edilenler.
- Kapı: `EP_TIERS[tier].need` farklı tamamlanmış sahne + `after` + bütün sahneleri karaktere uygun.
- İlk sahnesi tamamlanınca başlar (önce teklif edilmiş olan), sıradaki sahne tamamlanınca ilerler, son sahnede 🎆 biter. Araya giren başka sahneler bölümü bozmaz.

## Teklif ve öneriler
- Mesaj hiçbir şeye uymazsa ve soru sormadıysa %25: bölümün `next` cümlesi → yeni bölümün `ask`'ı (bir kez) → en az yapılmış sahnenin `ask`'ı.
- ⚡ kısayollar: sahne adımları +5, bölümün sıradaki sahnesinin açılışı +2.5.
- 🕯️ Dame Mathilde (`Suggest.tips`): soru → sahne adımları → ilk mektup → climax sonrası → bölüm → intimacy → tender → açık bölüm / hiç oynanmamış sahne → genel kur. Cümle arayüz dilinde, en çok 4 çip. Kapatma `localStorage valeria:tips = '0'`.

## 🎬 Sahne deneyi (`labs.js` `sceneLab`)
- Kum havuzu `st.sc = { id, st, mem, feel, log }`; `lab-sc-do` = botReply'daki gibi `Scenes.step` + `Feel.step`. ↺ sıfırlar. Gerçek karakter hafızasına yazmaz.
- Düğmeler: açılış, adımlar (✓ yapıldı, sıradaki vurgulu, uymayan gri), bitiş (🔒 hazır olana kadar), bozma (ilk 4 ilgisiz act, stop, talk). ⚠️ = SAY cümlesi kendi olayını tetiklemiyor.
- Bölüm listesi `epOk` ile 🔓/🔒; sahne adına basınca o sahne seçilir.

## Yeni sahne / bölüm eklemek
1. `SCENES`'e satır (id'ler `EVENTS`'te olmalı; SAY cümlesi kendi olayını tetiklemeli).
2. Bölüm için `EPISODES` (`next` uzunluğu = sahne sayısı − 1).
3. Book of Scenes kendiliğinden güncellenir; fermanda sayıları güncelle.
