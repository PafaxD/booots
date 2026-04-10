# VIOLENT ORGANIZATION BOT 🕊️ - Güvenli Altyapı

Bu proje, gönderdiğin yapı isteğine göre hazırlanmış **güvenli altyapı** sürümüdür.

## Dahil Olanlar
- `vio!hesaplar` ile bağlı/bekleyen ek hesapları listeleme
- Ayarlar dosyası (`config/settings.js`)
- Değiştirilebilir bot adı / prefix / telefon numarası
- Komut klasörü sistemi
- Yetki sistemi (Developer / Admin / Müşteri)
- Yetki ver / al / listele
- Yetki log bağlantısı ayarı
- Admin şifre ile Developer alma
- JSON database sistemi
- Müşteri bakiye sistemi
- Market ve paket fiyat komutları
- Ana bot için QR oturumu
- Ek hesaplar için ayrı QR oturumu (`hesap-ekle`)

## Kurulum
```bash
npm install
npm start
```

## İlk Kullanım
1. `npm start`
2. Terminalde `main` için QR çıkar.
3. Ana hesabı okut.
4. WhatsApp içinde bota şu komutu yaz:
   - `vio!admin-şifre 124676`
5. Sonra Developer komutlarını kullanabilirsin.

## Örnek Komutlar
- `vio!yardım`
- `vio!yetki-ver Developer @90555xxxxxxx`
- `vio!yetkililer`
- `vio!hesap-ekle hesap-1`
- `vio!hesaplar`
- `vio!grup-ekle https://chat.whatsapp.com/...`
- `vio!gruplar`
- `vio!bakiye-ekle @90555xxxxxxx 500`
- `vio!bakiye-gör @90555xxxxxxx`
- `vio!market`
- `vio!paket-fiyat Elmas`

## Not
İstersen bir sonraki adımda bunu sana:
- web panel eklenmiş,
- SQLite'a geçirilmiş,
- log gruplarına gerçek gönderim eklenmiş,
- özel komut editörü eklenmiş
bir sürüme çevirebilirim.
