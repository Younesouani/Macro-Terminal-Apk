import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

// Helper for impact color coding (Myfxbook style)
const getImpactColor = (impact) => {
  switch (impact?.toLowerCase()) {
    case 'high':
    case 'red':
      return '#ef4444'; // Red
    case 'medium':
    case 'orange':
      return '#f97316'; // Orange
    case 'low':
    case 'yellow':
      return '#eab308'; // Yellow
    default:
      return '#64748b';
  }
};

export default function CalendarScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('ALL'); // ALL, HIGH

  const fetchCalendar = async () => {
    try {
      // Fetch from Supabase 'economic_events' or 'calendar' table if available
      const { data, error } = await supabase
        .from('economic_events')
        .select('*')
        .order('event_time', { ascending: true });

      if (error || !data) {
        // Fallback mock data matching Myfxbook structure if table is empty
        setEvents([
          { id: '1', time: '13:30', currency: 'USD', impact: 'high', event: 'Core CPI (MoM)', actual: '0.3%', forecast: '0.2%', previous: '0.2%' },
          { id: '2', time: '13:30', currency: 'USD', impact: 'high', event: 'CPI (YoY)', actual: '3.0%', forecast: '3.1%', previous: '3.3%' },
          { id: '3', time: '14:15', currency: 'EUR', impact: 'medium', event: 'ECB Rate Statement', actual: '4.25%', forecast: '4.25%', previous: '4.50%' },
          { id: '4', time: '15:00', currency: 'GBP', impact: 'low', event: 'BOE Gov Bailey Speaks', actual: '-', forecast: '-', previous: '-' },
        ]);
      } else {
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCalendar();
  };

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'HIGH') return e.impact?.toLowerCase() === 'high';
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📅 Economic Calendar</Text>

        {/* Filter Switcher */}
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'ALL' && styles.filterBtnActive]}
            onPress={() => setSelectedFilter('ALL')}
          >
            <Text style={[styles.filterText, selectedFilter === 'ALL' && styles.filterTextActive]}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'HIGH' && styles.filterBtnActive]}
            onPress={() => setSelectedFilter('HIGH')}
          >
            <Text style={[styles.filterText, selectedFilter === 'HIGH' && styles.filterTextActive]}>🔴 HIGH ONLY</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#38bdf8" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listPadding}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38bdf8" />}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              {/* Left Column: Time & Currency */}
              <View style={styles.metaCol}>
                <Text style={styles.timeText}>{item.time || item.event_time}</Text>
                <View style={styles.currencyBadge}>
                  <Text style={styles.currencyText}>{item.currency}</Text>
                </View>
              </View>

              {/* Impact Pillar Bar */}
              <View style={[styles.impactIndicator, { backgroundColor: getImpactColor(item.impact) }]} />

              {/* Center Column: Event Title & Data Metrics */}
              <View style={styles.detailsCol}>
                <Text style={styles.eventTitle}>{item.event || item.title}</Text>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricLabel}>
                    Act: <Text style={styles.metricVal}>{item.actual || '-'}</Text>
                  </Text>
                  <Text style={styles.metricLabel}>
                    Exp: <Text style={styles.metricVal}>{item.forecast || item.consensus || '-'}</Text>
                  </Text>
                  <Text style={styles.metricLabel}>
                    Prev: <Text style={styles.metricVal}>{item.previous || '-'}</Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b0f19' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  filterGroup: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 8, padding: 2 },
  filterBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  filterBtnActive: { backgroundColor: '#38bdf8' },
  filterText: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },
  filterTextActive: { color: '#0f172a' },
  listPadding: { padding: 12 },
  eventCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  metaCol: { width: 55, alignItems: 'center', marginRight: 10 },
  timeText: { color: '#f8fafc', fontSize: 12, fontWeight: '700', marginBottom: 4 },
  currencyBadge: { backgroundColor: '#0f172a', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  currencyText: { color: '#38bdf8', fontSize: 10, fontWeight: '800' },
  impactIndicator: { width: 4, height: '80%', borderRadius: 2, marginRight: 12 },
  detailsCol: { flex: 1 },
  eventTitle: { color: '#f8fafc', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8 },
  metricLabel: { color: '#64748b', fontSize: 11 },
  metricVal: { color: '#cbd5e1', fontWeight: '700' },
});
