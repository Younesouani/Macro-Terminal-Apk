import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SQUAWK_FEED = [
  {
    id: '1',
    time: '18:14 EST',
    category: 'CENTRAL BANK',
    headline: 'FED\'S POWELL SPEAKS ON NEUTRAL RATE EXPECTATIONS; NOTES LABOR MARKET REBALANCING IS LARGELY COMPLETE.',
    impact: 'HIGH',
  },
  {
    id: '2',
    time: '17:50 EST',
    category: 'MACRO',
    headline: 'US JULY ISM MANUFACTURING PRINT COMES IN AT 46.8 VS EXP. 48.8 (CONTRACTION ACCELERATES).',
    impact: 'HIGH',
  },
  {
    id: '3',
    time: '17:32 EST',
    category: 'ENERGY',
    headline: 'EIA REPORTS CRUDE INVENTORIES DRAW DOWN BY 3.4M BARRELS VS EXP. -1.5M DRAW.',
    impact: 'MEDIUM',
  },
  {
    id: '4',
    time: '17:05 EST',
    category: 'GEOPOLITICAL',
    headline: 'OPEC+ DELEGATES INDICATE NO IMMEDIATE DEVIATION FROM SCHEDULED OUTPUT INCREASES.',
    impact: 'MEDIUM',
  },
  {
    id: '5',
    time: '16:40 EST',
    category: 'EQUITIES',
    headline: 'NVDA FACES SHORT-TERM SUPPLY CHAIN HEADWINDS; OPTIONS IMPLIED VOLATILITY TICKS HIGHER.',
    impact: 'LOW',
  },
];

export default function NewsAudioScreen({ theme }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredFeed =
    selectedCategory === 'ALL'
      ? SQUAWK_FEED
      : SQUAWK_FEED.filter((item) => item.category === selectedCategory);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Summary Card / Live Squawk Audio Controller */}
        <View style={[styles.audioCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.audioTopRow}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="radio-outline" size={18} color={theme.primary} />
              <Text style={[styles.headerTitle, { color: theme.text }]}>LIVE SQUAWK BOX</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.playBtn,
                {
                  backgroundColor: isPlaying ? '#22c55e15' : theme.primary + '15',
                  borderColor: isPlaying ? '#22c55e' : theme.primary,
                },
              ]}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons
                name={isPlaying ? 'volume-high' : 'volume-mute'}
                size={14}
                color={isPlaying ? '#22c55e' : theme.primary}
              />
              <Text style={[styles.playBtnText, { color: isPlaying ? '#22c55e' : theme.primary }]}>
                {isPlaying ? 'STREAMING ACTIVE' : 'MUTED'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.headerSub, { color: theme.subText }]}>
            Real-time audio feed simulation parsing institutional news wires and central bank comms.
          </Text>

          {/* Audio Visualizer Graphic Line */}
          <View style={[styles.visualizerBar, { backgroundColor: theme.border }]}>
            <View style={[styles.visualizerActive, { backgroundColor: isPlaying ? '#22c55e' : theme.subText, width: isPlaying ? '75%' : '15%' }]} />
          </View>
        </View>

        {/* Category Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {['ALL', 'CENTRAL BANK', 'MACRO', 'ENERGY', 'GEOPOLITICAL', 'EQUITIES'].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterPill,
                  { backgroundColor: theme.cardBg, borderColor: theme.border },
                  isActive && { backgroundColor: theme.primary + '20', borderColor: theme.primary },
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.filterText, { color: isActive ? theme.primary : theme.subText }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Squawk Headlines Feed */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>REAL-TIME SQUAWK TAPE</Text>
        
        <View style={styles.feedContainer}>
          {filteredFeed.map((item) => {
            const isHigh = item.impact === 'HIGH';
            return (
              <View
                key={item.id}
                style={[styles.feedCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
              >
                <View style={styles.feedCardTop}>
                  <View style={styles.feedMeta}>
                    <Text style={[styles.timeText, { color: theme.primary }]}>{item.time}</Text>
                    <Text style={[styles.categoryText, { color: theme.subText }]}>• {item.category}</Text>
                  </View>

                  <View
                    style={[
                      styles.impactBadge,
                      {
                        backgroundColor: isHigh ? '#ef444415' : '#eab30815',
                        borderColor: isHigh ? '#ef4444' : '#eab308',
                      },
                    ]}
                  >
                    <Text style={[styles.impactText, { color: isHigh ? '#ef4444' : '#eab308' }]}>
                      {item.impact} IMPACT
                    </Text>
                  </View>
                </View>

                <Text style={[styles.headlineText, { color: theme.text }]}>{item.headline}</Text>
              </View>
            );
          })}
        </View>
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
    gap: 12,
  },
  audioCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  audioTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  playBtnText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '600',
  },
  visualizerBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  visualizerActive: {
    height: '100%',
    borderRadius: 2,
  },
  filterScroll: {
    gap: 6,
  },
  filterPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 9,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    paddingHorizontal: 2,
  },
  feedContainer: {
    gap: 8,
  },
  feedCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  feedCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '700',
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  impactText: {
    fontSize: 7,
    fontWeight: '900',
  },
  headlineText: {
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 16,
  },
});
