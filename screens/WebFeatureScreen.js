import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const WEB_FEATURES = [
  {
    id: 'tv-chart',
    title: 'ADVANCED CHART',
    icon: 'analytics-outline',
    url: 'https://s.tradingview.com/widgetembed/?symbol=FX%3AEURUSD&interval=D&hidesidebar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&theme=dark',
  },
  {
    id: 'finviz-map',
    title: 'S&P 500 MAP',
    icon: 'grid-outline',
    url: 'https://finviz.com/map.ashx?t=sec',
  },
  {
    id: 'fx-heatmap',
    title: 'FX CROSS MATRIX',
    icon: 'apps-outline',
    url: 'https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%5D%2C%22isTransparent%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%7D',
  },
];

export default function WebFeatureScreen({ theme }) {
  const [activeTab, setActiveTab] = useState(WEB_FEATURES[0]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Sub-Header Feature Switcher */}
      <View style={[styles.tabBar, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {WEB_FEATURES.map((feature) => {
          const isActive = activeTab.id === feature.id;
          return (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.tabItem,
                isActive && { backgroundColor: theme.primary + '20', borderColor: theme.primary },
              ]}
              onPress={() => {
                if (activeTab.id !== feature.id) {
                  setIsLoading(true);
                  setActiveTab(feature);
                }
              }}
            >
              <Ionicons
                name={feature.icon}
                size={14}
                color={isActive ? theme.primary : theme.subText}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? theme.primary : theme.subText },
                ]}
              >
                {feature.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* WebView Container */}
      <View style={styles.webContainer}>
        {isLoading && (
          <View style={[styles.loadingOverlay, { backgroundColor: theme.bg }]}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.subText }]}>
              LOADING WEB MODULE...
            </Text>
          </View>
        )}

        <WebView
          key={activeTab.id}
          source={{ uri: activeTab.url }}
          style={{ flex: 1, backgroundColor: theme.bg }}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => null}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 6,
  },
  tabText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  webContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
