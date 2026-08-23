// 雅思备考仪表盘 · Service Worker
const CACHE = 'ielts-v2';
const FILES = [
  'index.html',
  '预测.html',
  '听力邪修手册.html',
  '阅读邪修手册.html',
  '口语邪修手册.html',
  '写作邪修手册.html',
  '词汇攻略.html',
  '高频词汇表.html',
  '邪修技巧总汇.html',
  'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
