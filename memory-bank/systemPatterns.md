# System Patterns & Architecture

## Data Architecture

### LocalStorage Schema

```javascript
{
  "leitner_decks": [
    {
      id: "uuid-1",
      name: "Almanca",
      createdAt: timestamp,
      totalCards: 50
    }
  ],
  "leitner_cards": [
    {
      id: "uuid-2",
      deckId: "uuid-1",
      question: "Apple",
      answer: "Apfel",
      box: 1,
      category: "Meyveler",
      createdAt: timestamp,
      lastReviewDate: timestamp
    }
  ]
}
```

## Core Logic Patterns

### 1. Box Schedule (Tekrar Tarihi Hesaplama)

```
boxSchedule = {
  1: 1,    // 1 gün
  2: 2,    // 2 gün
  3: 4,    // 4 gün
  4: 7,    // 7 gün
  5: 30    // 30 gün
}

nextReviewDate = today + (boxSchedule[box] * 24 * 60 * 60 * 1000)
```

### 2. Box Progression Logic

```
if (userSaysRight) {
  if (box < 5) {
    card.box += 1
  }
} else {
  if (box > 1) {
    card.box -= 1
  } else {
    card.box = 1
  }
}
```

### 3. Card Filtering (Hangi Kartlar Gösterilecek)

- Kartın kutu numarasına bakılır
- `nextReviewDate <= now` olan kartlar gösterilir
- Gösterilen kartlar shuffle edilir (random order)

## Component Structure

### App.js

- LocalStorage'ı yönet
- Deck CRUD (Create, Read, Update, Delete)
- Card CRUD
- Box progression logic
- Veri import/export
- Modal panel management (showConfirmationModal, hideConfirmationModal)

### Confirmation Modal Pattern

Tüm sayfalar aynı modal pattern kullanır:

```html
<!-- Confirmation Modal -->
<div
  id="confirmation-modal"
  class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/50 backdrop-blur-sm"
>
  <div
    class="bg-card-dark rounded-xl border border-border-dark shadow-2xl shadow-black/50 w-96 max-w-[90%] p-6"
  >
    <h2 id="modal-title" class="text-xl font-bold text-slate-100 mb-2">
      Onay Gerekli
    </h2>
    <p id="modal-message" class="text-slate-400 text-sm mb-6"></p>
    <div class="flex gap-3">
      <button id="modal-cancel">İptal/Devam</button>
      <button id="modal-confirm">Sil/Çık</button>
    </div>
  </div>
</div>
```

Kullanım:

```javascript
this.showConfirmationModal(
  title, // Modal başlığı
  message, // Açıklama
  onConfirm // Callback function
);
```

Sayfalar:

- index.html: Desto silme
- deckpage.html: Kart silme, desto silme
- workpage.html: Çalışmadan çıkış

### index.html

- Deck listesi render
- Kutu özeti göster (her kutudaki kart sayısı)
- Yeni deste formu
- Çalışmaya başla linkler
- Modal panel (desto silme için)

### workpage.html

- Aktif kartı göster
- Flip animasyonu
- Response buttons (Bunu Bildim / Bilemedim)
- İlerleme bar
- Deste adı ve istatistik
- Modal panel (çalışmadan çıkış için)

### deckpage.html

- Deste kartlarını listele
- Yeni kart ekleme formu
- Kart silme butonu
- Deste silme butonu
- Modal panel (kart ve desto silme için)

### statistics.html

- Toplam kartlar
- Master seviyesi (Kutu 5)
- Başarı oranı (%)
- Bugün çalışılan kartlar
- Kutu dağılımı (visual display)
- Son 7 gün aktivitesi (bar chart - hover shows count)
- Deste bazlı istatistikler

### settings.html

- Tema seçimi (açık/koyu) - localStorage'a kaydedilir
- Veri yönetimi:
  - Verileri İndir (JSON export)
  - Verileri Yükle (JSON import)
  - Tüm Verileri Sil (with confirmation modal)
- Hakkında bölümü
- GitHub link

## State Management

- Tüm state LocalStorage'da tutulur
- App.js state'i manage eder ve HTML'e pass eder
- İndir/upload işlemleri JSON parser ile yapılır
- Tema tercihi `leitner_theme` key'inde saklanır (default: dark)

## Key Decisions

1. **Vanilla JS**: Framework dependency yok, basit ve hızlı
2. **Tailwind**: Styling hızlı ve consistent
3. **LocalStorage**: Basit ama yeterli MVP için
4. **UUID**: Card/Deck uniqueness için
5. **Separate pages**: Statistics ve Settings ayrı sayfalar (index.html'i temiz tutar)
6. **Tema toggle**: Dark by default, localStorage'a kaydedilir
