type Notification = { id: number; title: string; message: string };
type NotificationFeedProps = { notifications: Notification[] };

export function NotificationFeed({ notifications }: NotificationFeedProps) {
  return (
    <section className="notification-panel" aria-labelledby="notifications-title">
      <div className="section-heading">
        <p className="eyebrow">Live updates</p>
        <h2 id="notifications-title">Notifications</h2>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <article key={notification.id} className="notification-card">
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}