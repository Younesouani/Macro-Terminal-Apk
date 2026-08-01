import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INFLATION_DATA = [
  {
    country: 'United States',
    code: 'US',
    flag: '🇺🇸',
    cpiYoY: '3.1%',
    cpiMoM: '0.2%',
    coreYoY: '3.3%',
    forecast: '3.0%',
    previous: '3.2%',
    status: 'Cooling',
    lastUpdated: 'Jul 2026',
  },
  {
    country: 'Eurozone',
    code: 'EU',
    flag: '🇪🇺',
    cpiYoY: '2.5%',
    cpiMoM: '0.1%',
    coreYoY: '2.8%',
    forecast: '2.4%',
    previous: '2.6%',
    status: 'Cooling',
    lastUpdated: 'Jul 2026',
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    flag: '🇬🇧',
    cpiYoY: '2.0%',
    cpiMoM: '0.3%',
    coreYoY: '3.5%',
    forecast: '1.9%',
    previous: '2.0%',
    status: 'Target Met',
    lastUpdated: 'Jul 2026',
  },
  {
    country: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    cpiYoY: '2.8%',
    cpiMoM: '0.4%',
    coreYoY: '2.5%',
    forecast: '2.7%',
    previous: '2.8%',
    status: 'Heating',
    lastUpdated: 'Jul 2026',
  },
];

export default function InflationScreen({ theme }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredData =
    selectedFilter === 'ALL'
      ? INFLATION_DATA
      : INFLATION_DATA.filter((item) => item.code === selectedFilter);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Region Filter Bar */}
      <View style={[styles.filterBar, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {['ALL', 'US', 'EU', 'UK', 'JP'].map((code) => {
          const isActive = selectedFilter === code;
          return (
            <TouchableOpacity
              key={code}
              style={[
                styles.filterBtn,
                isActive && { backgroundColor: theme.primary + '20', borderColor: theme.primary },
              ]}
              onPress={() => setSelectedFilter(code)}
            >
              <Text style={[styles.filterText, { color: isActive ? theme.primary : theme.subText }]}>
                {code}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Metric Header Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="trending-up-outline" size={18} color={theme.primary} />
            <Text style={[styles.headerTitle, { color: theme.text }]}>GLOBAL CPI & CORE TRACKER</Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            Monitoring inflation trajectories across major central bank jurisdictions.
          </Text>
        </View>

        {/* Inflation Cards List */}
        {filteredData.map((item) => {
          const isCooling = item.status === 'Cooling' || item.status === 'Target Met';
          return (
            <View
              key={item.code}
              style={[styles.dataCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            >
              {/* Card Title */}
              <View style={styles.cardTop}>
                <View style={styles.countryInfo}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View>
                    <Text style={[styles.countryName, { color: theme.text }]}>{item.country}</Text>
                    <Text style={[styles.updatedText, { color: theme.subText }]}>Updated: {item.lastUpdated}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isCooling ? '#22c55e15' : '#ef444415', borderColor: isCooling ? '#22c55e' : '#ef4444' },
                  ]}
                >
                  <Text style={[styles.statusText, { color: isCooling ? '#22c55e' : '#ef4444' }]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Data Grid */}
              <View style={[styles.grid, { borderTopColor: theme.border }]}>
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, { color: theme.subText }]}>CPI YoY</Text>
                  <Text style={[styles.gridValue, { color: theme.text }]}>{item.cpiYoY}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, { color: theme.subText }]}>Core YoY</Text>
                  <Text style={[styles.gridValue, { color: theme.text }]}>{item.coreYoY}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, { color: theme.subText }]}>Forecast</Text>
                  <Text style={[styles.gridValue, { color: theme.subText }]}>{item.forecast}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, { color: theme.subText }]}>Previous</Text>
                  <Text style={[styles.gridValue, { color: theme.subText }]}>{item.previous}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    padding: 8,
    gap: 6,
    borderBottomWidth: 1,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '800',
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
  dataCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    fontSize: 22,
  },
  countryName: {
    fontSize: 13,
    fontWeight: '800',
  },
  updatedText: {
    fontSize: 9,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  gridItem: {
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '800',
  },
});
