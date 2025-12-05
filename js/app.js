// ==========================================
// APP.JS - Main Application Logic
// ==========================================

class LeitnerApp {
  constructor() {
    this.currentDeckId = null;
    this.currentCards = [];
    this.currentCardIndex = 0;
    this.init();
  }

  /**
   * Uygulamayı başlat
   */
  init() {
    this.loadPageType();
  }

  /**
   * Sayfanın tipine göre işlem yap
   */
  loadPageType() {
    const path = window.location.pathname;
    const isWorkPage = path.includes('workpage');

    if (isWorkPage) {
      this.initWorkPage();
    } else {
      this.initIndexPage();
    }
  }

  // ======== INDEX PAGE ========

  /**
   * Ana sayfayı başlat
   */
  initIndexPage() {
    this.renderDecks();
    this.setupIndexEventListeners();
  }

  /**
   * Destleri render et
   */
  renderDecks() {
    const decks = Storage.getDecks();
    const container = document.getElementById('decks-container');
    
    if (!container) return;

    if (decks.length === 0) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12">
          <p class="text-slate-400 text-lg">Henüz deste yok. İlk destenizi oluşturun!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = decks.map(deck => {
      const stats = Storage.getDeckStats(deck.id);
      const dueCount = Storage.getCardsDueForReview(deck.id).length;
      
      return `
        <div class="flex flex-col gap-4 p-5 bg-card-dark rounded-xl border border-border-dark shadow-lg shadow-black/20 transition-shadow hover:shadow-xl hover:shadow-black/30">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-slate-50 text-lg font-bold leading-normal">${this.escapeHtml(deck.name)}</p>
              <p class="text-slate-400 text-sm">Toplam: ${stats.total} kart</p>
            </div>
            <button onclick="app.deleteDeck('${deck.id}')" class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-full transition-colors">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">📦 Kutu 1</span>
              <span class="text-slate-300">${stats.box1}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">📦 Kutu 2</span>
              <span class="text-slate-300">${stats.box2}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">📦 Kutu 3</span>
              <span class="text-slate-300">${stats.box3}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">📦 Kutu 4</span>
              <span class="text-slate-300">${stats.box4}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">📦 Kutu 5</span>
              <span class="text-slate-300">${stats.box5}</span>
            </div>
          </div>

          <div class="pt-2 border-t border-border-dark">
            <p class="text-sm text-slate-400 mb-3">Tekrar edilmesi gereken: ${dueCount}</p>
            <div class="flex gap-2">
              <button onclick="app.startStudy('${deck.id}')" class="flex-1 rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold hover:bg-primary/30 transition-colors">
                Çalış
              </button>
              <button onclick="app.openDeckCards('${deck.id}')" class="flex-1 rounded-lg h-10 px-4 bg-slate-700/50 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
                Kartlar
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Index sayfası event listener'larını ayarla
   */
  setupIndexEventListeners() {
    const createBtn = document.getElementById('create-deck-btn');
    const deckInput = document.getElementById('deck-name-input');

    if (createBtn) {
      createBtn.addEventListener('click', () => this.createNewDeck());
    }

    if (deckInput) {
      deckInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.createNewDeck();
        }
      });
    }

    // JSON import/export butonları
    const exportBtn = document.getElementById('export-data-btn');
    const importBtn = document.getElementById('import-data-btn');
    const importFile = document.getElementById('import-file-input');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportData());
    }

    if (importBtn) {
      importBtn.addEventListener('click', () => importFile?.click());
    }

    if (importFile) {
      importFile.addEventListener('change', (e) => this.importData(e));
    }
  }

  /**
   * Yeni deste oluştur
   */
  createNewDeck() {
    const input = document.getElementById('deck-name-input');
    const name = Utils.validateInput(input.value, 2);

    if (!name) {
      Utils.showToast('Deste adı en az 2 karakter olmalı', 'error');
      return;
    }

    Storage.createDeck(name);
    input.value = '';
    this.renderDecks();
    Utils.showToast(`"${name}" destesi oluşturuldu!`, 'success');
  }

  /**
   * Destoyu sil
   */
  deleteDeck(deckId) {
    if (confirm('Bu destoyu silmek istediğinizden emin misiniz?')) {
      Storage.deleteDeck(deckId);
      this.renderDecks();
      Utils.showToast('Deste silindi', 'success');
    }
  }

  /**
   * Çalışmayı başlat
   */
  startStudy(deckId) {
    const cards = Storage.getCardsDueForReview(deckId);
    
    console.log(`[Debug] Deste ID: ${deckId}, Çalışılacak kart sayısı: ${cards.length}`);
    
    if (cards.length === 0) {
      Utils.showToast('Bugün tekrar edilecek kart yok!', 'info');
      return;
    }

    const shuffled = Utils.shuffleArray(cards);
    sessionStorage.setItem('workCards', JSON.stringify(shuffled));
    sessionStorage.setItem('workDeckId', deckId);
    
    window.location.href = 'workpage.html';
  }

  /**
   * Deste kartlarını aç
   */
  openDeckCards(deckId) {
    window.location.href = `deckpage.html?id=${deckId}`;
  }

  /**
   * Veri dışa aktar
   */
  exportData() {
    const data = Storage.exportData();
    const filename = `leitner-export-${new Date().toISOString().split('T')[0]}.json`;
    Utils.downloadJSON(data, filename);
    Utils.showToast('Veriler indirildi', 'success');
  }

  /**
   * Veri içe aktar
   */
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    Utils.readJSONFile(file)
      .then(data => {
        if (Storage.importData(JSON.stringify(data))) {
          this.renderDecks();
          Utils.showToast('Veriler başarıyla yüklendi!', 'success');
        } else {
          Utils.showToast('Veri yükleme başarısız', 'error');
        }
      })
      .catch(error => {
        Utils.showToast('Dosya okuma hatası: ' + error.message, 'error');
      });
  }

  // ======== WORK PAGE ========

  /**
   * Çalışma sayfasını başlat
   */
  initWorkPage() {
    const cardData = sessionStorage.getItem('workCards');
    const deckId = sessionStorage.getItem('workDeckId');

    if (!cardData || !deckId) {
      window.location.href = 'index.html';
      return;
    }

    this.currentDeckId = deckId;
    this.currentCards = JSON.parse(cardData);
    this.currentCardIndex = 0;

    const deck = Storage.getDecks().find(d => d.id === deckId);
    if (deck) {
      document.title = `${deck.name} - Çalış`;
      const deckTitle = document.getElementById('deck-title');
      if (deckTitle) {
        deckTitle.textContent = deck.name;
      }
    }

    this.renderCard();
    this.setupWorkPageEventListeners();
  }

  /**
   * Kartı render et
   */
  renderCard() {
    if (this.currentCards.length === 0) {
      this.showStudyComplete();
      return;
    }

    const card = this.currentCards[this.currentCardIndex];
    const progress = this.currentCardIndex + 1;
    const total = this.currentCards.length;

    // Kartı render et
    const cardContainer = document.getElementById('card-container');
    if (cardContainer) {
      cardContainer.innerHTML = `
        <div class="perspective-[1000px] group w-full">
          <div class="relative w-full min-h-[400px] flip-card-inner" id="flip-card">
            <!-- Front -->
            <div class="absolute w-full h-full flip-card-front">
              <div class="flex flex-col items-stretch justify-start rounded-xl bg-card-dark shadow-2xl shadow-black/20 h-full">
                <div class="flex w-full grow flex-col items-center justify-center gap-1 p-8 text-center min-h-[320px]">
                  <h2 class="text-primary text-base font-semibold tracking-wide uppercase">Soru</h2>
                  <p class="text-slate-100 text-3xl font-bold leading-tight tracking-tight mt-4">${this.escapeHtml(card.question)}</p>
                  <p class="text-slate-400 text-base font-normal leading-normal mt-4">Cevabı görmek için tıklayın</p>
                </div>
              </div>
            </div>

            <!-- Back -->
            <div class="absolute w-full h-full flip-card-back">
              <div class="flex flex-col items-stretch justify-start rounded-xl bg-card-dark shadow-2xl shadow-black/20 h-full">
                <div class="flex w-full grow flex-col items-center justify-center gap-1 p-8 text-center min-h-[320px]">
                  <h2 class="text-primary text-base font-semibold tracking-wide uppercase">Cevap</h2>
                  <p class="text-slate-100 text-3xl font-bold leading-tight tracking-tight mt-4">${this.escapeHtml(card.answer)}</p>
                  ${card.category ? `<p class="text-slate-400 text-sm mt-4">Kategori: ${this.escapeHtml(card.category)}</p>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Flip functionality
      const flipCard = document.getElementById('flip-card');
      if (flipCard) {
        flipCard.addEventListener('click', () => {
          flipCard.classList.toggle('flipped');
        });
      }
    }

    // İlerleme render et
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');

    if (progressText) {
      progressText.textContent = `${progress} / ${total}`;
    }

    if (progressFill) {
      const percent = (progress / total) * 100;
      progressFill.style.width = `${percent}%`;
    }

    // Tüm kartlar bitti mi kontrol et
    // Son kartsa ve o kart kaldıysa, cevap verdikten sonra otomatik tamamlanacak
    // (handleCardResponse'de zaten kontrol ediliyor)
  }

  /**
   * Çalışma sayfası event listener'larını ayarla
   */
  setupWorkPageEventListeners() {
    const correctBtn = document.getElementById('correct-btn');
    const wrongBtn = document.getElementById('wrong-btn');
    const closeBtn = document.getElementById('close-btn');

    if (correctBtn) {
      correctBtn.addEventListener('click', () => this.handleCardResponse(true));
    }

    if (wrongBtn) {
      wrongBtn.addEventListener('click', () => this.handleCardResponse(false));
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (confirm('Çalışmayı sonlandırmak istediğinizden emin misiniz?')) {
          window.location.href = 'index.html';
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keypress', (e) => {
      if (e.key === '1' || e.key === 'ArrowLeft') {
        this.handleCardResponse(false);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        this.handleCardResponse(true);
      } else if (e.key === ' ') {
        e.preventDefault();
        document.getElementById('flip-card')?.click();
      }
    });
  }

  /**
   * Kart cevabını işle
   */
  handleCardResponse(isCorrect) {
    const card = this.currentCards[this.currentCardIndex];
    
    // Kartı güncelle
    Storage.updateCardBox(card.id, isCorrect);
    
    // Sonraki karta geç
    this.currentCardIndex += 1;
    
    // Bir küçük delay ekle (UX için) sonra render et
    setTimeout(() => {
      this.renderCard();
    }, 300);
  }

  /**
   * Çalışma tamamlandı
   */
  showStudyComplete() {
    const cardContainer = document.getElementById('card-container');
    const buttonContainer = document.getElementById('button-container');
    const progressBar = document.getElementById('progress-bar');

    if (cardContainer) {
      cardContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-2xl font-bold text-slate-100 mb-2">Tebrikler!</h2>
          <p class="text-slate-400 mb-8">Bugünün çalışması tamamlandı.</p>
          <button onclick="window.location.href='index.html'" class="px-6 py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Ana Sayfaya Dön
          </button>
        </div>
      `;
    }

    if (buttonContainer) {
      buttonContainer.innerHTML = '';
    }

    if (progressBar) {
      progressBar.innerHTML = '';
    }
  }

  /**
   * HTML escape (XSS prevention)
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Uygulamayı başlat
const app = new LeitnerApp();
