# Aplikasi Catatan dengan React JS

Aplikasi ini dibuat sebagai bagian dari submission Dicoding. Aplikasi ini memanfaatkan RESTful API sebagai sumber data dan memiliki fitur registrasi dan autentikasi pengguna.

## Fitur Utama

1. **Memanfaatkan RESTful API sebagai sumber data**: Aplikasi ini menggunakan RESTful API sebagai sumber data dalam berbagai fitur di aplikasi catatan, seperti registrasi dan autentikasi, daftar catatan, daftar catatan terarsip, detail catatan, arsip/batal arsip catatan, dan hapus catatan.

2. **Registrasi dan Autentikasi Pengguna**: Aplikasi ini memiliki fitur registrasi dan autentikasi pengguna. Halaman baru dibuat untuk registrasi pengguna dengan input nama, email, password, dan confirm password. Halaman baru juga dibuat untuk autentikasi pengguna dengan input email dan password.

3. **Memproteksi Fitur Catatan**: Fitur catatan hanya dapat diakses oleh pengguna yang telah terautentikasi. Fitur catatan seperti daftar catatan, detail catatan, dan hapus catatan hanya dapat diakses bila pengguna telah melakukan autentikasi.

4. **Ubah Tema**: Aplikasi ini memiliki fitur ubah tema. Tombol disediakan untuk mengubah tema gelap/terang. React Context digunakan dalam membangun fitur ubah tema.

5. **Menggunakan Hooks**: Aplikasi ini menerapkan Hooks dalam pengelolaan state setidaknya untuk fitur/kode pada halaman registrasi dan autentikasi pengguna.

## Fitur Opsional

1. **Menampilkan Indikasi Loading**: Aplikasi ini menampilkan indikasi loading ketika memuat data dari RESTful API sedang berlangsung.

2. **Fitur Ubah Bahasa**: Aplikasi ini memiliki fitur ubah bahasa. Tombol disediakan untuk mengubah bahasa Indonesia ke Inggris, atau sebaliknya.

## Cara Menjalankan

Untuk menjalankan aplikasi ini, Anda perlu menginstal Node.js dan npm. Setelah itu, Anda dapat menjalankan `npm install` untuk menginstal semua dependensi dan `npm run dev` untuk menjalankan aplikasi.
