# Valeria

Carmen'in (C:\Users\3225t\Desktop\Carmen) yeni versiyonu: orta çağ Fransa–İngiltere temalı mektuplaşma/hikaye uygulaması. Saf HTML + CSS + JS, derleme/sunucu yok, GitHub Pages + PWA. Arayüz ve içerik sadece **EN (varsayılan) / FR**; Türkçe arayüz yok. Kod, yorum, identifier İngilizce; dokümanlar (README, ProjectMemory) Türkçe.

## Bilgi kütüphanesi
- Oturum başında `ProjectMemory/INDEX.md`'yi oku, sadece ilgili dokümanları aç. Bir sistemi etkileyen her değişiklikte o doküman + `changelog.md` + `status.md` + `INDEX.md` aynı görevde güncellenir.

## Yapı
- `index.html` iskelet + alt menü; `js/app.js` tüm ekranlar (court, letters, profile, edit, group, chat, me).
- `js/store.js` localStorage (`valeria:v1`). State biçimi Carmen yedeğiyle aynı; ayrıntı `ProjectMemory/backup.md`.
- `js/i18n.js` anahtar tabanlı `t('key')`; sözlükler `js/lang/en.js`, `js/lang/fr.js`. Yeni arayüz metni = iki sözlüğe de anahtar ekle.
- `js/data/traits.js` özellikler, haneler, unvanlar. `js/data/events.js` bot olayları; motor `js/bot.js` (biçim dosya başında).
- `js/home.js` 🏠 ana sayfa (varsayılan ekran). `js/library.js` 📚 kütüphane okuyucusu; kitaplar `js/data/books.js` (elle yazılan + veriden canlı üretilen `gen`). Bir özellik değişince ilgili kitap bölümünü de güncelle.
- Beden özellikleri, beden olayları/soruları ve hafıza satırları: `js/data/body.js` (talk.js'ten sonra yüklenir). Beden dizgileri Carmen'le aynı kalmalı ("Pussy Size: Tight").
- Yöre sesi `js/data/homeland.js` (body.js'ten sonra). Haberci: veri `js/data/news.js`, ekranlar `js/news.js`. ⚔️ 1415 Kroniği `js/data/chronicle.js` (gerçek olaylar, "What news?"). 🔍 Arşiv `app.js` `archive` ekranı; 💾 bölünmüş kayıt `store.js`. **Her yeni özellik için en üste bir ferman (PROCLAMATIONS) ve Guide bölümü ekle.**
- 🎬 Sahneler / 📖 bölümler: veri `js/data/scenes.js`, motor `js/scenes.js`; 🕯️ Dame Mathilde öneri çubuğu `Suggest.tips` (Carmen'in Lia'sı). Ayrıntı `ProjectMemory/scenes.md`.
- 🤝❤️🔥 Duygular + 📰 durum kartları: veri `js/data/feelings.js`, motor `js/feel.js`. Yeni olay eklenince `FEEL_EV` / `FEEL_NEED` satırı düşün. Ayrıntı `ProjectMemory/feelings.md`.
- 📅 Aziz günleri / bayramlar: veri `js/data/feasts.js`, motor `js/feasts.js` (tasarım `Feasts.apply`, 🎉 deney). Ayrıntı `ProjectMemory/feasts.md`.
- Bot konuşma verisi: `js/data/talk.js` (sorular, onun soruları `ASKS`, konular `TOPICS`), yöre verisi `js/data/origins.js`.
- `js/suggest.js` ⚡ kısayollar: her olay/soru için `SAY` cümlesi şart ve kendi olayını tetiklemeli (Bot deneyinde dene). `js/labs.js` 🧪 deneyler. `js/sound.js` müzik + WebAudio sesleri.
- Müzik `Music/` → `js/data/music.js` (otomatik, `portreleri-guncelle.bat`).
- `js/gen.js` 🎲 rastgele karakter + harita soyluları (havuzlar `js/data/pools.js`). `js/map.js` harita ekranı (veri `js/data/map.js`). `js/effects.js` efektler.
- Portreler `chars/`; liste `js/data/portraits.js` otomatik üretilir (elle düzenleme) → `portreleri-guncelle.bat` / `tools/build-portraits.ps1`. Resim eklenip silinince çalıştırılmalı (çalıştırmadan önce sor). Okuma: `chars/` içindeki resimler.
- Carmen'den kod kopyalama gerekirse: Carmen'in `js/app.js` (~4 MB) ve `js/data/*` dosyaları dev; ASLA tamamını okuma, Grep + aralık oku.

## Kurallar
- Mevcut stil/isimlendirmeye uy; en küçük değişiklik. İlgisiz refactor yok, yeni bağımlılık yok (harici font/CDN dahil).
- Yedek uyumluluğunu bozma: `format: "amor-stories-backup"`, `version: 1`, Carmen alanlarının adı/anlamı değişmez; bilinmeyen alanlar korunur.
- Karakterler en az 18 yaşında (form zorunlu tutar).
- `sw.js`: her güncellemede `VERSION`'ı kendin bir artır (sormadan); yeni dosya eklersen `FILES` listesine ekle.
- Test/linter yok. Doğrulama: tarayıcıda `index.html`; Node kurulu değil, gerekirse headless Edge ile scratchpad'de test sayfası.

## Güvenlik
- Dosya silmeden önce sor. Secret/API key/.env commit etme.
