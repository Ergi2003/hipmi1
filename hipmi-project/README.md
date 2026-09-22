# Website HIPMI — Project Files (v2, 16 Halaman)

Website ini menggabungkan gaya empat referensi yang diminta:
- **KADIN** → struktur organisasi, publikasi/berita, advokasi kebijakan
- **YPO** → tone eksklusif di halaman Keanggotaan, hero yang tegas
- **YEC** → UI kartu modern, direktori anggota, whitespace lega
- **EO** → kalender agenda, fitur Peta Cabang per wilayah

Fokus versi ini: **pengunjung umum & anggota**. Admin/dashboard belum
termasuk — lihat bagian "Belum Termasuk" di bawah.

## Struktur Folder

```
hipmi-project/
├── index.html               → Beranda
├── tentang.html              → Sejarah, Struktur Pengurus, Mars & Hymne, Peta Cabang
├── direktori.html             → Direktori Anggota (filter sektor)
├── program.html               → Program Kerja + Kalender Agenda
├── kabar.html                 → Berita (tab kategori)
├── keanggotaan.html           → Manfaat, Syarat, Formulir Pendaftaran
│
├── kontak.html                → Kontak (form + info) & FAQ Keanggotaan   [BARU]
├── kebijakan-privasi.html     → Kebijakan Privasi & Syarat Ketentuan     [BARU]
├── galeri.html                → Galeri Kegiatan (filter kategori acara) [BARU]
├── kisah-sukses.html          → Daftar Kisah Sukses anggota             [BARU]
├── publikasi.html             → Publikasi & Unduhan (AD/ART, dll)       [BARU]
├── mitra.html                 → Mitra & Kerja Sama (bank/korporasi/gov) [BARU]
│
├── berita-detail.html         → Contoh halaman detail artikel berita    [BARU, TEMPLATE]
├── agenda-detail.html         → Contoh halaman detail acara + RSVP      [BARU, TEMPLATE]
├── anggota-detail.html        → Contoh halaman profil bisnis anggota    [BARU, TEMPLATE]
├── kisah-detail.html          → Contoh halaman kisah sukses lengkap     [BARU, TEMPLATE]
│
├── assets/
│   ├── css/style.css          → semua styling, satu file untuk semua halaman
│   └── js/main.js             → semua interaksi (nav, filter, tab, counter, form)
└── README.md                  → file ini
```

### Penting soal 4 halaman "TEMPLATE"

`berita-detail.html`, `agenda-detail.html`, `anggota-detail.html`, dan
`kisah-detail.html` adalah **contoh tunggal**, bukan satu halaman per item.
Di halaman Kabar, Program, Direktori, dan Kisah Sukses, semua item untuk
sementara mengarah ke template yang sama ini. Ini cara kerja normal untuk
prototipe statis — di production nanti, setiap berita/acara/anggota/kisah
akan generate halaman detailnya sendiri secara otomatis dari database/CMS
(lihat bagian "Belum Termasuk" di bawah).

## Peta Navigasi

**Menu utama (header):** Beranda · Tentang Kami · Direktori Anggota ·
Program & Agenda · Kabar & Wawasan · Keanggotaan · Kontak

**Footer:** semua halaman tambahan (Galeri, Kisah Sukses, Publikasi, Mitra,
Kebijakan Privasi) ditautkan dari footer supaya menu utama tidak penuh —
ini pola umum di website organisasi (lihat footer KADIN/YPO sebagai
pembanding).

## Cara Membuka / Testing di Lokal

Buka `index.html` langsung di browser (double click). Semua halaman saling
tertaut, coba klik-klik navigasi untuk merasakan alur lengkapnya.

## Cara Deploy

1. **Netlify Drop** (paling cepat, gratis) — drag-and-drop folder ini ke
   https://app.netlify.com/drop
2. **GitHub Pages** — push folder ini ke repo, aktifkan Pages di Settings
3. **Hosting/cPanel** — upload isi folder ini ke `public_html` via FTP/File
   Manager

## Checklist Data yang WAJIB Diganti

- [ ] Logo resmi HIPMI (saat ini teks "HM" di kotak navy)
- [ ] Semua angka statistik (Beranda, Direktori, Kisah Sukses)
- [ ] Nama & jabatan pengurus (Tentang Kami)
- [ ] Alamat, email, telepon (footer, Kontak, Tentang Kami)
- [ ] Semua judul & isi berita (Kabar, Beranda)
- [ ] Semua profil anggota (Direktori, Beranda)
- [ ] Semua kisah sukses (Kisah Sukses)
- [ ] Tanggal & lokasi agenda (Program, Beranda)
- [ ] Daftar dokumen di Publikasi & Unduhan (upload file asli, aktifkan
      tombol Unduh)
- [ ] Daftar mitra di halaman Mitra & Kerja Sama
- [ ] Isi FAQ di halaman Kontak — sesuaikan dengan kebijakan resmi tiap BPC
- [ ] Isi Kebijakan Privasi & Syarat Ketentuan — sebaiknya direview tim
      legal sebelum publish, karena ini menyangkut kepatuhan UU PDP
- [ ] Embed peta lokasi kantor yang sesungguhnya di halaman Kontak

## Belum Termasuk (Perlu Developer Backend)

Ini murni **front-end statis**. Sebelum production sesungguhnya, perlu:

1. **Formulir** (Pendaftaran Anggota, Kontak, RSVP Agenda) — saat ini semua
   cuma menampilkan pesan sukses di layar tanpa menyimpan data. Hubungkan
   ke Google Sheets/Form, database + backend sendiri, atau layanan seperti
   Formspree/Airtable.
2. **CMS untuk berita, agenda, kisah sukses, galeri** — supaya tim
   non-teknis bisa update konten tanpa edit HTML. Setiap item idealnya
   generate halaman detailnya sendiri secara otomatis (bukan satu template
   dipakai bersama seperti sekarang).
3. **Direktori anggota dinamis** — untuk 2.000+ anggota perlu database
   dengan pencarian & pagination sungguhan di server.
4. **Peta interaktif** untuk Peta Cabang (saat ini grid kartu wilayah).
5. **Portal Anggota (login)** — area khusus anggota untuk akses dokumen/
   benefit eksklusif. Belum dibuat sama sekali di versi ini karena kalian
   fokus ke publik/anggota dulu, admin/portal menyusul.
6. **Sistem unduhan dokumen** di halaman Publikasi — perlu file hosting
   (misalnya S3/Google Drive) yang ditautkan ke tombol Unduh.

## Struktur Warna & Tipografi

- Navy `#101B33` — warna utama, kesan wibawa dan formal
- Emas `#B8863C` — aksen, kesan prestis
- Hijau `#1F6F54` — aksen sekunder, kesan pertumbuhan
- Latar `#FBFAF6` — putih hangat, bukan putih polos
- Font judul: **Fraunces** (serif) — dipakai untuk semua heading
- Font isi: **Inter** (sans-serif) — dipakai untuk body text & UI

Kedua font diambil dari Google Fonts, sudah otomatis ter-load lewat tag
`<link>` di setiap halaman.
