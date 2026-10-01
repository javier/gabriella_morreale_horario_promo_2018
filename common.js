// Shared helpers for index.html and year.html
const DAYS = ['L', 'M', 'X', 'J', 'V'];
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

async function loadJSON(path) {
  // no-cache so edits to teachers.json etc. show up as soon as GitHub Pages redeploys
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`No se pudo cargar ${path} (${res.status})`);
  return res.json();
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

// "MATEMÁTICAS (desdoble)" -> "MATEMÁTICAS"
function subjectKey(label) {
  return label.replace(/\s*\(.*\)\s*$/, '').trim();
}

function toMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
