# 📅 Aziz günleri ve özel günler

## Dosyalar
- Veri `js/data/feasts.js`: `FEAST_LOOKS` (24 tasarım: `vars` palet, `fall`/`rise` emojileri, `fx` efekt, `banner`, `say` cümleleri; Orta Avrupa: bohemia, hungary, poland, austria), `FEASTS` (39 sabit + 5 hareketli = 44; Orta/Kuzey Avrupa: stanislaus 8/5, knud 10/7, stephenking 20/8, maurice 22/9, wenceslas 28/9, coloman 13/10, hedwig 15/10, willibrord 7/11, elizabeth 19/11 — 1415 tutarlılığı için Leopold yok, 1485'te aziz ilan edildi; epiphany `home: rhineland`; `m`/`d` ya da Paskalya'ya göre `e`, `look`, `home` yöre/krallık, isteğe bağlı `say`).
- Motor `js/feasts.js` (`Valeria.Feasts`): `easter` (Gregoryen hesap), `all` (FEASTS + `state.myFeasts`), `dateOf`, `on`, `year`, `next`, `current` (önizleme > bugün), `apply`, `line`, `setPreview`, `setEnabled`.
- Bağlantılar: `app.js` açılışta `Feasts.apply()` (eski `FX.ambient()` yerine; bayram yoksa onu çağırır), `botReply` günün ilk cevabında bayram cümlesi (`mem.feastDay = 'Y-M-D:id'`); `home.js` afiş `.feast-banner` / sıradaki bayram satırı (eski sabit FEASTS listesi kaldırıldı); `suggest.js` `tips` bayram tavsiyesi; `labs.js` 🎉 `feast` deneyi; `library.js` GEN `calendar`.

## Tasarım
- `body.feast.feast-<look>` + inline `--wine/--wine2/--gold`; `body.feast::before` desen `color-mix` ile; `#nav` parıltı.
- `#ambient.fe.down|up`: 16 emoji (`fdown` / `drift`). Hareket azaltma açıksa emoji yok.
- Efekt günde bir kez (`localStorage valeria:feastFx`), önizlemede her basışta.
- Kapatma `localStorage valeria:feasts = '0'` (deneyden). Önizleme `sessionStorage valeria:feastPreview` (deneyde durdurulana / oturum bitene kadar).

## Konuşma
- Karakterin yöresi `home` içindeyse gururlu `HOME` cümlesi; `my-` günlerde genel `MINE` cümleleri; yoksa bayramın `say`'i, yoksa tasarımın `say`'i. `{feast} {sen} {region}`.

## Kendi günlerin
- Deneyden eklenir: `state.myFeasts = [{ id: 'my-…', m, d, icon, look, name: {en, fr}, desc }]` (yedekte gider). Silme ✕.

## Yeni bayram
- `FEASTS`'e satır (gerekirse yeni `FEAST_LOOKS`). Takvim kitabı kendiliğinden güncellenir; fermandaki sayıyı güncelle.
