# Changelog

## 0.15.1 (2026-11-27) — sw `valeria-v23`
- 🏔️ Bavyera/Avusturya'nın güneyindeki boşluklar dolduruldu → 45 bölge: `swiss` (Swiss Confederation, realm `swi`, isim `ger`, haneler commoner/church), `trent` (Prince-Bishopric of Trent, `tre`, church/habsburg), `friuli` (Friuli & Istria, Patriarchate of Aquileia `aqu`, yeni hane gorizia). Venice'in kuzey noktaları `LB17-20` adlandırıldı. Köken + yöre sesi, 3 aziz günü (Vigilius 26/6, Hermagoras 12/7, Felix & Regula 11/9), 3 haber (+ dağ geçidi haberi swiss/trent), kitaplarda 42 → 45, `italy` fermanına "The Alps filled in" bölümü.

## 0.15.0 (2026-11-27) — sw `valeria-v22`
- 🦁 Kuzey İtalya: 5 bölge (Milan & Lombardy, Venice & the Veneto, Ferrara & Mantua `este`, Genoa & Liguria, Florence & Tuscany) → 42. Realm `mil|ven|est|gen|flo`, haneler visconti, mocenigo, este, gonzaga, doria, medici; isim havuzu `ita`; noktalar `LB1-16` (LB8 Savoy sınırına eklendi), backdrop Liguria kıyısı yeni noktalara hizalandı, Ligurian Sea. Köken + yöre sesi 5 bölge; Saint Mark (25/4), Saint Ambrose (7/12), George → genoa/este, Midsummer → florence; 5 bölge haberi; kitaplarda 37 → 42; 📯 ferman `italy`.

## 0.14.0 (2026-11-27) — sw `valeria-v21`
- 🗺️⚔️ Haritada kronik katmanı: `CHRONICLE_PLACES` + olay `at` + `CHRONICLE_ROUTE` (`js/data/chronicle.js`). Geçmiş olaylar yerinde işaret (rozet = olay sayısı, son 7 gün atar), Henri'nin yolu kesikli kırmızı çizgi. İşaret kartı: olaylar + saraydan 3 ses; sese dokun → mektup "What news?" hazır. Guide "The map" bölümü, ferman `chron-map`, yeni anahtarlar `map.chron|askNews|askHint`.

## 0.13.1 (2026-11-27) — sw `valeria-v20`
- 🌹 Yeni beden sorusu `q_anal` ("Have you ever tried the other way?"): Anal Size'a göre 3 varyant (dar / Average / gevşek) + varsayılan; `prio: 1` (`anal` olayıyla eşit, uzun tetikleyici kazanır; tek başına "anal" hâlâ olay). SAY + FEEL_EV (desire +2); `chronicle` fermanındaki "Frank answers" bölümüne eklendi.

## 0.13.0 (2026-11-27) — sw `valeria-v19`
- ⚔️ 1415 Kroniği: `js/data/chronicle.js` (15 gerçek olay, gerçek gün/ay; diyar tarafına göre tepki `her.en|fr|bur|boh|far`, `Valeria.Chronicle`). Haberci'de "⚔️ 1415" sekmesi (gelmemiş olaylar 🔒), ana sayfa Herald kartında son olay. Yeni soru `q_news` ("What news?" → `{chron}`), sade yedek cevapta son 7 gün içindeki olaydan %15 kendiliğinden söz. "Agincourt" haberi (`TIDINGS`) artık `after: [10, 25]`.
- 💾 Bölünmüş kayıt (Carmen gibi): sohbetler `valeria:v1:c:<id>`, `monia` `valeria:v1:p:monia`, ana kayıtta `chats: {}` + `__split`. Sadece değişen anahtar yazılır; eski tek anahtarlı kayıt id'ye göre birleşir. `Store.usage()` → 👑 Me'de kullanım satırı. Yedek biçimi değişmedi.
- 🔍 Mektup arşivi (`archive` ekranı, ✉️ Letters → 🔍): tüm mektuplarda arama (vurgulu), sekmeler All / 🗝️ Sealed chest / Received / Sent, sonuca dokun → mektup seçili açılır. Mesaj menüsünde 🗝️ (mesaj alanı `star: 1`).
- 🔥 Beden soruları (q_height, q_figure, q_bust, q_hips, q_tight, q_mysize) artık geçiştirmiyor: varsayılan cevaplar erotik tonda, eksik değerlere (Average, M/M-L) varyant eklendi.
- Guide "The Herald" güncellendi + yeni bölüm "The archive and the chests"; 📯 ferman `chronicle`. `V.VERSION` 0.13.0.

## 0.12.0 (2026-11-26) — sw `valeria-v18`
- 🪕 Lavta müziği: `js/data/lute.js` (6 özgün orta çağ parçası) + `sound.js` `Lute` motoru (Karplus-Strong tel, bas, burdon, tef, yankı; tekrarlarda süsleme). Ayarlar → Music: Minstrels / 🪕 Lute / Off (`valeria:music = 'lute'`). Çevrimdışı çalışır. Guide "Music and sounds" güncellendi; 📯 ferman `lute`.

## 0.11.1 (2026-11-26) — sw `valeria-v17`
- 🎨 Haritada bölgeye özel `fill`: Saint-Empire'ın 10 bölgesi (lorraine, luxembourg, holland, brunswick, mecklenburg, brandenburg, rhineland, saxony, bavaria, austria) farklı aşı/hardal tonlarında; komşular açık/orta/koyu sırayla ayrışır. Realm rengi kart/rozetlerde değişmedi.

## 0.11.0 (2026-11-26) — sw `valeria-v16`
- 📅 Sabit dünya yılı **1415**: `Valeria.YEAR`, `I18n.date()` (gerçek gün/ay/hafta günü, yıl 1415). Ana sayfa tarihi, hafıza kartı, ferman tarihleri, haber detayı buna bağlandı. Guide'a "Anno Domini 1415"; 📯 ferman `anno1415`.
- 1415 tutarlılığı: Archduchess → Duchess of Austria; Saxony hükümdarı Margravine of Meissen; hane `hunyadi` → `garai`; St Leopold bayramı → St Coloman (13/10); strudel, fondü, Weisswurst, Tokaji, Goldwasser, verbunkos, polonez, Oktoberfest, "Happy Austria marry" ve "four emperors" metinleri değiştirildi. Yeni haber: Agincourt.
- ⚓ Kuzey: 5 bölge (Holland, Brunswick & Westphalia, Holstein & Mecklenburg, Brandenburg & Pomerania, Denmark) → 37. Realm `dan` (Kalmar Union), haneler welf, mecklenburg, hohenzollern, griffin; isim havuzu `dan`; bölgelere `isles` (Danimarka adaları + Scania); `S1` Brunswick'i kapsayacak şekilde kaydırıldı; Zealand backdrop'tan çıktı. St Knud (10/7), 3 kuzey haberi; 📯 ferman `north`.

## 0.10.1 (2026-11-26) — sw `valeria-v15`
- 🦁 Orta Avrupa, 2. aşama: 8 aziz günü (Stanislaus, Stephen of Hungary, Maurice, Wenceslas, Hedwig, Willibrord, Leopold, Elizabeth) → 43 bayram; 4 yeni tasarım (bohemia, hungary, poland, austria) → 24; Epiphany artık Rhineland'in de günü.
- 📰 `TIDINGS`'e isteğe bağlı `home` (bölgeye özel haber) + 10 Orta Avrupa haberi (25 şablon). `js/news.js` `tidings` bölge seçimi `home`'a uyar.
- 📯 ferman `easternfeasts`.

## 0.10.0 (2026-11-26) — sw `valeria-v14`
- 🦅 Orta Avrupa, 1. aşama: haritaya 10 bölge (Brabant & Luxembourg, Rhineland, Savoy, Bavaria, Saxony, Austria, Bohemia, Hungary, Poland, Prussia) → toplam 32. Yeni realm'ler `sav`, `boh`, `hun`, `pol`, `teu`; `hre` rengi `#d0a878` oldu (arka planla karışıyordu).
- Harita doğuya genişledi: `FULL` 538×700 → 920×700 (≈25°D'ye kadar); BACKDROP'a Baltık kıyısı, Balkanlar, Adriyatik, İskandinavya / Zealand / Gotland; denizler Baltic Sea, Adriatic.
- Yeni haneler: luxembourg, habsburg, wittelsbach, wettin, savoy, hunyadi, jagiellon, teutonic. İsim havuzları `ger`, `boh`, `hun`, `pol`.
- `origins.js` + `homeland.js` 10 bölge (yemek, içki, yemin, gelenek, selam/veda, hitap, aziz, bayram, türkü, atasözü, sevdikleri). Guide/kitaplarda 22 → 32; 📯 ferman `centraleurope`.

## 0.9.1 (2026-11-26) — sw `valeria-v13`
- 🎬 Sahne deneyi (Carmen `#/sahne` karşılığı, `labs.js` `scene`): sahne + karakter seç, açılış / adımlar / bitiş / bozma (başka act, stop, talk) düğmeleri, şerit + idle, kum havuzu hafızası (`st.sc`: duygular, sahneler, bölümler; gerçek hafıza değişmez), bölüm zinciri 🔓/🔒, olay kaydı (kart, not, cümle, değişim çipi), ⚠️ SAY cümlesi kendi olayını tetiklemiyorsa. Başka sahne açılınca deney onu izler.
- Climax artık "too soon" kartı çıkarmıyor (`FEEL_NEED.climax: null`).
- Guide lab listesi, Book of Scenes, 📯 ferman `scenelab`.

## 0.9.0 (2026-11-26) — sw `valeria-v12`
- 📅 Aziz günleri ve bayramlar (`js/data/feasts.js`, `js/feasts.js`): 35 gün (Paskalya'ya bağlı 5 hareketli), 21 tasarım. O gün palet, sürüklenen emojiler, ana sayfa afişi, günde bir efekt; karakter günün ilk cevabında bayramdan söz eder (yöresinin azizi ise gururla); Dame Mathilde hatırlatır.
- 🎉 Bayram deneyi: her bayramı önizle, tasarımları aç/kapa, kendi özel günlerini ekle/sil (`state.myFeasts`).
- 📚 yeni kitap `calendar` (Calendar of Saints, 9 bölüm), Guide'a "Feast days" + laboratuvar listesine 🎉; 📯 ferman `feasts`. `home.js` sabit FEASTS listesi kaldırıldı.

## 0.8.1 (2026-11-26) — sw `valeria-v11`
- 🤝❤️🔥 duygu göstergeleri (`#feelbar`) sohbetin üstüne, başlığın altına taşındı.

## 0.8.0 (2026-11-26) — sw `valeria-v10`
- 🤝❤️🔥 Duygular (`js/data/feelings.js`, `js/feel.js`): karakter başına Güven / Aşk / Arzu 0–100 (`c.feel`), olay / kategori / yöre / sahne / bölüm / sessizlik / özellik çarpanı; "too soon" kapısı.
- 📰 Durum kartları (Carmen gibi): eşik geçişinde onun ağzından kart (`st: 1`), climax sonrası kart; her cevabın altında değişim çipi (`🤝+2 ❤️+1`); ⋮ → 📰 Kapalı / Kartlar / Kartlar + değişimler.
- Sohbette `#feelbar` göstergeleri, profilde aynı göstergeler. Dame Mathilde duygu tavsiyeleri; panel küçültüldü (tek satır metin, dokununca açılır, yatay küçük çipler).
- 📚 yeni kitap `heart` (Book of the Heart, 4 bölüm), Guide'a "Her heart and the status cards", 📯 ferman `heart`. `Scenes.step` artık `kinds` döndürüyor.

## 0.7.0 (2026-11-26) — sw `valeria-v9`
- 🎬 Sahneler + 📖 Bölümler (Carmen `SCENES` / `EPISODES` karşılığı): veri `js/data/scenes.js` (15 sahne, 5 kademe `EP_TIERS`, 9 bölüm, `SCENE_NOTES`, `SCENE_LINES`), motor `js/scenes.js` (`step`, `offer`, `next`, `progress`). Durum `botScene[thread]`, hafıza `mem.scenes/eps/ep/epSeen`. Sohbette ⚡ üstünde sahne şeridi (●●○, ✕ `sc-end`), kısayollarda sahne adımları +5 / bölümün sıradaki sahnesi +2.5, eşleşmeyen mesajda %25 teklif.
- 🕯️ Dame Mathilde öneri çubuğu (Carmen 💡 Lia karşılığı): `Suggest.tips`, `#tips`, ✕ / ⋮ ile aç-kapa (`valeria:tips`).
- Profil hafıza kartı: 🎬 tamamlanan sahneler, 📖 bölümler (süren + biten), ✕ unutma.
- 📚 yeni üretilen kitap `scenes` (Book of Scenes, 5 bölüm), Guide'a "Scenes, episodes and Dame Mathilde"; 📯 en üste ferman `scenes` + 3 yeni diyar haberi (bal, düğün, hasat).

## 0.6.0 (2026-11-26) — sw `valeria-v8`
- 🌍 Yöre sesi (`js/data/homeland.js`): 22 bölgeye selam/veda (kendi dilinde), hitap, aziz, bayram, türkü, atasözü, sevilen/sevilmeyen olaylar; bot `homeReact`, atasözlü yedek cevap; 5 yeni soru, 3 yeni onun sorusu; profil yöre kartı genişledi.
- 📯 Haberci (`js/data/news.js`, `js/news.js`): 11 ferman (ayrıntı + Gautier'nin anlatımı), günün 8 diyar haberi, ana sayfada şerit + Herald kartı, okunmamış 🆕.
- Kitaplar: Realms'e yöre satırları, Conversation'a "The voice of her land", Guide'a "Homelands" ve "The Herald".
- Hafıza "first" cümlesi düzeltildi ("Our first time: {event}").

## 0.5.2 (2026-11-26) — sw `valeria-v7`
- Hata: boş efekt çubuğu (`#fxbar`) kısayolların altında hep görünüyordu (CSS `display:flex` `hidden`'ı eziyordu); `.fxbar[hidden]` eklendi.

## 0.5.1 (2026-11-26) — sw `valeria-v6`
- Sohbet sadeleşti: alt çubukta sadece yazma alanı + 🔏 (arma yalnızca bot kapalıyken); 🎭 Events, ✨ Effect, 📜 Narration ⋮ menüye taşındı; başlıktaki 🤖 rozeti kalktı; menü seçimden sonra kapanır.

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
