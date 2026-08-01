import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BondsScreen({ theme }) {
  const BONDS = [
    { name: 'US 10-Year Treasury', yield: '4.22%', change: '-0.04%', isUp: false, region: 'US' },
    { name: 'US 2-Year Treasury', yield: '4.48%', change: '+0.02%', isUp: true, region: 'US' },
    { name: 'US 30-Year Bond', yield: '4.39%', change: '-0.03%', isUp: false, region: 'US' },
    { name: 'German 10Y Bund', yield: '2.51%', change: '-0.01%', isUp: false, region: 'EU' },
    { name: 'UK 10Y Gilt', yield: '4.15%', change: '+0.05%', isUp: true, region: 'UK' },
    { name: 'Japan 10Y JGB', yield: '0.98%', change: '+0.03%', isUp: true, region: 'JP' },
  ];

  const SPREADS = [
    { title: 'US 10Y - 02Y Spread', value: '-0.26%', status: 'Inverted Curve', alert: true },
    { title: 'US 10Y - 30Y Spread', value: '-0.17%', status: 'Flat', alert: false },
    { title: 'US-German 10Y Spread', value: '+1.71%', status: 'USD Advantage', alert: false },
  ];

  const RATE_PROBABILITIES = [
    { meeting: 'Fed (FOMC) - Sep 2026', cutProb: '84%', holdProb: '16%', bias: 'Rate Cut Expected' },
    { meeting: 'ECB - Sep 2026', cutProb: '62%', holdProb: '38%', bias: 'Moderate Cut' },
    { meeting: 'BOE - Oct 2026', cutProb: '45%', holdProb: '55%', bias: 'Hold Expected' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Ionicons name="stats-chart-outline" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Bonds & Yield Curve</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.subText }]}>
        Global Sovereign Yields & Interest Rate Probabilities
      </Text>

      {/* Yield Curve Spreads Alert */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>YIELD CURVE SPREADS</Text>
      </View>
      {SPREADS.map((item, idx) => (
        <View
          key={idx}
          style={[styles.spreadCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <View>
            <Text style={[styles.spreadTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.spreadStatus, { color: item.alert ? '#ef4444' : theme.subText }]}>
              {item.status}
            </Text>
          </View>
          <Text style={[styles.spreadValue, { color: item.alert ? '#ef4444' : theme.text }]}>
            {item.value}
          </Text>
        </View>
      ))}

      {/* Sovereign Bond Yield Table */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>GLOBAL BENCHMARK YIELDS</Text>
      </View>
      <View style={[styles.tableContainer, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {BONDS.map((bond, idx) => (
          <View
            key={idx}
            style={[
              styles.tableRow,
              { borderBottomColor: theme.border, borderBottomWidth: idx === BONDS.length - 1 ? 0 : 1 },
            ]}
          >
            <View style={styles.bondNameGroup}>
              <View style={styles.regionBadge}>
                <Text style={styles.regionText}>{bond.region}</Text>
              </View>
              <Text style={[styles.bondName, { color: theme.text }]}>{bond.name}</Text>
            </View>
            <View style={styles.yieldValGroup}>
              <Text style={[styles.yieldText, { color: theme.text }]}>{bond.yield}</Text>
              <Text style={[styles.changeText, { color: bond.isUp ? '#22c55e' : '#ef4444' }]}>
                {bond.isUp ? '▲' : '▼'} {bond.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Central Bank Probabilities */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>RATE DECISION PROBABILITIES</Text>
      </View>
      {RATE_PROBABILITIES.map((rate, idx) => (
        <View
          key={idx}
          style={[styles.rateCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <View style={styles.rateHeader}>
            <Text style={[styles.rateMeeting, { color: theme.text }]}>{rate.meeting}</Text>
            <View style={[styles.biasTag, { backgroundColor: '#38bdf818', borderColor: theme.primary }]}>
              <Text style={[styles.biasText, { color: theme.primary }]}>{rate.bias}</Text>
            </View>
          </View>
          <View style={styles.probRow}>
            <Text style={[styles.probLabel, { color: theme.subText }]}>
              Cut: <Text style={{ color: '#22c55e', fontWeight: '900' }}>{rate.cutProb}</Text>
            </Text>
            <Text style={[styles.probLabel, { color: theme.subText }]}>
              Hold: <Text style={{ color: theme.text, fontWeight: '900' }}>{rate.holdProb}</Text>
            </Text>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 12,
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  spreadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  spreadTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  spreadStatus: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  spreadValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  tableContainer: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  bondNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionBadge: {
    backgroundColor: '#38bdf820',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  regionText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#38bdf8',
  },
  bondName: {
    fontSize: 12,
    fontWeight: '700',
  },
  yieldValGroup: {
    alignItems: 'flex-end',
  },
  yieldText: {
    fontSize: 13,
    fontWeight: '900',
  },
  changeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  rateCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateMeeting: {
    fontSize: 12,
    fontWeight: '800',
  },
  biasTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  biasText: {
    fontSize: 9,
    fontWeight: '900',
  },
  probRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  probLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
