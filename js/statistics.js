// ==========================================
// STATISTICS.JS - İstatistik Sayfası
// ==========================================

class StatisticsPage {
  constructor() {
    this.init();
  }

  init() {
    this.loadTheme();
    this.renderStatistics();
  }

  /**
   * Kaydedilmiş tema tercihini yükle
   */
  loadTheme() {
    const savedTheme = localStorage.getItem('leitner_theme') || 'dark';
    const html = document.documentElement;
    
    if (savedTheme === 'light') {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
  }

  renderStatistics() {
    const cards = Storage.getCards();
    const decks = Storage.getDecks();

    // Toplam kartlar ve kutu dağılımı
    const boxCounts = {
      1: cards.filter(c => c.box === 1).length,
      2: cards.filter(c => c.box === 2).length,
      3: cards.filter(c => c.box === 3).length,
      4: cards.filter(c => c.box === 4).length,
      5: cards.filter(c => c.box === 5).length,
    };

    // Genel istatistikler
    document.getElementById('total-cards').textContent = cards.length;
    document.getElementById('box-5-cards').textContent = boxCounts[5];
    document.getElementById('box-1-count').textContent = boxCounts[1];
    document.getElementById('box-2-count').textContent = boxCounts[2];
    document.getElementById('box-3-count').textContent = boxCounts[3];
    document.getElementById('box-4-count').textContent = boxCounts[4];
    document.getElementById('box-5-count').textContent = boxCounts[5];

    // Başarı oranı (Kutu 5'de olanlar / Toplam * 100)
    const successRate = cards.length > 0 
      ? Math.round((boxCounts[5] / cards.length) * 100)
      : 0;
    document.getElementById('success-rate').textContent = `${successRate}%`;

    // Bugün çalışılan kartlar
    const todayStudied = this.getTodayStudiedCount();
    document.getElementById('today-studied').textContent = todayStudied;

    // Deste istatistikleri
    this.renderDeckStats(decks);
  }

  /**
   * Bugün çalışılan kart sayısını hesapla
   */
  getTodayStudiedCount() {
    const cards = Storage.getCards();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    return cards.filter(card => {
      if (!card.lastReviewDate) return false;
      const cardDate = new Date(card.lastReviewDate);
      cardDate.setHours(0, 0, 0, 0);
      return cardDate.getTime() === todayTime;
    }).length;
  }

  /**
   * Deste istatistikleri
   */
  renderDeckStats(decks) {
    const cards = Storage.getCards();
    const container = document.getElementById('deck-stats');

    if (decks.length === 0) {
      container.innerHTML = '<p class="text-slate-400 text-sm">Henüz deste yok</p>';
      return;
    }

    container.innerHTML = decks.map(deck => {
      const deckCards = cards.filter(c => c.deckId === deck.id);
      const boxCounts = {
        1: deckCards.filter(c => c.box === 1).length,
        2: deckCards.filter(c => c.box === 2).length,
        3: deckCards.filter(c => c.box === 3).length,
        4: deckCards.filter(c => c.box === 4).length,
        5: deckCards.filter(c => c.box === 5).length,
      };

      return `
        <div class="bg-slate-700/30 rounded-lg p-4">
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-semibold text-slate-100">${this.escapeHtml(deck.name)}</h4>
            <span class="text-sm text-slate-400">${deckCards.length} kart</span>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <div class="text-center">
              <p class="text-xs text-slate-400">K1</p>
              <p class="text-sm font-bold text-slate-200">${boxCounts[1]}</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-slate-400">K2</p>
              <p class="text-sm font-bold text-slate-200">${boxCounts[2]}</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-slate-400">K3</p>
              <p class="text-sm font-bold text-slate-200">${boxCounts[3]}</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-slate-400">K4</p>
              <p class="text-sm font-bold text-slate-200">${boxCounts[4]}</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-slate-400">K5</p>
              <p class="text-sm font-bold text-green-400">${boxCounts[5]}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Sayfayı başlat
const statsPage = new StatisticsPage();
