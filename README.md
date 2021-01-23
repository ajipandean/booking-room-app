# Booking Room App
> Sebuah aplikasi mobile untuk memesan ruangan di STMIK Primakara

Project ini dibuat atas dasar tugas akhir mata kuliah pemrograman mobile.

## Technology stacks
Teknologi yang terlibat dalam pembuatan projek ini adalah, sebagai berikut:
1. NodeJS v12.18.0
2. React Native v0.63
3. Expo SDK 40
4. Expo Mobile App Preview (install di Google Play Store)

## Getting started
Silakan Anda ikuti langkah-langkah dibawah ini untuk membuka projek ini.

### Prerequisites
Pastikan Anda sudah menginstall dependencies dibawah ini sesuai dengan versinya
* nodejs
  ```bash
  node --version 
  // v12.18.0
  ```
  Note: 
  * Jika belum download node. Silakan download di [website official nodejs](https://nodejs.org/en/download/)
  * Versi node yang aman digunakan untuk membuka projek ini adalah v12.x.x
* npm
  ```bash
  npm --version 
  // v6.14.8
  ```
  Note:
  * npm akan diinstall bersamaan dengan node. Jika sudah install node harusnya npm juga sudah terinstall
* expo
  ```bash
  # install expo secara global
  npm install --global expo-cli
  
  # cek versi expo
  expo --version 
  // v4.0.17
  ```
  Note: 
  * Jika versi expo kurang dari v4.0.17. Silakan untuk install expo secara global untuk memperbaharui
  * Jangan lupa juga untuk install aplikasi Expo versi terbaru di smartphone Anda

### Installation
1. Fork repositori ini ke repositori Anda (klik tombol fork yang ada di pojok kanan atas)
2. Clone repositori yang sudah Anda fork tadi
   ```bash
   git clone https://github.com/{USERNAME_GITHUB_ANDA}/booking-room-app.git
   cd booking-room-app
   ```
3. Arahkan remote upstream ke repositori utama
   ```bash
   git remote add upstream https://github.com/ajipandean/booking-room-app.git
   ```
   Note: tujuan dari remote upstream ini adalah untuk mengupdate kodingan Anda agar sama dengan repo utama
4. Install semua dependencies projek
   ```bash
   npm install
   ```
5. Jalankan perintah berikut untuk membuka projek
   ```bash
   # untuk android
   npm run android
   
   # untuk web
   npm run web
   
   # untuk ios
   npm run ios
   ```

## Contributing rules
1. Pastikan Anda selalu pull upstream main sebelum mulai ngoding
   ```bash
   git pull upstream dev
   ```
2. Pastikan pull request Anda mengarah ke branch dev (bukan main)
3. Pastikan kode sudah dirapikan sebelum pull request. Jika berantakan tidak akan diterima
4. Pull request yang mengarah ke branch main tidak akan diterima dan harus pull request ulang
5. Workspace Anda selaku contributor hanyalah folder screens dan components. Tidak lebih dari itu

## Contributing tasks
- [ ] koding halaman login
- [ ] koding halaman register user
- [ ] koding halaman beranda
- [x] koding halaman detail ruangan
- [x] koding halaman booking form
- [x] koding halaman profil user
- [ ] konek api halaman login
- [ ] konek api halaman register user
- [ ] konek api halaman beranda
- [ ] konek api halaman detail ruangan
- [ ] konek api halaman profil user
