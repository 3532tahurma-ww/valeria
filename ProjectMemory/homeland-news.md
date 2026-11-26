# 🌍 Yöre sesi ve 📯 Haberci

## 🌍 Yöre sesi (`js/data/homeland.js`, origins.js'e eklenir; body.js'ten sonra yüklenir)
- Bölge başına yeni alanlar `[EN, FR]`: `greet` / `bye` (kendi dilinde; Fransızca konuşulan bölgelerde çoğu `null`), `pet` (hitap: cariad, a stór, ma c'halon…), `saint`, `feast`, `song`, `proverb`; `likes` / `dislikes` (olay id'leri).
- Bot (`homeReact`, `js/bot.js`): selamda %60 kendi dilinde selam öneki, vedada %70 `{byeword}, {pet}` balonu, climax/jealousy/spank/war/sorry'de %30 yemin öneki, sevdiği olayda %50 `REGIONAL.like`, sevmediğinde %60 `REGIONAL.dislike`.
- Yedek cevapta: %12 yöre cümlesi (`lines` + `REGIONAL.talk`), %10 atasözü (`REGIONAL.proverb`).
- Yer tutucular: `{pet} {saint} {feast} {song} {proverb} {greetword} {byeword}` (bölgesizlerde genel varsayılanlar).
- Sorular (sadece yöresi olanlarda, `origin: tüm bölgeler`): q_saint, q_feast, q_song, q_proverb, q_tongue. Onun soruları: a_visit, a_tasted, a_word (talk). Hafıza hatırlatması: a_visit, a_tasted.
- Profil yöre kartı: selam·veda, hitap, aziz, bayram, türkü, atasözü, sevdikleri/sevmedikleri. Kitaplar: Realms (her bölgede yeni satırlar), Conversation ("The voice of her land"), Guide ("Homelands").

## 📯 Haberci (`js/data/news.js`, ekranlar `js/news.js`)
- Carmen'in HOME_NEWS / Haberler'i gibi, orta çağ fermanı tarzında; anlatıcı **Gautier, herald of Valeria**.
- `PROCLAMATIONS` (en yeni üstte): `{ id, icon, cat: decree|court|realms, date, title, sum, go: [ekran, params], sections: [[başlık, metin]], story: {en: [], fr: []} }`. **Yeni özellik = en üste yeni ferman + Guide bölümü.**
- `TIDINGS` (29 şablon; + Agincourt, Hanse, Scania ringası, Brandenburg topu): her gün tarihle tohumlanan 8 diyar haberi; her biri bir bölge + o bölgenin bir notable'ı (`MapView.notables`). İsteğe bağlı `home: [bölge / 'realm:x']` → haber sadece o bölgelerden birine düşer (`js/news.js` `tidings`); Orta Avrupa'nın 10 şablonu böyle (Hussitler, gümüş, Konstanz, elektörler, Tuna, at yarışı, Tötonlarla ateşkes, Alp geçidi, Bavyera biracıları, kehribar).
- Yöre sesi (`homeland.js`) 37 bölgenin hepsinde var; Orta/Kuzey Avrupa selamları: Moien, Gott grüß Euch, Grüß Gott, Servus, Dobrý den, Jó napot, Dzień dobry, Moin, God dag, Goeden dag… Ayrıntı sayfasında 🗺️ haritada aç ve ✉️ cevap ver (saraya davet + mektup).
- Ekranlar: `news {tab: pro|tid}`, `article {id}`, `tiding {k}`. Okunmamış fermanlar `localStorage['valeria:seen']` → 🆕.
- Ana sayfa: kayan şerit artık günün haberleri (dokun → haber), şeridin altında "📯 The Herald" kartı (son ferman + 2 haber, "All ›").

## Test notu
- Headless Edge, tek sayfada 60+ kitap sayfası çevirme animasyonu (3D `perspective`) art arda oynayınca `--disable-gpu` modunda çöküyor (exit -1073741795). Her kitap ayrı açılınca sorun yok; gerçek tarayıcıda görülmedi. Testleri kitap başına ayrı sayfada çalıştır.
