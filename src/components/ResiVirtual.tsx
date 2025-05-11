import { useEffect, useState } from "react";
import "./ResiVirtual.css";
import HapusIcon from "../images/trashcan.svg";

interface ItemTransaksi {
  id: string;
  namaProduk: string;
  harga: number;
  jumlah: number;
  subtotal: number;
  keterangan?: string;
  kadaluarsa?: string;
}

interface ResiVirtualProps {
  items: ItemTransaksi[];
  totalHarga: number;
  onUpdateJumlah: (id: string, jumlah: number) => void;
  onHapusProduk: (id: string) => void;
  onSimpanTransaksi: () => void;
  handleResetTransaksi: () => void;
}

const ResiVirtual = ({ items, totalHarga, onUpdateJumlah, onHapusProduk, onSimpanTransaksi, handleResetTransaksi }: ResiVirtualProps) => {
  const [tanggalTransaksi, setTanggalTransaksi] = useState("");

  useEffect(() => {
    const date = new Date();
    setTanggalTransaksi(date.toLocaleDateString("id-ID"));
  }, []);

  return (
    <div className="resi-container-dalam">
      <h1 className="judul-resi-virtual">Resi Virtual</h1>

      <div className="resi-wrapper">
        <table className="resi-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Keterangan</th>
              <th>Kadaluarsa</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th></th>
            </tr>
            <tr>
              <th className="border-line" colSpan={6}></th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-message">Silahkan pilih produk</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.namaProduk}</td>
                  <td>{item.keterangan || '-'}</td>
                  <td>{item.kadaluarsa || '-'}</td>
                  <td>
                    <input
                      type="number"
                      value={item.jumlah}
                      onChange={(e) => onUpdateJumlah(item.id, Number(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>Rp{item.harga * item.jumlah}</td>
                  <td>
                    <button className="hapus-button" onClick={() => onHapusProduk(item.id)}>
                      <img className="gambar-hapus" src={HapusIcon} alt="Hapus" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr>
              <th className="border-line" colSpan={6}></th>
            </tr>
            <tr>
              <th>Total Belanja</th>
              <th></th>
              <th></th>
              <th></th>
              <th>Rp{totalHarga}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="tanggal-user">
        <p>Tanggal Transaksi: {tanggalTransaksi}</p>
        <p>Kasir: Admin</p>
      </div>
      <div className="bawah-resi">
        <button className="simpan-button" onClick={onSimpanTransaksi}>Simpan Transaksi</button>
        <button className="reset-button" onClick={handleResetTransaksi}>
          Ulang Transaksi
        </button>
      </div>
    </div>
  );
};

export default ResiVirtual;