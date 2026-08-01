import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COMMODITIES_DATA = [
  {
    category: 'ENERGY',
    items: [
      { name: 'WTI Crude Oil', symbol: 'CL=F', price: '$82.45', change: '+1.24%', isUp: true },
      { name: 'Brent Crude', symbol: 'BZ=F', price: '$86.12', change: '+1.10%', isUp: true },
      { name: 'Natural Gas', symbol: 'NG=F', price: '$2.85', change: '-0.45%', isUp: false },
    ],
  },
  {
    category: 'PRECIOUS METALS',
    items: [
      { name: 'Gold', symbol: 'GC=F', price: '$2,345.10', change: '+0.54%', isUp: true },
      { name: 'Silver', symbol: 'SI=F', price: '$29.40', change: '+1.80%', isUp: true },
      { name: 'Platinum', symbol: 'PL=F', price: '$995.50', change: '-0.30%', isUp: false },
    ],
  },
  {
    category: 'INDUSTRIAL METALS',
    items: [
      { name: 'Copper', symbol: 'HG=F', price: '$4.55', change: '-0.20%', isUp: false },
      { name: 'Aluminum', symbol: 'ALI=F', price: '$2,450.00', change: '+0.15%', isUp: true },
    ],
  },
];

export default function CommoditiesScreen({ theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Summary Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="earth-outline" size={18} color={theme.primary} />
            <Text style={[styles.headerTitle, { color: theme.text }]}>GLOBAL COMMODITIES</Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            Real-time tracking of raw materials, energy markets, and metals.
          </Text>
        </View>

        {/* Commodity Categories */}
        {COMMODITIES_DATA.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.categoryContainer}>
            <Text style={[styles.sectionHeader, { color: theme.subText }]}>
              {group.category}
            </Text>
            
            <View style={[styles.tableCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              {group.items.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index !== group.items.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: 1 },
                  ]}
                >
                  <View>
                    <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.itemSymbol, { color: theme.subText }]}>{item.symbol}</Text>
                  </View>
                  <View style={styles.priceInfo}>
                    <Text style={[styles.priceText, { color: theme.text }]}>{item.price}</Text>
                    <View style={[
                      styles.badge, 
                      { backgroundColor: item.isUp ? '#22c55e15' : '#ef444415' }
                    ]}>
                      <Text style={[styles.changeText, { color: item.isUp ? '#22c55e' : '#ef4444' }]}>
                        {item.change}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
    gap: 16,
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
  categoryContainer: {
    gap: 6,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    paddingHorizontal: 2,
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
  itemName: {
    fontSize: 12,
    fontWeight: '800',
  },
  itemSymbol: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
    gap: 4,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
