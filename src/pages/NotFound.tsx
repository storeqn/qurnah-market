import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="empty">
      <span className="eyebrow">404</span>
      <h1>هذه الصفحة غير موجودة</h1>
      <p>يمكنك متابعة اكتشاف السوق من الصفحة الرئيسية.</p>
      <Link className="primary-button" to="/">
        العودة للرئيسية
      </Link>
    </div>
  );
}
