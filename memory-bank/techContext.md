# Tech Context

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Material Symbols (Google Fonts)
- **Font**: Inter (Google Fonts)
- **Storage**: Browser LocalStorage
- **Data Format**: JSON

## Development Setup

- Dosya yapısı:
  ```
  /
  ├── index.html (Ana sayfa)
  ├── workpage.html (Çalışma sayfası)
  ├── js/
  │   ├── app.js (Ana logic)
  │   ├── utils.js (Helper functions)
  │   └── storage.js (LocalStorage management)
  ├── css/
  │   └── style.css (Custom styles)
  └── memory-bank/ (Dokumentasyon)
  ```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage desteği gerekli
- CSS Grid/Flexbox desteği gerekli

## Tailwind Configuration

```javascript
{
  darkMode: "class",
  colors: {
    primary: "#38bdf8" (Sky Blue)
    background-dark: "#111827"
    card-dark: "#1f2937"
    border-dark: "#374151"
  }
}
```

## JavaScript Requirements

- UUID generation (simple implementation veya library)
- Date manipulation (native Date object)
- Array operations (filter, map, sort)
- LocalStorage API
- JSON stringify/parse

## Animation Requirements

- Flip card animation (CSS transform + JavaScript)
- Smooth transitions
- Mobile-friendly (tap support)

## Performance Considerations

- LocalStorage yazma/okuma optimize edilmeli
- Kartlar lazy-load edilebilir (ilerde)
- Shuffle algorithm efficient olmalı

## Deployment

- Static hosting (GitHub Pages, Vercel, Netlify vb.)
- HTTPS gerekli (LocalStorage güvenliği için)
- No backend required
