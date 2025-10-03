const ERROR_MESSAGE = `Critère 1.1 - Images informatives', 'Aucune image trouvée sur cette page.`;

javascript: (function () {
  // Si showModal() n’est pas déjà présent, on charge le module commun avant de run script principal
  function runBookmarklet() {
    const imgs = document.querySelectorAll('img');
    if (imgs.length === 0) {
      showModal(ERROR_MESSAGE);
      return;
    }

    let countMissing = 0;
    imgs.forEach(img => {
      const alt = img.getAttribute('alt');
      const rect = img.getBoundingClientRect();

      // Créer overlay transparent au-dessus de l’image
      const overlay = document.createElement('div');
      overlay.className = 'rgaa-overlay';
      Object.assign(overlay.style, {
        position: 'absolute',
        left: rect.left + window.scrollX + 'px',
        top: rect.top + window.scrollY + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        border: alt ? '3px solid #2e7d32' : '3px solid #c62828', // vert ou rouge
        pointerEvents: 'none',
        boxSizing: 'border-box',
        zIndex: 100000
      });

      // Label element
      const label = document.createElement('div');
      label.textContent = alt ? `1.1 IMG: ${alt}` : '1.1 IMG: [aucun alt]';
      Object.assign(label.style, {
        position: 'absolute',
        top: (window.scrollY + rect.top - 18) + 'px',
        left: (window.scrollX + rect.left) + 'px',
        backgroundColor: alt ? '#2e7d32' : '#c62828',
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

      // Border element
      img.style.outline = alt ? '3px solid #2e7d32' : '3px solid #c62828';
      img.style.outlineOffset = '2px';
      document.body.appendChild(overlay);

      if (!alt) countMissing++;
    });

    if (countMissing === 0) {
      showModal('Critère 1.1 - Images informatives', '✅ Toutes les images possèdent un attribut alt.');
    } else {
      showModal('Critère 1.1 - Images informatives',
        `⚠️ ${countMissing} image(s) sans attribut alt détectée(s).<br><br>` +
        `Les images concernées sont encadrées en rouge et étiquetées "1.1 IMG".`);
    }
  }

  // Vérifier si showModal est disponible
  if (typeof window.showModal !== 'function') {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/gh/RaphaelBlehoue/book-ax@main/common/modal.js';
    s.onload = runBookmarklet;
    document.body.appendChild(s);
  } else {
    runBookmarklet();
  }
})();
