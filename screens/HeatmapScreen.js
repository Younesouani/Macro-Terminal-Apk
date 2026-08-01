import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];

// Mock real-time strength data (%)
const STRENGTH_DATA = [
  { currency: 'USD', strength: 78, change: '+0.45%', sentiment: 'bullish' },
  { currency: 'EUR', strength: 42, change: '-0.12%', sentiment: 'bearish' },
  { currency: 'GBP', strength: 65, change: '+0.28%', sentiment: 'bullish' },
  { currency: 'JPY', strength: 22, change: '-0.85%', sentiment: 'bearish' },
  { currency: 'AUD', strength: 58, change: '+0.15%', sentiment: 'neutral' },
  { currency: 'CAD', strength: 49, change: '-0.05%', sentiment: 'neutral' },
  { currency: 'CHF', strength: 34, change: '-0.30%', sentiment: 'bearish' },
];

const MATRIX_DATA = {
  USD: { EUR: '-0.42%', GBP: '-0.18%', JPY: '+0.95%', AUD: '-0.30%' },
  EUR: { USD: '+0.42%', GBP: '+0.24%', JPY: '+1.37%', AUD: '+0.12%' },
  GBP: { USD: '+0.18%', EUR: '-0.24%', JPY: '+1.13%', AUD: '-0.12%' },
  JPY: { USD: '-0.95%', EUR: '-1.37%', GBP: '-1.13%', AUD: '-1.25%' },
};

export default function HeatmapScreen({ theme }) {
  const [activeTab, setActiveTab] = useState('STRENGTH');

  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  const getSentimentColor = (changeStr) => {
    if (changeStr.startsWith('+')) return '#22c55e'; // Green
    if (changeStr.startsWith('-')) return '#ef4444'; // Red
    return '#94a3b8';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      {/* Sub-Header Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'STRENGTH' && { borderColor: activeTheme.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setActiveTab('STRENGTH')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'STRENGTH' ? activeTheme.primary : activeTheme.subText },
            ]}
          >
            CURRENCY STRENGTH
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'MATRIX' && { borderColor: activeTheme.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setActiveTab('MATRIX')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'MATRIX' ? activeTheme.primary : activeTheme.subText },
            ]}
          >
            FOREX MATRIX
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab 1: Currency Strength Meters */}
      {activeTab === 'STRENGTH' ? (
        <View style={styles.sectionPadding}>
          {STRENGTH_DATA.map((item) => (
            <View
              key={item.currency}
              style={[
                styles.card,
                { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border },
              ]}
            >
              <View style={styles.cardRow}>
                <Text style={[styles.currencyName, { color: activeTheme.text }]}>{item.currency}</Text>
                <Text style={[styles.changeText, { color: getSentimentColor(item.change) }]}>
                  {item.change}
                </Text>
              </View>

              {/* Progress Bar */}
              <View style={[styles.progressTrack, { backgroundColor: activeTheme.bg }]}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${item.strength}%`,
                      backgroundColor: getSentimentColor(item.change),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        /* Tab 2: Cross Matrix Grid */
        <View style={styles.sectionPadding}>
          <View style={[styles.card, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border }]}>
            <Text style={[styles.matrixTitle, { color: activeTheme.text }]}>Pair Relative Performance</Text>
            {Object.keys(MATRIX_DATA).map((rowCurr) => (
              <View key={rowCurr} style={styles.matrixRow}>
                <Text style={[styles.matrixHeader, { color: activeTheme.primary }]}>{rowCurr}</Text>
                {Object.keys(MATRIX_DATA[rowCurr]).map((colCurr) => {
                  const val = MATRIX_DATA[rowCurr][colCurr];
                  return (
                    <View key={colCurr} style={styles.matrixCell}>
                      <Text style={[styles.cellPair, { color: activeTheme.subText }]}>{colCurr}</Text>
                      <Text style={[styles.cellVal, { color: getSentimentColor(val) }]}>{val}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionPadding: { padding: 12 },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tabBtn: { paddingVertical: 10, marginRight: 20 },
  tabText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  card: { borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  currencyName: { fontSize: 16, fontWeight: '800' },
  changeText: { fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 4, width: '100%', overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 4 },
  matrixTitle: { fontSize: 14, fontWeight: '700', marginBottom: 12 },
  matrixRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: '#334155' },
  matrixHeader: { width: 45, fontSize: 14, fontWeight: '800' },
  matrixCell: { flex: 1, alignItems: 'center' },
  cellPair: { fontSize: 10, fontWeight: '600' },
  cellVal: { fontSize: 11, fontWeight: '700' },
});
