# Yedek biçimi ve Carmen uyumu

Tam alan açıklaması Carmen'de: `C:\Users\3225t\Desktop\Carmen\docs\YEDEK-JSON.md`. Valeria aynı biçimi kullanır.

```json
{ "format": "amor-stories-backup", "version": 1, "app": "valeria", "state": { ... } }
```
- Yüklerken sadece `format` ve `state` kontrol edilir (`app` isteğe bağlı; Carmen yok sayar).
- `state`: `user`, `characters`, `threads`, `chats`, `side`, `turns`, `pinned`, `keywords` — Carmen'le aynı anlam.
- Mesaj: `{ id, from: 'me'|'her'|'sys', text, ts, who? (grup), type?: 'photo', src?, reply?, react?, effect? }`.

## Valeria'ya özel alanlar (Carmen yok sayar)
| Alan | Anlam |
|---|---|
| `characters[].lang` | `'en'` / `'fr'`: bot cevabının dili. Yoksa arayüz dili. |
| `characters[].house` | `Valeria.HOUSES` id'si (valois, plantagenet…). |
| `characters[].mod` | Valeria'da oluşturulanlar `"valeria"`. |
| `characters[].mem` | 🧠 hafıza `{ first, count, asks, last }` (Carmen'in `anilar`/`memory` alanlarından ayrı). |
| `characters[].traits` | Beden: `"Boob Size: 85"` vb. Carmen'le aynı dizgiler. |
| `user.gender`, `user.dick` | Carmen'le aynı alan adları (Dick Size: Small/Average/Large/Very Large). |
| `botLog` | sohbet id → son 12 tetiklenen olay id'si (kısayollar için). |
| `characters[].region` | harita bölgesi id'si (yoksa şehirden bulunur). |
| `characters[].set` | haritadan davet edilenlerde `map:<bölge>:<seed>:<i>`. |
| `world` | `{ seed, rolls: { bölge: n } }` harita soylularının tohumu. |
| `bot` | sohbet id → `false` ise bot kapalı (yoksa açık: varsayılan) |
| `botAsk` | sohbet id → karakterin sorduğu sorunun id'si (sonraki mesajın cevap sayılır) |
| `botEvent` | sohbet id → o anki bot olayı (`'missionary'` vb.) |

## Carmen'den gelince
- Bilinmeyen alanlar (`monia`, `accounts`, `theme`…) olduğu gibi saklanır; tekrar dışa aktarınca kaybolmaz.
- Carmen'in Türkçe özellikleri (ör. "Neşeli") düzenleme ekranında "Other traits" altında görünür.
- Carmen'deki `mods/...`, `characters/...` fotoğraf yolları Valeria'da yok: arma + baş harf gösterilir (`onerror` ile).
- Depolama tek anahtarda (`valeria:v1`, ~5 MB sınırı). Büyük Carmen yedekleri "Storage is full" verebilir; o zaman Carmen'deki gibi bölünmüş kayda geçilmeli.
