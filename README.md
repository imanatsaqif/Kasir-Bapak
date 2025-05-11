# Kasir Bapak

Website Kasir dan Manajemen Inventory yang dibuat berdasarkan permintaan pribadi dari ayah saya. Proyek ini dikembangkan untuk memenuhi kebutuhan sederhana pencatatan transaksi dan inventaris, sekaligus menjadi bagian dari portofolio pribadi sebagai web developer.

## Coba Aplikasi

Akses aplikasi secara langsung di:  
[https://kasir-bapak.web.app/](https://kasir-bapak.web.app/)

## Fitur

- Pencatatan transaksi
- Manajemen inventory

## Teknologi

Proyek ini dibangun menggunakan stack sebagai berikut:

- React
- TypeScript
- Vite
- Firebase (Firestore dan Hosting)

## Cara Menjalankan Secara Lokal

Berikut langkah-langkah untuk menjalankan proyek ini di lingkungan lokal:

1. Clone repositori:
   ```bash
   git clone https://github.com/imanatsaqif/Kasir-Bapak.git
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd Kasir-Bapak
   ```

3. Install dependensi:
   ```bash
   npm install
   ```

4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

Pastikan Anda sudah menginstal Node.js dan npm di sistem Anda. Tidak ada konfigurasi environment tambahan yang dibutuhkan pada tahap awal ini.

## Status Pengembangan

Proyek ini berada dalam tahap *early MVP*. Aplikasi sudah cukup fungsional dengan antarmuka yang sederhana namun layak digunakan. Fitur utama kasir dan pencatatan inventory telah berjalan sesuai kebutuhan awal.

## To Do List

1. **Tambahkan layer keamanan tambahan**  
   Saat ini belum ada aturan keamanan yang diterapkan pada Firestore. Perlu dibuat aturan akses untuk memastikan hanya pengguna yang berwenang yang dapat mengubah data penting di database.

2. **Menambah manajemen user dan admin control**  
   Fitur manajemen pengguna dan kontrol admin perlu ditambahkan. Saat ini, siapapun yang mendaftar dapat langsung mengakses inventory dan kasir, serta memanipulasi data secara bebas. Pembagian hak akses antara user biasa dan admin akan meningkatkan keamanan dan kontrol.

3. **Menangani kasus stok negatif**  
   Perlu dilakukan pengecekan untuk mencegah transaksi yang menyebabkan stok barang menjadi negatif. Contohnya, ketika stok barang 30 tetapi dibeli dengan kuantitas 40, aplikasi harus menangani kasus ini dengan tepat dan memberikan peringatan atau pembatasan transaksi.

4. **Menangani input panjang di form**  
   Aplikasi perlu menangani kasus ketika input di form terlalu panjang, seperti nama atau keterangan yang melebihi panjang yang diizinkan. Validasi input ini akan memastikan data yang dimasukkan tetap terstruktur dan tidak menyebabkan gangguan pada tampilan atau penyimpanan data.

## Kontributor

Imana Tsaqif Ariyadi  
[LinkedIn](https://www.linkedin.com/in/imanatsaqif/)

## Lisensi

Proyek ini dirilis dengan lisensi MIT.  
Anda diizinkan untuk menggunakan, menyalin, memodifikasi, dan mendistribusikan ulang bagian mana pun dari kode ini selama mencantumkan atribusi kepada pembuat asli.

Lihat detail lisensi MIT di [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).