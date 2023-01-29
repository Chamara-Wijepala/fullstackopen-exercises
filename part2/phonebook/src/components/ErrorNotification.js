export default function ErrorNotification({ message }) {
  if (!message) return null;

  return <div className="notification error">{message}</div>;
}
