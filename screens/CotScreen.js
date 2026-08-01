import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CotScreen({ theme }) {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');

  const COT_DATA = {
    'EUR/USD': {
      category: 'Currencies',
      netContracts: '+24,500',
      bias: 'Bullish',
      color: '#22c55e',
      commercials: { long: '184,200', short: '212,500', net: '-28,300' },
      nonCommercials: { long: '142,100', short: '117,600', net: '+24,500' },
      changeWeek: '+5,200 contracts',
    },
    'XAU/USD': {
      category: 'Commodities',
      netContracts: '+148,900',
      bias: 'Strong Bullish',
      color: '#10b981',
      commercials: { long: '92,000', short: '240,900', net: '-148,900' },
      nonCommercials: { long: '280,400', short: '131,500', net: '+148,900' },
      changeWeek: '+12,400 contracts',
    },
    'US30': {
      category: 'Indices',
      netContracts: '+42,100',
      bias: 'Bullish',
      color: '#22c55e',
      commercials: { long: '45,000', short: '87,100', net: '-42,100' },
      nonCommercials: { long: '112,000', short: '69,900', net: '+42,100' },
      changeWeek: '-3,100 contracts',
    },
    'XTI/USD': {
      category: 'Energy',
      netContracts: '-18,400',
      bias: 'Bearish',
      color: '#ef4444',
      commercials: { long: '310,200', short: '291,800', net: '+18,400' },
      nonCommercials: { long: '95,000', short: '113,400', net: '-18,400' },
      changeWeek: '-8,500 contracts',
    },
  };

  const currentData = COT_DATA[selectedAsset];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Ionicons name="analytics-outline" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>COT Institutional Report</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.subText }]}>
        CFTC Commitment of Traders / Smart Money Positioning
      </Text>

      {/* Asset Selector Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        {Object.keys(COT_DATA).map((asset) => {
          const isSelected = selectedAsset === asset;
          return (
            <TouchableOpacity
              key={asset}
              style={[
                styles.assetTab,
                {
                  backgroundColor: isSelected ? theme.primary : theme.cardBg,
                  borderColor: isSelected ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedAsset(asset)}
            >
              <Text
                style={[
                  styles.assetTabText,
                  { color: isSelected ? '#0f172a' : theme.text },
                ]}
              >
                {asset}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Main Positioning Overview Card */}
      <View style={[styles.mainCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <View style={styles.cardHeaderRow}>
          <Text style={[styles.cardAssetTitle, { color: theme.text }]}>{selectedAsset}</Text>
          <View style={[styles.biasBadge, { backgroundColor: `${currentData.color}20`, borderColor: currentData.color }]}>
            <Text style={[styles.biasText, { color: currentData.color }]}>{currentData.bias}</Text>
          </View>
        </View>

        <Text style={[styles.labelSmall, { color: theme.subText }]}>NON-COMMERCIAL (SPECULATOR) NET POSITION</Text>
        <Text style={[styles.netNumber, { color: currentData.color }]}>{currentData.netContracts}</Text>
        <Text style={[styles.changeWeekText, { color: theme.subText }]}>Weekly Change: {currentData.changeWeek}</Text>
      </View>

      {/* Detailed Breakdown Card */}
      <View style={[styles.detailsCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>POSITION BREAKDOWN</Text>

        {/* Non-Commercials (Funds / Smart Money) */}
        <View style={styles.groupContainer}>
          <View style={styles.groupHeader}>
            <Text style={[styles.groupTitle, { color: theme.primary }]}>Non-Commercials (Large Specs)</Text>
            <Text style={[styles.groupNet, { color: currentData.color }]}>{currentData.nonCommercials.net}</Text>
          </View>
          <View style={styles.subRow}>
            <Text style={[styles.subLabel, { color: theme.subText }]}>Longs: {currentData.nonCommercials.long}</Text>
            <Text style={[styles.subLabel, { color: theme.subText }]}>Shorts: {currentData.nonCommercials.short}</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Commercials (Hedgers / Producers) */}
        <View style={styles.groupContainer}>
          <View style={styles.groupHeader}>
            <Text style={[styles.groupTitle, { color: theme.subText }]}>Commercials (Hedgers)</Text>
            <Text style={[styles.groupNet, { color: theme.text }]}>{currentData.commercials.net}</Text>
          </View>
          <View style={styles.subRow}>
            <Text style={[styles.subLabel, { color: theme.subText }]}>Longs: {currentData.commercials.long}</Text>
            <Text style={[styles.subLabel, { color: theme.subText }]}>Shorts: {currentData.commercials.short}</Text>
          </View>
        </View>
      </View>

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
  tabScroll: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  assetTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  assetTabText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  mainCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardAssetTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  biasBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  biasText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  netNumber: {
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
  },
  changeWeekText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailsCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },
  groupContainer: {
    marginVertical: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  groupNet: {
    fontSize: 13,
    fontWeight: '900',
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
});
