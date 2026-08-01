import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LiquidityScreen({ theme }) {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');

  const LIQUIDITY_DATA = {
    'EUR/USD': {
      price: '1.0852',
      bias: 'Bullish Order Flow',
      biasColor: '#22c55e',
      levels: [
        { type: 'Buy-Side Liquidity (BSL)', price: '1.0910', status: 'Untested Target' },
        { type: 'Daily Fair Value Gap (FVG)', price: '1.0875 - 1.0885', status: 'Discount Array' },
        { type: 'Current Market Price', price: '1.0852', status: 'Live Price' },
        { type: 'Institutional Order Block (OB)', price: '1.0810 - 1.0825', status: 'Key Support' },
        { type: 'Sell-Side Liquidity (SSL)', price: '1.0780', status: 'Asian Low Sweep' },
      ],
    },
    'XAU/USD': {
      price: '2385.10',
      bias: 'Range Expansion',
      biasColor: '#10b981',
      levels: [
        { type: 'Buy-Side Liquidity (BSL)', price: '2410.00', status: 'All-Time High Pool' },
        { type: 'H4 Fair Value Gap (FVG)', price: '2392.50 - 2398.00', status: 'Premium Array' },
        { type: 'Current Market Price', price: '2385.10', status: 'Live Price' },
        { type: 'Institutional Order Block (OB)', price: '2365.00 - 2372.00', status: 'Strong Support' },
        { type: 'Sell-Side Liquidity (SSL)', price: '2345.50', status: 'Protected Low' },
      ],
    },
    'US30': {
      price: '38980',
      bias: 'Bullish Continuation',
      biasColor: '#22c55e',
      levels: [
        { type: 'Buy-Side Liquidity (BSL)', price: '39250', status: 'Previous Week High' },
        { type: 'Hourly Fair Value Gap (FVG)', price: '39050 - 39120', status: 'Imbalance Zone' },
        { type: 'Current Market Price', price: '38980', status: 'Live Price' },
        { type: 'Institutional Order Block (OB)', price: '38750 - 38820', status: 'Discount Support' },
        { type: 'Sell-Side Liquidity (SSL)', price: '38500', status: 'Major Stop Pool' },
      ],
    },
  };

  const current = LIQUIDITY_DATA[selectedAsset];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Ionicons name="layers-outline" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Liquidity & Order Blocks</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.subText }]}>
        Smart Money Concepts / Institutional Pool Mapping
      </Text>

      {/* Asset Switcher */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        {Object.keys(LIQUIDITY_DATA).map((asset) => {
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

      {/* Overview Card */}
      <View style={[styles.overviewCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <View style={styles.overviewHeader}>
          <Text style={[styles.overviewSymbol, { color: theme.text }]}>{selectedAsset}</Text>
          <View style={[styles.biasBadge, { backgroundColor: `${current.biasColor}20`, borderColor: current.biasColor }]}>
            <Text style={[styles.biasBadgeText, { color: current.biasColor }]}>{current.bias}</Text>
          </View>
        </View>
        <Text style={[styles.priceLarge, { color: theme.text }]}>{current.price}</Text>
        <Text style={[styles.priceSub, { color: theme.subText }]}>Active Dealing Range Price</Text>
      </View>

      {/* Liquidity Stack */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>INSTITUTIONAL PRICE LADDER</Text>
      </View>

      {current.levels.map((lvl, idx) => {
        const isLive = lvl.status === 'Live Price';
        return (
          <View
            key={idx}
            style={[
              styles.levelCard,
              {
                backgroundColor: isLive ? '#38bdf812' : theme.cardBg,
                borderColor: isLive ? theme.primary : theme.border,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.lvlType, { color: isLive ? theme.primary : theme.text }]}>
                {lvl.type}
              </Text>
              <Text style={[styles.lvlStatus, { color: theme.subText }]}>{lvl.status}</Text>
            </View>
            <Text style={[styles.lvlPrice, { color: isLive ? theme.primary : theme.text }]}>
              {lvl.price}
            </Text>
          </View>
        );
      })}

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
  overviewCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  overviewSymbol: {
    fontSize: 16,
    fontWeight: '900',
  },
  biasBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  biasBadgeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  priceLarge: {
    fontSize: 32,
    fontWeight: '900',
  },
  priceSub: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  lvlType: {
    fontSize: 13,
    fontWeight: '800',
  },
  lvlStatus: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  lvlPrice: {
    fontSize: 14,
    fontWeight: '900',
  },
});
