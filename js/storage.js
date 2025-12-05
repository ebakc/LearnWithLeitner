// ==========================================
// STORAGE.JS - LocalStorage Management
// ==========================================

const STORAGE_KEYS = {
  DECKS: 'leitner_decks',
  CARDS: 'leitner_cards'
};

const BOX_SCHEDULE = {
  1: 1,   // 1 gün
  2: 2,   // 2 gün
  3: 4,   // 4 gün
  4: 7,   // 7 gün
  5: 30   // 30 gün
};

class Storage {
  /**
   * LocalStorage'dan tüm destleri al
   */
  static getDecks() {
    const data = localStorage.getItem(STORAGE_KEYS.DECKS);
    return data ? JSON.parse(data) : [];
  }

  /**
   * LocalStorage'a destleri kaydet
   */
  static setDecks(decks) {
    localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks));
  }

  /**
   * LocalStorage'dan tüm kartları al
   */
  static getCards() {
    const data = localStorage.getItem(STORAGE_KEYS.CARDS);
    return data ? JSON.parse(data) : [];
  }

  /**
   * LocalStorage'a kartları kaydet
   */
  static setCards(cards) {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  }

  /**
   * Belirli bir deste için kartları al
   */
  static getCardsByDeck(deckId) {
    const cards = this.getCards();
    return cards.filter(card => card.deckId === deckId);
  }

  /**
   * Belirli bir deste için kutuya göre kartları al
   */
  static getCardsByBox(deckId, box) {
    return this.getCardsByDeck(deckId).filter(card => card.box === box);
  }

  /**
   * Tekrar edilmesi gereken kartları al (günü geçmiş veya bugün)
   * Yeni kartlar (lastReviewDate = null) HEMEN gösterilir
   */
  static getCardsDueForReview(deckId) {
    const cards = this.getCardsByDeck(deckId);
    const now = new Date().getTime();
    
    return cards.filter(card => {
      // Yeni kart (hiç çalışılmamış) = HEMEN göster
      if (card.lastReviewDate === null) {
        return true;
      }
      
      // Çalışılan kart = tekrar tarihine bakılır
      const nextReviewTime = card.lastReviewDate + (BOX_SCHEDULE[card.box] * 24 * 60 * 60 * 1000);
      return nextReviewTime <= now;
    });
  }

  /**
   * Desto oluştur
   */
  static createDeck(name) {
    const decks = this.getDecks();
    const newDeck = {
      id: this.generateId(),
      name: name.trim(),
      createdAt: new Date().getTime(),
      totalCards: 0
    };
    
    decks.push(newDeck);
    this.setDecks(decks);
    return newDeck;
  }

  /**
   * Desto sil
   */
  static deleteDeck(deckId) {
    const decks = this.getDecks();
    const cards = this.getCards();
    
    // Destoyu sil
    const filteredDecks = decks.filter(d => d.id !== deckId);
    this.setDecks(filteredDecks);
    
    // O deste için kartları sil
    const filteredCards = cards.filter(c => c.deckId !== deckId);
    this.setCards(filteredCards);
  }

  /**
   * Kart oluştur
   */
  static createCard(deckId, question, answer, category = '') {
    const cards = this.getCards();
    const decks = this.getDecks();
    
    const newCard = {
      id: this.generateId(),
      deckId: deckId,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      box: 1,
      createdAt: new Date().getTime(),
      lastReviewDate: null
    };
    
    cards.push(newCard);
    this.setCards(cards);
    
    // Desto kart sayısını güncelle
    const deck = decks.find(d => d.id === deckId);
    if (deck) {
      deck.totalCards = cards.filter(c => c.deckId === deckId).length;
      this.setDecks(decks);
    }
    
    return newCard;
  }

  /**
   * Kart sil
   */
  static deleteCard(cardId) {
    const cards = this.getCards();
    const decks = this.getDecks();
    
    const card = cards.find(c => c.id === cardId);
    const filteredCards = cards.filter(c => c.id !== cardId);
    this.setCards(filteredCards);
    
    // Desto kart sayısını güncelle
    if (card) {
      const deck = decks.find(d => d.id === card.deckId);
      if (deck) {
        deck.totalCards = filteredCards.filter(c => c.deckId === card.deckId).length;
        this.setDecks(decks);
      }
    }
  }

  /**
   * Kart kutusunu güncelle (progression logic)
   */
  static updateCardBox(cardId, isCorrect) {
    const cards = this.getCards();
    const card = cards.find(c => c.id === cardId);
    
    if (!card) return null;
    
    if (isCorrect) {
      // Bunu Bildim - sonraki kutuya geç
      if (card.box < 5) {
        card.box += 1;
      }
    } else {
      // Bilemedim - önceki kutuya geri git (kutu 1'de kalma)
      if (card.box > 1) {
        card.box -= 1;
      } else {
        card.box = 1;
      }
    }
    
    card.lastReviewDate = new Date().getTime();
    this.setCards(cards);
    return card;
  }

  /**
   * Deste istatistiklerini al
   */
  static getDeckStats(deckId) {
    const cards = this.getCardsByDeck(deckId);
    const stats = {
      total: cards.length,
      box1: 0,
      box2: 0,
      box3: 0,
      box4: 0,
      box5: 0,
      dueForReview: 0
    };
    
    cards.forEach(card => {
      stats[`box${card.box}`] += 1;
    });
    
    stats.dueForReview = this.getCardsDueForReview(deckId).length;
    return stats;
  }

  /**
   * Unique ID oluştur (simple UUID-like)
   */
  static generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Veri dışa aktar (JSON)
   */
  static exportData() {
    const data = {
      decks: this.getDecks(),
      cards: this.getCards(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Veri içe aktar (JSON)
   */
  static importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      
      if (!data.decks || !data.cards) {
        throw new Error('Geçersiz veri formatı');
      }
      
      this.setDecks(data.decks);
      this.setCards(data.cards);
      return true;
    } catch (error) {
      console.error('Import hatası:', error);
      return false;
    }
  }

  /**
   * Tüm veriyi sil
   */
  static clearAll() {
    localStorage.removeItem(STORAGE_KEYS.DECKS);
    localStorage.removeItem(STORAGE_KEYS.CARDS);
  }
}
