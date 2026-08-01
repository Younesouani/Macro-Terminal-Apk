import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const BANKS_DATA = [
  {
    bank: 'Federal Reserve (Fed)',
    code: 'USD',
    rate: '5.25%',
    bias: 'Neutral / Data Dependent',
    stanceType: 'neutral',
    nextMeeting: 'Sep 16-17, 2026',
  },
  {
    bank: 'European Central Bank (ECB)',
    code: 'EUR',
    rate: '3.75%',
    bias: 'Dovish / Rate Cuts Expected',
    stanceType: 'dovish',
    nextMeeting: 'Sep 10, 2026',
  },
  {
    bank: 'Bank of England (BoE)',
    code: 'GBP',
    rate: '5.00%',
    bias: 'Cautious / Gradual Easing',
    stanceType: 'neutral',
    nextMeeting: 'Sep 24, 2026',
  },
  {
    bank: 'Bank of Japan (BoJ)',
    code: 'JPY',
    rate: '0.25%',
    bias: 'Hawkish / Normalization',
    stanceType: 'hawkish',
    nextMeeting: 'Sep 18-19, 2026',
  },
  {
    bank: 'Reserve Bank of Australia (RBA)',
    code: 'AUD',
    rate: '4.35%',
    bias: 'Hawkish / Inflation Sticky',
    stanceType: 'hawkish',
    nextMeeting: 'Sep 22, 2026',
  },
  {
    bank: 'Bank of Canada (BoC)',
    code: 'CAD',
    rate: '4.25%',
    bias: 'Dovish / Easing Cycle',
    stanceType: 'dovish',
    nextMeeting: 'Sep 09, 2026',
  },
];

export default function CentralBanksScreen({ theme }) {
  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  const getStanceColor = (type) => {
    if (type === 'hawkish') return '#22c55e'; // Green
    if (type === 'dovish') return '#ef4444'; // Red
    return '#f59e0b'; // Amber
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      <View style={styles.sectionPadding}>
        <Text style={[styles.headerSubtitle, { color: activeTheme.subText }]}>
          GLOBAL MONETARY POLICY & RATE MATRIX
        </Text>

        {BANKS_DATA.map((item) => (
          <View
            key={item.code}
            style={[
              styles.card,
              { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.row}>
                <View style={[styles.badge, { backgroundColor: activeTheme.primary + '20' }]}>
                  <Text style={[styles.badgeText, { color: activeTheme.primary }]}>{item.code}</Text>
                </View>
                <Text style={[styles.bankName, { color: activeTheme.text }]}>{item.bank}</Text>
              </View>
              <Text style={[styles.rateText, { color: activeTheme.text }]}>{item.rate}</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: activeTheme.border }]} />

            <View style={styles.footerRow}>
              <View>
                <Text style={[styles.label, { color: activeTheme.subText }]}>POLICY STANCE</Text>
                <Text style={[styles.biasText, { color: getStanceColor(item.stanceType) }]}>
                  {item.bias}
                </Text>
              </View>
              <View style={styles.rightAlign}>
                <Text style={[styles.label, { color: activeTheme.subText }]}>NEXT MEETING</Text>
                <Text style={[styles.dateText, { color: activeTheme.text }]}>{item.nextMeeting}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionPadding: { padding: 12 },
  headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 12, paddingHorizontal: 4 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '900' },
  bankName: { fontSize: 14, fontWeight: '700' },
  rateText: { fontSize: 18, fontWeight: '900' },
  divider: { height: 1, marginVertical: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  label: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5, marginBottom: 2 },
  biasText: { fontSize: 12, fontWeight: '700' },
  rightAlign: { alignItems: 'flex-end' },
  dateText: { fontSize: 12, fontWeight: '700' },
});
