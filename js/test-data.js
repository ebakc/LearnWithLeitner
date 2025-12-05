// ==========================================
// TEST DATA - Örnek Veriler (Opsiyonel)
// ==========================================

/**
 * Test verilerini LocalStorage'a yüklemek için bu fonksiyonu çalıştırın.
 * Tarayıcı konsolunda: loadTestData()
 */
function loadTestData() {
  const testDecks = [
    {
      id: "deck-almanca-1",
      name: "Almanca Temel",
      createdAt: new Date().getTime() - (30 * 24 * 60 * 60 * 1000),
      totalCards: 5
    },
    {
      id: "deck-ingilizce-1",
      name: "İngilizce Kelimeler",
      createdAt: new Date().getTime() - (20 * 24 * 60 * 60 * 1000),
      totalCards: 6
    }
  ];

  const testCards = [
    // Almanca
    {
      id: "card-1",
      deckId: "deck-almanca-1",
      question: "Apple",
      answer: "Apfel",
      category: "Meyveler",
      box: 1,
      createdAt: new Date().getTime() - (10 * 24 * 60 * 60 * 1000),
      lastReviewDate: null
    },
    {
      id: "card-2",
      deckId: "deck-almanca-1",
      question: "Water",
      answer: "Wasser",
      category: "Gıda & İçecek",
      box: 2,
      createdAt: new Date().getTime() - (15 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "card-3",
      deckId: "deck-almanca-1",
      question: "House",
      answer: "Haus",
      category: "Binalar",
      box: 3,
      createdAt: new Date().getTime() - (20 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (5 * 24 * 60 * 60 * 1000)
    },
    {
      id: "card-4",
      deckId: "deck-almanca-1",
      question: "Cat",
      answer: "Katze",
      category: "Hayvanlar",
      box: 1,
      createdAt: new Date().getTime() - (2 * 24 * 60 * 60 * 1000),
      lastReviewDate: null
    },
    {
      id: "card-5",
      deckId: "deck-almanca-1",
      question: "Book",
      answer: "Buch",
      category: "Nesneler",
      box: 4,
      createdAt: new Date().getTime() - (25 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
    },
    // İngilizce
    {
      id: "card-6",
      deckId: "deck-ingilizce-1",
      question: "Ephemeral",
      answer: "Kısa ömürlü, geçici",
      category: "Sıfatlar",
      box: 1,
      createdAt: new Date().getTime() - (5 * 24 * 60 * 60 * 1000),
      lastReviewDate: null
    },
    {
      id: "card-7",
      deckId: "deck-ingilizce-1",
      question: "Ubiquitous",
      answer: "Her yerde bulunan, yaygın",
      category: "Sıfatlar",
      box: 2,
      createdAt: new Date().getTime() - (12 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "card-8",
      deckId: "deck-ingilizce-1",
      question: "Serendipity",
      answer: "Şans eseri bulma, tesadüfi iyi şey",
      category: "İsimler",
      box: 1,
      createdAt: new Date().getTime() - (1 * 24 * 60 * 60 * 1000),
      lastReviewDate: null
    },
    {
      id: "card-9",
      deckId: "deck-ingilizce-1",
      question: "Nostalgia",
      answer: "Geçmişe özlem, hüzünlü anı",
      category: "İsimler",
      box: 3,
      createdAt: new Date().getTime() - (18 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (4 * 24 * 60 * 60 * 1000)
    },
    {
      id: "card-10",
      deckId: "deck-ingilizce-1",
      question: "Pragmatic",
      answer: "Uygulamaya dönük, pratik",
      category: "Sıfatlar",
      box: 2,
      createdAt: new Date().getTime() - (8 * 24 * 60 * 60 * 1000),
      lastReviewDate: new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "card-11",
      deckId: "deck-ingilizce-1",
      question: "Meticulous",
      answer: "Çok dikkatli, titiz, detaylara önem veren",
      category: "Sıfatlar",
      box: 1,
      createdAt: new Date().getTime() - (3 * 24 * 60 * 60 * 1000),
      lastReviewDate: null
    }
  ];

  localStorage.setItem('leitner_decks', JSON.stringify(testDecks));
  localStorage.setItem('leitner_cards', JSON.stringify(testCards));
  
  console.log('✅ Test verileri yüklendi!');
  console.log('Sayfayı yenile (F5 veya Ctrl+R) ve index.html sayfasını aç');
  
  return true;
}

/**
 * Tüm verileri temizle
 */
function clearAllData() {
  if (confirm('Tüm verileri silmek istediğinizden emin misiniz?')) {
    localStorage.removeItem('leitner_decks');
    localStorage.removeItem('leitner_cards');
    console.log('✅ Tüm veriler silindi');
    location.reload();
  }
}

console.log('💡 Test Komutları:');
console.log('1. loadTestData() - Örnek verileri yükle');
console.log('2. clearAllData() - Tüm verileri sil');
