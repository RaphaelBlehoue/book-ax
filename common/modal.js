// modal.js
window.showModal = function (title, message) {
  const old = document.getElementById('rgaa-modal');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'rgaa-modal';
  Object.assign(overlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999999
  });

  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    background: '#fff', padding: '20px', borderRadius: '6px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)', width: '400px',
    maxHeight: '70vh', overflowY: 'auto',
    fontFamily: 'Arial, sans-serif', fontSize: '14px'
  });

  const h2 = document.createElement('h2');
  h2.textContent = title;
  h2.style.marginTop = '0';
  box.appendChild(h2);

  const content = document.createElement('div');
  content.innerHTML = message;
  box.appendChild(content);

  const close = document.createElement('button');
  close.textContent = 'Fermer';
  Object.assign(close.style, { marginTop: '15px', padding: '5px 10px', cursor: 'pointer' });
  close.onclick = () => overlay.remove();
  box.appendChild(close);

  overlay.appendChild(box);
  document.body.appendChild(overlay);
};
