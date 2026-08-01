import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const CHANNELS = [
  {
    id: 'france24',
    name: 'France 24 English',
    tag: 'Global Macro & World Press',
    streamUrl: 'https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8',
  },
  {
    id: 'dw',
    name: 'DW News',
    tag: 'European Markets & Intelligence',
    streamUrl: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
  },
  {
    id: 'euronews',
    name: 'Euronews Live',
    tag: 'International Markets & Finance',
    streamUrl: 'https://euronews-euronews-world-1-us.samsung.wurl.tv/playlist.m3u8',
  },
  {
    id: 'bloomberg_alt',
    name: 'Al Jazeera English',
    tag: 'Energy Markets & Global Economy',
    streamUrl: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
  },
];

export default function LiveTvScreen() {
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0]);

  // Clean HTML5 video engine supporting HLS natively
  const getPlayerHTML = (m3u8Url) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #0b0f19; overflow: hidden; display: flex; justify-content: center; align-items: center; }
          video { width: 100%; height: 100%; object-fit: contain; }
        </style>
      </head>
      <body>
        <video id="video" controls autoplay playsinline muted></video>
        <script>
          var video = document.getElementById('video');
          var videoSrc = '${m3u8Url}';
          if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play();
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', function() {
              video.play();
            });
          }
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📺 Institutional Live TV</Text>
      </View>

      {/* Channel Bar */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollTabs}>
          {CHANNELS.map((channel) => {
            const isActive = selectedChannel.id === channel.id;
            return (
              <TouchableOpacity
                key={channel.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setSelectedChannel(channel)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  🔴 {channel.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Player Frame */}
      <View style={styles.playerWrapper}>
        <View style={styles.videoCanvas}>
          <WebView
            key={selectedChannel.id}
            originWhitelist={['*']}
            source={{ html: getPlayerHTML(selectedChannel.streamUrl) }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowsFullscreenVideo={true}
          />
        </View>

        {/* Channel Details */}
        <View style={styles.channelMetaCard}>
          <View style={styles.liveIndicatorRow}>
            <View style={styles.redDot} />
            <Text style={styles.channelTitle}>{selectedChannel.name}</Text>
          </View>
          <Text style={styles.channelSub}>{selectedChannel.tag}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b0f19' },
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  tabContainer: { marginVertical: 12 },
  scrollTabs: { paddingHorizontal: 12 },
  tab: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeTab: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  tabText: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },
  activeTabText: { color: '#0f172a' },
  playerWrapper: { flex: 1, paddingHorizontal: 12 },
  videoCanvas: {
    width: '100%',
    height: 230,
    backgroundColor: '#000000',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  webview: { flex: 1, backgroundColor: '#000000' },
  channelMetaCard: {
    backgroundColor: '#1e293b',
    marginTop: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  liveIndicatorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', marginRight: 8 },
  channelTitle: { color: '#f8fafc', fontSize: 16, fontWeight: '700' },
  channelSub: { color: '#94a3b8', fontSize: 13 },
});
