# 🎲 Rastgele karakterler, portreler, harita

## Portreler
- Resimler `chars/` klasöründe. `js/data/portraits.js` (`Valeria.PORTRAITS`) otomatik üretilir: `portreleri-guncelle.bat` → `tools/build-portraits.ps1`. Resim ekleyip silince çalıştır; `sw.js` bu listeyi `importScripts` ile önbelleğe alır.
- Formda "Portraits" şeridi: dokununca seçilir, başka karakterin kullandığı "in use" olarak sönük görünür. Rastgele seçimde önce kullanılmayanlar.

## Rastgele karakter (`js/gen.js`, havuzlar `js/data/pools.js`)
- `Gen.character({ region, gender, lang, rng, rank, photo, anyRegion })` → taslak (id yok).
- Yeni karakter formu rastgele dolu açılır (Carmen gibi). Başlıktaki **🎲 All** her şeyi, alanların yanındaki 🎲 sadece o alanı değiştirir (`Gen.field`). Cinsiyet, dil ve bölge seçimi korunur.
- Court'taki **🎲 Summon a stranger** rastgele bölgeden karakteri doğrudan saraya ekler.
- İsim havuzu bölgeye göre (`region.names`: en, fr, scot, wales, irl, nav, flem, ger, boh, hun, pol, dan). Hane bölgeden, unvan cinsiyetten, şehir bölgeden (bölge yoksa aynı dildeki bölgelerden). "About" = köken + sır + umut cümleleri.
- `Gen.regionOf(c)`: `c.region`, yoksa şehir adından (alias: Westminster → london).

## Harita (`js/map.js`, veri `js/data/map.js`)
- 37 bölge (İngiltere 5, İskoçya, İrlanda, Fransa 13 + Lorraine, Navarre; Orta Avrupa 10: luxembourg, rhineland, savoy, bavaria, saxony, austria (`hre`/`sav`), bohemia `boh`, hungary `hun`, poland `pol`, prussia `teu`; Kuzey 5: holland, brunswick, mecklenburg, brandenburg (`hre`), denmark `dan`). Şematik çizim: lon/lat → `x = (lon+11)*25.6`, `y = (59-lat)*40`, viewBox 920×700 (≈25°D). Komşu bölgeler aynı noktaları (`P`) paylaşır.
- **`P` anahtarları benzersiz olmalı**: nesne literalinde tekrar eden anahtar eskisini sessizce ezer (bir kez B1/C3/T1 çakışıp Fransa'yı bozdu). Orta Avrupa önekleri: X Y Z J S H O U W I; kuzey: HL NG DK.
- İsteğe bağlı `isles: [poligonlar]` (Danimarka: Fyn, Zealand, Lolland, Scania, Bornholm): aynı `path`'e eklenir, `bboxOf` onları da sayar.
- BACKDROP bölgelerin altına çizilir (tıklanmaz): Empire'ın kalanı, Baltık, Balkanlar, İtalya, İberya, Korsika, İskandinavya.
- Bölge: `realm` (renk: `REALMS`; haritada isteğe bağlı `fill` bölgeye özel ton — Empire'ın 10 bölgesi komşular açık/orta/koyu ayrışacak şekilde; kart ve rozetler yine realm rengi), `ruler` (sıra 0 notable unvanı), `second` (sıra 1, krallıklarda prenses), `houses`, `names`, `lang`, `cities`, `label`.
- Bölgeye dokun → yakınlaşır, kart: saraydaki o bölgenin karakterleri + 5 "notable" (hepsi kadın, ilk ikisi hükümdar/prenses). Notables `Gen.notables(bölge, seed)` ile deterministik; seed = `state.world.seed` + `state.world.rolls[bölge]` (🎲 New faces artırır).
- **Invite to court** → karakter olur, `set: 'map:<bölge>:<seed>:<i>'` ile "✓ at court" işaretlenir. Bölge etiketindeki rozet saraydaki kişi sayısı.
- Denize / arka plana dokununca tüm harita.
