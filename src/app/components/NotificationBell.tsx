import { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNotifications } from '../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-border';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg cyber-surface border border-cyber-border hover:border-cyan-500/30 transition-all"
      >
        <Bell className="h-5 w-5 text-muted-foreground/70" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full text-xs font-bold text-white flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 cyber-surface border border-cyber-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-cyber-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white">Notifications</h3>
                <p className="text-xs text-muted-foreground/70">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-cyan-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <CheckCheck className="h-3 w-3" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground/70">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-cyber-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-all hover:bg-cyber-hover ${
                        !notification.read ? 'bg-cyan-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold flex-shrink-0 ${getNotificationColor(
                            notification.type
                          )}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-white text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1" />
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground/70 mb-2">{notification.message}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </span>

                            <div className="flex items-center gap-2">
                              {notification.actionUrl && (
                                <Link
                                  to={notification.actionUrl}
                                  onClick={() => {
                                    markAsRead(notification.id);
                                    setIsOpen(false);
                                  }}
                                  className="text-xs text-cyan-400 hover:text-cyan-400 transition-colors"
                                >
                                  {notification.actionLabel || 'View'}
                                </Link>
                              )}

                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-muted-foreground hover:text-cyan-400 transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="h-3 w-3" />
                                </button>
                              )}

                              <button
                                onClick={() => clearNotification(notification.id)}
                                className="text-muted-foreground hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-cyber-border">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-sm text-cyan-400 hover:text-cyan-400 transition-colors"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
