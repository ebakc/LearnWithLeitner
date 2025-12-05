# Learn with Leitner 📚

Leitner sistemi tabanlı akıllı öğrenme uygulaması. Spaced repetition ile daha etkili öğrenme!


## 🎯 Nedir?

Leitner sistemi, kartlardaki bilgileri doğru zamanda tekrar etmeyi sağlayan bir öğrenme yöntemidir. "Bunu Bildim" ve "Bilemedim" butonu ile kartlar otomatik olarak uygun kutuya geçer. Her kutu başka bir tekrar aralığına sahiptir:

- **Kutu 1**: Her gün tekrar (1 gün)
- **Kutu 2**: 2 günde bir tekrar (2 gün)
- **Kutu 3**: 4 günde bir tekrar (4 gün)
- **Kutu 4**: Haftada bir tekrar (7 gün)
- **Kutu 5**: Ayda bir tekrar (30 gün)

## 🚀 Başlangıç

### Kurulum (Kurulum Gerekmez!)

`index.html` dosyasını tarayıcınızda açın.

Tamamen browser-based, LocalStorage kullanıyor:

- Kurulum gerekmez
- Backend gerekmez
- Çevrimdışı çalışır
- Veriler browser'da saklanır

### İlk Adımlar

1. **Deste Oluştur**

   - Ana sayfada "Yeni Deste" butonuna tıkla
   - Deste adı gir (örn: "Almanca", "Tarih", "Matematik")
   - Enter'e bas veya "Yeni Deste" butonuna tıkla

2. **Kart Ekle**

   - Destenin üzerindeki "Kartlar" butonuna tıkla
   - "Soru" alanına öğrenmen gereken konuyu yaz
   - "Cevap" alanına doğru cevabı yaz
   - Kategori (opsiyonel) ekle
   - "Kartı Ekle" butonuna tıkla

3. **Çalışmaya Başla**

   - Ana sayfaya dön
   - Destesinin altındaki "Çalış" butonuna tıkla
   - Kartı oku, cevapı düşün
   - Kartı tıkla → Cevabı gör
   - "Bilemedim" veya "Bunu Bildim" butonuna tıkla

4. **İstatistikleri Kontrol Et**

   - Başlıktaki "İstatistikler" butonuna tıkla
   - Toplam kartlar, başarı oranı, kutu dağılımını gör

5. **Ayarlar**
   - Başlıktaki "Ayarlar" butonuna tıkla
   - Tema seç (Açık/Koyu)
   - Verilerinizi yedekle (İndir)
   - Verilerinizi geri yükle (Yükle)
   - Tüm verileri sil

### Test Verileri Yükle (Opsiyonel)

Tarayıcı konsolunda (F12 → Console) şu komutu çalıştır:

```javascript
loadTestData();
```

Bu, test için hazır örnek deste ve kartlar ekler.

## 📋 Sayfa Tanımı

### Ana Sayfa (`index.html`)

- **Desteler Listesi**: Oluşturduğunuz tüm desteler
- **Deste İstatistikleri**: Her destede kaç kart olduğu, kutuların dağılımı
- **Çalış Butonu**: Tekrar edilecek kartları başlat
- **Kartlar Butonu**: Deste kartlarını yönet, ekle, düzenle, sil
- **Sağ Panel**: Leitner sistemi hakkında bilgiler (masaüstü görünümü)

### Deste Yönetimi (`deckpage.html`)

- **Kartlar Listesi**: Destede bulunan tüm kartlar
- **Yeni Kart Ekle**: Soru, cevap, kategori ile yeni kart oluştur
- **Kartları Sil**: İstemediğin kartları kaldır
- **Desteyi Sil**: Tüm kartlarla birlikte destoyu kaldır
- **Geri Dön**: Ana sayfaya dön

### Çalışma Ekranı (`workpage.html`)

- **Flip Kartı**: Tıkla → Soru/Cevap değişir
- **Bilemedim**: Kartı bir kutu geriye gönder
- **Bunu Bildim**: Kartı bir kutu ileri gönder
- **İlerleme Çubuğu**: Kaç kartı tamamladığını göster
- **Çıkış**: Çalışmayı bitir ve ana sayfaya dön

### İstatistikler (`statistics.html`)

- **Toplam Kartlar**: Tüm destelerinizde kaç kart var
- **Master Seviyesi**: Kutu 5'e (30 günde bir tekrar) ulaşan kart sayısı
- **Başarı Oranı**: Kutu 5'deki kartlar / toplam kartlar × 100
- **Bugün Çalışılan**: Bugün kaç kart çalıştığın
- **Kutu Dağılımı**: Her kutuda kaç kart olduğunu görsel kartlarla göster
- **Deste İstatistikleri**: Her deste için kutu dağılımı

### Ayarlar (`settings.html`)

- **Tema Seçimi**: Açık (Light) veya Koyu (Dark) mod seç
- **Verileri İndir**: Tüm verilerinizi JSON dosyası olarak bilgisayarınıza indir (Yedekleme)
- **Verileri Yükle**: Daha önce indirdiğiniz JSON dosyasını yükle (Geri yükleme)
- **Tüm Verileri Sil**: Dikkat! Tüm deste ve kartları sil (Geri alınamaz!)
- **Hakkında**: Proje hakkında bilgiler

## 🎨 Özellikler

### Dark & Light Mode

- Açık (Light) ve Koyu (Dark) tema
- Tema seçimi Ayarlar sayfasından yapılır
- Tercih otomatik kaydedilir
- Sayfa yenilendiğinde korunur

### Veri Güvenliği

- Tüm veriler tarayıcınızda saklanır (LocalStorage)
- Sunucuya hiçbir veri gönderilmez
- JSON backup ile verileri yedekleyebilirsin
- İstediğin zaman tüm verileri sil

### Responsive Tasarım

- Mobil, tablet, masaüstü tüm cihazlarda çalışır
- Touch-friendly butonlar ve arayüz
- Responsive grid layout

### Keyboard Shortcuts (Çalışma ekranında)

- `Space` veya Tıkla: Kartı flip et
- `1` veya ← (Sol ok): "Bilemedim"
- `2` veya → (Sağ ok): "Bunu Bildim"

## 📊 Leitner Sistemi Nasıl Çalışır?

```
Yeni Kart (Kutu 1)
    ↓
"Bunu Bildim" → Kutu 2 (2 gün sonra tekrar)
"Bilemedim" → Kutu 1'de kalır (yarın tekrar)
    ↓
Kutu 2 → "Bunu Bildim" → Kutu 3 (4 gün sonra)
       → "Bilemedim" → Kutu 1 (yarın)
    ↓
... (Kutu 3, 4, 5 aynı mantık) ...
    ↓
Kutu 5 (30 günde bir tekrar) = Master Seviye!
```

## 💾 Veri Yönetimi

### Otomatik Kaydetme

- Her işlem otomatik kaydedilir
- Browser'ı kapatsanız bile veriler kalır
- LocalStorage limit: ~5-10 MB (sınırsız kart için yeterli)

### Yedekleme

1. Ayarlar → "Verileri İndir"
2. JSON dosyası bilgisayarına indirilir
3. Dosya adı: `leitner-export-YYYY-MM-DD.json`

### Geri Yükleme

1. Ayarlar → "Verileri Yükle"
2. Önceden indirdiğin JSON dosyasını seç
3. Veriler otomatik yüklenir

## 🌐 Browser Desteği

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)
- ✅ Mobil browsers (iOS Safari, Chrome Mobile)

## ⚙️ Teknik Detaylar

### Teknoloji Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript ES6
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Material Symbols Outlined
- **Storage**: Browser LocalStorage
- **Data Format**: JSON

### Dosya Yapısı

```
index.html              → Ana sayfa
deckpage.html           → Deste yönetimi
workpage.html           → Çalışma ekranı
statistics.html         → İstatistikler
settings.html           → Ayarlar

js/
├── app.js              → Ana uygulama logiği
├── deckpage.js         → Deste sayfası logiği
├── settings.js         → Ayarlar sayfası logiği
├── statistics.js       → İstatistik hesaplamaları
├── storage.js          → LocalStorage CRUD
├── utils.js            → Yardımcı fonksiyonlar
└── test-data.js        → Test verisi oluşturucu

memory-bank/           → Proje dokumentasyonu
```

## 🐛 Bilinen Sınırlamalar

- Activity chart (7 gün grafik) şimdilik deaktif
- Maksimum deste sayısı: Browser LocalStorage limitine bağlı (~5-10 MB)
- Offline-only (Cloud sync olmadığı için)
- Farklı browser'lar arasında veri senkronizasyonu yok

## 💡 İpuçları

1. **Etkili Öğrenme**: Günlük olarak çalış. Sistem otomatik olarak doğru zamanında tekrar gösterir
2. **Kategori Kullan**: Kartları organize etmek için kategoriler kullan
3. **Düzenli Yedekle**: Ayda bir önemli verilerinizi indirerek yedekleyin
4. **Tema Seç**: Gözlerinize rahat gelen temayı seçin
5. **Test Verileriyle Başla**: İlk olarak test verileriyle uygulamayı keşfedin

## 📝 Lisans

MIT License - Açık ve özgür kullanım

---

**Happy Learning! 🎓**

| Kutu | Tekrar Sıklığı | Amaç              |
| ---- | -------------- | ----------------- |
| 1    | Her gün        | Yeni kartlar      |
| 2    | 2 gün          | Öğrenilmekte olan |
| 3    | 4 gün          | Pekiştirme        |
| 4    | 7 gün          | İleri seviye      |
| 5    | 30 gün         | Master seviye     |

## 🎮 Klavye Kısayolları

**Çalışma Ekranında:**

- `Boşluk` → Kartı flip et
- `1` veya `←` → Bilemedim
- `2` veya `→` → Bunu Bildim

## 💾 Veri Yönetimi

### LocalStorage

Tüm veriler tarayıcı belleğinde saklanır.

### Backup & Restore

- **İndir**: JSON dosyası olarak tüm verileri indir
- **Yükle**: JSON dosyasından verileri geri yükle

### Konsol Komutları

```javascript
// Test verileri yükle
loadTestData();

// Tüm verileri sil
clearAllData();

// Manual backup
const backup = Storage.exportData();
console.log(backup);

// Manual restore
Storage.importData(jsonString);
```

## 📁 Dosya Yapısı

```
/
├── index.html           # Ana sayfa
├── deckpage.html        # Deste yönetimi
├── workpage.html        # Çalışma ekranı
├── js/
│   ├── app.js          # Ana uygulama mantığı
│   ├── storage.js      # LocalStorage yönetimi
│   ├── utils.js        # Yardımcı fonksiyonlar
│   ├── deckpage.js     # Deste sayfası mantığı
│   └── test-data.js    # Test verileri
├── css/                 # Özel CSS (genişletilebilir)
├── memory-bank/         # Proje dokümantasyonu
└── README.md           # Bu dosya
```

## 🛠️ Teknoloji

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Material Symbols (Google)
- **Font**: Inter (Google Fonts)
- **Storage**: Browser LocalStorage
- **Data Format**: JSON

## 🐛 Troubleshooting

**Veriler kayboluyor?**

- Tarayıcı cache'i temizlemişseniz, JSON export'unuzdan geri yükleyin
- LocalStorage tarayıcıya bağlıdır (özel mod kullanmayın)

**Flip animasyonu çalışmıyor?**

- CSS transform desteğine sahip modern tarayıcı kullanın (Chrome, Firefox, Safari, Edge)

**JSON import başarısız?**

- JSON dosyasının geçerli format olduğundan emin olun
- Export'tan alınan dosyaları kullanın

## 📝 Tarayıcı Desteği

- ✅ Chrome/Chromium (88+)
- ✅ Firefox (85+)
- ✅ Safari (14+)
- ✅ Edge (88+)

LocalStorage ve CSS transform desteği gereklidir.

## 📄 Lisans

Bu proje kişisel kullanım için açıktır. Geliştirmeye devam edebilirsiniz!

## 🤝 Katkı

Katkı sağlamak istiyorsanız:

1. Kodu fork edin
2. Değişiklikleri yapın
3. Pull request gönderin

## 💡 İpuçları

1. **Başlangıç**: `loadTestData()` ile örnek kartlarla başlayın
2. **Günlük**: Her gün Kutu 1'deki kartları çalışın
3. **Tutarlılık**: Düzenli öğrenme başarının anahtarı
4. **Backup**: Önemli verileri düzenli olarak export edin

---

**Mutlu öğrenmeler! 🎓**

Sorularınız varsa lütfen GitHub issues açın.
