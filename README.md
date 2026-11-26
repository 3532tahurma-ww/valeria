# Valeria ⚜️🌹

Orta çağ Fransa–İngiltere temalı mektuplaşma/hikaye uygulaması; Carmen'in yeni versiyonu. Karakterlerini (unvan, hane, fief, kişilik) oluşturursun, onlarla mektuplaşırsın; iki tarafı da sen yazabilir ya da **🤖 Bot modu** ile karakterin cevap vermesini sağlayabilirsin. Arayüz **English / Français**. Saf HTML + CSS + JS; derleme ya da sunucu gerekmez, internetsiz de açılır.

## Çalıştırma
- **Yerelde:** `index.html` dosyasını tarayıcıda aç.
- **GitHub Pages:** depoyu gönder → *Settings → Pages → Branch: `main` / root*.

## Klasör yapısı
```
index.html            iskelet + alt menü (Court, Letters, New, Me)
css/style.css         parşömen teması + 🕯️ mum ışığı (body.candle)
js/i18n.js            EN/FR, t('anahtar')
js/lang/en.js, fr.js  sözlükler
js/store.js           localStorage (Carmen yedek biçimi)
js/bot.js             bot modu motoru
js/data/events.js     bot olayları (Kissing, Missionary…)
js/data/traits.js     kişilik, haneler, unvanlar, şehirler
js/app.js             tüm ekranlar
sw.js, manifest.json  PWA (çevrimdışı)
ProjectMemory/        bilgi kütüphanesi (INDEX.md'den başla)
```

## Kullanım
1. **✒️ New:** portre, ad, cinsiyet, yaş (18+), yazdığı dil (EN/FR), hane (arma renkleri buradan gelir), unvan, fief, devise, "About", kişilik ve yazım tarzı.
2. **🏰 Court:** karakterler. Karta dokun → profil → **✒️ Write** (son mektuplaşma) ya da **➕ New letter**.
3. **Mektup ekranı:** soldaki armaya dokunarak kimin yazdığını seç (Sırayla açık: her mesajdan sonra taraf değişir). 📜 anlatım notu, 🔏 gönder. Mesaja dokun → düzenle / tarafını değiştir / sil.
4. **👥 New council** (Letters): en az 2 karakterle grup.
5. **🤖 Bot modu:** sen yazarsın, karakter kendi dilinde (EN/FR) cevap verir; "messenger" animasyonu ile gelir. Olay değişince ortada "❦ 💋 Kissing ❦" notu çıkar. Ayrıntı: [ProjectMemory/bot-events.md](ProjectMemory/bot-events.md).
6. **👑 Me:** adın, dil, tema, **💾 yedekle / 📂 yedekten yükle**.

## Yeni (v0.2)
- **🗺️ Map:** Batı Avrupa haritası; bölgeye dokun → yakınlaşır, o bölgede yaşayan saray karakterlerin ve 5 soylu (kraliçe, düşes, kontes…) listelenir; **✉️ Invite to court** ile saraya al, **🎲 New faces** ile yenilerini getir.
- **🎲 Rastgele karakter:** "New" formu rastgele dolu açılır; 🎲 All / alan zarları; Court'ta **Summon a stranger**.
- **Portreler:** `chars/` klasöründeki resimler. Yeni resim ekleyince `portreleri-guncelle.bat` çalıştır.
- **✨ Efektler:** sohbette ✨ (14 efekt), mesaja dokun → ✨ Effect. Bot olayları kendi efektini getirir.
- **Bot:** 45 olay, kişiliğe ve cinsiyete göre farklı cevaplar.

## Yeni (v0.3)
- **🏠 Ana sayfa:** günün tarihi, dua saati, hava ve aziz günü; haberci şeridi; günün hanımı; sarayın; son mektuplar; ilanlar ("Answer her" = saraya al + yaz); diyarların hanımları.
- **📚 Kütüphane:** 8 kitap (Courier's Guide, Wonders, Events, Questions, Her Questions, Art of Conversation, Temperaments, Realms). Çoğu uygulamanın verisinden canlı üretilir.
- **⋮ menü** (sohbette sağ üst): bot modu, sırayla yazma, yeniden adlandır, profil, sil. **Bot modu varsayılan açık.**
- **Sorular:** ona soru sor ("where are you from?", "favourite food?"…); o da sana sorar, sonraki mesajın cevap sayılır. Anlamadığında konuyu yakalar (at, yağmur, kral…) ya da kendi sorusunu sorar.
- **🌍 Yöre:** her bölgenin yemeği, içkisi, yemini, geleneği ve tipik kişiliği; karakterler konuşurken memleketlerinden bahseder.

## Yeni (v0.4)
- **⚡ Kısayollar:** sohbette yazma alanının üstünde öneri çipleri (sıradaki olay, sorulmamış sorular, onun sorusuna Evet/Hayır…). Dokun → yazılır, tekrar dokun → gönderilir. Yazarken 🔮 tamamlar; "⋯" her şeyin listesi.
- **🧪 Laboratuvar:** Kütüphane / ana sayfa / Me'den. Bot, mizaç, memleket, kısayol ve efekt deneyleri.
- **🎵 Müzik ve sesler:** `Music/` klasöründeki müzik çalar (yeni parça ekleyince `portreleri-guncelle.bat`). Düğmelerde ut sesi, gönderirken mühür, cevap gelince çan. Me → Settings'ten ayarlanır.

## Yeni (v0.5)
- **🎭 Olaylar:** sohbette 🎭 düğmesi her şeyin listesini açar: sıradaki adımlar, onun favorileri, 🎲 sürpriz, kategori sekmeleri, arama.
- **🧠 Hafıza:** her karakter ilk kezleri (tarihiyle), en sevdiklerini, sorularına verdiğin cevapları ve son mektubunu hatırlar; kendisi bahseder, çelişkini yakalar, uzun süre yazmazsan sitem eder. "Do you remember…?" diye sorabilirsin. Profilde 🧠 kartı.
- **📏 Beden:** Height, Weight, Boob/Butt/Pussy/Anal Size (Carmen'le aynı). Me'de kendi cinsiyetin ve Dick Size. Bunlara bağlı yeni olaylar, sorular ve onun soruları.

## Yeni (v0.6)
- **🌍 Yöre sesi:** karakterler kendi dillerinde selamlaşıp vedalaşır (Fàilte, Demat, Kaixo… Kenavo, Slán, Agur), yöresel hitap kullanır, azizleri adına yemin eder, bayramlarından, türkülerinden, atasözlerinden bahseder; memleketinin sevdiği şeye sevinir, sevmediğine burun kıvırır. Azizini, bayramını, türküsünü, atasözünü, dilini sorabilirsin; o da seni memleketine davet eder.
- **📯 Haberci:** ana sayfada. Uygulama yenilikleri orta çağ fermanı olarak (haberci Gautier anlatır) ve her gün değişen diyar haberleri (tıklayınca bölgeye git ya da o hanıma yaz).

## Carmen ile yedek uyumu
Yedek dosyası Carmen'le aynı biçimdedir (`amor-stories-backup`, v1): Carmen yedeği Valeria'ya, Valeria yedeği Carmen'e yüklenebilir. Ayrıntı: [ProjectMemory/backup.md](ProjectMemory/backup.md).

## Yeni sürüm
`sw.js` içindeki `VERSION`'ı artır, yoksa telefonlar eski sürümü önbellekten gösterir.
