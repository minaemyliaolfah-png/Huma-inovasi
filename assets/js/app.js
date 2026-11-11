"use strict";

const API_URL = APP_CONFIG.apiUrl.trim();
const SECTIONS = {
  modul: [
    "Modul Ajar / RPP Inovatif",
    "Rancangan pembelajaran, integrasi teknologi, dan metode AI yang digunakan.",
  ],
  video: [
    "Video Praktik Pembelajaran",
    "Rekaman interaksi mengajar nyata, maksimal lima menit.",
  ],
  karya: [
    "Hasil Karya Bersama Murid",
    "Produk siswa atau hasil evaluasi belajar beserta proses pembuatannya.",
  ],
  refleksi: [
    "Refleksi & Evaluasi",
    "Hasil pelaksanaan, analisis efektivitas mengajar, dan tindak lanjut.",
  ],
};
const state = {
  data: null,
  token: "",
  adminTab: "program",
  busy: false,
  filter: "",
  search: "",
  notice: "",
};
const $ = (id) => document.getElementById(id);
const demo =
  !API_URL &&
  ["", "localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
let demoData = structuredClone(SEED);
let draft = null;
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
const link = (label, href, cls = "btn") => {
  const n = el("a", cls, label);
  n.href = href;
  return n;
};
function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : "";
  } catch {
    return "";
  }
}
function external(label, url, cls = "btn") {
  const n = link(label, safeUrl(url), cls);
  n.target = "_blank";
  n.rel = "noopener noreferrer";
  return n;
}
function button(label, handler, cls = "btn") {
  const n = el("button", cls, label);
  n.type = "button";
  n.onclick = handler;
  return n;
}
function ytId(value) {
  try {
    const u = new URL(value);
    const host = u.hostname.replace(/^(www\.|m\.|music\.)/, "");
    const p = u.pathname.split("/");
    let id = "";
    if (host === "youtu.be") id = p[1];
    else if (["youtube.com", "youtube-nocookie.com"].includes(host))
      id =
        u.pathname === "/watch"
          ? u.searchParams.get("v")
          : ["shorts", "live", "embed"].includes(p[1])
            ? p[2]
            : "";
    return /^[\w-]{11}$/.test(id || "") ? id : "";
  } catch {
    return "";
  }
}
function driveFile(value) {
  try {
    const safe = safeUrl(value);
    if (!safe) return null;
    const u = new URL(safe);
    if (u.hostname !== "drive.google.com") return null;
    const pathId = (u.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/) || [])[1];
    const queryId = ["/open", "/uc", "/thumbnail"].includes(u.pathname)
      ? u.searchParams.get("id")
      : "";
    const id = pathId || queryId;
    if (!/^[\w-]+$/.test(id || "")) return null;
    return { id, resourceKey: u.searchParams.get("resourcekey") || "" };
  } catch {
    return null;
  }
}
function driveUrl(file, preview = false) {
  const url = new URL(
    preview
      ? "https://drive.google.com/file/d/" + file.id + "/preview"
      : "https://drive.google.com/thumbnail",
  );
  if (!preview) {
    url.searchParams.set("id", file.id);
    url.searchParams.set("sz", "w1200");
  }
  if (file.resourceKey) url.searchParams.set("resourcekey", file.resourceKey);
  return url.href;
}
function thumbnailUrl(value) {
  const file = driveFile(value);
  if (file) return driveUrl(file);
  const url = safeUrl(value);
  if (url && new URL(url).hostname === "drive.google.com") return "";
  return url;
}
function previewUrl(value) {
  const file = driveFile(value);
  if (file) return driveUrl(file, true);
  const u = safeUrl(value);
  if (u && /\.pdf(?:[?#]|$)/i.test(u)) return u;
  return "";
}
function art(index = 0) {
  const palettes = [
    ["#234a62", "#a7d3c7", "#f0c58d"],
    ["#334e79", "#d2dcf2", "#8ebfb9"],
    ["#305d5c", "#b0d2b5", "#e5d7a9"],
  ];
  const [bg, a, b] = palettes[index % 3];
  const box = el("div");
  box.innerHTML = `<svg class="art" viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="520" height="360" fill="${bg}"/><g fill="none" stroke="${a}" opacity=".2"><circle cx="260" cy="180" r="150"/><circle cx="260" cy="180" r="120"/><path d="M0 180h520M260 0v360"/></g><g transform="translate(114 62) rotate(-8 150 120)"><rect x="16" y="22" width="288" height="215" rx="14" fill="#102b43" opacity=".4"/><rect width="288" height="215" rx="14" fill="${a}"/><rect x="22" y="22" width="244" height="171" rx="7" fill="${bg}"/><path d="M58 136V85l64-22 62 22v51l-62 25-64-25Zm64-73v98m-64-76 64 25 62-25" fill="none" stroke="${b}" stroke-width="3"/><path d="M207 69h32m-32 16h23m-23 18h32m-32 49h32m-32 16h23" stroke="${a}" stroke-width="4" stroke-linecap="round"/></g><circle cx="405" cy="84" r="23" fill="${b}"/><path d="M399 84h12m-6-6v12" stroke="${bg}" stroke-width="2"/><circle cx="85" cy="281" r="5" fill="${a}"/><path d="m408 277 10 17h-20Z" fill="${a}"/></svg>`;
  return box.firstChild;
}
function cover(program, index = 0, onStatus) {
  const box = el("div", "cover");
  box.append(art(index));
  const url = thumbnailUrl(program.cover);
  if (url) {
    const image = el("img");
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.onload = () => {
      box.classList.add("has-photo");
      if (onStatus) onStatus(true);
    };
    image.onerror = () => {
      image.remove();
      if (onStatus) onStatus(false);
    };
    image.src = url;
    box.append(image);
  }
  return box;
}
function sectionHeading(kicker, title, desc = "") {
  const box = el("div", "section-heading");
  const copy = el("div");
  copy.append(el("p", "eyebrow", kicker), el("h2", "", title));
  box.append(copy);
  if (desc) box.append(el("p", "", desc));
  return box;
}
function empty(title, text) {
  const box = el("div", "empty");
  box.append(el("strong", "", title), el("span", "", text));
  return box;
}
function programEvidence(id) {
  return state.data.evidence.filter((e) => e.programId === id);
}
function programCard(program, index) {
  const card = link("", "#praktik/" + program.id, "card card-link");
  card.style.setProperty(
    "--accent",
    ["#176c68", "#345a88", "#8a6240"][index % 3],
  );
  const body = el("div", "card-body");
  const label = el("div", "card-label");
  label.append(
    el("span", "card-index", String(index + 1).padStart(2, "0")),
    el("span", "pill", program.short),
  );
  body.append(label, el("h3", "", program.title), el("p", "", program.summary));
  const bottom = el("div", "bottom");
  bottom.append(
    el("span", "", "Lihat praktik baik"),
    el("span", "arrow", "↗"),
  );
  const evidence = programEvidence(program.id);
  const completed = Object.keys(SECTIONS).filter((key) =>
    evidence.some((item) => item.section === key),
  ).length;
  const availability = el("div", "availability");
  const dots = el("span", "evidence-dots");
  dots.setAttribute("aria-hidden", "true");
  Object.keys(SECTIONS).forEach((key) =>
    dots.append(
      el("span", evidence.some((item) => item.section === key) ? "filled" : ""),
    ),
  );
  availability.append(
    dots,
    el(
      "span",
      "count",
      completed
        ? completed + " dari 4 bagian bukti tersedia"
        : "Bukti sedang dilengkapi",
    ),
  );
  body.append(availability, bottom);
  card.append(cover(program, index), body);
  return card;
}
function innovationCollection() {
  const section = el("section", "section");
  section.id = "inovasi";
  section.append(
    sectionHeading(
      "Praktik baik",
      "Daftar inovasi",
      "Pilih inovasi untuk melihat penjelasan dan bukti implementasi.",
    ),
  );
  const search = el("input", "field");
  search.type = "search";
  search.placeholder = "Cari inovasi…";
  search.setAttribute("aria-label", "Cari inovasi pembelajaran");
  const results = el("p", "meta");
  results.setAttribute("role", "status");
  const list = el("div", "innovation-list");
  function update() {
    const term = search.value.trim().toLocaleLowerCase("id");
    const programs = state.data.programs.filter((program) =>
      [program.title, program.short, program.summary]
        .join(" ")
        .toLocaleLowerCase("id")
        .includes(term),
    );
    results.textContent = programs.length + " inovasi";
    list.replaceChildren();
    programs.forEach((program) =>
      list.append(programCard(program, state.data.programs.indexOf(program))),
    );
    if (!programs.length)
      list.append(
        empty(
          term ? "Inovasi tidak ditemukan" : "Belum ada inovasi",
          term
            ? "Coba kata kunci lain."
            : "Inovasi akan tampil setelah ditambahkan oleh pengelola.",
        ),
      );
  }
  search.addEventListener("input", update);
  section.append(search, results, list);
  update();
  return section;
}
function home() {
  const { settings } = state.data;
  const intro = el("section", "home-intro");
  intro.append(
    el("p", "eyebrow", "Portofolio praktik baik"),
    el("h1", "", "Inovasi pembelajaran Bahasa Indonesia"),
    el("p", "intro-text", settings.intro),
  );
  const identity = el("p", "intro-identity");
  identity.append(
    el("strong", "", settings.name),
    el("span", "", settings.school),
  );
  intro.append(identity);
  if (safeUrl(settings.portfolio))
    intro.append(
      external("Buka portofolio PDF ↗", settings.portfolio, "btn secondary"),
    );
  $("main").append(intro, innovationCollection());
}
function programs() {
  $("main").append(innovationCollection());
}
function embed(url, title, cls = "media") {
  const frame = el("iframe", cls);
  frame.src = url;
  frame.title = title;
  frame.loading = "lazy";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  return frame;
}
function evidenceCard(item) {
  const box = el("article", "evidence-item");
  const video = ytId(item.url);
  if (video) {
    const poster = button(
      "",
      () =>
        poster.replaceWith(
          embed(
            "https://www.youtube-nocookie.com/embed/" +
              video +
              "?autoplay=1&playsinline=1",
            item.title,
          ),
        ),
      "video-poster",
    );
    poster.setAttribute("aria-label", "Putar " + item.title);
    const image = el("img");
    image.src = "https://i.ytimg.com/vi/" + video + "/hqdefault.jpg";
    image.alt = "";
    image.loading = "lazy";
    image.onerror = () => image.remove();
    poster.append(image, el("span", "play", "▶"));
    box.append(poster);
  }
  const body = el("div", "body");
  body.append(
    el("span", "pill", SECTIONS[item.section][0]),
    el("h3", "", item.title),
  );
  const meta = [
    item.creator,
    item.date,
    item.duration ? item.duration + " detik" : "",
  ]
    .filter(Boolean)
    .join(" · ");
  if (meta) body.append(el("p", "meta", meta));
  body.append(el("p", "prose", item.description));
  if (item.ai) {
    body.append(
      el("h3", "", "Penggunaan teknologi & AI"),
      el("p", "prose", item.ai),
    );
  }
  const actions = el("div", "actions");
  if (safeUrl(item.url)) actions.append(external("Buka bukti ↗", item.url));
  if (safeUrl(item.original))
    actions.append(external("File asli ↗", item.original, "btn secondary"));
  const preview = previewUrl(item.url);
  if (preview && !video)
    actions.append(
      button(
        "Pratinjau dokumen",
        (event) => {
          const frame = embed(preview, item.title, "media pdf");
          box.prepend(frame);
          event.currentTarget.remove();
        },
        "btn secondary",
      ),
    );
  body.append(actions);
  box.append(body);
  return box;
}
function detail(id) {
  const p = state.data.programs.find((p) => p.id === id);
  if (!p) {
    $("main").append(
      empty(
        "Praktik baik tidak ditemukan",
        "Kembali ke daftar program untuk memilih praktik baik.",
      ),
    );
    return;
  }
  document.title = p.short + " · Ruang Inovasi";
  const page = el("section", "page");
  page.append(link("← Semua praktik baik", "#program", "back"));
  const head = el("header", "detail-title");
  head.append(
    el("span", "pill", p.short),
    el("h1", "", p.title),
    el("p", "", p.summary),
  );
  page.append(head);
  const layout = el("div", "detail-layout");
  const nav = el("nav", "side");
  nav.setAttribute("aria-label", "Bagian praktik baik");
  nav.append(el("b", "", "Di halaman ini"));
  const jump = (label, target) => {
    const a = link(label, "#praktik/" + id, "");
    a.onclick = (e) => {
      e.preventDefault();
      $(target).scrollIntoView();
    };
    nav.append(a);
  };
  jump("Tentang program", "overview");
  Object.entries(SECTIONS).forEach(([key, [title]]) => jump(title, key));
  const content = el("div");
  const overview = el("section", "panel");
  overview.id = "overview";
  overview.append(
    el("p", "eyebrow", "Gambaran praktik baik"),
    el("h2", "", "Tentang program"),
  );
  for (const [key, title] of [
    ["background", "Latar belakang"],
    ["objective", "Tujuan pembelajaran"],
    ["process", "Pelaksanaan"],
    ["technology", "Peran teknologi dan AI"],
  ])
    if (p[key]) overview.append(el("h3", "", title), el("p", "prose", p[key]));
  content.append(overview);
  Object.entries(SECTIONS).forEach(([key, [title, desc]], i) => {
    const section = el("section", "evidence-section");
    section.id = key;
    section.append(
      el("p", "eyebrow", "BAGIAN 0" + (i + 1)),
      el("h2", "", title),
      el("p", "", desc),
    );
    if (key === "refleksi") {
      const narrative = el("div", "panel");
      if (p.results)
        narrative.append(
          el("h3", "", "Hasil yang dapat ditinjau"),
          el("p", "prose", p.results),
        );
      if (p.reflection)
        narrative.append(
          el("h3", "", "Refleksi dan tindak lanjut"),
          el("p", "prose", p.reflection),
        );
      section.append(narrative);
    }
    const items = programEvidence(id).filter((e) => e.section === key);
    const list = el("div", "evidence-grid");
    if (items.length) items.forEach((e) => list.append(evidenceCard(e)));
    else
      list.append(
        empty(
          "Tautan bukti belum ditambahkan",
          "Berkas pendukung untuk bagian ini akan ditampilkan setelah tersedia.",
        ),
      );
    section.append(list);
    content.append(section);
  });
  layout.append(nav, content);
  page.append(layout);
  $("main").append(page);
}
function gallery() {
  const page = el("section", "page");
  page.append(
    sectionHeading(
      "Arsip implementasi",
      "Semua bukti",
      "Cari modul, video praktik, karya siswa, dan evaluasi.",
    ),
  );
  const filters = el("div", "filters");
  const search = el("input", "field");
  search.type = "search";
  search.placeholder = "Cari judul atau penjelasan…";
  search.setAttribute("aria-label", "Cari bukti");
  search.value = state.search;
  const select = el("select", "field");
  select.setAttribute("aria-label", "Filter program");
  select.append(new Option("Semua program", ""));
  state.data.programs.forEach((p) => select.append(new Option(p.short, p.id)));
  select.value = state.filter;
  const results = el("p", "meta");
  results.setAttribute("role", "status");
  const list = el("div", "evidence-grid");
  function update() {
    state.search = search.value;
    state.filter = select.value;
    const term = search.value.trim().toLocaleLowerCase("id");
    const items = state.data.evidence.filter(
      (e) =>
        (!select.value || e.programId === select.value) &&
        (e.title + " " + e.description).toLocaleLowerCase("id").includes(term),
    );
    results.textContent = items.length + " bukti ditemukan";
    list.replaceChildren();
    if (!items.length)
      list.append(
        empty(
          "Belum ada bukti yang ditampilkan",
          state.data.evidence.length
            ? "Coba kata kunci atau program lain."
            : "Tautan dokumen, video, karya, dan evaluasi dapat ditambahkan melalui admin.",
        ),
      );
    items.forEach((item) => {
      const group = el("div");
      const p = state.data.programs.find((p) => p.id === item.programId);
      if (p) group.append(link(p.short + " →", "#praktik/" + p.id, "back"));
      group.append(evidenceCard(item));
      list.append(group);
    });
  }
  search.oninput = update;
  select.onchange = update;
  filters.append(search, select);
  page.append(filters, results, list);
  $("main").append(page);
  update();
}
function message(text, error = false) {
  const target = $("form-status") || $("admin-status");
  if (target) {
    target.textContent = text;
    target.className = "status" + (error ? " error" : "");
    target.hidden = false;
    target.focus();
  }
}
function admin() {
  const page = el("section", "page");
  page.append(
    sectionHeading(
      "Ruang kreator",
      "Kelola portofolio",
      "Deskripsi program sudah disiapkan. Tambahkan bukti melalui tautan.",
    ),
  );
  const notice = el("div", "status");
  notice.id = "admin-status";
  notice.role = "status";
  notice.tabIndex = -1;
  notice.hidden = !state.notice;
  notice.textContent = state.notice;
  page.append(notice);
  if (state.token && state.data.warnings?.length) {
    page.append(el("p", "status warning", state.data.warnings.join(" ")));
  }
  if (!state.token) {
    const form = el("form", "panel login");
    form.append(el("h2", "", "Masuk sebagai admin"));
    if (demo)
      form.append(
        el(
          "p",
          "help",
          "Mode pratinjau. Kata sandi demo-inovasi. Perubahan hanya berlaku sampai halaman dimuat ulang.",
        ),
      );
    field(form, "password", "Kata sandi", "password", "", {
      required: true,
    });
    const submit = el("button", "btn", "Masuk");
    submit.type = "submit";
    form.append(el("br"), submit);
    form.onsubmit = async (e) => {
      e.preventDefault();
      submit.disabled = true;
      try {
        const result = await api("login", {
          password: form.elements.password.value,
        });
        state.token = result.token;
        state.notice = "";
        render();
      } catch (err) {
        message(err.message, true);
      } finally {
        submit.disabled = false;
      }
    };
    page.append(form);
    $("main").append(page);
    return;
  }
  const actions = el("div", "actions");
  actions.append(
    button(
      "Muat ulang data",
      async () => {
        if (state.busy) return;
        try {
          state.data = await api("get");
          state.notice = "Data terbaru dimuat.";
          draft = null;
          render();
        } catch (e) {
          message(e.message, true);
        }
      },
      "btn secondary",
    ),
    button(
      "Keluar",
      async () => {
        if (state.busy) return;
        const token = state.token;
        try {
          await api("logout", { token });
          state.token = "";
          draft = null;
          state.notice = "";
          render();
        } catch (e) {
          message("Gagal mengakhiri sesi di server. Coba kembali.", true);
        }
      },
      "btn secondary",
    ),
  );
  page.append(actions);
  const tabs = el("div", "tabs");
  for (const [key, title] of [
    ["bukti", "Bukti implementasi"],
    ["program", "Inovasi"],
    ["settings", "Beranda & profil"],
  ]) {
    const b = button(
      title,
      () => {
        if (state.busy) return;
        state.adminTab = key;
        draft = null;
        state.notice = "";
        render();
      },
      state.adminTab === key ? "active" : "",
    );
    tabs.append(b);
  }
  page.append(tabs);
  $("main").append(page);
  if (draft) {
    editForm(page);
    return;
  }
  if (state.adminTab === "settings") {
    draft = {
      type: "settings",
      data: structuredClone(state.data.settings),
    };
    editForm(page);
    return;
  }
  const type = state.adminTab === "bukti" ? "evidence" : "program";
  page.append(
    button(type === "evidence" ? "+ Tambah bukti" : "+ Tambah inovasi", () => {
      draft = { type, data: { id: crypto.randomUUID(), revision: "" } };
      render();
    }),
  );
  const items = type === "evidence" ? state.data.evidence : state.data.programs;
  const panel = el("div", "panel");
  panel.style.marginTop = "20px";
  if (!items.length)
    panel.append(
      empty(
        "Belum ada bukti",
        "Pilih Tambah bukti untuk memasukkan tautan pertama.",
      ),
    );
  for (const item of items) {
    const row = el("div", "admin-row");
    const title = el("div");
    title.append(el("strong", "", item.title));
    if (type === "evidence") {
      const p = state.data.programs.find((p) => p.id === item.programId);
      title.append(el("p", "", p?.short + " · " + SECTIONS[item.section][0]));
    }
    const controls = el("div", "actions");
    controls.append(
      button(
        "Edit",
        () => {
          if (state.busy) return;
          draft = { type, data: structuredClone(item) };
          render();
        },
        "btn secondary small",
      ),
      button("Hapus", () => remove(type, item), "btn secondary small"),
    );
    row.append(title, controls);
    panel.append(row);
  }
  page.append(panel);
}
function field(form, name, label, type, value, options = {}) {
  const group = el("div", options.wide ? "span" : "");
  const text = el("label", "", label);
  text.htmlFor = "f-" + name;
  const input = el(
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input",
    "field",
  );
  input.id = "f-" + name;
  input.name = name;
  if (type !== "textarea" && type !== "select") input.type = type;
  if (type === "select") {
    input.append(new Option("Pilih…", ""));
    (options.items || []).forEach(([id, title]) =>
      input.append(new Option(title, id)),
    );
  }
  input.value = value || "";
  input.required = !!options.required;
  input.maxLength = type === "textarea" ? 12000 : 2000;
  if (type === "url") input.pattern = "https://.*";
  if (type === "number") {
    input.min = "1";
    input.max = "300";
    input.step = "1";
  }
  group.append(text, input);
  if (options.help) group.append(el("p", "help", options.help));
  form.append(group);
  return input;
}
function editForm(page) {
  const { type, data } = draft;
  const form = el("form", "panel");
  form.append(
    el(
      "h2",
      "",
      type === "settings"
        ? "Beranda & profil"
        : type === "program"
          ? "Deskripsi inovasi"
          : "Lembar pengantar bukti",
    ),
  );
  const grid = el("div", "form-grid");
  const text = (key, label, required = false) =>
    field(grid, key, label, "text", data[key], { required });
  const area = (key, label, required = false) =>
    field(grid, key, label, "textarea", data[key], {
      required,
      wide: true,
    });
  if (type === "program") {
    text("title", "Judul lengkap", true);
    text("short", "Nama singkat", true);
    area("summary", "Ringkasan untuk kartu dan beranda", true);
    const coverInput = field(
      grid,
      "cover",
      "Thumbnail dari Google Drive",
      "url",
      data.cover,
      {
        wide: true,
        help: "Tempel tautan berbagi satu gambar JPG/PNG di Drive. Atur akses Siapa saja yang memiliki link → Pelihat. Disarankan gambar mendatar. Kosongkan untuk ilustrasi bawaan.",
      },
    );
    coverInput.placeholder = "https://drive.google.com/file/d/…/view";
    const preview = el("div", "span thumbnail-preview");
    const previewStatus = el("p", "help");
    previewStatus.setAttribute("role", "status");
    grid.append(preview, previewStatus);
    let previewVersion = 0;
    let previewTimer;
    function updateCoverPreview() {
      const version = ++previewVersion;
      const value = coverInput.value.trim();
      const url = thumbnailUrl(value);
      coverInput.setCustomValidity("");
      preview.replaceChildren();
      if (value && !url) {
        previewStatus.textContent =
          "Gunakan tautan file gambar, lalu periksa kembali alamatnya. Tautan folder Drive tidak dapat digunakan.";
        coverInput.setCustomValidity("Masukkan tautan file gambar yang valid.");
        return;
      }
      previewStatus.textContent = value
        ? "Memuat pratinjau gambar…"
        : "Ilustrasi bawaan digunakan sampai gambar ditambahkan.";
      preview.append(
        cover({ cover: value }, 0, (loaded) => {
          if (version !== previewVersion) return;
          previewStatus.textContent = loaded
            ? "Gambar berhasil dimuat. Simpan perubahan untuk menampilkannya di daftar inovasi."
            : "Gambar belum dapat dimuat. Periksa izin berbagi dan pastikan file berupa gambar. Ilustrasi bawaan akan digunakan jika gambar gagal dibuka.";
        }),
      );
    }
    coverInput.addEventListener("input", () => {
      clearTimeout(previewTimer);
      // Validate immediately, then debounce the image request while the user types.
      coverInput.setCustomValidity(
        coverInput.value.trim() && !thumbnailUrl(coverInput.value.trim())
          ? "Masukkan tautan file gambar yang valid."
          : "",
      );
      previewTimer = setTimeout(updateCoverPreview, 400);
    });
    updateCoverPreview();
    for (const [key, label] of [
      ["background", "Latar belakang"],
      ["objective", "Tujuan"],
      ["process", "Pelaksanaan"],
      ["technology", "Peran teknologi & AI"],
      ["results", "Hasil yang dapat ditinjau"],
      ["reflection", "Refleksi & tindak lanjut"],
    ])
      area(key, label);
  } else if (type === "settings") {
    text("name", "Nama peserta", true);
    text("school", "Sekolah", true);
    area("intro", "Pengantar singkat beranda", true);
    field(grid, "portfolio", "Tautan Portofolio PDF", "url", data.portfolio, {
      help: "File PDF yang dapat dibuka penilai.",
    });
  } else {
    field(grid, "programId", "Program", "select", data.programId, {
      required: true,
      items: state.data.programs.map((p) => [p.id, p.short]),
    });
    const section = field(
      grid,
      "section",
      "Bagian bukti",
      "select",
      data.section,
      {
        required: true,
        items: Object.entries(SECTIONS).map(([key, value]) => [key, value[0]]),
      },
    );
    text("title", "Judul bukti", true);
    text("creator", "Pembuat / kelompok");
    text("date", "Waktu dan konteks kegiatan");
    const duration = field(
      grid,
      "duration",
      "Durasi video praktik (detik)",
      "number",
      data.duration,
      {
        help: "Maksimal 300 detik. Isi berdasarkan durasi rekaman sebenarnya.",
      },
    );
    function videoFields() {
      duration.parentElement.hidden = section.value !== "video";
      duration.required = section.value === "video";
      if (section.value !== "video") duration.value = "";
    }
    section.onchange = videoFields;
    videoFields();
    field(grid, "url", "Tautan bukti", "url", data.url, {
      required: true,
      wide: true,
      help: "YouTube, Google Drive, Canva, Assemblr, atau aplikasi. Pastikan akses penilai sudah dibuka.",
    });
    field(
      grid,
      "original",
      "Tautan file asli (opsional)",
      "url",
      data.original,
      { wide: true },
    );
    area("description", "Penjelasan bukti dan proses pembuatan", true);
    area("ai", "Peran teknologi / AI dan pemeriksaan hasil");
  }
  if (type === "evidence" && !data.revision) {
    const programSelect = grid.querySelector("[name=programId]");
    const sectionSelect = grid.querySelector("[name=section]");
    const description = grid.querySelector("[name=description]");
    const title = grid.querySelector("[name=title]");
    const ai = grid.querySelector("[name=ai]");
    let lastDescription = "",
      lastTitle = "",
      lastAi = "";
    function suggest() {
      const program = state.data.programs.find(
        (p) => p.id === programSelect.value,
      );
      if (!program || !SECTIONS[sectionSelect.value]) return;
      const kind = sectionSelect.value;
      const suggestions = {
        modul:
          "Dokumen ini memuat rancangan pembelajaran dalam program " +
          program.short +
          ". Tujuan program adalah " +
          program.objective +
          " Penilai dapat meninjau tahapan kegiatan, penggunaan teknologi, dan rancangan asesmen melalui dokumen terlampir.",
        video:
          "Rekaman ini disertakan sebagai dokumentasi praktik pembelajaran dalam program " +
          program.short +
          ". Penilai dapat meninjau interaksi guru dan siswa serta pelaksanaan kegiatan yang terlihat dalam rekaman. " +
          program.process,
        karya:
          "Artefak ini disertakan sebagai hasil karya atau evaluasi belajar peserta didik dalam program " +
          program.short +
          ". " +
          program.objective +
          " File atau tautan terlampir menjadi sumber untuk meninjau produk yang dihasilkan.",
        refleksi: program.results + "\n\n" + program.reflection,
      };
      const proposedTitle = SECTIONS[kind][0] + " — " + program.short;
      if (!description.value || description.value === lastDescription)
        description.value = suggestions[kind];
      if (!title.value || title.value === lastTitle)
        title.value = proposedTitle;
      if (!ai.value || ai.value === lastAi) ai.value = program.technology;
      lastDescription = suggestions[kind];
      lastTitle = proposedTitle;
      lastAi = program.technology;
    }
    programSelect.addEventListener("change", suggest);
    sectionSelect.addEventListener("change", suggest);
    grid.append(
      el(
        "p",
        "help span",
        "Judul dan penjelasan diisi otomatis setelah program dan bagian dipilih. Cocokkan dengan isi bukti, lalu tempel tautannya.",
      ),
    );
    suggest();
  }
  form.append(grid);
  const status = el("p", "status");
  status.id = "form-status";
  status.role = "status";
  status.tabIndex = -1;
  status.hidden = true;
  form.append(status);
  const actions = el("div", "actions");
  actions.style.marginTop = "22px";
  const submit = el("button", "btn", "Simpan perubahan");
  submit.type = "submit";
  actions.append(
    submit,
    button(
      "Batal",
      () => {
        if (state.busy) return;
        draft = null;
        state.adminTab = type === "settings" ? "bukti" : state.adminTab;
        render();
      },
      "btn secondary",
    ),
  );
  form.append(actions);
  form.onsubmit = async (event) => {
    event.preventDefault();
    if (state.busy) return;
    const values = {
      ...(type === "settings" ? { featured: data.featured || "" } : {}),
      id: data.id,
      ...Object.fromEntries(new FormData(form)),
    };
    Object.keys(values).forEach((key) => (values[key] = values[key].trim()));
    if (Object.values(values).some((v) => typeof v !== "string")) return;
    state.busy = true;
    submit.disabled = true;
    submit.textContent = "Menyimpan…";
    try {
      state.data = await api(
        type === "program"
          ? "saveProgram"
          : type === "settings"
            ? "saveSettings"
            : "saveEvidence",
        { data: values, revision: data.revision || "" },
      );
      state.notice = "Perubahan berhasil disimpan.";
      draft = null;
      render();
    } catch (error) {
      message(error.message, true);
    } finally {
      state.busy = false;
      submit.disabled = false;
      submit.textContent = "Simpan perubahan";
    }
  };
  page.append(form);
}
function remove(type, item) {
  if (state.busy) return;
  const dialog = $("confirm");
  $("confirm-text").textContent = "Hapus “" + item.title + "” dari portofolio?";
  dialog.returnValue = "cancel";
  dialog.onclose = async () => {
    if (dialog.returnValue !== "delete") return;
    state.busy = true;
    try {
      state.data = await api(
        type === "program" ? "deleteProgram" : "deleteEvidence",
        { id: item.id, revision: item.revision },
      );
      state.notice = "Data dihapus.";
      render();
    } catch (error) {
      message(error.message, true);
    } finally {
      state.busy = false;
    }
  };
  dialog.showModal();
}
function render() {
  const main = $("main");
  main.replaceChildren();
  if (!state.data) return;
  document.querySelector(".brand small").textContent = state.data.settings.name;
  document.querySelector(".footer strong").textContent =
    "Ruang Inovasi · " + state.data.settings.name;
  document.title = "Ruang Inovasi · " + state.data.settings.name;
  const hash = location.hash.slice(1);
  for (const nav of document.querySelectorAll("[data-nav]")) {
    const active =
      nav.dataset.nav === (hash.split("/")[0] || "home") ||
      (hash.startsWith("praktik/") && nav.dataset.nav === "program");
    if (active) nav.setAttribute("aria-current", "page");
    else nav.removeAttribute("aria-current");
  }
  if (hash === "admin") admin();
  else if (hash === "program") programs();
  else if (hash === "bukti") gallery();
  else if (hash.startsWith("praktik/")) detail(hash.slice(8));
  else home();
}
async function load() {
  const main = $("main");
  main.replaceChildren(el("p", "page", "Memuat portofolio…"));
  try {
    state.data = await api("get");
    if (
      !state.data.settings ||
      !Array.isArray(state.data.programs) ||
      !Array.isArray(state.data.evidence)
    )
      throw new Error(
        "Data portofolio belum lengkap. Jalankan setup Apps Script.",
      );
    render();
  } catch (error) {
    state.data = null;
    const box = el("div", "panel");
    box.style.marginTop = "30px";
    box.append(
      el("h1", "", "Portofolio belum terhubung"),
      el("p", "", error.message),
      button("Coba lagi", load),
    );
    main.replaceChildren(box);
  }
}
$("skip").onclick = (e) => {
  e.preventDefault();
  $("main").focus();
};
window.addEventListener("hashchange", () => {
  if (state.busy) return;
  draft = null;
  render();
  window.scrollTo(0, 0);
  $("main").focus({ preventScroll: true });
});
$("preview").hidden = !demo;
load();
