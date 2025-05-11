//src/components/ProductDetailModal.tsx
import "./ProductDetailModal.css";

interface ProductDetailModalProps {
  product: {
    namaProduk: string;
    jenisProduk: string;
    keterangan: string;
    kadaluarsa: string;
    harga: number;
    stok: number;
  };
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{product.namaProduk}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-row">
            <span className="modal-label">Jenis Produk:</span>
            <span>{product.jenisProduk}</span>
          </div>
          <div className="modal-row">
            <span className="modal-label">Keterangan:</span>
            <span>{product.keterangan || '-'}</span>
          </div>
          <div className="modal-row">
            <span className="modal-label">Kadaluarsa:</span>
            <span>{formatDate(product.kadaluarsa)}</span>
          </div>
          <div className="modal-row">
            <span className="modal-label">Harga:</span>
            <span>Rp{product.harga.toLocaleString()}</span>
          </div>
          <div className="modal-row">
            <span className="modal-label">Stok:</span>
            <span>{product.stok}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date
const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split("-");
  return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
};

export default ProductDetailModal;