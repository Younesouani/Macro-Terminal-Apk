import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DARK_POOL_DATA = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$214.50',
    volume: '2.4M',
    notional: '$514.8M',
    sentiment: 'Bullish Block',
    isBullish: true,
    time: '16:15 EST',
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '$128.30',
    volume: '4.1M',
    notional: '$526.0M',
    sentiment: 'Heavy Accumulation',
    isBullish: true,
    time: '15:58 EST',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: '$248.10',
    volume: '1.8M',
    notional: '$446.5M',
    sentiment: 'Distribution Sweep',
    isBullish: false,
    time: '15:42 EST',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: '$448.20',
    volume: '950K',
    notional: '$425.7M',
    sentiment: 'Neutral Cross',
    isBullish: true,
    time: '15:10 EST',
  },
  {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF',
    price: '$542.10',
    volume: '6.5M',
    notional: '$3.52B',
    sentiment: 'Institutional Hedge',
    isBullish: false,
    time: '14:55 EST',
  },
];

export default function DarkPoolScreen({ theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Summary Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="eye-off-outline" size={18} color={theme.primary} />
            <Text style={[styles.headerTitle, { color: theme.text }]}>DARK POOL & BLOCK TRADES</Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            Tracking hidden institutional liquidity prints and massive off-exchange volume.
          </Text>
        </View>

        {/* Block Prints List */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>RECENT OFF-EXCHANGE PRINTS</Text>
        
        <View style={styles.listContainer}>
          {DARK_POOL_DATA.map((item, index) => (
            <View
              key={index}
              style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.tickerGroup}>
                  <Text style={[styles.tickerText, { color: theme.text }]}>{item.ticker}</Text>
                  <Text style={[styles.nameText, { color: theme.subText }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>

                <View
                  style={[
                    styles.sentimentBadge,
                    {
                      backgroundColor: item.isBullish ? '#22c55e15' : '#ef444415',
                      borderColor: item.isBullish ? '#22c55e' : '#ef4444',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sentimentText,
                      { color: item.isBullish ? '#22c55e' : '#ef4444' },
                    ]}
                  >
                    {item.sentiment}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardDetails, { borderTopColor: theme.border }]}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>PRINTS</Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>{item.price}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>VOLUME</Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>{item.volume}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>NOTIONAL</Text>
                  <Text style={[styles.detailValue, { color: theme.primary }]}>{item.notional}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>TIME</Text>
                  <Text style={[styles.detailValue, { color: theme.subText }]}>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    gap: 10,
  },
  headerCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  listContainer: {
    gap: 8,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tickerGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  tickerText: {
    fontSize: 14,
    fontWeight: '900',
  },
  nameText: {
    fontSize: 10,
    fontWeight: '600',
    maxWidth: 140,
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  sentimentText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  detailItem: {
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 8,
    fontWeight: '700',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '800',
  },
});
