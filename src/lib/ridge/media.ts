const DB = "cd-clips";

function db(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains("clips")) req.result.createObjectStore("clips");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveClip(id: string, blob: Blob) {
  const base = await db();
  await new Promise<void>((resolve, reject) => {
    const tx = base.transaction("clips", "readwrite");
    tx.objectStore("clips").put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  base.close();
}

export async function loadClip(id: string) {
  const base = await db();
  const blob = await new Promise<Blob | undefined>((resolve, reject) => {
    const tx = base.transaction("clips", "readonly");
    const req = tx.objectStore("clips").get(id);
    req.onsuccess = () => resolve(req.result as Blob | undefined);
    req.onerror = () => reject(req.error);
  });
  base.close();
  return blob;
}

export function phoneDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length >= 7) return `+${digits}`;
  return "";
}

export function telHref(phone: string) {
  const n = phoneDigits(phone);
  return n ? `tel:${n}` : "";
}

export function smsHref(phone: string, body: string) {
  const n = phoneDigits(phone);
  return n ? `sms:${n}?&body=${encodeURIComponent(body)}` : "";
}

export function spanishText(name: string) {
  const first = name.split(" ")[0] || "";
  return `Hola ${first}, somos CD Services. Podemos ver el terreno esta semana. ¿Mañana o tarde?`;
}

export function englishText(name: string) {
  const first = name.split(" ")[0] || "";
  return `Hi ${first}, this is CD Services. We can walk the site this week. Morning or afternoon?`;
}
