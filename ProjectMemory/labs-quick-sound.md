# 🧪 Deneyler, ⚡ Kısayollar, 🎵 Müzik ve sesler

## ⚡ Kısayollar (`js/suggest.js`, çizim `app.js` `drawQuick` / `drawSheet`)
- Sohbette yazma alanının üstünde çip çubuğu (`#quick`). Sadece sıra sendeyken (bot açık ya da taraf "me"). ⋮ → ⚡ Shortcuts ile kapanır (`localStorage['valeria:quick'] = '0'`).
- Çipe dokun → cümle yazma alanına (`SAY`); aynı çipe tekrar dokun → gönderir (`picked` değişkeni çubuğu açık tutar).
- `SAY[id] = [EN, FR, FR erkek için]`, `{dame}` = my lady/my lord · ma dame/messire. **Her SAY kendi olayını tetiklemeli** (headless testte 58/58 doğrulandı). Yeni olay eklerken SAY de ekle, sonra Bot deneyinde dene.
- Puanlama (`quick`): onun sorusu varsa cevap çipleri önce (Yes/No; a_from/a_food için kullanıcının şehri) · `FLOW` devamı +3 · yakınlıkta komutlar +2 · boş mektupta selam +4 · sorulmamış soru +0.6 · karakterin mizacına uyan varyant +1.5 · memleket soruları +1 · gece cuddle/meet +0.5 · son 5'te yapılan −2 · sorulmuş soru −3 · öncesinde şefkat yokken yakınlık −1. İlk 6 + "⋯".
- `title` = nedenler (üstüne gelince / basılı tutunca).
- Yazarken 🔮 `complete`: son kelimeyle başlayan olay adları / tetikleyiciler.
- "⋯" → arama kutulu tam liste (`groups`: Questions, Courtship, Tenderness, Intimacy, Commands).
- `state.botLog[sohbet]` = son 12 tetiklenen olay/soru id'si (`Bot.match`), botReply'da yazılır.

## 🧪 Laboratuvar (`js/labs.js`, ekranlar `labs`, `lab {id}`)
Girişler: Kütüphane üstündeki yeşil şerit, ana sayfa kartı, Me sayfası düğmesi.
- 🤖 **bot**: test karakteri (saraydan biri ya da 🧪 test hanımı: özellik çipleri, cinsiyet, bölge, dil), o anki act, sorduğu soru, mesaj → yol (`Bot.explain`: ask / event / cmd / topic / during / fallback), aday tablosu (puan, şartı tutmayanlar 🚫), varyantlar (kullanılan ✓), 3 örnek cevap.
- 🎭 **temper**: varyantlı bir olayın bütün satırları + saraydakilerin hangi varyantı aldığı.
- 🌍 **origin**: bölge verisi + o bölgeden rastgele hanımın 5 soruya cevabı; 🎲 başka hanım, ✉️ davet.
- ⚡ **quick**: herhangi bir durum için kısayollar ve nedenleri.
- ✨ **fx**: bütün efektler ve sesler.
- Deney durumu (`st`) uygulama açıkken saklanır.

## 🎵 Müzik ve sesler (`js/sound.js`)
- Müzik: `Valeria.MUSIC` (`js/data/music.js`, `Music/` klasöründen `portreleri-guncelle.bat` üretir). Sırayla çalar, tek parça ise döngü. Tarayıcı kuralı yüzünden ilk dokunuşta başlar, 1.2 sn yavaşça açılır; sayfa gizlenince durur.
- SW `Music/` isteklerini önbelleğe almaz (büyük dosya + range istekleri): müzik internet ister.
- Sesler WebAudio ile üretilir (dosya yok): `pluck` (ut teli, Karplus-Strong, D dorian notalar; her düğmede), `seal` (gönderirken mühür), `bell` (cevap gelince çan), `rustle` (kütüphanede sayfa).
- Ayarlar Me → Settings: `valeria:music`, `valeria:vol` (varsayılan .35), `valeria:sfx`.
