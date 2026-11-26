# Efektler ve görünüm

## Mesaj efektleri (`js/effects.js`, CSS `css/style.css` "v0.2" bölümü)
- `message.effect` Carmen id'leriyle uyumlu. Baloncuk: shake (Trembling), slam (Gauntlet), loud (Herald's cry), gentle (Whisper), glow (Candle glow), rainbow (Illuminated), ink (Lemon ink: bulanık, dokununca açılır). Ekran: hearts (gül yaprakları), confetti (çiçekler), fireworks (altın kıvılcım), rain, fire (köz) + Valeria'ya özel fleur (zambak), snow.
- Sohbette ✨ → sonraki mesajın efekti; mesaja dokun → ✨ Effect → o mesajın efekti. Ekran efektli baloncukta rozet: dokununca tekrar oynar.
- Bot olayının `effect` alanı ilk cevap baloncuğuna konur (kiss/love → hearts, climax → fireworks, dance/tourney → confetti, gift → fleur, bath → rain, undress → glow).
- shake/slam/loud sadece yeni gelen (`.fresh`) mesajda oynar; glow/rainbow sürekli.

## Ambiyans ve hareket
- `#ambient`: parşömende altın toz, mum ışığında köz yükselir (`FX.ambient`). Mum temasında titreyen ışık.
- Arka planda hanedan "diaper" deseni; başlıklar yaldızlı parıltı; armalarda ışık geçişi; profilde sallanan kırlangıç kuyruklu sancak (hane renkleri).
- Ekran geçişi (`main.enter`), yeni mesaj açılma (unroll), gönderirken mum mühür (`FX.seal`), bot yazarken koşan at, toast bildirimleri.
- `prefers-reduced-motion` açıksa tüm animasyonlar kapanır.
