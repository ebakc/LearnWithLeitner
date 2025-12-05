// ==========================================
// DECKPAGE.JS - Deste Yönetim Sayfası
// ==========================================

class DeckPage {
  constructor() {
    this.deckId = null;
    this.init();
  }

  init() {
    const params = new URLSearchParams(window.location.search);
    this.deckId = params.get('id');

    if (!this.deckId) {
      window.location.href = 'index.html';
      return;
    }

    this.loadDeckInfo();
    this.renderCards();
    this.setupEventListeners();
  }

  /**
   * Deste bilgilerini yükle
   */
  loadDeckInfo() {
    const decks = Storage.getDecks();
    const deck = decks.find(d => d.id === this.deckId);

    if (!deck) {
      window.location.href = 'index.html';
      return;
    }

    document.title = `${deck.name} - Kartları Yönet`;
    const deckTitle = document.getElementById('deck-title');
    if (deckTitle) {
      deckTitle.textContent = deck.name;
    }
  }

  /**
   * Kartları render et
   */
  renderCards() {
    const cards = Storage.getCardsByDeck(this.deckId);
    const container = document.getElementById('cards-container');

    if (!container) return;

    if (cards.length === 0) {
      container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-12">
          <p class="text-slate-400 text-lg">Bu destede henüz kart yok.</p>
          <p class="text-slate-500 text-sm mt-2">Yukarıdaki formu kullanarak kart ekleyin.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = cards.map(card => {
      const boxLabels = {
        1: '📦 Kutu 1',
        2: '📦 Kutu 2',
        3: '📦 Kutu 3',
        4: '📦 Kutu 4',
        5: '📦 Kutu 5'
      };

      return `
        <div class="bg-card-dark rounded-xl border border-border-dark p-4 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <p class="text-slate-100 font-bold text-sm mb-1">${this.escapeHtml(card.question)}</p>
              <p class="text-slate-300 text-xs mb-2">${this.escapeHtml(card.answer)}</p>
              ${card.category ? `<p class="text-slate-400 text-xs">📌 ${this.escapeHtml(card.category)}</p>` : ''}
            </div>
            <button onclick="deckPage.deleteCard('${card.id}')" class="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors flex-shrink-0">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-border-dark">
            <span class="text-xs font-medium text-primary">${boxLabels[card.box]}</span>
            <span class="text-xs text-slate-400">${Utils.formatDate(card.createdAt)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Event listener'ları ayarla
   */
  setupEventListeners() {
    const addBtn = document.getElementById('add-card-btn');
    const questionInput = document.getElementById('card-question-input');
    const answerInput = document.getElementById('card-answer-input');
    const categoryInput = document.getElementById('card-category-input');
    const deleteBtn = document.getElementById('delete-deck-btn');

    if (addBtn) {
      addBtn.addEventListener('click', () => this.addNewCard());
    }

    if (questionInput) {
      questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.addNewCard();
      });
    }

    if (answerInput) {
      answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.addNewCard();
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.deleteDeck());
    }
  }

  /**
   * Yeni kart ekle
   */
  addNewCard() {
    const questionInput = document.getElementById('card-question-input');
    const answerInput = document.getElementById('card-answer-input');
    const categoryInput = document.getElementById('card-category-input');

    const question = Utils.validateInput(questionInput.value, 2);
    const answer = Utils.validateInput(answerInput.value, 2);
    const category = categoryInput.value.trim();

    if (!question || !answer) {
      Utils.showToast('Soru ve cevap en az 2 karakter olmalı', 'error');
      return;
    }

    Storage.createCard(this.deckId, question, answer, category);
    
    questionInput.value = '';
    answerInput.value = '';
    categoryInput.value = '';
    
    this.renderCards();
    Utils.showToast('Kart eklendi!', 'success');
    questionInput.focus();
  }

  /**
   * Kartı sil (Modal ile onay sor)
   */
  deleteCard(cardId) {
    const cards = Storage.getCardsByDeck(this.deckId);
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    this.showConfirmationModal(
      'Kartı Sil',
      `"${this.escapeHtml(card.question)}" kartını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      () => {
        Storage.deleteCard(cardId);
        this.renderCards();
        Utils.showToast('Kart silindi', 'success');
      }
    );
  }

  /**
   * Destoyu sil (Modal ile onay sor)
   */
  deleteDeck() {
    const decks = Storage.getDecks();
    const deck = decks.find(d => d.id === this.deckId);
    if (!deck) return;

    const cardCount = Storage.getCardsByDeck(this.deckId).length;

    this.showConfirmationModal(
      `"${this.escapeHtml(deck.name)}" Destesi Sil`,
      `Bu destoyu ve içindeki ${cardCount} kartı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      () => {
        Storage.deleteDeck(this.deckId);
        Utils.showToast('Deste silindi', 'success');
        window.location.href = 'index.html';
      }
    );
  }

  /**
   * Onay modalını göster
   */
  showConfirmationModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');

    if (!modal) return;

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Event listenerları temizle
    const newConfirmBtn = confirmBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    confirmBtn.replaceWith(newConfirmBtn);
    cancelBtn.replaceWith(newCancelBtn);

    // Yeni event listenerları ekle
    newConfirmBtn.addEventListener('click', () => {
      onConfirm();
      this.hideConfirmationModal();
    });

    newCancelBtn.addEventListener('click', () => {
      this.hideConfirmationModal();
    });

    // Modalı göster
    modal.classList.remove('hidden');
  }

  /**
   * Onay modalını gizle
   */
  hideConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  /**
   * HTML escape
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Sayfayı başlat
const deckPage = new DeckPage();
