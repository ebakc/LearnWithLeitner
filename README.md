# Learn with Leitner 📚

Leitner sistemi tabanlı akıllı öğrenme uygulaması. Spaced repetition ile daha etkili öğrenme!

## 🎯 Nedir?

Leitner sistemi, kartlardaki bilgileri doğru zamanda tekrar etmeyi sağlayan bir öğrenme yöntemidir. "Bunu Bildim" ve "Bilemedim" butonu ile kartlar otomatik olarak uygun kutuya geçer.

## 🚀 Başlangıç

### 1. Dosyaları Açın

`index.html` dosyasını tarayıcınızda açın.

### 2. Test Verileri Yükleyin (Opsiyonel)

Tarayıcı konsolunda (F12 → Console):

```javascript
loadTestData();
```

### 3. Deste Oluşturun

Ana sayfada "Yeni Deste" butonuna tıklayıp deste adı yazın (örn: "Almanca", "İngilizce Kelimeler")

## 📋 Kullanım

### Ana Sayfa (index.html)

- **Desteler**: Oluşturduğunuz desteler listelenir
- **Çalış**: Tekrar edilecek kartları çalış
- **Kartlar**: Deste kartlarını yönet, ekle, sil
- **İndir/Yükle**: Verilerinizi JSON olarak yedekle

### Kart Yönetimi (deckpage.html)

- Yeni kart ekle (soru, cevap, kategori)
- Kartı düzenle veya sil
- Deste silme

### Çalışma Ekranı (workpage.html)

- Kartı tıkla → Flip animasyonu
- **Bilemedim (1)** → Kartı bir kutu geriye gönder
- **Bunu Bildim (2)** → Kartı bir kutu ileri gönder
- İlerleme çubuğu takip et

## 📦 5 Kutu Sistemi

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

## ✨ Özellikler

### Tamamlanan ✅

- [x] Deste oluşturma/silme
- [x] Kart yönetimi (ekle/sil)
- [x] 5-kutu Leitner sistemi
- [x] Kart flip animasyonu
- [x] JSON export/import
- [x] Responsive tasarım
- [x] Kategori desteği
- [x] Çalışma istatistikleri (kutu başına kart sayısı)

### Sonra Eklenebilecek 🔜

- [ ] İstatistikler dashboard (grafikler)
- [ ] Tema toggle (light/dark)
- [ ] Arama ve filtreleme
- [ ] Sound effects
- [ ] Kategori-wise çalışma
- [ ] Bulk operations
- [ ] Cloud sync (Firebase vb.)

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
