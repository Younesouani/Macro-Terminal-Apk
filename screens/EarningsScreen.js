import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EARNINGS_DATA = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    date: 'Aug 28, 2026',
    timing: 'After Close',
    epsEst: '$5.84',
    revEst: '$28.5B',
    impliedMove: '±8.5%',
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    date: 'Aug 01, 2026',
    timing: 'After Close',
    epsEst: '$1.35',
    revEst: '$84.2B',
    impliedMove: '±4.2%',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    date: 'Aug 02, 2026',
    timing: 'After Close',
    epsEst: '$2.93',
    revEst: '$64.5B',
    impliedMove: '±4.8%',
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    date: 'Aug 03, 2026',
    timing: 'After Close',
    epsEst: '$1.03',
    revEst: '$148.6B',
    impliedMove: '±6.1%',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    date: 'Aug 04, 2026',
    timing: 'Before Open',
    epsEst: '$0.62',
    revEst: '$24.7B',
    impliedMove: '±7.4%',
  },
];

export default function EarningsScreen({ theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Summary Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="calendar-outline" size={18} color={theme.primary} />
            <Text style={[styles.headerTitle, { color: theme.text }]}>CORPORATE EARNINGS CALENDAR</Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            High-impact upcoming equity earnings reports and options pricing metrics.
          </Text>
        </View>

        {/* Earnings List */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>UPCOMING RELEASES</Text>
        
        <View style={styles.listContainer}>
          {EARNINGS_DATA.map((item, index) => (
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

                <View style={[styles.timingBadge, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]}>
                  <Text style={[styles.timingText, { color: theme.primary }]}>{item.timing}</Text>
                </View>
              </View>

              <View style={[styles.cardDetails, { borderTopColor: theme.border }]}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>DATE</Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>{item.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>EPS EST</Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>{item.epsEst}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>REV EST</Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>{item.revEst}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.subText }]}>IMPLIED MOVE</Text>
                  <Text style={[styles.detailValue, { color: '#38bdf8' }]}>{item.impliedMove}</Text>
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
    maxWidth: 150,
  },
  timingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  timingText: {
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
