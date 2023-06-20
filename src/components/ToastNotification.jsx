export default function ToastNotification({ toast }) {

  return (
    <div id={toast.id} className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
}
