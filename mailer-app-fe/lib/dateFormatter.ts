export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();

  // Menghitung selisih waktu dalam bulan
  const diffMonths = today.getMonth() - date.getMonth() + (12 * (today.getFullYear() - date.getFullYear()));

  // Jika selisih kurang dari satu bulan
  if (diffMonths < 1) {
    // Format: "dd mm"
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Menggunakan singkatan bulan
    return `${day} ${month}`;
  } else {
    // Format: "dd/mm/yyyy"
    const day = ('0' + date.getDate()).slice(-2); // Tambahkan 0 di depan jika hari kurang dari 10
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0, jadi tambahkan 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
