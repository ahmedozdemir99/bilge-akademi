# Cloudflare Pages yayını

1. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
2. GitHub'da `ahmedozdemir99/bilge-akademi` deposunu seç.
3. Framework preset: **Vite**. Build command: `npm run build`. Build output directory: `dist`.
4. Deploy düğmesine bas. Cloudflare otomatik HTTPS alan adı verir.
5. Android Chrome'da menü > Uygulamayı yükle. iOS Safari'de Paylaş > Ana Ekrana Ekle.

**Önemli:** Bu sürüm demo/MVP'dir. Veriler tarayıcı localStorage'ında tutulur; gerçek öğrenci verileri için uygun değildir. Gemini, kimlik doğrulama, gerçek haritalar ve çok kullanıcılı veritabanı henüz tamamlanmadı. SVG ikon bazı tarayıcılarda PWA yükleme kriterlerini karşılamayabilir; dağıtıma geçmeden önce 192 ve 512 PNG ikonları da repoya ekleyin.
