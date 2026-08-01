import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SentimentScreen({ theme }) {
  const [sentimentScore, setSentimentScore] = useState(72); // 0-100 score

  const getSentimentLabel = (score) => {
    if (score <= 20) return { label: 'EXTREME FEAR', color: '#ef4444' };
    if (score <= 40) return { label: 'FEAR', color: '#f97316' };
    if (score <= 60) return { label: 'NEUTRAL', color: '#eab308' };
    if (score <= 80) return { label: 'GREED', color: '#22c55e' };
    return { label: 'EXTREME GREED', color: '#10b981' };
  };

  const currentSentiment = getSentimentLabel(sentimentScore);

  const INDICATORS = [
    { title: 'Market Volatility (VIX)', status: 'Low Volatility (13.4)', bias: 'Bullish', color: '#22c55e' },
    { title: 'Put / Call Ratio', status: '0.78 (Call Heavy)', bias: 'Bullish', color: '#22c55e' },
    { title: 'Safe-Haven Demand', status: 'Gold Outperforming USD', bias: 'Cautious', color: '#eab308' },
    { title: 'Market Momentum (SPX)', status: 'Above 125-Day MA', bias: 'Strong Bull', color: '#10b981' },
    { title: 'Junk Bond Demand', status: 'Yield Spread Narrowing', bias: 'Risk-On', color: '#22c55e' },
  ];

  const HISTORICAL = [
    { period: 'Now', score: sentimentScore },
    { period: 'Previous Close', score: 68 },
    { period: '1 Week Ago', score: 54 },
    { period: '1 Month Ago', score: 32 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Ionicons name="speedometer-outline" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Market Sentiment Gauge</Text>
      </View>

      {/* Main Score Card */}
      <View style={[styles.gaugeCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.gaugeSub, { color: theme.subText }]}>GLOBAL RISK-ON / RISK-OFF INDEX</Text>
        <Text style={[styles.gaugeScore, { color: currentSentiment.color }]}>{sentimentScore}</Text>
        <View style={[styles.badge, { backgroundColor: `${currentSentiment.color}20`, borderColor: currentSentiment.color }]}>
          <Text style={[styles.badgeText, { color: currentSentiment.color }]}>{currentSentiment.label}</Text>
        </View>

        {/* Progress Bar / Scale */}
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              { width: `${sentimentScore}%`, backgroundColor: currentSentiment.color },
            ]}
          />
        </View>
        <View style={styles.scaleLabels}>
          <Text style={[styles.scaleText, { color: theme.subText }]}>0 Extreme Fear</Text>
          <Text style={[styles.scaleText, { color: theme.subText }]}>100 Extreme Greed</Text>
        </View>
      </View>

      {/* Historical Breakdown */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>HISTORICAL SENTIMENT</Text>
      </View>
      <View style={[styles.historyRow, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {HISTORICAL.map((item, idx) => {
          const itemSent = getSentimentLabel(item.score);
          return (
            <View key={idx} style={styles.historyItem}>
              <Text style={[styles.historyPeriod, { color: theme.subText }]}>{item.period}</Text>
              <Text style={[styles.historyScore, { color: itemSent.color }]}>{item.score}</Text>
              <Text style={[styles.historyLabel, { color: itemSent.color }]}>{itemSent.label.split(' ')[0]}</Text>
            </View>
          );
        })}
      </View>

      {/* Component Drivers */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>MARKET DRIVERS</Text>
      </View>

      {INDICATORS.map((ind, index) => (
        <View
          key={index}
          style={[styles.indicatorCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.indTitle, { color: theme.text }]}>{ind.title}</Text>
            <Text style={[styles.indStatus, { color: theme.subText }]}>{ind.status}</Text>
          </View>
          <View style={[styles.indBadge, { backgroundColor: `${ind.color}18`, borderColor: ind.color }]}>
            <Text style={[styles.indBadgeText, { color: ind.color }]}>{ind.bias}</Text>
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
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  gaugeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  gaugeSub: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  gaugeScore: {
    fontSize: 48,
    fontWeight: '900',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  barBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#33415540',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  scaleLabels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  scaleText: {
    fontSize: 9,
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 8,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  historyItem: {
    alignItems: 'center',
  },
  historyPeriod: {
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },
  historyScore: {
    fontSize: 16,
    fontWeight: '900',
  },
  historyLabel: {
    fontSize: 8,
    fontWeight: '800',
    marginTop: 2,
  },
  indicatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  indTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  indStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  indBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  indBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
