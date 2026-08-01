import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const LIQUIDITY_ASSETS = [
  { id: 'SPX', name: 'S&P 500', symbol: 'FOREXCOM:SPXUSD' },
  { id: 'NDX', name: 'Nasdaq 100', symbol: 'FOREXCOM:NSXUSD' },
  { id: 'US10Y', name: 'US 10Y Yield', symbol: 'TVC:US10Y' },
  { id: 'DXY', name: 'US Dollar (DXY)', symbol: 'CAPITALCOM:DXY' },
  { id: 'GOLD', name: 'Gold (XAU/USD)', symbol: 'OANDA:XAUUSD' },
  { id: 'OIL', name: 'Crude Oil (WTI)', symbol: 'TVC:USOIL' },
  { id: 'BTC', name: 'Bitcoin', symbol: 'BINANCE:BTCUSDT' },
];

export default function ChartsScreen() {
  const [selectedAsset, setSelectedAsset] = useState(LIQUIDITY_ASSETS[0]);

  const getTradingViewHTML = (symbol) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #0b0f19; overflow: hidden; }
          #tradingview_widget { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="tradingview_widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget({
            "autosize": true,
            "symbol": "${symbol}",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#0b0f19",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "save_image": false,
            "container_id": "tradingview_widget"
          });
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Macro Liquidity Monitor</Text>
      </View>

      {/* Asset Selector Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollTabs}>
          {LIQUIDITY_ASSETS.map((asset) => {
            const isActive = selectedAsset.id === asset.id;
            return (
              <TouchableOpacity
                key={asset.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setSelectedAsset(asset)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{asset.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Responsive TradingView Chart Canvas */}
      <View style={styles.chartContainer}>
        <WebView
          key={selectedAsset.id}
          originWhitelist={['*']}
          source={{ html: getTradingViewHTML(selectedAsset.symbol) }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b0f19' },
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  tabContainer: { marginVertical: 10 },
  scrollTabs: { paddingHorizontal: 12 },
  tab: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeTab: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  tabText: { color: '#94a3b8', fontSize: 13, fontWeight: '700' },
  activeTabText: { color: '#0f172a' },
  chartContainer: { flex: 1, backgroundColor: '#0b0f19', paddingBottom: 6 },
  webview: { flex: 1, backgroundColor: '#0b0f19' },
});
