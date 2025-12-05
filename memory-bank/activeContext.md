# Active Context

## Current Focus

- ✅ Bug fix: Yeni kartlar çalışılmıyordu - FIXED
- ✅ UI güncellemesi: Header tasarım - DONE
- ✅ Auto redirect: Tüm kartlar bitince otomatik çıkış - DONE
- Keyboard shortcuts dokümantasyonu eklendi

## Active Work Items

- [x] Proje dizin yapısı tamamlandı
- [x] app.js core logic tamamlandı
- [x] index.html deste listesi
- [x] workpage.html kart çalışma
- [x] deckpage.html kart yönetimi
- [x] Leitner sistem mütteakisı
- [x] JSON export/import
- [x] Bug fix: Yeni kartlar gösterimi
- [x] Header tasarımı güncellemesi
- [x] Auto redirect tamamlama sayfasına

## Important Patterns

- **LocalStorage Key Pattern**: `leitner_decks`, `leitner_cards`
- **Card Box Range**: 1-5
- **Schedule Days**: [1, 2, 4, 7, 30]
- **Box Progression**: Right → +1, Wrong → -1 (min: box=1)
- **Shuffle**: Fisher-Yates algorithm

## Recent Decisions

- 5 kutu sistemi onaylandı ✅
- Tarih ve kategori alanları eklendi ✅
- JSON export/import tamamlandı ✅
- İstatistik MVP'de değil (sonra yapılabilir)
- deckpage.html ile kart yönetimi ✅

## Known Constraints

- LocalStorage limit (~5-10 MB depending on browser)
- No backend = no cloud sync
- Data backup = manual JSON export

## Testing Points

- [x] Yeni deste oluştur ve LocalStorage'a kaydet
- [x] Yeni kart ekle (soru, cevap, kategori)
- [x] Kart flip animasyonu
- [x] "Bunu Bildim" → Box progression test
- [x] "Bilemedim" → Box regression test
- [x] Kutu 1 "Bilemedim" → Kutu 1'de kalma test
- [x] JSON export/import
- [x] Deste silme ve kart silme
- [x] Responsive design test

## Browser Tested

- Chrome/Edge (Chromium-based)
- Ready for Firefox, Safari (CSS compatibility)

## Performance Notes

- Shuffle (Fisher-Yates) ~O(n)
- LocalStorage getItem/setItem minimal overhead
- No lazy-loading needed (MVP)
- Flip animation smooth (CSS transform)
