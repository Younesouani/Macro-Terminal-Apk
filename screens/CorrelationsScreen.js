import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CorrelationsScreen({ theme }) {
  const [timeframe, setTimeframe] = useState('30D');

  const SYMBOLS = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'US30', 'BTCUSD'];

  // Matrix values mapping symbol vs symbol
  const MATRIX_DATA = {
    EURUSD: { EURUSD: 1.00, GBPUSD: 0.88, USDJPY: -0.74, XAUUSD: 0.65, US30: 0.42, BTCUSD: 0.31 },
    GBPUSD: { EURUSD: 0.88, GBPUSD: 1.00, USDJPY: -0.68, XAUUSD: 0.58, US30: 0.49, BTCUSD: 0.28 },
    USDJPY: { EURUSD: -0.74, GBPUSD: -0.68, USDJPY: 1.00, XAUUSD: -0.52, US30: 0.35, BTCUSD: 0.12 },
    XAUUSD: { EURUSD: 0.65, GBPUSD: 0.58, USDJPY: -0.52, XAUUSD: 1.00, US30: 0.21, BTCUSD: 0.45 },
    US30:   { EURUSD: 0.42, GBPUSD: 0.49, USDJPY: 0.35, XAUUSD: 0.21, US30: 1.00, BTCUSD: 0.62 },
    BTCUSD: { EURUSD: 0.31, GBPUSD: 0.28, USDJPY: 0.12, XAUUSD: 0.45, US30: 0.62, BTCUSD: 1.00 },
  };

  const getBgColor = (val) => {
    if (val === 1.0) return '#33415530';
    if (val >= 0.7) return '#22c55e30';
    if (val >= 0.3) return '#22c55e15';
    if (val <= -0.7) return '#ef444430';
    if (val <= -0.3) return '#ef444415';
    return '#94a3b815';
  };

  const getTextColor = (val) => {
    if (val === 1.0) return theme.subText;
    if (val >= 0.7) return '#22c55e';
    if (val >= 0.3) return '#4ade80';
    if (val <= -0.7) return '#ef4444';
    if (val <= -0.3) return '#f87171';
    return theme.subText;
  };

  const KEY_INSIGHTS = [
    { pair: 'EUR/USD & GBP/USD', val: '+0.88', type: 'High Positive', desc: 'Avoid taking same direction positions simultaneously to limit risk.' },
    { pair: 'EUR/USD & USD/JPY', val: '-0.74', type: 'High Negative', desc: 'Strong inverse movement driven by USD index sentiment.' },
    { pair: 'US30 & BTC/USD', val: '+0.62', type: 'Moderate Risk-On', desc: 'Crypto tracking broader equity risk appetite closely.' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Ionicons name="grid-outline" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Asset Correlations</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.subText }]}>
        Cross-Asset Statistical Co-movement Heatmap
      </Text>

      {/* Timeframe Selector */}
      <View style={styles.tfContainer}>
        {['7D', '30D', '90D', '1Y'].map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.tfBtn,
              {
                backgroundColor: timeframe === tf ? theme.primary : theme.cardBg,
                borderColor: timeframe === tf ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setTimeframe(tf)}
          >
            <Text
              style={[
                styles.tfText,
                { color: timeframe === tf ? '#0f172a' : theme.text },
              ]}
            >
              {tf}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Heatmap Grid */}
      <View style={[styles.matrixCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {/* Table Header Row */}
        <View style={styles.gridRow}>
          <View style={styles.cellHeaderFirst}>
            <Text style={[styles.cellHeaderText, { color: theme.subText }]}>ASSET</Text>
          </View>
          {SYMBOLS.map((sym) => (
            <View key={sym} style={styles.cellHeader}>
              <Text style={[styles.cellHeaderText, { color: theme.text }]}>
                {sym.substring(0, 3)}
              </Text>
            </View>
          ))}
        </View>

        {/* Table Content Rows */}
        {SYMBOLS.map((rowSym) => (
          <View key={rowSym} style={styles.gridRow}>
            <View style={styles.cellHeaderFirst}>
              <Text style={[styles.cellRowText, { color: theme.text }]}>{rowSym}</Text>
            </View>
            {SYMBOLS.map((colSym) => {
              const val = MATRIX_DATA[rowSym][colSym];
              return (
                <View
                  key={colSym}
                  style={[
                    styles.cellVal,
                    { backgroundColor: getBgColor(val), borderColor: theme.border },
                  ]}
                >
                  <Text style={[styles.cellValText, { color: getTextColor(val) }]}>
                    {val === 1 ? '1.0' : val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Legend & Key Insights */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>CORRELATION INSIGHTS</Text>
      </View>

      {KEY_INSIGHTS.map((item, idx) => (
        <View
          key={idx}
          style={[styles.insightCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <View style={styles.insightHeader}>
            <Text style={[styles.insightPair, { color: theme.text }]}>{item.pair}</Text>
            <View style={[styles.valBadge, { backgroundColor: '#38bdf818', borderColor: theme.primary }]}>
              <Text style={[styles.valText, { color: theme.primary }]}>{item.val}</Text>
            </View>
          </View>
          <Text style={[styles.insightDesc, { color: theme.subText }]}>{item.desc}</Text>
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
  tfContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tfBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  tfText: {
    fontSize: 11,
    fontWeight: '900',
  },
  matrixCard: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  cellHeaderFirst: {
    width: 60,
    justifyContent: 'center',
  },
  cellHeaderText: {
    fontSize: 9,
    fontWeight: '800',
  },
  cellRowText: {
    fontSize: 9,
    fontWeight: '900',
  },
  cellHeader: {
    flex: 1,
    alignItems: 'center',
  },
  cellVal: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    marginHorizontal: 1,
  },
  cellValText: {
    fontSize: 8,
    fontWeight: '900',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  insightCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  insightPair: {
    fontSize: 13,
    fontWeight: '800',
  },
  valBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  valText: {
    fontSize: 10,
    fontWeight: '900',
  },
  insightDesc: {
    fontSize: 11,
    fontWeight: '600',
  },
});
