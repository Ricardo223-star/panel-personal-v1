const STORAGE = {
  notes: "panel-v1-notes",
  tasks: "panel-v1-tasks",
  apiCache: "panel-v1-api-cache:"
};

const FETCH_TIMEOUT_MS = 7000;
const CACHE_TTL = {
  weather: 30 * 60 * 1000,
  economy: 10 * 60 * 1000,
  news: 20 * 60 * 1000,
  holidays: 24 * 60 * 60 * 1000
};

const DEFAULT_WEATHER = {
  label: "Buenos Aires",
  latitude: -34.61,
  longitude: -58.38
};

const SEARCH_TARGETS = {
  google: "https://www.google.com/search?q=",
  news: "https://news.google.com/search?q=",
  maps: "https://www.google.com/maps/search/",
  youtube: "https://www.youtube.com/results?search_query=",
  tradingview: "https://www.tradingview.com/search/?query="
};

const LINKS = [
  { label: "BCRA", url: "https://www.bcra.gob.ar/" },
  { label: "Banco Nación", url: "https://www.bna.com.ar/Personas" },
  { label: "DolarApi", url: "https://dolarapi.com/" },
  { label: "TradingView", url: "https://www.tradingview.com/" },
  { label: "CoinMarketCap", url: "https://coinmarketcap.com/" },
  { label: "Google Finance", url: "https://www.google.com/finance/" },
  { label: "Mi Argentina", url: "https://www.argentina.gob.ar/miargentina" },
  { label: "ARCA", url: "https://www.arca.gob.ar/" }
];

const EMERGENCY_LINKS = [
  { label: "911", detail: "Emergencias", url: "tel:911" },
  { label: "100", detail: "Bomberos", url: "tel:100" },
  { label: "107", detail: "Emergencias médicas", url: "tel:107" },
  { label: "103", detail: "Defensa Civil", url: "tel:103" },
  { label: "144", detail: "Violencia de género", url: "tel:144" },
  { label: "135", detail: "Asistencia al suicida", url: "tel:135" }
];

const TRAVEL_LINKS = [
  { label: "Buscar vuelo", detail: "Google Flights", url: "https://www.google.com/travel/flights" },
  { label: "Ezeiza", detail: "Aeropuerto EZE", url: "https://www.aeropuertosargentina.com.ar/es/EZE" },
  { label: "Aeroparque", detail: "Aeropuerto AEP", url: "https://www.aeropuertosargentina.com.ar/es/AEP" },
  { label: "Partidas", detail: "Buscar salidas", url: "https://www.google.com/search?q=partidas+Ezeiza+Aeroparque+hoy" },
  { label: "Arribos", detail: "Buscar llegadas", url: "https://www.google.com/search?q=arribos+Ezeiza+Aeroparque+hoy" },
  { label: "Migraciones", detail: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/interior/migraciones" }
];

const TREND_LINKS = [
  { label: "Tendencias", detail: "X / Twitter", url: "https://x.com/explore/tabs/trending" },
  { label: "Argentina", detail: "Búsqueda en X", url: "https://x.com/search?q=Argentina&src=typed_query&f=live" },
  { label: "Dólar", detail: "Búsqueda en X", url: "https://x.com/search?q=d%C3%B3lar%20Argentina&src=typed_query&f=live" },
  { label: "BTC", detail: "Búsqueda en X", url: "https://x.com/search?q=BTC&src=typed_query&f=live" }
];

const NEWS_RSS_URL = "https://news.google.com/rss?hl=es-419&gl=AR&ceid=AR:es-419";
const NEWS_PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(NEWS_RSS_URL)}`;

const NEWS_FALLBACK_LINKS = [
  { label: "Google News", detail: "Portada Argentina", url: "https://news.google.com/topstories?hl=es-419&gl=AR&ceid=AR:es-419" },
  { label: "Economía", detail: "Noticias recientes", url: "https://news.google.com/search?q=econom%C3%ADa%20Argentina&hl=es-419&gl=AR&ceid=AR:es-419" },
  { label: "Mercados", detail: "Dólar, cripto y bolsa", url: "https://news.google.com/search?q=d%C3%B3lar%20cripto%20acciones%20Argentina&hl=es-419&gl=AR&ceid=AR:es-419" },
  { label: "Mundo", detail: "Titulares globales", url: "https://news.google.com/search?q=mundo&hl=es-419&gl=AR&ceid=AR:es-419" }
];

const STATIC_HOLIDAYS = {
  2026: [
    { fecha: "2026-01-01", nombre: "Año Nuevo" },
    { fecha: "2026-02-16", nombre: "Carnaval" },
    { fecha: "2026-02-17", nombre: "Carnaval" },
    { fecha: "2026-03-23", nombre: "Feriado turístico" },
    { fecha: "2026-03-24", nombre: "Día de la Memoria" },
    { fecha: "2026-04-02", nombre: "Malvinas" },
    { fecha: "2026-04-03", nombre: "Viernes Santo" },
    { fecha: "2026-05-01", nombre: "Día del Trabajador" },
    { fecha: "2026-05-25", nombre: "Revolución de Mayo" },
    { fecha: "2026-06-15", nombre: "General Martín Güemes" },
    { fecha: "2026-06-20", nombre: "General Manuel Belgrano" },
    { fecha: "2026-07-09", nombre: "Día de la Independencia" },
    { fecha: "2026-07-10", nombre: "Feriado turístico" },
    { fecha: "2026-08-17", nombre: "General José de San Martín" },
    { fecha: "2026-10-12", nombre: "Diversidad Cultural" },
    { fecha: "2026-11-23", nombre: "Soberanía Nacional" },
    { fecha: "2026-12-07", nombre: "Feriado turístico" },
    { fecha: "2026-12-08", nombre: "Inmaculada Concepción" },
    { fecha: "2026-12-25", nombre: "Navidad" }
  ]
};

const WEATHER_CODES = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna leve",
  53: "Llovizna",
  55: "Llovizna intensa",
  61: "Lluvia leve",
  63: "Lluvia",
  65: "Lluvia intensa",
  80: "Chaparrones leves",
  81: "Chaparrones",
  82: "Chaparrones intensos",
  95: "Tormenta"
};

const state = {
  notes: loadList(STORAGE.notes),
  tasks: loadList(STORAGE.tasks),
  calendarDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  holidaysByYear: {}
};

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderLinks();
  renderQuickLinks("#emergencyList", EMERGENCY_LINKS);
  renderQuickLinks("#travelList", TRAVEL_LINKS);
  renderQuickLinks("#trendsList", TREND_LINKS);
  renderNotes();
  renderTasks();
  updateHeader();
  setInterval(updateHeader, 1000);
  loadWeather(DEFAULT_WEATHER);
  loadEconomy();
  loadNewsHeadlines();
  setupCalendar();
});

function bindEvents() {
  $("#searchForm").addEventListener("submit", handleSearch);

  document.querySelectorAll(".quick-searches button").forEach((button) => {
    button.addEventListener("click", () => openSearch(button.dataset.query, "google"));
  });

  $("#weatherLocationButton").addEventListener("click", useCurrentLocation);
  $("#economyRefreshButton").addEventListener("click", () => loadEconomy({ forceRefresh: true }));
  $("#noteForm").addEventListener("submit", addNote);
  $("#taskForm").addEventListener("submit", addTask);
  $("#notesList").addEventListener("click", handleNoteAction);
  $("#tasksList").addEventListener("click", handleTaskAction);
  $("#tasksList").addEventListener("change", handleTaskAction);
  $("#previousMonthButton").addEventListener("click", () => changeCalendarMonth(-1));
  $("#nextMonthButton").addEventListener("click", () => changeCalendarMonth(1));
  $("#exportBackupButton").addEventListener("click", exportBackup);
  $("#importBackupButton").addEventListener("click", () => $("#backupFileInput").click());
  $("#backupFileInput").addEventListener("change", importBackup);
}

function updateHeader() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Buen día" : hour < 20 ? "Buenas tardes" : "Buenas noches";

  $("#dateLabel").textContent = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);

  $("#clockLabel").textContent = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);

  $("#greetingLabel").textContent = `${greeting}. Clima, mercado y notas en un vistazo.`;
}

async function loadWeather(place, options = {}) {
  setText("#weatherStatus", "Actualizando clima...");
  setText("#weatherLocation", place.label);
  setText("#summaryWeatherMeta", place.label);

  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code",
    timezone: "America/Argentina/Buenos_Aires"
  });

  try {
    const result = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`, `weather-${place.latitude}-${place.longitude}`, {
      ttlMs: CACHE_TTL.weather,
      forceRefresh: options.forceRefresh
    });
    renderWeather(result.data, result, place.label);
  } catch (error) {
    setText("#weatherStatus", "No se pudo actualizar el clima.");
    setText("#summaryWeather", "--");
    setText("#summaryWeatherMeta", "Sin datos");
  }
}

function renderWeather(data, cacheInfo, placeLabel) {
  const current = data.current || {};
  const units = data.current_units || {};
  const code = Number(current.weather_code);
  const summary = WEATHER_CODES[code] || "Condición no disponible";

  setText("#weatherTemp", formatNumber(current.temperature_2m, 0, units.temperature_2m || "°C"));
  setText("#weatherSummary", summary);
  setText("#weatherFeels", formatNumber(current.apparent_temperature, 0, units.apparent_temperature || "°C"));
  setText("#weatherHumidity", formatNumber(current.relative_humidity_2m, 0, units.relative_humidity_2m || "%"));
  setText("#weatherWind", formatNumber(current.wind_speed_10m, 0, units.wind_speed_10m || "km/h"));
  setText("#weatherStatus", cacheStatusText(cacheInfo, "clima"));
  setText("#summaryWeather", formatTemperatureShort(current.temperature_2m));
  setText("#summaryWeatherMeta", `${placeLabel}: ${summary}`);
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    setText("#weatherStatus", "Este navegador no permite ubicación.");
    return;
  }

  setText("#weatherStatus", "Buscando ubicación...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      loadWeather({
        label: "Mi ubicación",
        latitude: Number(position.coords.latitude.toFixed(3)),
        longitude: Number(position.coords.longitude.toFixed(3))
      });
    },
    () => setText("#weatherStatus", "No se pudo usar la ubicación. Sigue Buenos Aires."),
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 900000 }
  );
}

async function loadEconomy(options = {}) {
  const marketList = $("#marketList");
  marketList.innerHTML = `<p class="empty-state">Actualizando datos...</p>`;
  setText("#economyStatus", "Consultando fuentes públicas...");

  const requests = {
    btc: fetchJson("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", "btc", {
      ttlMs: CACHE_TTL.economy,
      forceRefresh: options.forceRefresh
    }),
    eth: fetchJson("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT", "eth", {
      ttlMs: CACHE_TTL.economy,
      forceRefresh: options.forceRefresh
    }),
    blue: fetchJson("https://dolarapi.com/v1/dolares/blue", "dolar-blue", {
      ttlMs: CACHE_TTL.economy,
      forceRefresh: options.forceRefresh
    }),
    official: fetchJson("https://dolarapi.com/v1/dolares/oficial", "dolar-oficial", {
      ttlMs: CACHE_TTL.economy,
      forceRefresh: options.forceRefresh
    }),
    risk: fetchJson("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo", "riesgo-pais", {
      ttlMs: CACHE_TTL.economy,
      forceRefresh: options.forceRefresh
    })
  };

  const results = await settleObject(requests);
  const rows = [];

  if (results.btc.ok) {
    rows.push({
      name: "BTC",
      detail: "Bitcoin / USDT",
      value: formatCurrency(Number(results.btc.value.data.lastPrice), "USD", 0),
      change: formatPercent(Number(results.btc.value.data.priceChangePercent))
    });
  }

  if (results.eth.ok) {
    rows.push({
      name: "ETH",
      detail: "Ethereum / USDT",
      value: formatCurrency(Number(results.eth.value.data.lastPrice), "USD", 0),
      change: formatPercent(Number(results.eth.value.data.priceChangePercent))
    });
  }

  if (results.blue.ok) {
    rows.push({
      name: "Dólar blue",
      detail: "Venta / compra",
      value: formatCurrency(Number(results.blue.value.data.venta), "ARS", 0),
      change: `Compra ${formatCurrency(Number(results.blue.value.data.compra), "ARS", 0)}`
    });
  }

  if (results.official.ok) {
    rows.push({
      name: "Dólar oficial",
      detail: "Venta / compra",
      value: formatCurrency(Number(results.official.value.data.venta), "ARS", 0),
      change: `Compra ${formatCurrency(Number(results.official.value.data.compra), "ARS", 0)}`
    });
  }

  if (results.risk.ok) {
    rows.push({
      name: "Riesgo país",
      detail: "Dato secundario",
      value: `${formatPlainNumber(Number(results.risk.value.data.valor), 0)} pb`,
      change: results.risk.value.data.fecha || ""
    });
  }

  renderMarketRows(rows);
  updateEconomySummary(results);

  if (rows.length === 0) {
    setText("#economyStatus", "No se pudo actualizar economía.");
  } else {
    setText("#economyStatus", batchCacheStatusText(results, "economía"));
  }
}

function renderMarketRows(rows) {
  const marketList = $("#marketList");

  if (!rows.length) {
    marketList.innerHTML = `<p class="empty-state">Sin datos disponibles.</p>`;
    return;
  }

  marketList.innerHTML = "";
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "market-row";

    const label = document.createElement("div");
    const name = document.createElement("strong");
    const detail = document.createElement("small");
    name.textContent = row.name;
    detail.textContent = row.detail;
    label.append(name, detail);

    const valueBox = document.createElement("div");
    valueBox.className = "market-value";
    const value = document.createElement("span");
    const change = document.createElement("small");
    change.className = `market-change ${getChangeClass(row.change)}`;
    value.textContent = row.value;
    change.textContent = row.change;
    valueBox.append(value, change);

    item.append(label, valueBox);
    marketList.append(item);
  });
}

function updateEconomySummary(results) {
  if (results.btc.ok) {
    const data = results.btc.value.data;
    setSummary("#summaryBtc", "#summaryBtcMeta", formatCurrency(Number(data.lastPrice), "USD", 0), formatPercent(Number(data.priceChangePercent)));
  } else {
    setSummary("#summaryBtc", "#summaryBtcMeta", "--", "Sin datos");
  }

  if (results.eth.ok) {
    const data = results.eth.value.data;
    setSummary("#summaryEth", "#summaryEthMeta", formatCurrency(Number(data.lastPrice), "USD", 0), formatPercent(Number(data.priceChangePercent)));
  } else {
    setSummary("#summaryEth", "#summaryEthMeta", "--", "Sin datos");
  }

  if (results.blue.ok) {
    const data = results.blue.value.data;
    setSummary("#summaryDollar", "#summaryDollarMeta", formatCurrency(Number(data.venta), "ARS", 0), `Compra ${formatCurrency(Number(data.compra), "ARS", 0)}`);
  } else {
    setSummary("#summaryDollar", "#summaryDollarMeta", "--", "Sin datos");
  }
}

function setSummary(valueSelector, metaSelector, value, meta) {
  const valueElement = $(valueSelector);
  const metaElement = $(metaSelector);
  valueElement.textContent = value;
  metaElement.textContent = meta;
  valueElement.className = getChangeClass(meta);
  metaElement.className = getChangeClass(meta);
}

function addNote(event) {
  event.preventDefault();
  const input = $("#noteInput");
  const text = input.value.trim();

  if (!text) return;

  state.notes.unshift({
    id: makeId(),
    text,
    createdAt: new Date().toISOString()
  });

  input.value = "";
  saveList(STORAGE.notes, state.notes);
  renderNotes();
}

function renderNotes() {
  const list = $("#notesList");
  list.innerHTML = "";

  if (!state.notes.length) {
    list.innerHTML = `<p class="empty-state">Sin notas guardadas.</p>`;
    return;
  }

  state.notes.forEach((note) => {
    const item = document.createElement("article");
    item.className = "note-item";

    const text = document.createElement("p");
    text.textContent = note.text;

    const meta = document.createElement("span");
    meta.className = "note-meta";
    meta.textContent = formatDateTime(note.createdAt);

    const actions = document.createElement("div");
    actions.className = "item-actions";
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.deleteNote = note.id;
    button.textContent = "Borrar";
    actions.append(button);

    item.append(text, meta, actions);
    list.append(item);
  });
}

function handleNoteAction(event) {
  const noteId = event.target.dataset.deleteNote;
  if (!noteId) return;

  state.notes = state.notes.filter((note) => note.id !== noteId);
  saveList(STORAGE.notes, state.notes);
  renderNotes();
}

function addTask(event) {
  event.preventDefault();
  const input = $("#taskInput");
  const text = input.value.trim();

  if (!text) return;

  state.tasks.unshift({
    id: makeId(),
    text,
    done: false
  });

  input.value = "";
  saveList(STORAGE.tasks, state.tasks);
  renderTasks();
}

function renderTasks() {
  const list = $("#tasksList");
  list.innerHTML = "";

  if (!state.tasks.length) {
    list.innerHTML = `<p class="empty-state">Sin tareas pendientes.</p>`;
    return;
  }

  const orderedTasks = [...state.tasks].sort((a, b) => Number(a.done) - Number(b.done));

  orderedTasks.forEach((task) => {
    const item = document.createElement("article");
    item.className = `task-item ${task.done ? "done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.dataset.toggleTask = task.id;
    checkbox.setAttribute("aria-label", `Marcar ${task.text}`);

    const text = document.createElement("p");
    text.textContent = task.text;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "task-delete";
    button.dataset.deleteTask = task.id;
    button.textContent = "Borrar";

    item.append(checkbox, text, button);
    list.append(item);
  });
}

function handleTaskAction(event) {
  const deleteId = event.target.dataset.deleteTask;
  const toggleId = event.target.dataset.toggleTask;

  if (deleteId) {
    state.tasks = state.tasks.filter((task) => task.id !== deleteId);
  }

  if (toggleId) {
    state.tasks = state.tasks.map((task) => (
      task.id === toggleId ? { ...task, done: event.target.checked } : task
    ));
  }

  if (deleteId || toggleId) {
    saveList(STORAGE.tasks, state.tasks);
    renderTasks();
  }
}

function exportBackup() {
  const payload = {
    app: "mi-panel",
    version: 1,
    exportedAt: new Date().toISOString(),
    notes: state.notes,
    tasks: state.tasks
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mi-panel-backup-${dateKeyFromDate(new Date())}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  setText("#backupStatus", "Backup exportado con notas y tareas.");
}

async function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data.notes) || !Array.isArray(data.tasks)) {
      throw new Error("Formato inválido");
    }

    const notes = normalizeBackupNotes(data.notes);
    const tasks = normalizeBackupTasks(data.tasks);

    const confirmed = confirm(`Esto reemplaza tus datos actuales por ${notes.length} notas y ${tasks.length} tareas del backup. ¿Continuar?`);
    if (!confirmed) {
      setText("#backupStatus", "Importación cancelada.");
      return;
    }

    state.notes = notes;
    state.tasks = tasks;
    saveList(STORAGE.notes, state.notes);
    saveList(STORAGE.tasks, state.tasks);
    renderNotes();
    renderTasks();
    setText("#backupStatus", "Backup importado correctamente.");
  } catch (error) {
    setText("#backupStatus", "No se pudo importar el archivo JSON.");
  } finally {
    event.target.value = "";
  }
}

function normalizeBackupNotes(notes) {
  if (!Array.isArray(notes)) return [];

  return notes
    .map((note) => ({
      id: String(note.id || makeId()),
      text: String(note.text || "").trim(),
      createdAt: isValidDate(note.createdAt) ? note.createdAt : new Date().toISOString()
    }))
    .filter((note) => note.text);
}

function normalizeBackupTasks(tasks) {
  if (!Array.isArray(tasks)) return [];

  return tasks
    .map((task) => ({
      id: String(task.id || makeId()),
      text: String(task.text || "").trim(),
      done: Boolean(task.done)
    }))
    .filter((task) => task.text);
}

function renderLinks() {
  const list = $("#linksList");
  list.innerHTML = "";

  LINKS.forEach((link) => {
    const item = document.createElement("a");
    item.href = link.url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    item.textContent = link.label;
    list.append(item);
  });
}

function renderQuickLinks(selector, links) {
  const list = $(selector);
  list.innerHTML = "";

  links.forEach((link) => {
    const item = document.createElement("a");
    item.href = link.url;

    if (!link.url.startsWith("tel:")) {
      item.target = "_blank";
      item.rel = "noopener noreferrer";
    }

    const label = document.createElement("strong");
    const detail = document.createElement("span");
    label.textContent = link.label;
    detail.textContent = link.detail;
    item.append(label, detail);
    list.append(item);
  });
}

async function loadNewsHeadlines() {
  setText("#newsStatus", "Buscando titulares...");

  try {
    const result = await fetchText(NEWS_PROXY_URL, "news-headlines", {
      ttlMs: CACHE_TTL.news
    });
    const headlines = parseNewsRss(result.data);

    if (!headlines.length) throw new Error("Sin titulares");

    renderNewsHeadlines(headlines, result);
  } catch (error) {
    renderNewsFallback();
  }
}

function parseNewsRss(xmlText) {
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  if (xml.querySelector("parsererror")) return [];

  return [...xml.querySelectorAll("item")].slice(0, 5).map((item) => ({
    title: cleanNewsTitle(item.querySelector("title")?.textContent || "Titular"),
    source: item.querySelector("source")?.textContent || "Google News",
    url: item.querySelector("link")?.textContent || "https://news.google.com/",
    date: item.querySelector("pubDate")?.textContent || ""
  }));
}

function cleanNewsTitle(title) {
  return title.replace(/\s+-\s+[^-]+$/, "").trim();
}

function renderNewsHeadlines(headlines, cacheInfo) {
  const list = $("#newsList");
  list.innerHTML = "";

  headlines.forEach((headline) => {
    const item = document.createElement("a");
    item.href = headline.url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";

    const title = document.createElement("strong");
    const meta = document.createElement("span");
    title.textContent = headline.title;
    meta.textContent = [headline.source, formatNewsDate(headline.date)].filter(Boolean).join(" · ");
    item.append(title, meta);
    list.append(item);
  });

  setText("#newsStatus", cacheStatusText(cacheInfo, "noticias"));
}

function renderNewsFallback() {
  const list = $("#newsList");
  list.innerHTML = "";

  NEWS_FALLBACK_LINKS.forEach((link) => {
    const item = document.createElement("a");
    item.href = link.url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";

    const label = document.createElement("strong");
    const detail = document.createElement("span");
    label.textContent = link.label;
    detail.textContent = link.detail;
    item.append(label, detail);
    list.append(item);
  });

  setText("#newsStatus", "No se cargaron titulares automáticos. Quedan accesos directos.");
}

async function setupCalendar() {
  renderCalendar();
  await loadHolidaysForYear(state.calendarDate.getFullYear());
  renderCalendar();
}

async function changeCalendarMonth(offset) {
  const current = state.calendarDate;
  state.calendarDate = new Date(current.getFullYear(), current.getMonth() + offset, 1);
  renderCalendar();
  await loadHolidaysForYear(state.calendarDate.getFullYear());
  renderCalendar();
}

async function loadHolidaysForYear(year) {
  if (state.holidaysByYear[year]) return;

  setText("#calendarStatus", "Cargando feriados...");

  try {
    const result = await fetchJson(`https://api.argentinadatos.com/v1/feriados/${year}`, `holidays-${year}`, {
      ttlMs: CACHE_TTL.holidays
    });
    state.holidaysByYear[year] = normalizeHolidays(result.data);
    setText("#calendarStatus", cacheStatusText(result, "feriados"));
  } catch (error) {
    state.holidaysByYear[year] = normalizeHolidays(STATIC_HOLIDAYS[year] || []);
    setText("#calendarStatus", state.holidaysByYear[year].length
      ? "Feriados cargados desde respaldo local."
      : "No hay feriados cargados para este año.");
  }
}

function normalizeHolidays(holidays) {
  if (!Array.isArray(holidays)) return [];

  return holidays
    .map((holiday) => ({
      fecha: holiday.fecha,
      nombre: holiday.nombre || holiday.motivo || "Feriado"
    }))
    .filter((holiday) => /^\d{4}-\d{2}-\d{2}$/.test(holiday.fecha));
}

function renderCalendar() {
  const viewDate = state.calendarDate;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const holidays = state.holidaysByYear[year] || normalizeHolidays(STATIC_HOLIDAYS[year] || []);
  const holidayMap = new Map(holidays.map((holiday) => [holiday.fecha, holiday]));
  const daysContainer = $("#calendarDays");

  $("#calendarMonth").textContent = formatMonthLabel(viewDate);
  daysContainer.innerHTML = "";

  const firstWeekday = mondayFirstDay(new Date(year, month, 1).getDay());
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstWeekday; i += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    daysContainer.append(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const key = dateKey(year, month, day);
    const holiday = holidayMap.get(key);
    const item = document.createElement("div");
    item.className = "calendar-day";
    item.textContent = day;

    if (isToday(year, month, day)) item.classList.add("today");

    if (holiday) {
      item.classList.add("holiday");
      item.title = holiday.nombre;
      item.setAttribute("aria-label", `${day}, ${holiday.nombre}`);
    }

    daysContainer.append(item);
  }

  renderHolidayList(holidays.filter((holiday) => {
    const parts = holiday.fecha.split("-");
    return Number(parts[0]) === year && Number(parts[1]) === month + 1;
  }));
  renderNextHoliday(holidays);
}

function renderHolidayList(monthHolidays) {
  const list = $("#holidayList");
  list.innerHTML = "";

  if (!monthHolidays.length) {
    list.innerHTML = `<p class="empty-state">Sin feriados cargados para este mes.</p>`;
    return;
  }

  monthHolidays.forEach((holiday) => {
    const parts = holiday.fecha.split("-");
    const item = document.createElement("div");
    item.className = "holiday-item";

    const day = document.createElement("strong");
    const name = document.createElement("span");
    day.textContent = parts[2];
    name.textContent = holiday.nombre;
    item.append(day, name);
    list.append(item);
  });
}

function renderNextHoliday(holidays) {
  const todayKey = dateKeyFromDate(new Date());
  const next = [...holidays]
    .filter((holiday) => holiday.fecha >= todayKey)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

  setText("#nextHolidayLine", next
    ? `Próximo feriado: ${formatHolidayDate(next.fecha)} · ${next.nombre}`
    : "Próximo feriado: sin datos cargados.");
}

function handleSearch(event) {
  event.preventDefault();
  const query = $("#searchInput").value.trim();
  const target = $("#searchTarget").value;
  openSearch(query, target);
}

function openSearch(query, target) {
  if (!query) return;
  const base = SEARCH_TARGETS[target] || SEARCH_TARGETS.google;
  window.open(`${base}${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
}

async function fetchJson(url, cacheKey, options = {}) {
  return fetchWithCache(url, cacheKey, { ...options, responseType: "json" });
}

async function fetchText(url, cacheKey, options = {}) {
  return fetchWithCache(url, cacheKey, { ...options, responseType: "text" });
}

async function fetchWithCache(url, cacheKey, options = {}) {
  const storageKey = `${STORAGE.apiCache}${cacheKey}`;
  const cached = readCache(storageKey);
  const ttlMs = options.ttlMs || 0;

  if (!options.forceRefresh && cached && isCacheFresh(cached, ttlMs)) {
    return {
      data: cached.data,
      source: "cache",
      cached: true,
      stale: false,
      savedAt: cached.savedAt
    };
  }

  try {
    const response = await fetchWithTimeout(url, { cache: "no-store" }, options.timeoutMs || FETCH_TIMEOUT_MS);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = options.responseType === "text" ? await response.text() : await response.json();
    localStorage.setItem(storageKey, JSON.stringify({ data, savedAt: Date.now() }));
    return {
      data,
      source: "network",
      cached: false,
      stale: false,
      savedAt: Date.now()
    };
  } catch (error) {
    if (!cached) throw error;

    return {
      data: cached.data,
      source: "stale",
      cached: true,
      stale: true,
      savedAt: cached.savedAt,
      error
    };
  }
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function readCache(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || !("data" in parsed) || !parsed.savedAt) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function isCacheFresh(cached, ttlMs) {
  if (!ttlMs) return false;
  return Date.now() - Number(cached.savedAt) <= ttlMs;
}

async function settleObject(requests) {
  const entries = Object.entries(requests);
  const settled = await Promise.allSettled(entries.map(([, promise]) => promise));

  return entries.reduce((acc, [key], index) => {
    const result = settled[index];
    acc[key] = result.status === "fulfilled"
      ? { ok: true, value: result.value }
      : { ok: false, error: result.reason };
    return acc;
  }, {});
}

function loadList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setText(selector, value) {
  $(selector).textContent = value;
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCurrency(value, currency, digits) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: digits
  }).format(value);
}

function formatNumber(value, digits, suffix) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return `${formatPlainNumber(number, digits)} ${suffix}`;
}

function formatTemperatureShort(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return `${formatPlainNumber(number, 0)}°`;
}

function formatPlainNumber(value, digits) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: digits
  }).format(value);
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "--";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}% 24h`;
}

function getChangeClass(value) {
  if (typeof value !== "string") return "";
  if (value.startsWith("+")) return "up";
  if (value.startsWith("-")) return "down";
  return "";
}

function cacheStatusText(cacheInfo, label) {
  if (cacheInfo.source === "network") return `${capitalize(label)} actualizado ${formatTime(new Date())}.`;
  if (cacheInfo.source === "cache") return `${capitalize(label)} desde cache reciente.`;
  if (cacheInfo.source === "stale") return `${capitalize(label)} desde backup local por falla de conexión.`;
  return `${capitalize(label)} sin estado.`;
}

function batchCacheStatusText(results, label) {
  const entries = Object.values(results);
  const values = entries.filter((result) => result.ok).map((result) => result.value);
  const hasFailure = entries.some((result) => !result.ok);
  if (!values.length) return `No se pudo actualizar ${label}.`;
  if (values.some((value) => value.source === "stale")) return `${capitalize(label)} con algunos datos de backup local.`;
  if (hasFailure) return `${capitalize(label)} actualizado parcialmente.`;
  if (values.every((value) => value.source === "cache")) return `${capitalize(label)} desde cache reciente.`;
  if (values.some((value) => value.source === "cache")) return `${capitalize(label)} actualizado parcialmente; algunos datos venían de cache.`;
  return `${capitalize(label)} actualizado ${formatTime(new Date())}.`;
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateKeyFromDate(date) {
  return dateKey(date.getFullYear(), date.getMonth(), date.getDate());
}

function mondayFirstDay(day) {
  return day === 0 ? 6 : day - 1;
}

function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatHolidayDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long"
  }).format(new Date(year, month - 1, day));
}

function formatNewsDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const today = dateKeyFromDate(new Date());
  const itemDay = dateKeyFromDate(date);

  if (today === itemDay) {
    return new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit"
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function isValidDate(value) {
  return value && !Number.isNaN(new Date(value).getTime());
}
