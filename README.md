# Sistem Informasi Manajemen Magang Mahasiswa

## Deskripsi
Sistem ini merupakan **Private REST API** yang digunakan untuk mengelola informasi magang mahasiswa dengan efisien dan skalabel menggunakan **Nest.js** sebagai backend dan **Next.js** sebagai frontend.

---

## 📌 Instalasi Backend

### 1. Clone Repository
```bash
$ git clone https://git.stis.ac.id/daffafaris/magang-backend.git
$ cd magang-backend
```

### 2. Install Dependencies
```bash
$ npm install
```

### 3. Konfigurasi Database
Buat file `.env` dan sesuaikan variabel berikut:
```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/magang-stis?schema=public"
PORT=3000
```

### 4. Migrasi Database
```bash
$ npx prisma generate
$ npx prisma migrate dev
```

### 5. Data yang Otomatis Terbuat
- Tahun Ajaran
- Roles
- User Admin
- Provinsi

**Login Default Admin**:
```
Username: admin@admin.com
Password: makanenak
```

### 6. Menjalankan Aplikasi
```bash
# Mode Development
$ npm run start:dev

# Mode Production
$ npm run start:prod
```

---

## 🚀 Instalasi Frontend

### 1. Clone Repository
```bash
$ git clone https://git.stis.ac.id/daffafaris/magang-frontend.git
$ cd magang-frontend
```

### 2. Install Dependencies
```bash
$ npm install
```

### 3. Menjalankan Aplikasi
```bash
$ npm run dev
```
Buka **[http://localhost:3000](http://localhost:3000)** di browser.

---

## 📂 Data yang Harus Ditambahkan Awal
Lakukan penambahan data ini menggunakan akun **admin** atau akun dengan autorisasi yang sesuai:
- ✅ Tambah Mahasiswa (Bisa dilakukan secara bulk)
- ✅ Tambah Dosen Pembimbing
- ✅ Tambah Satker (Bisa dilakukan secara bulk)
- ✅ Tambah Admin Satker
- ✅ Tambah Admin Provinsi
- ✅ Tambah Kapasitas Satker

📂 **Format File Contoh:**
- `test-kapasitasSatker.xlsx`
- `test-mahasiswa.xlsx`
- `test-satker.xlsx`

---

## 🔧 Build
```bash
# Menggunakan npm
$ npm run build

# Menggunakan Nest CLI
$ nest build
```

---

## 📌 Dokumentasi dan Referensi
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[Nest.js Documentation](https://docs.nestjs.com/)**
- **[Prisma ORM Documentation](https://www.prisma.io/docs/)**

---

## 🚀 Deployment di Vercel
Gunakan [Vercel Platform](https://vercel.com/) untuk deploy aplikasi Next.js dengan mudah.

📖 **Panduan Deployment**: [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

## 🤝 Kontribusi
Jika ingin berkontribusi, silakan buat **pull request** atau hubungi pengelola proyek.

**Dibuat dengan ❤️ oleh Tim Pengembang**
