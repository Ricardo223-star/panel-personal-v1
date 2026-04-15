const STORAGE = {
  notes: "panel-v1-notes",
  tasks: "panel-v1-tasks",
  apiCache: "panel-v1-api-cache:"
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
  tasks: loadList(STORAGE.tasks)
};

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderLinks();
  renderNotes();
  renderTasks();
  updateHeader();
  setInterval(updateHeader, 1000);
  loadWeather(DEFAULT_WEATHER);
  loadEconomy();
});

function bindEvents() {
  $("#searchForm").addEventListener("submit", handleSearch);

  document.querySelectorAll(".quick-searches button").forEach((button) => {
    button.addEventListener("click", () => openSearch(button.dataset.query, "google"));
  });

  $("#weatherLocationButton").addEventListener("click", useCurrentLocation);
  $("#economyRefreshButton").addEventListener("click", loadEconomy);
  $("#noteForm").addEventListener("submit", addNote);
  $("#taskForm").addEventListener("submit", addTask);
  $("#notesList").addEventListener("click", handleNoteAction);
  $("#tasksList").addEventListener("click", handleTaskAction);
  $("#tasksList").addEventListener("change", handleTaskAction);
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

  $("#greetingLabel").textContent = `${greeting}. Datos rápidos para decidir sin ruido.`;
}

async function loadWeather(place) {
  setText("#weatherStatus", "Actualizando clima...");
  setText("#weatherLocation", place.label);

  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code",
    timezone: "America/Argentina/Buenos_Aires"
  });

  try {
    const result = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`, `weather-${place.latitude}-${place.longitude}`);
    renderWeather(result.data, result.cached);
  } catch (error) {
    setText("#weatherStatus", "No se pudo actualizar el clima.");
  }
}

function renderWeather(data, cached) {
  const current = data.current || {};
  const units = data.current_units || {};
  const code = Number(current.weather_code);

  setText("#weatherTemp", formatNumber(current.temperature_2m, 0, units.temperature_2m || "°C"));
  setText("#weatherSummary", WEATHER_CODES[code] || "Condición no disponible");
  setText("#weatherFeels", formatNumber(current.apparent_temperature, 0, units.apparent_temperature || "°C"));
  setText("#weatherHumidity", formatNumber(current.relative_humidity_2m, 0, units.relative_humidity_2m || "%"));
  setText("#weatherWind", formatNumber(current.wind_speed_10m, 0, units.wind_speed_10m || "km/h"));
  setText("#weatherStatus", cached ? "Mostrando último clima guardado." : `Actualizado ${formatTime(new Date())}`);
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

async function loadEconomy() {
  const marketList = $("#marketList");
  marketList.innerHTML = `<p class="empty-state">Actualizando datos...</p>`;
  setText("#economyStatus", "Consultando fuentes públicas...");

  const requests = {
    btc: fetchJson("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", "btc"),
    eth: fetchJson("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT", "eth"),
    blue: fetchJson("https://dolarapi.com/v1/dolares/blue", "dolar-blue"),
    official: fetchJson("https://dolarapi.com/v1/dolares/oficial", "dolar-oficial"),
    risk: fetchJson("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo", "riesgo-pais")
  };

  const results = await settleObject(requests);
  const rows = [];
  let cacheCount = 0;

  if (results.btc.ok) {
    cacheCount += Number(results.btc.value.cached);
    rows.push({
      name: "BTC",
      detail: "Bitcoin / USDT",
      value: formatCurrency(Number(results.btc.value.data.lastPrice), "USD", 0),
      change: formatPercent(Number(results.btc.value.data.priceChangePercent))
    });
  }

  if (results.eth.ok) {
    cacheCount += Number(results.eth.value.cached);
    rows.push({
      name: "ETH",
      detail: "Ethereum / USDT",
      value: formatCurrency(Number(results.eth.value.data.lastPrice), "USD", 0),
      change: formatPercent(Number(results.eth.value.data.priceChangePercent))
    });
  }

  if (results.blue.ok) {
    cacheCount += Number(results.blue.value.cached);
    rows.push({
      name: "Dólar blue",
      detail: "Venta / compra",
      value: formatCurrency(Number(results.blue.value.data.venta), "ARS", 0),
      change: `Compra ${formatCurrency(Number(results.blue.value.data.compra), "ARS", 0)}`
    });
  }

  if (results.official.ok) {
    cacheCount += Number(results.official.value.cached);
    rows.push({
      name: "Dólar oficial",
      detail: "Venta / compra",
      value: formatCurrency(Number(results.official.value.data.venta), "ARS", 0),
      change: `Compra ${formatCurrency(Number(results.official.value.data.compra), "ARS", 0)}`
    });
  }

  if (results.risk.ok) {
    cacheCount += Number(results.risk.value.cached);
    rows.push({
      name: "Riesgo país",
      detail: "Dato secundario",
      value: `${formatPlainNumber(Number(results.risk.value.data.valor), 0)} pb`,
      change: results.risk.value.data.fecha || ""
    });
  }

  renderMarketRows(rows);

  if (rows.length === 0) {
    setText("#economyStatus", "No se pudo actualizar economía.");
  } else if (cacheCount > 0) {
    setText("#economyStatus", "Algunos datos vienen del último guardado local.");
  } else {
    setText("#economyStatus", `Actualizado ${formatTime(new Date())}`);
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

  state.tasks.forEach((task) => {
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

async function fetchJson(url, cacheKey) {
  const storageKey = `${STORAGE.apiCache}${cacheKey}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    localStorage.setItem(storageKey, JSON.stringify({ data, savedAt: Date.now() }));
    return { data, cached: false };
  } catch (error) {
    const cached = localStorage.getItem(storageKey);
    if (!cached) throw error;

    const parsed = JSON.parse(cached);
    return { data: parsed.data, cached: true };
  }
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
