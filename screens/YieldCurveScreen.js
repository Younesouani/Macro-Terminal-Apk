import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const YIELD_DATA = [
  { tenor: '1-Month', yieldRate: '5.28%', change: '-0.01%', isUp: false },
  { tenor: '3-Month', yieldRate: '5.24%', change: '+0.00%', isUp: true },
  { tenor: '6-Month', yieldRate: '5.12%', change: '-0.02%', isUp: false },
  { tenor: '1-Year', yieldRate: '4.85%', change: '-0.04%', isUp: false },
  { tenor: '2-Year', yieldRate: '4.32%', change: '-0.06%', isUp: false },
  { tenor: '5-Year', yieldRate: '3.98%', change: '-0.05%', isUp: false },
  { tenor: '10-Year', yieldRate: '4.05%', change: '-0.03%', isUp: false },
  { tenor: '30-Year', yieldRate: '4.22%', change: '-0.01%', isUp: false },
];

const SPREADS = [
  { name: '10Y - 2Y Spread', value: '+0.73 bps', status: 'Normal (Uninverted)', isPositive: true },
  { name: '10Y - 3M Spread', value: '-1.19 bps', status: 'Inverted (Recession Watch)', isPositive: false },
];

export default function YieldCurveScreen({ theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Summary Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="stats-chart-outline" size={18} color={theme.primary} />
            <Text style={[styles.headerTitle, { color: theme.text }]}>US TREASURY YIELD CURVE</Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            Real-time sovereign debt yields and structural curve spread diagnostics.
          </Text>
        </View>

        {/* Spread Diagnostics Section */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>CURVE SPREAD DIAGNOSTICS</Text>
        <View style={styles.spreadContainer}>
          {SPREADS.map((spread, index) => (
            <View
              key={index}
              style={[styles.spreadCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            >
              <Text style={[styles.spreadName, { color: theme.text }]}>{spread.name}</Text>
              <View style={styles.spreadRow}>
                <Text style={[styles.spreadValue, { color: spread.isPositive ? '#22c55e' : '#ef4444' }]}>
                  {spread.value}
                </Text>
                <Text style={[styles.spreadStatus, { color: theme.subText }]}>{spread.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tenor Table Header */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>BENCHMARK TENORS</Text>
        <View style={[styles.tableCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {YIELD_DATA.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index !== YIELD_DATA.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: 1 },
              ]}
            >
              <Text style={[styles.tenorText, { color: theme.text }]}>{item.tenor}</Text>
              <View style={styles.yieldInfo}>
                <Text style={[styles.yieldText, { color: theme.text }]}>{item.yieldRate}</Text>
                <Text style={[styles.changeText, { color: item.isUp ? '#22c55e' : '#ef4444' }]}>
                  {item.change}
                </Text>
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
    gap: 12,
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
  spreadContainer: {
    gap: 8,
  },
  spreadCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  spreadName: {
    fontSize: 11,
    fontWeight: '700',
  },
  spreadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spreadValue: {
    fontSize: 14,
    fontWeight: '900',
  },
  spreadStatus: {
    fontSize: 9,
    fontWeight: '600',
  },
  tableCard: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tenorText: {
    fontSize: 12,
    fontWeight: '700',
  },
  yieldInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  yieldText: {
    fontSize: 12,
    fontWeight: '800',
  },
  changeText: {
    fontSize: 10,
    fontWeight: '700',
    width: 45,
    textAlign: 'right',
  },
});
