# Product Context

## Neden Bu Proje Var?

Etkili öğrenme için sadece tekrar etmek yetmiyor - doğru zamanda tekrar etmek önemliydi. Leitner sistemi bu problemi çözer: Zor kartlar daha sık, kolay kartlar daha nadir tekrar edilir.

## Nasıl Çalışacak?

### Deste Yapısı

- Kullanıcı "Almanca", "İngilizce Kelimeler", "Tarih" gibi desteler oluşturur
- Her destenin içinde çok sayıda kart vardır

### Kart Yapısı

```
{
  id: unique-id,
  deck: "Almanca",
  question: "Apple",
  answer: "Apfel",
  box: 1-5,
  category: "Meyveler",
  createdAt: timestamp,
  lastReviewDate: timestamp
}
```

### Leitner 5-Box Sistemi

- **Kutu 1**: İlk kez eklenen kartlar → 1 gün sonra tekrar et
- **Kutu 2**: Bilineni bildim → 2 gün sonra tekrar et
- **Kutu 3**: İlerleme → 4 gün sonra tekrar et
- **Kutu 4**: Daha ileri → 7 gün sonra tekrar et
- **Kutu 5**: Master seviye → 30 gün sonra tekrar et

### Kart Hareketi

1. Kartın "Bunu Bildim" butonu tıklandığında: **İleri Kutuya**
2. Kartın "Bilemedim" butonu tıklandığında: **Bir Kutu Geriye** (Kutu 1'de kalır)
3. Kutuya göre tekrar tarihi otomatik hesaplanır

### Veri Yönetimi

- LocalStorage'a JSON formatında kaydedilir
- Kullanıcı herhangi bir zamanda JSON export edebilir
- JSON import ile veri geri yüklenebilir

## Kullanıcı Flow

1. **Ana Sayfa (index.html)**

   - Mevcut desteler listesi
   - 5 kutu ve kutu başına kart sayısı
   - Yeni deste oluşturma
   - Desteden çalışma seçme

2. **Çalışma Sayfası (workpage.html)**
   - Seçilen desteden kartı göster
   - Kart flip (tıkla/hover ile cevabı gör)
   - "Bunu Bildim" / "Bilemedim" butonları
   - İlerleme göstergesi (örn: 15/50)

## Başarı Ölçüleri

- Kullanıcı kartları başarılı ekleyebilir
- Leitner sistem mütteakiyle uygulamaya göre kart ilerlemesi
- Flip animasyonu sorunsuz çalışması
- JSON export/import başarılı olması
