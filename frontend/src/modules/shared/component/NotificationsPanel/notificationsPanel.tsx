"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Popover } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNotificationsQuery } from "@/services/queryService";
import { setUnreadCount } from "@/redux/store/slices/notificationSlice";
import type { Notification } from "@/types";
import { getSafeAppHref } from "@/utils/urlSafety";

interface NotificationsPanelProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export default function NotificationsPanel({
  anchorEl,
  open,
  onClose,
}: NotificationsPanelProps) {
  const dispatch = useDispatch();
  const { data: notifications = [] } = useNotificationsQuery();

  useEffect(() => {
    const unread = notifications.filter((n: Notification) => !n.read).length;
    dispatch(setUnreadCount(unread));
  }, [notifications, dispatch]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          className:
            "mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-border-low-contrast bg-surface-container-high shadow-lg",
        },
      }}
    >
      <div className="border-b border-border-low-contrast px-4 py-3">
        <h3 className="font-semibold text-on-surface">Notifications</h3>
      </div>
      {notifications.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-on-surface-variant">
          No notifications yet
        </p>
      ) : (
        <ul>
          {notifications.map((n: Notification) => (
            <li key={n.id}>
              <Link
                href={getSafeAppHref(n.href)}
                onClick={onClose}
                className={`block px-4 py-3 text-sm hover:bg-surface-container ${
                  n.read ? "text-on-surface-variant" : "text-on-surface font-medium"
                }`}
              >
                {n.message}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Popover>
  );
}
