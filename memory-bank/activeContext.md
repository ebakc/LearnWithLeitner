# Active Context

## Current Focus

- ✅ **PROTOTIP HAZIR** - Learn with Leitner v1.0 tamamen işlevsel
- ✅ MVP Tamamlandı - Temel Leitner sistemi çalışıyor
- ✅ Phase 2: İstatistik ve Ayarlar sayfaları eklendi
- ✅ Tüm bug'lar çözüldü - Açık tema CSS V3 final

## Project Status

🟢 **READY FOR PRODUCTION** - Prototip tamamen işlevsel, kullanıma hazır

## Completed Features

- ✅ 5-Box Leitner Spaced Repetition System
- ✅ Dark & Light Theme (V3 - fully working)
- ✅ Deck Management (CRUD operations)
- ✅ Card Management with Categories
- ✅ Study Interface with Flip Animations
- ✅ Statistics Dashboard
- ✅ Settings Page (Theme toggle, Export/Import, Reset)
- ✅ Modal Panel Confirmations
- ✅ LocalStorage Persistence
- ✅ JSON Export/Import Backup
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Turkish UI

## Technical Stack

- **Frontend**: HTML5, CSS3 (Tailwind CDN), Vanilla JavaScript ES6
- **Storage**: Browser LocalStorage with JSON serialization
- **UI Framework**: Tailwind CSS with custom dark mode
- **Icons**: Material Symbols Outlined

## Core Implementation Details

### Leitner System

- 5 boxes with schedule [1, 2, 4, 7, 30] days
- Automatic box progression on correct answer
- Box regression on wrong answer (min: box 1)
- New cards marked with `lastReviewDate === null`
- Automatic schedule calculation based on review dates

### Theme System

- Dark mode by default (html class="dark")
- Light mode toggle via settings page
- Saved in localStorage as `leitner_theme`
- CSS: `html:not(.dark)` selector with `!important` for full override
- All 5 pages support both themes

### Data Structure

- **Decks**: {id, name, createdAt, totalCards}
- **Cards**: {id, deckId, question, answer, box, category, createdAt, lastReviewDate}
- **LocalStorage Keys**: `leitner_decks`, `leitner_cards`, `leitner_theme`

### UI Patterns

- Modal confirmations for destructive operations
- Flip card animations using CSS 3D transforms
- Progress bar with percentage tracking
- Responsive grid layouts
- Toast notifications for feedback

## Known Working Features

- All CRUD operations (Decks & Cards)
- Leitner box progression/regression
- Study session with shuffle
- Auto-redirect to congratulations screen
- Theme persistence across page reloads
- Modal confirmations (no browser confirm dialogs)
- JSON backup and restore
- Statistics calculations
- Responsive layout on all screen sizes
- Dark and light themes fully functional

## Files Structure

```
├── index.html           (Main page - deck listing)
├── deckpage.html        (Deck management - card CRUD)
├── workpage.html        (Study interface)
├── statistics.html      (Analytics dashboard)
├── settings.html        (Settings & theme toggle)
├── js/
│   ├── app.js           (Main app logic)
│   ├── deckpage.js      (Deck page logic)
│   ├── settings.js      (Settings page logic)
│   ├── statistics.js    (Statistics page logic)
│   ├── storage.js       (LocalStorage management)
│   ├── utils.js         (Helper functions)
│   └── test-data.js     (Test data generator)
└── memory-bank/         (Documentation)
    ├── projectbrief.md
    ├── productContext.md
    ├── systemPatterns.md
    ├── techContext.md
    ├── activeContext.md
    └── progress.md
```

## Performance

- No external backend required
- LocalStorage operations < 1ms
- Instant page transitions
- Smooth animations (CSS transforms)
- No network latency

## Browser Support

- Chrome/Edge (Chromium-based) ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

## Future Enhancements (Phase 3)

- Search and filtering
- Category-wise filtering
- Bulk card operations
- Sound effects
- Advanced statistics
- Cloud sync
- Mobile app version
- Light mode CSS tüm sayfalar için eklendi ✅

## Important Patterns

- **LocalStorage Key Pattern**: `leitner_decks`, `leitner_cards`, `leitner_theme`
- **Card Box Range**: 1-5
- **Schedule Days**: [1, 2, 4, 7, 30]
- **Box Progression**: Right → +1, Wrong → -1 (min: box=1)
- **Shuffle**: Fisher-Yates algorithm
- **Modal Pattern**: Fixed overlay with backdrop-blur, centered panel
- **Theme Pattern**: Dark by default, light mode toggleable, saved to localStorage

## Recent Decisions

- 5 kutu sistemi onaylandı ✅
- JSON export/import ayarlar sayfasına taşındı ✅
- Tema toggle eklenmelk (dark/light) ✅
- Tüm veri silme özelliği eklenmelk ✅
- İstatistik sayfa oluşturuldu ✅

## Known Constraints

- LocalStorage limit (~5-10 MB)
- No backend = no cloud sync
- Tema değişimi sayfa yenilemesi gerektirebilir

- Ready for Firefox, Safari (CSS compatibility)

## Performance Notes

- Shuffle (Fisher-Yates) ~O(n)
- LocalStorage getItem/setItem minimal overhead
- No lazy-loading needed (MVP)
- Flip animation smooth (CSS transform)
