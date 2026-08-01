import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { AppNavigator } from './navigation/AppNavigator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TICKER_DATA = [
  { symbol: 'EUR/USD', price: '1.0852', change: '+0.15%', isUp: true },
  { symbol: 'GBP/USD', price: '1.2640', change: '-0.08%', isUp: false },
  { symbol: 'USD/JPY', price: '154.32', change: '+0.42%', isUp: true },
  { symbol: 'XAU/USD', price: '2385.10', change: '+1.12%', isUp: true },
  { symbol: 'XTI/USD', price: '78.45', change: '-0.65%', isUp: false },
  { symbol: 'BTC/USD', price: '64210', change: '+2.40%', isUp: true },
  { symbol: 'US30', price: '38980', change: '+0.28%', isUp: true },
  { symbol: 'SPX500', price: '5210.5', change: '+0.35%', isUp: true },
];

const HEADLINES = [
  'FED PREPARES MONETARY POLICY ADJUSTMENTS AMID COOLING INFLATION',
  'ECB SIGNALS GRADUAL RATE CUTS AS EUROZONE GROWTH MODERATES',
  'OIL STABILIZES AS GLOBAL SUPPLY CONCERNS EASE NEAR KEY SUPPORT',
  'TECH RALLY BOOSTS SPX500 TO NEW RECORD HIGH IN EARLY TRADING',
];

const SECTIONS = [
  { name: 'NEWS', icon: 'newspaper-outline' },
  { name: 'CHARTS', icon: 'bar-chart-outline' },
  { name: 'CALENDAR', icon: 'calendar-outline' },
  { name: 'LIVE TV', icon: 'tv-outline' },
  { name: 'RISK', icon: 'calculator-outline' },
  { name: 'HEATMAP', icon: 'grid-outline' },
  { name: 'BANKS', icon: 'library-outline' },
  { name: 'BONDS', icon: 'stats-chart-outline' },
  { name: 'CORRELATIONS', icon: 'apps-outline' },
  { name: 'LIQUIDITY', icon: 'layers-outline' },
  { name: 'COT', icon: 'analytics-outline' },
  { name: 'SENTIMENT', icon: 'pie-chart-outline' },
  { name: 'WEB FEATURES', icon: 'globe-outline' },
  { name: 'SESSIONS', icon: 'time-outline' },
  { name: 'JOURNAL', icon: 'book-outline' },
  { name: 'ABOUT', icon: 'information-circle-outline' },
  // New Macro & Institutional Sections
  { name: 'INFLATION', icon: 'trending-up-outline' },
  { name: 'YIELD CURVE', icon: 'stats-chart-outline' },
  { name: 'COMMODITIES', icon: 'earth-outline' },
  { name: 'DARK POOL', icon: 'eye-off-outline' },
  { name: 'EARNINGS', icon: 'calendar-outline' },
  { name: 'NEWS AUDIO', icon: 'radio-outline' },
];

function ContinuousTicker({ theme }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.setValue(0);
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -600,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.tickerWrapper}>
      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>CNBC</Text>
      </View>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View style={[styles.tickerRow, { transform: [{ translateX: scrollX }] }]}>
          {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, index) => (
            <View key={index} style={styles.tickerItem}>
              <Text style={[styles.tickerSymbol, { color: theme.text }]}>{item.symbol}</Text>
              <Text style={[styles.tickerPrice, { color: theme.text }]}>{item.price}</Text>
              <Text style={[styles.tickerChange, { color: item.isUp ? '#22c55e' : '#ef4444' }]}>
                {item.isUp ? '▲' : '▼'} {item.change}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

function HeadlineTicker({ theme }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.setValue(0);
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -1200,
        duration: 26000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={[styles.headlineBar, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
      <View style={styles.headlineTag}>
        <Ionicons name="flash" size={10} color="#38bdf8" />
        <Text style={styles.headlineTagText}>BREAKING</Text>
      </View>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View style={[styles.headlineRow, { transform: [{ translateX: scrollX }] }]}>
          {[...HEADLINES, ...HEADLINES, ...HEADLINES].map((text, idx) => (
            <View key={idx} style={styles.headlineItem}>
              <Text style={[styles.headlineText, { color: theme.subText }]}>{text}</Text>
              <Text style={styles.headlineDot}>•</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [navigationRef, setNavigationRef] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  const splashAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(0)).current;

  const theme = {
    isDarkMode,
    bg: isDarkMode ? '#0b0f19' : '#f8fafc',
    cardBg: isDarkMode ? '#1e293b' : '#ffffff',
    text: isDarkMode ? '#f8fafc' : '#0f172a',
    subText: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? '#334155' : '#e2e8f0',
    tabBg: isDarkMode ? '#0f172a' : '#ffffff',
    primary: '#38bdf8',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(splashAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      Animated.timing(headerSlideAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 5000);

    return () => clearTimeout(headerTimer);
  }, []);

  const handleNavigate = (screenName) => {
    if (navigationRef) {
      navigationRef.navigate(screenName);
    }
    setMenuVisible(false);
  };

  const titleY = headerSlideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -45],
  });

  const tickerY = headerSlideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [45, 0],
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={theme.bg} />

        {/* Splash Screen */}
        {showSplash && (
          <Animated.View
            style={[
              styles.splashOverlay,
              { backgroundColor: '#0b0f19', transform: [{ translateX: splashAnim }] },
            ]}
          >
            <Text style={styles.splashTitle}>
              ⚡ MACRO<Text style={{ color: '#38bdf8' }}>TERMINAL</Text>
            </Text>

            <Text style={styles.splashSubtitle}>
              INSTANT INSTITUTIONAL INTELLIGENCE
            </Text>

            <View style={styles.splashBadge}>
              <Text style={styles.splashBadgeText}>INITIALIZING LIQUIDITY FEED...</Text>
            </View>
          </Animated.View>
        )}

        <NavigationContainer ref={(ref) => setNavigationRef(ref)}>
          {/* Top Navigation Bar */}
          <View style={[styles.header, { backgroundColor: theme.bg, borderColor: theme.border }]}>
            <View style={styles.headerLeftSlot}>
              <Animated.View style={[styles.headerSlotInner, { transform: [{ translateY: titleY }] }]}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>
                  ⚡ MACRO<Text style={{ color: theme.primary }}>TERMINAL</Text>
                </Text>
              </Animated.View>

              <Animated.View style={[styles.headerSlotInner, { transform: [{ translateY: tickerY }] }]}>
                <ContinuousTicker theme={theme} />
              </Animated.View>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1 }]}
                onPress={() => setMenuVisible(true)}
              >
                <Ionicons name="ellipsis-vertical" size={18} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sub-Header: Economic Headline Ticker */}
          <HeadlineTicker theme={theme} />

          {/* Quick Nav Dropdown Modal (Grid Layout) */}
          <Modal
            visible={menuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
              <View style={[styles.menuDropdown, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <TouchableOpacity
                  style={[styles.menuItem, styles.themeToggleItem, { borderBottomColor: theme.border }]}
                  onPress={() => {
                    setIsDarkMode(!isDarkMode);
                    setMenuVisible(false);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons
                      name={isDarkMode ? 'moon' : 'sunny'}
                      size={16}
                      color={isDarkMode ? '#38bdf8' : '#f59e0b'}
                    />
                    <Text style={[styles.menuItemText, { color: theme.text }]}>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={14} color={theme.subText} />
                </TouchableOpacity>

                <Text style={styles.menuHeader}>QUICK NAVIGATION</Text>

                {/* Grid View for all sections */}
                <ScrollView style={{ maxHeight: 380 }}>
                  <View style={styles.gridContainer}>
                    {SECTIONS.map((item) => (
                      <TouchableOpacity
                        key={item.name}
                        style={styles.gridItem}
                        onPress={() => handleNavigate(item.name)}
                      >
                        <Ionicons name={item.icon} size={16} color={theme.primary} />
                        <Text style={[styles.gridItemText, { color: theme.text }]} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </Pressable>
          </Modal>

          <AppNavigator theme={theme} />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  splashTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#f8fafc',
    letterSpacing: 1,
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 2,
    marginBottom: 24,
  },
  splashBadge: {
    backgroundColor: '#38bdf815',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  splashBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 1,
  },
  header: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  headerLeftSlot: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  headerSlotInner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef444420',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    gap: 3,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ef4444',
  },
  liveText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#ef4444',
    letterSpacing: 0.5,
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    gap: 4,
  },
  tickerSymbol: {
    fontSize: 10,
    fontWeight: '800',
  },
  tickerPrice: {
    fontSize: 10,
    fontWeight: '600',
  },
  tickerChange: {
    fontSize: 9,
    fontWeight: '700',
  },
  headlineBar: {
    height: 28,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headlineTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38bdf815',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    gap: 3,
  },
  headlineTagText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#38bdf8',
    letterSpacing: 0.5,
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  headlineText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headlineDot: {
    color: '#38bdf8',
    marginLeft: 12,
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 56,
    paddingRight: 12,
  },
  menuDropdown: {
    width: 320,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    elevation: 8,
  },
  themeToggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 6,
  },
  menuHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    paddingHorizontal: 4,
    paddingVertical: 4,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 8,
  },
  gridItemText: {
    fontSize: 11,
    fontWeight: '700',
  },
  menuItemText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
