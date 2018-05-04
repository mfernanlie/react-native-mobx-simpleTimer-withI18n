'use strict';
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.translations = {
    'en': {
        "title": "Welcome to RN Timer Example!",
        "footer": "This is a footer message."
    },
    'id': {
        "title": "Selamat Datang ke RN Timer Example!",
        "footer": "Ini adalah pesan footer."
    },
    'zh': {
        "title": "歡迎來到 RN Timer Example!",
        "footer": "這是結束消息."
    }
}

export default I18n;