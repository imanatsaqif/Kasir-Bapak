// src/components/CariProduk.tsx
import { useState } from "react";
import "./CariProduk.css";
import InputIcon from "../images/input-svgrepo-com.svg";

interface Produk {
  id: string;
  namaProduk: string;
  harga: number;
  stok: number;
  kadaluarsa: string;
}

interface CariProdukProps {
  produkList: Produk[];
  onProdukDipilih: (produk: Produk) => void;
}

const CariProduk = ({ produkList, onProdukDipilih }: CariProdukProps) => {
  const [keyword, setKeyword] = useState("");

  // Filter produk berdasarkan keyword, jika kosong tampilkan semua
  const hasilPencarian = keyword
    ? produkList.filter((produk) =>
        produk.namaProduk.toLowerCase().includes(keyword.toLowerCase())
      )
    : produkList;

  return (
    <div>
      <h2 className="judul-cari-produk">Cari Produk</h2>
      <input
        className="input-box"
        type="text"
        placeholder="Cari produk..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div className="produk-table-container">
        <table className="produk-table">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Tgl Kadaluarsa</th>
              <th>Stok</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hasilPencarian.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-message">Produk tidak ditemukan</td>
              </tr>
            ) : (
              hasilPencarian.map((produk) => (
                <tr key={produk.id}>
                  <td>{produk.namaProduk}</td>
                  <td>{produk.kadaluarsa}</td>
                  <td>{produk.stok}</td>
                  <td>
                    <button
                      className="input-button"
                      onClick={() => onProdukDipilih(produk)}
                    >
                      <img src={InputIcon} alt="Tambah" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CariProduk;