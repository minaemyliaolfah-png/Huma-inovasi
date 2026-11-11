// Komunikasi dengan Apps Script dan penyimpanan sementara untuk mode demo.
async function api(action, data = {}) {
  if (demo) return demoApi(action, data);
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(API_URL))
    throw new Error(
      "Isi apiUrl di config.js dengan URL Web App Apps Script berakhiran /exec.",
    );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const options = {
      redirect: "follow",
      credentials: "omit",
      signal: controller.signal,
    };
    if (action !== "get") {
      options.method = "POST";
      options.headers = { "Content-Type": "text/plain;charset=utf-8" };
      options.body = JSON.stringify({
        action,
        token: state.token,
        ...data,
      });
    }
    const response = await fetch(
      API_URL + (action === "get" ? "?v=" + Date.now() : ""),
      options,
    );
    const result = await response.json();
    if (!result.ok) {
      if (result.code === "SESSION") {
        state.token = "";
        draft = null;
        render();
      }
      const error = new Error(result.error);
      error.code = result.code;
      throw error;
    }
    return result.data;
  } catch (error) {
    if (
      error.name === "AbortError" ||
      error instanceof TypeError ||
      error instanceof SyntaxError
    )
      throw new Error(
        "Balasan server belum diterima. Periksa koneksi dan akses deployment. Jika baru menyimpan, muat ulang data untuk memeriksa hasil sebelum mencoba lagi.",
      );
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
function demoApi(action, input) {
  if (action === "get") return structuredClone(demoData);
  if (action === "login") {
    if (input.password !== "demo-inovasi")
      throw new Error("Kata sandi demo salah.");
    return { token: "demo" };
  }
  if (action === "logout") return true;
  if (!state.token) throw new Error("Masuk sebagai admin terlebih dahulu.");
  const types = { saveProgram: "programs", saveEvidence: "evidence" };
  if (types[action]) {
    const list = demoData[types[action]];
    const index = list.findIndex((x) => x.id === input.data.id);
    const saved = { ...input.data, revision: crypto.randomUUID() };
    if (index < 0) list.push(saved);
    else list[index] = saved;
  }
  if (action === "saveSettings")
    demoData.settings = { ...input.data, revision: crypto.randomUUID() };
  if (action === "deleteEvidence")
    demoData.evidence = demoData.evidence.filter((x) => x.id !== input.id);
  if (action === "deleteProgram") {
    if (demoData.evidence.some((e) => e.programId === input.id))
      throw new Error("Hapus bukti program terlebih dahulu.");
    demoData.programs = demoData.programs.filter((x) => x.id !== input.id);
  }
  return structuredClone(demoData);
}
