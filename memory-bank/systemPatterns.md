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

### index.html

- Deck listesi render
- Kutu özeti göster (her kutudaki kart sayısı)
- Yeni deste formu
- Çalışmaya başla linkler

### workpage.html

- Aktif kartı göster
- Flip animasyonu
- Response buttons (Bunu Bildim / Bilemedim)
- İlerleme bar
- Deste adı ve istatistik

## State Management

- Tüm state LocalStorage'da tutulur
- App.js state'i manage eder ve HTML'e pass eder
- İndir/upload işlemleri JSON parser ile yapılır

## Key Decisions

1. **Vanilla JS**: Framework dependency yok, basit ve hızlı
2. **Tailwind**: Styling hızlı ve consistent
3. **LocalStorage**: Basit ama yeterli MVP için
4. **UUID**: Card/Deck uniqueness için
