// Werner Hub - Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAPClP0MCbKOXyPTLj5eVG9YSU25LtH5Dc",
  authDomain: "werner-hub.firebaseapp.com",
  databaseURL: "https://werner-hub-default-rtdb.firebaseio.com",
  projectId: "werner-hub",
  storageBucket: "werner-hub.firebasestorage.app",
  messagingSenderId: "578596882685",
  appId: "1:578596882685:web:fe0d1812795233b0569694"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || '🏠 Werner Hub', {
    body: body || 'New message from the family!',
    icon: 'https://em-content.zobj.net/thumbs/240/apple/354/house_1f3e0.png',
    badge: 'https://em-content.zobj.net/thumbs/240/apple/354/house_1f3e0.png',
    vibrate: [200, 100, 200],
    tag: 'werner-hub-chat',
    renotify: true
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('netlify') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('https://clinquant-platypus-821944.netlify.app');
    })
  );
});
