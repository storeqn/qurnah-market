import { useRegisterSW } from "virtual:pwa-register/react";
export default function PwaNotice() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();
  if (!offlineReady && !needRefresh) return null;
  return (
    <div className="pwa-notice" role="status">
      <p>
        {needRefresh ? "يتوفر تحديث جديد للسوق" : "السوق جاهز للتصفح دون اتصال"}
      </p>
      {needRefresh && (
        <button onClick={() => updateServiceWorker(true)}>تحديث الآن</button>
      )}
      <button
        onClick={() => {
          setOfflineReady(false);
          setNeedRefresh(false);
        }}
      >
        إغلاق
      </button>
    </div>
  );
}
