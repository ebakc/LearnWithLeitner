// ==========================================
// UTILS.JS - Utility Functions
// ==========================================

const Utils = {
  /**
   * Tarihi Turkish formatta göster
   */
  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Tarihi saat-dakika formatında göster
   */
  formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) + ' ' + date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Dizinin elemanlarını karıştır (Fisher-Yates)
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * İlerleme yüzdesini hesapla
   */
  calculateProgress(current, total) {
    return total === 0 ? 0 : Math.round((current / total) * 100);
  },

  /**
   * Gün farkını hesapla
   */
  daysDifference(timestamp1, timestamp2) {
    const diff = Math.abs(timestamp1 - timestamp2);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },

  /**
   * Çıkışı göster (HTML element)
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Stil
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      ${type === 'success' ? 'background: #10b981; color: white;' : ''}
      ${type === 'error' ? 'background: #ef4444; color: white;' : ''}
      ${type === 'info' ? 'background: #3b82f6; color: white;' : ''}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Input değerini trim et ve kontrol et
   */
  validateInput(input, minLength = 1) {
    const trimmed = input.trim();
    return trimmed.length >= minLength ? trimmed : null;
  },

  /**
   * JSON dosyası indir
   */
  downloadJSON(data, filename) {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `leitner-export-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  },

  /**
   * JSON dosyasını oku (file input)
   */
  readJSONFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (error) {
          reject(new Error('JSON parse hatası'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Dosya okuma hatası'));
      };
      
      reader.readAsText(file);
    });
  }
};
