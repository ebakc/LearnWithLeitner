# 📚 Learn with Leitner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-green)](https://github.com/ebakc/LearnWithLeitner)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com)
[![Responsive](https://img.shields.io/badge/Design-Responsive-blue.svg)](#-responsive-tasarım)

> Spaced Repetition tabanlı akıllı öğrenme uygulaması

Basit, hızlı, tamamen tarayıcı tabanlı bir Leitner sistemi uygulaması. Kurulum gerekmez — tüm veriler LocalStorage'da saklanır ve offline çalışır.

## 🚀 Özellikler

- 📦 **Leitner kutu sistemi** — 1–5 kutu, otomatik tekrar aralıkları
- 🧠 **Flip kart öğrenme** — Animasyonlu kart çevirme
- 📊 **İstatistikler** — Gelişim takibi, başarı oranı, kutu dağılımı
- 🎨 **Tema seçeneği** — Light / Dark mod
- 💾 **Veri yönetimi** — LocalStorage + JSON backup/restore
- 📱 **Responsive tasarım** — Mobil/tablet/masaüstü uyumlu
- ⌨️ **Klavye kısayolları** — Hızlı navigasyon
- 🧪 **Test veri yükleyici** — Demo veriler
- 🌐 **Offline çalışır** — Sunucu gerekmez

## 🎯 Leitner Sistemi Nedir?

Leitner sistemi, bilgileri doğru zamanda tekrar etmeyi sağlayan bir **flashcard metodudur**. Her kart yanıtına göre bir kutu ileri/geri hareket eder.

### Kutu Sistemi

| Kutu | Tekrar Aralığı | Açıklama |
|------|----------------|----------|
| 1 | 1 gün | Yeni / zor kartlar |
| 2 | 2 gün | Öğrenilmekte olan |
| 3 | 4 gün | Pekiştirme |
| 4 | 7 gün | İleri seviye |
| 5 | 30 gün | Master seviye |

### İlerleme Akışı

```
Kutu 1 → Bildim → Kutu 2 → Bildim → Kutu 3 → ... → Kutu 5
Kutu X → Bilemedim → Kutu 1
```

## 🏁 Hızlı Başlangıç

### Kurulum (Yok!)

Sadece `index.html` dosyasını açman yeterli.

- ✅ Backend yok
- ✅ Sunucu gerekmez
- ✅ Offline çalışır
- ✅ Veriler LocalStorage'da tutulur

### İlk Adımlar

1. **Yeni deste oluştur** — Öğrenmek istediğin konuyu seç
2. **Kart ekle** — Soru + Cevap + Kategori gir
3. **Çalış** — Çalış butonuna tıkla
4. **Cevap ver** — Kartı çevir, sonuç seç (Bildim / Bilemedim)
5. **İlerleme takip et** — İstatistiklerden gelişimini gözlemle

### Test Verileri Yükle

Tarayıcı konsolunda (F12):

```javascript
loadTestData();
```

## 📁 Sayfalar

### 🏠 index.html — Ana Sayfa

- Desteler listesi
- Her deste için istatistik gösterimi
- Kutu dağılımı grafiği
- Deste oluştur, düzenle, sil
- Hızlı erişim butonları (Çalış, İstatistikler, Ayarlar)

### 📚 deckpage.html — Deste Yönetimi

- Deste içindeki kartları görüntüle
- Kart ekleme (Soru + Cevap + Kategori)
- Kart düzenleme ve silme
- Deste silme (modal onayı ile)
- Ana sayfaya dönüş

### 🎓 workpage.html — Çalışma Ekranı

- **Flip kart** — Click/Space ile kartı çevir
- **İlerleme göstergesi** — X/Y kartından ne kadarını tamamladın
- **Cevap butonları** — Bilemedim (Kutu 1'e) / Bunu Bildim (Sonraki kutuya)
- **Klavye desteği** — Hızlı cevapla

### 📊 statistics.html — İstatistikler

- Toplam kartlar
- Master seviyesine ulaşan kartlar
- Başarı oranı (%)
- Bugün çalışılan kartlar
- Kutu dağılımı (tüm desteler)
- Deste bazında istatistikler

### ⚙️ settings.html — Ayarlar

- **Tema seçimi** — Light / Dark mod
- **Verileri indir** — JSON backup oluştur
- **Verileri yükle** — Önceki yedeği geri yükle
- **Tüm verileri sil** — İlk duruma dön (modal onayı)
- **Proje bilgileri** — Versiyon, teknolojiler

## ⌨️ Klavye Kısayolları (Çalışma Ekranı)

| Tuş | İşlev |
|-----|-------|
| `Space` | Kartı çevir |
| `1` veya `←` | Bilemedim (Kutu 1'e geri) |
| `2` veya `→` | Bunu Bildim (Sonraki kutuya) |

## 💾 Veri Yönetimi

### LocalStorage

- Tüm desteler ve kartlar tarayıcı belleğinde tutulur
- Otomatik kaydedilir (her işlemden sonra)
- Tarayıcı cache temizlenene kadar korunur

### Backup (Dışa Aktarma)

1. **Ayarlar** sayfasına git
2. **Verileri İndir** butonuna tıkla
3. JSON dosyası indirilir: `leitner-export-YYYY-MM-DD.json`

### Restore (İçe Aktarma)

1. **Ayarlar** sayfasına git
2. **Verileri Yükle** butonuna tıkla
3. Daha önce indirilen JSON dosyasını seç
4. Tüm veriler geri yüklenir

### Konsol Komutları (Developer Tools - F12)

```javascript
// Test verilerini yükle
loadTestData();

// Tüm verileri sil
clearAllData();

// Manuel backup
const backup = Storage.exportData();
console.log(backup);

// Manuel restore
Storage.importData(jsonString);
```

## 📂 Proje Yapısı

```
Learn with Leitner/
├── index.html              (Ana sayfa - 252 satır)
├── deckpage.html           (Deste yönetimi - 177 satır)
├── workpage.html           (Çalışma ekranı - 182 satır)
├── statistics.html         (İstatistikler - 187 satır)
├── settings.html           (Ayarlar - 223 satır)
│
├── js/
│   ├── app.js              (Ana uygulama - 450 satır)
│   ├── deckpage.js         (Deste sayfası - 280 satır)
│   ├── workpage.js         (Çalışma sayfası - otomatik yüklenir)
│   ├── statistics.js       (İstatistikler - 146 satır)
│   ├── settings.js         (Ayarlar - 210 satır)
│   ├── storage.js          (Veri saklama - 267 satır)
│   ├── utils.js            (Yardımcı fonksiyonlar)
│   └── test-data.js        (Test verileri)
│
├── memory-bank/            (Proje dokümantasyonu)
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
│
└── README.md
```

**Toplam: ~1500+ satır kod**

## 🛠 Teknolojiler

- **HTML5** — Semantic markup
- **CSS3** — Tailwind CSS (CDN)
- **JavaScript (ES6+)** — Vanilla JS, modüler yapı
- **Icons** — Material Symbols (Google)
- **Storage** — Browser LocalStorage
- **Font** — Google Fonts (Inter)

## 🌐 Tarayıcı Desteği

| Tarayıcı | Destek |
|----------|--------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Opera | ✅ Full |
| Mobile Safari (iOS) | ✅ Full |
| Chrome Mobile (Android) | ✅ Full |

**Gereklilikler:** LocalStorage ve CSS transform desteği

## 📋 Sistem Gereksinimleri

| Gereklilik | Detay |
|------------|-------|
| Depolama | ~5-10 MB LocalStorage |
| Minimum kartlar | Sınırsız |
| Destekler Browser | Modern tarayıcılar (2019+) |
| Bağlantı | Sadece ilk yükleme için (CDN) |
| Offline Çalışma | Evet, tamamen offline |

## 🐛 Troubleshooting

### Veriler kayboldu?

- 🔹 Muhtemelen gizli mod/private window kullanıyorsun → Normal modu aç
- 🔹 Cache temizlendi → JSON yedeğinden geri yükle
- 🔹 Farklı tarayıcı → Aynı tarayıcıyı kullan

### Flip animasyonu görünmüyor?

- 🔹 Eski tarayıcı kullanıyor olabilirsin → Chrome/Firefox güncel sürümüne yükselt
- 🔹 CSS transform desteğini kontrol et

### JSON import hatası?

- 🔹 Dosyasının bu uygulama dışa aktarımı olduğundan emin ol
- 🔹 JSON formatında sorun yoksa konsolda `Storage.importData(JSON.stringify(veriler))` dene

## 🎨 Tema Sistemi

- **Default:** Dark mode
- **Toggle:** Settings sayfasında
- **Persistent:** Tema seçimi kaydedilir
- **Light Mode Colors:**
  - Background: `#f6f7f8`
  - Text: `#1f2937`
  - Cards: `#ffffff`

## 📈 İstatistik Metrikleri

- **Total Cards:** Tüm desteler içindeki kartlar
- **Master Level:** Box 5'te olan kartlar
- **Success Rate:** Doğru cevaplanan kartlar / Toplam
- **Today Studied:** Bugün çalışılan kartlar
- **Box Distribution:** Kartların kutulara dağılımı

## 🔒 Veri Güvenliği

- ✅ Veriler **sadece tarayıcında** saklanır
- ✅ Sunucuya **gönderilmez**
- ✅ Tamamen **gizlidir**
- ✅ Sadece **siz erişebilirsiniz**
- ✅ İhtiyaca göre **JSON ile yedekleyin**

## 🚀 Performans

- **First Load:** < 1 saniye
- **Card Flip:** 60 FPS animasyon
- **Statistics:** Anlık hesaplama
- **Memory Usage:** ~ 2-5 MB (kart sayısına bağlı)

## 📝 Lisans

MIT License — Dilediğiniz gibi geliştirip kullanabilirsiniz.

```
MIT License

Copyright (c) 2025 Emre Burak Akçealan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 💡 İpuçları

1. **Düzenli çalışın** — Her gün 15-30 dakika çalışmak çok etkili
2. **Hatalı kartları tekrarlayın** — Kutu 1'deki kartlara daha sık bakın
3. **Kategori kullanın** — Kartları konulara göre ayırın
4. **Test verilerini kullanın** — Başlamadan önce sistem hakkında fikir edinin
5. **Yedeğini alın** — Düzenli olarak JSON backup oluşturun

## 🤝 Katkı

İyileştirmeler için:

1. Depoyu fork et (GitHub)
2. Değişiklik branch'ı oluştur (`git checkout -b feature/IyileştirmE`)
3. Değişiklikleri commit et (`git commit -am 'Yeni özellik ekle'`)
4. Branch'ı push et (`git push origin feature/IyileştirmE`)
5. Pull Request gönder

## 🗺️ Yol Haritası (Phase 3)

- [ ] Arama fonksiyonu
- [ ] Kategori filtreleme
- [ ] Toplu kart işlemleri
- [ ] Ses efektleri
- [ ] Gelişmiş istatistikler (grafikler)
- [ ] Cloud senkronizasyonu
- [ ] Mobile uygulama (React Native)

## 📞 İletişim & Destek

- **GitHub Issues:** Hataları bildir
- **Discussions:** Sorularını sor
- **GitHub:** [@ebakc](https://github.com/ebakc)

## 🎓 Kaynaklar

- [Leitner System](https://en.wikipedia.org/wiki/Leitner_system)
- [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition)
- [Learning Science](https://en.wikipedia.org/wiki/Learning_science)

---

## 🎉 Happy Learning!

Leitner sistemi ile etkili öğrenmeyi deneyimle. Hedefine ulaşman dileğiyle! 🚀

**Made with ❤️ for learners everywhere**

---

<div align="center">

**⭐ Bu projeyi beğendiysen, bir yıldız bırakmayı unutma!**

[GitHub Deposu](https://github.com/ebakc/LearnWithLeitner) • [İssue Bildir](https://github.com/ebakc/LearnWithLeitner/issues) • [Discussions](https://github.com/ebakc/LearnWithLeitner/discussions)

</div>
