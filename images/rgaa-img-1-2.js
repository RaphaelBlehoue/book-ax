const ERROR_MESSAGE = "Critère 1.2 - Images décoratives', 'Aucune image trouvée sur cette page."
javascript: (function () {
  function runBookmarklet() {
    // Supprimer anciens overlays
    document.querySelectorAll('.rgaa-overlay').forEach(el => el.remove());

    const imgs = document.querySelectorAll('img');
    if (imgs.length === 0) {
      showModal(ERROR_MESSAGE);
      return;
    }

    let decorativeCount = 0;

    imgs.forEach(img => {
      const alt = img.getAttribute('alt');
      const role = img.getAttribute('role');
      const ariaHidden = img.getAttribute('aria-hidden');

      const isDecorative =
        (alt !== null && alt.trim() === '') ||
        (role && role.toLowerCase() === 'presentation') ||
        (ariaHidden && ariaHidden.toLowerCase() === 'true');

      if (isDecorative) {
        decorativeCount++;

        const rect = img.getBoundingClientRect();

        const overlay = document.createElement('div');
        overlay.className = 'rgaa-overlay';
        Object.assign(overlay.style, {
          position: 'absolute',
          left: rect.left + window.scrollX + 'px',
          top: rect.top + window.scrollY + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
          border: '3px solid #1976d2',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          zIndex: 100000
        });
        document.body.appendChild(overlay);

        // Label
        const label = document.createElement('div');
        label.textContent = '1.2 IMG: décorative';
        Object.assign(label.style, {
          position: 'absolute',
          top: (window.scrollY + rect.top - 18) + 'px',
          left: (window.scrollX + rect.left) + 'px',
          backgroundColor: '#1976d2',
          color: 'white',
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          padding: '2px 6px',
          borderRadius: '3px',
          zIndex: 100001,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          opacity: '0.95'
        });

        if (rect.top < 25) {
          label.style.top = (window.scrollY + rect.bottom + 4) + 'px';
        }

        document.body.appendChild(label);

        img.style.outline = '3px solid #2e7d32';
        img.style.outlineOffset = '2px';
        document.body.appendChild(overlay);
      }
    });

    if (decorativeCount === 0) {
      showModal('Critère 1.2 - Images décoratives',
        '❌ Aucune image décorative (alt vide, role="presentation", aria-hidden="true") trouvée.');
    } else {
      showModal('Critère 1.2 - Images décoratives',
        `✅ ${decorativeCount} image(s) décorative(s) détectée(s).<br><br>` +
        `Ces images sont encadrées en bleu et étiquetées "1.2 IMG: décorative".`);
    }
  }

  // Charger showModal si absent
  if (typeof window.showModal !== 'function') {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/gh/RaphaelBlehoue/book-ax@main/common/modal.js';
    s.onload = runBookmarklet;
    document.body.appendChild(s);
  } else {
    runBookmarklet();
  }
})();
