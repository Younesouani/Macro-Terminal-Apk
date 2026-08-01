import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SESSIONS = [
  {
    name: 'Sydney',
    openTime: '22:00',
    closeTime: '07:00',
    utcOffset: '+10',
    status: 'closed',
  },
  {
    name: 'Tokyo',
    openTime: '00:00',
    closeTime: '09:00',
    utcOffset: '+9',
    status: 'open',
  },
  {
    name: 'London',
    openTime: '08:00',
    closeTime: '17:00',
    utcOffset: '+1',
    status: 'open',
  },
  {
    name: 'New York',
    openTime: '13:00',
    closeTime: '22:00',
    utcOffset: '-4',
    status: 'open',
  },
];

export default function SessionsScreen({ theme }) {
  const [currentTime, setCurrentTime] = useState('');

  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      <View style={styles.sectionPadding}>
        {/* UTC Clock Banner */}
        <View style={[styles.clockCard, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border }]}>
          <Ionicons name="time-outline" size={20} color={activeTheme.primary} />
          <View>
            <Text style={[styles.clockLabel, { color: activeTheme.subText }]}>CURRENT UNIVERSAL TIME</Text>
            <Text style={[styles.clockText, { color: activeTheme.text }]}>{currentTime || 'Loading...'}</Text>
          </View>
        </View>

        <Text style={[styles.headerSubtitle, { color: activeTheme.subText }]}>
          MAJOR GLOBAL LIQUIDITY WINDOWS
        </Text>

        {SESSIONS.map((item) => {
          const isOpen = item.status === 'open';
          return (
            <View
              key={item.name}
              style={[
                styles.card,
                { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border },
              ]}
            >
              <View style={styles.cardRow}>
                <View style={styles.sessionInfo}>
                  <Text style={[styles.sessionName, { color: activeTheme.text }]}>{item.name}</Text>
                  <Text style={[styles.timeText, { color: activeTheme.subText }]}>
                    {item.openTime} - {item.closeTime} UTC (GMT {item.utcOffset})
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isOpen ? '#22c55e20' : '#ef444420' },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isOpen ? '#22c55e' : '#ef4444' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: isOpen ? '#22c55e' : '#ef4444' },
                    ]}
                  >
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionPadding: { padding: 12 },
  clockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  clockLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 2 },
  clockText: { fontSize: 18, fontWeight: '900', fontVariant: ['tabular-nums'] },
  headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 12, paddingHorizontal: 4 },
  card: { borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionInfo: { gap: 4 },
  sessionName: { fontSize: 16, fontWeight: '800' },
  timeText: { fontSize: 12, fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
});
