// ==========================================
// SETTINGS.JS - Ayarlar Sayfası
// ==========================================

class SettingsPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeListeners();
    this.setupDataManagementListeners();
    this.loadThemePreference();
  }

  /**
   * Tema seçimi event listener'larını ayarla
   */
  setupThemeListeners() {
    const lightBtn = document.getElementById('theme-light');
    const darkBtn = document.getElementById('theme-dark');

    if (lightBtn) {
      lightBtn.addEventListener('click', () => this.setTheme('light'));
    }

    if (darkBtn) {
      darkBtn.addEventListener('click', () => this.setTheme('dark'));
    }
  }

  /**
   * Tema ayarla
   */
  setTheme(theme) {
    const html = document.documentElement;
    const lightBtn = document.getElementById('theme-light');
    const darkBtn = document.getElementById('theme-dark');

    if (theme === 'light') {
      html.classList.remove('dark');
      localStorage.setItem('leitner_theme', 'light');
      if (lightBtn) lightBtn.classList.add('bg-primary', 'text-slate-900');
      if (lightBtn) lightBtn.classList.remove('bg-slate-700', 'text-slate-300');
      if (darkBtn) darkBtn.classList.remove('bg-primary', 'text-slate-900');
      if (darkBtn) darkBtn.classList.add('bg-slate-700', 'text-slate-300');
    } else {
      html.classList.add('dark');
      localStorage.setItem('leitner_theme', 'dark');
      if (darkBtn) darkBtn.classList.add('bg-primary', 'text-slate-900');
      if (darkBtn) darkBtn.classList.remove('bg-slate-700', 'text-slate-300');
      if (lightBtn) lightBtn.classList.remove('bg-primary', 'text-slate-900');
      if (lightBtn) lightBtn.classList.add('bg-slate-700', 'text-slate-300');
    }

    Utils.showToast(`Tema: ${theme === 'light' ? 'Açık' : 'Koyu'}`, 'success');
  }

  /**
   * Kaydedilmiş tema tercihini yükle
   */
  loadThemePreference() {
    const savedTheme = localStorage.getItem('leitner_theme') || 'dark';
    const html = document.documentElement;
    const lightBtn = document.getElementById('theme-light');
    const darkBtn = document.getElementById('theme-dark');

    if (savedTheme === 'light') {
      html.classList.remove('dark');
      if (lightBtn) lightBtn.classList.add('bg-primary', 'text-slate-900');
      if (lightBtn) lightBtn.classList.remove('bg-slate-700', 'text-slate-300');
      if (darkBtn) darkBtn.classList.remove('bg-primary', 'text-slate-900');
      if (darkBtn) darkBtn.classList.add('bg-slate-700', 'text-slate-300');
    } else {
      html.classList.add('dark');
      if (darkBtn) darkBtn.classList.add('bg-primary', 'text-slate-900');
      if (darkBtn) darkBtn.classList.remove('bg-slate-700', 'text-slate-300');
      if (lightBtn) lightBtn.classList.remove('bg-primary', 'text-slate-900');
      if (lightBtn) lightBtn.classList.add('bg-slate-700', 'text-slate-300');
    }
  }

  /**
   * Veri yönetimi event listener'larını ayarla
   */
  setupDataManagementListeners() {
    const exportBtn = document.getElementById('export-data-btn');
    const importBtn = document.getElementById('import-data-btn');
    const importFile = document.getElementById('import-file-input');
    const resetBtn = document.getElementById('reset-data-btn');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportData());
    }

    if (importBtn) {
      importBtn.addEventListener('click', () => importFile?.click());
    }

    if (importFile) {
      importFile.addEventListener('change', (e) => this.importData(e));
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.showResetConfirmation());
    }
  }

  /**
   * Verileri dışa aktar
   */
  exportData() {
    const data = Storage.exportData();
    const filename = `leitner-export-${new Date().toISOString().split('T')[0]}.json`;
    Utils.downloadJSON(data, filename);
    Utils.showToast('Veriler indirildi', 'success');
  }

  /**
   * Verileri içe aktar
   */
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    Utils.readJSONFile(file)
      .then(data => {
        if (Storage.importData(JSON.stringify(data))) {
          Utils.showToast('Veriler başarıyla yüklendi!', 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          Utils.showToast('Veri yükleme başarısız', 'error');
        }
      })
      .catch(error => {
        Utils.showToast('Dosya okuma hatası: ' + error.message, 'error');
      });
  }

  /**
   * Reset onay göster
   */
  showResetConfirmation() {
    this.showConfirmationModal(
      'Tüm Verileri Sil',
      'Bu işlem tüm desteler ve kartları silecek ve geri alınamaz. Emin misiniz?',
      () => this.resetAllData()
    );
  }

  /**
   * Tüm verileri sil
   */
  resetAllData() {
    localStorage.removeItem('leitner_decks');
    localStorage.removeItem('leitner_cards');
    Utils.showToast('Tüm veriler silindi', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
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
}

// Sayfayı başlat
const settingsPage = new SettingsPage();
