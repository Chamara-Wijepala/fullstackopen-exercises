export default function SuccessNotification({ message }) {
  if (!message) return null;

  return <div className="notification success">{message}</div>;
}
