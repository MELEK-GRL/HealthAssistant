require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ✅ Route dosyaları
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const checkRoute = require('./routes/check');
const messageRoutes = require('./routes/message');
const conversationRoutes = require('./routes/conversation');


// ✅ Express app başlat
const app = express();

// ✅ Middleware'ler
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// ✅ Route'ları bağla
app.use('/auth', authRoutes);
app.use('/check', checkRoute);
app.use('/', uploadRoutes);
app.use('/message', messageRoutes);
app.use('/conversations', conversationRoutes);

// ✅ Sağlık testi endpoint'i
app.get('/ping', (req, res) => {
    res.send('pong');
});

// ✅ MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test')
    .then(() => console.log(' MongoDB bağlantısı başarılı'))
    .catch(err => console.error(' MongoDB bağlantı hatası:', err));

// ✅ Sunucuyu başlat
app.listen(3001, '0.0.0.0', () => {
    console.log('Backend çalışıyor: http://localhost:3001');
});
