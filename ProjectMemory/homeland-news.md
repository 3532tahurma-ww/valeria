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
- Yöre sesi (`homeland.js`) 45 bölgenin hepsinde var; Orta/Kuzey Avrupa selamları: Moien, Gott grüß Euch, Grüß Gott, Servus, Dobrý den, Jó napot, Dzień dobry, Moin, God dag, Goeden dag… Ayrıntı sayfasında 🗺️ haritada aç ve ✉️ cevap ver (saraya davet + mektup).
- Ekranlar: `news {tab: pro|tid}`, `article {id}`, `tiding {k}`. Okunmamış fermanlar `localStorage['valeria:seen']` → 🆕.
- Ana sayfa: kayan şerit artık günün haberleri (dokun → haber), şeridin altında "📯 The Herald" kartı (son ferman + 2 haber, "All ›").

## ⚔️ 1415 Kroniği (`js/data/chronicle.js`, news.js'ten sonra yüklenir)
- `CHRONICLE`: 15 gerçek olay `{ id, m, d, icon, t, s, her: { en|fr|bur|boh|far: [EN, FR] } }`: papanın kaçışı (20/3), Haec Sancta (6/4), Brandenburg (30/4), John XXIII azli (29/5), Gregory XII (4/7), Jan Hus (6/7), Southampton komplosu (31/7), Henry yola çıkar (11/8), Harfleur kuşatması (18/8), Ceuta (21/8), Harfleur düşer (22/9), Calais yürüyüşü (8/10), Agincourt (25/10), Londra (23/11), Dauphin Louis ölür (18/12).
- Taraf (`Chronicle.side`): realm en/irl → `en`; fr/sco/bri/nav → `fr`; bur → `bur`; boh → `boh`; diğerleri ve bölgesizler → `far` (eksik taraf → `far`).
- Gerçek gün/ay ≤ bugün olanlar "oldu" (`past`, yeniden eskiye), sonrakiler 🔒 (`sealed`). Haberci sekmesi `news {tab: 'chr'}`; ana sayfa Herald kartında son olay.
- Bot: `q_news` ("What news?") → `{chron}` = `Chronicle.line` (`icon başlık… tepki`); 20/3'ten önce `QUIET` satırı. Sade yedek cevapta %15 `Chronicle.fresh` (olaydan sonraki 7 gün).
- `TIDINGS` şablonunda `after: [ay, gün]` → o tarihten önce çıkmaz (Agincourt haberi 25/10'dan sonra).

## Test notu
- Headless Edge, tek sayfada 60+ kitap sayfası çevirme animasyonu (3D `perspective`) art arda oynayınca `--disable-gpu` modunda çöküyor (exit -1073741795). Her kitap ayrı açılınca sorun yok; gerçek tarayıcıda görülmedi. Testleri kitap başına ayrı sayfada çalıştır.
