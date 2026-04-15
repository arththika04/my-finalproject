"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "react-toastify";

type Notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading notifications...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-white/70">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl border p-4 ${
                item.isRead
                  ? "border-white/10 bg-white/5"
                  : "border-red-500/40 bg-red-500/10"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-white/70 mt-1">{item.message}</p>
                  <p className="text-xs text-white/40 mt-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {!item.isRead && (
                  <button
                    onClick={() => markAsRead(item._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}