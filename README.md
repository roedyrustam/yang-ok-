## 🫘 BeansHub – Aplikasi Manajemen Roastery Terintegrasi

BeansHub adalah platform digital cerdas untuk membantu coffee house roastery kecil-menengah dalam mengelola seluruh proses bisnis — dari pengadaan green bean, proses roasting, hingga penjualan dan pelaporan keuangan, secara otomatis dan real-time.

## 🔒 Teknologi Inti

**Database:** Firebase Firestore (NoSQL realtime database)

**Authentication:** Firebase Authentication

**Frontend:** React + TypeScript + Tailwind CSS

**Arsitektur:** Modular, terintegrasi otomatis antar fitur

**Real-Time Update:** Setiap perubahan data langsung tercermin di seluruh sistem

## 🚀 Setup Firebase

### 1. Buat Project Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" dan ikuti langkah-langkah setup
3. Aktifkan Authentication dan Firestore Database

### 2. Konfigurasi Authentication

1. Di Firebase Console, buka "Authentication" > "Sign-in method"
2. Aktifkan "Email/Password" provider
3. Tambahkan domain yang diizinkan jika diperlukan

### 3. Konfigurasi Firestore

1. Di Firebase Console, buka "Firestore Database"
2. Buat database dalam mode "Start in test mode" (untuk development)
3. Atur rules sesuai kebutuhan produksi

### 4. Dapatkan Konfigurasi Firebase

1. Di Firebase Console, buka "Project settings" > "General"
2. Scroll ke bawah ke "Your apps" dan klik "Web app"
3. Copy konfigurasi Firebase

### 5. Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`
2. Isi dengan konfigurasi Firebase Anda:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎯 Modul Utama & Alur Terintegrasi

### 1. Modul Manajemen Stok Bahan Baku (Green Bean)
**Tujuan:** Memastikan ketersediaan stok bahan baku secara akurat.

**Fitur:**
- Pencatatan Masuk Green Bean
- Stok Real-time dengan Firebase Firestore
- Riwayat Pergerakan Stok
- Notifikasi stok rendah otomatis

### 2. Modul Roasting
**Tujuan:** Mengelola proses roasting dengan efisiensi dan akurasi stok.

**Fitur:**
- Input Roasting dengan validasi stok
- Kalkulasi Penyusutan Otomatis (default 20%)
- Update Otomatis Stok di Firestore
- Integrasi dengan profil roasting

### 3. Modul Log & Profil Roasting
**Tujuan:** Menstandarkan dan melacak proses roasting.

**Fitur:**
- Manajemen Profil Roasting tersimpan di cloud
- Log Roasting Otomatis real-time
- Riwayat & Analisis performa
- Sinkronisasi antar device

### 4. Modul Estimasi Harga Jual
**Tujuan:** Memberikan kontrol penuh terhadap perhitungan HPP & harga jual.

**Fitur:**
- HPP calculation dengan data real-time dari Firestore
- Estimasi Harga Jual dengan margin dinamis
- Riwayat perhitungan tersimpan

### 5. Modul Manajemen Penjualan
**Tujuan:** Mendata penjualan dan pergerakan stok hasil produk.

**Fitur:**
- Pencatatan Transaksi real-time
- Update Stok Otomatis di Firestore
- Data Pelanggan tersimpan aman
- Integrasi dengan laporan keuangan

### 6. Modul Laporan Keuangan
**Tujuan:** Menyajikan kinerja bisnis secara menyeluruh.

**Fitur:**
- Laporan real-time dari data Firestore
- Export PDF dan JSON
- Dashboard analytics
- Multi-device access

## 🔐 Keamanan & Authentication

- **Firebase Authentication:** Login aman dengan email/password
- **Firestore Security Rules:** Akses data berdasarkan role user
- **Real-time Validation:** Validasi data di client dan server
- **Secure Environment:** Environment variables untuk konfigurasi sensitif

## 🚀 Instalasi & Menjalankan

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi Firebase Anda

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 👥 Role & Permissions

### Admin
- Akses penuh ke semua fitur
- Manajemen user dan permissions
- Laporan keuangan dan analytics
- Pengaturan sistem

### Roaster
- Operasi roasting dan profil
- Quality control dan cupping
- Perencanaan produksi
- Manajemen inventori

### Staff
- Manajemen penjualan
- Inventori dasar (view only)
- Dashboard operasional

## 🔄 Real-time Features

- **Live Inventory Updates:** Stok terupdate real-time di semua device
- **Instant Notifications:** Notifikasi stok rendah dan aktivitas penting
- **Collaborative Editing:** Multiple user dapat bekerja bersamaan
- **Offline Support:** Data tersinkronisasi saat koneksi kembali

## 🛡️ Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Authenticated users can read/write business data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📱 Progressive Web App

BeansHub dapat diinstall sebagai PWA untuk pengalaman native-like di desktop dan mobile.

## 🔧 Development

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Preview production build
npm run preview
```

## 📞 Support

Untuk bantuan teknis atau pertanyaan:
- Email: dev@sidepe.com
- Telepon: +62 812 4100 3047

---

**BeansHub** - Digitalisasi Roastery Kopi Indonesia 🇮🇩