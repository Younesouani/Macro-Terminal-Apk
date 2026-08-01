import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_TRADES = [
  {
    id: '1',
    pair: 'EUR/USD',
    direction: 'LONG',
    entry: '1.0850',
    exit: '1.0920',
    result: '+70 pips',
    status: 'WIN',
    notes: 'Clean liquidity sweep below Asian lows.',
  },
  {
    id: '2',
    pair: 'XAU/USD',
    direction: 'SHORT',
    entry: '2345.50',
    exit: '2330.00',
    result: '+15.5 pts',
    status: 'WIN',
    notes: 'Rejection at daily resistance zone.',
  },
  {
    id: '3',
    pair: 'GBP/JPY',
    direction: 'LONG',
    entry: '191.20',
    exit: '190.80',
    result: '-40 pips',
    status: 'LOSS',
    notes: 'Broke support during NY afternoon session.',
  },
];

export default function JournalScreen({ theme }) {
  const [trades, setTrades] = useState(INITIAL_TRADES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pair, setPair] = useState('');
  const [direction, setDirection] = useState('LONG');
  const [entry, setEntry] = useState('');
  const [notes, setNotes] = useState('');

  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  const handleAddTrade = () => {
    if (!pair || !entry) return;
    const newTrade = {
      id: Date.now().toString(),
      pair: pair.toUpperCase(),
      direction,
      entry,
      exit: 'Pending',
      result: 'Active',
      status: 'OPEN',
      notes: notes || 'No notes added.',
    };
    setTrades([newTrade, ...trades]);
    setPair('');
    setEntry('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      <View style={styles.sectionPadding}>
        {/* Action Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerSubtitle, { color: activeTheme.subText }]}>
            TRADE SETUP LOG & JOURNAL
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: activeTheme.primary }]}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <Ionicons name={showAddForm ? 'close' : 'add'} size={18} color="#0f172a" />
            <Text style={styles.addButtonText}>{showAddForm ? 'CANCEL' : 'NEW TRADE'}</Text>
          </TouchableOpacity>
        </View>

        {/* Add Trade Form Modal / Card */}
        {showAddForm && (
          <View style={[styles.formCard, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border }]}>
            <Text style={[styles.formTitle, { color: activeTheme.text }]}>Log New Execution</Text>
            
            <TextInput
              style={[styles.input, { backgroundColor: activeTheme.bg, color: activeTheme.text, borderColor: activeTheme.border }]}
              placeholder="Pair (e.g., USD/JPY)"
              placeholderTextColor={activeTheme.subText}
              value={pair}
              onChangeText={setPair}
            />

            <View style={styles.dirRow}>
              {['LONG', 'SHORT'].map((dir) => (
                <TouchableOpacity
                  key={dir}
                  style={[
                    styles.dirBtn,
                    { borderColor: activeTheme.border },
                    direction === dir && { backgroundColor: dir === 'LONG' ? '#22c55e20' : '#ef444420', borderColor: dir === 'LONG' ? '#22c55e' : '#ef4444' }
                  ]}
                  onPress={() => setDirection(dir)}
                >
                  <Text style={[styles.dirText, { color: direction === dir ? (dir === 'LONG' ? '#22c55e' : '#ef4444') : activeTheme.subText }]}>
                    {dir}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={[styles.input, { backgroundColor: activeTheme.bg, color: activeTheme.text, borderColor: activeTheme.border }]}
              placeholder="Entry Price"
              placeholderTextColor={activeTheme.subText}
              keyboardType="numeric"
              value={entry}
              onChangeText={setEntry}
            />

            <TextInput
              style={[styles.input, { backgroundColor: activeTheme.bg, color: activeTheme.text, borderColor: activeTheme.border }]}
              placeholder="Setup / Notes"
              placeholderTextColor={activeTheme.subText}
              value={notes}
              onChangeText={setNotes}
            />

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: activeTheme.primary }]}
              onPress={handleAddTrade}
            >
              <Text style={styles.submitBtnText}>SAVE TRADE LOG</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Trade List */}
        {trades.map((item) => {
          const isWin = item.status === 'WIN';
          const isOpen = item.status === 'OPEN';
          const statusColor = isOpen ? '#38bdf8' : isWin ? '#22c55e' : '#ef4444';

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.row}>
                  <Text style={[styles.pairText, { color: activeTheme.text }]}>{item.pair}</Text>
                  <View style={[styles.dirBadge, { backgroundColor: item.direction === 'LONG' ? '#22c55e20' : '#ef444420' }]}>
                    <Text style={[styles.dirBadgeText, { color: item.direction === 'LONG' ? '#22c55e' : '#ef4444' }]}>
                      {item.direction}
                    </Text>
                  </View>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                  <Text style={[styles.statusBadgeText, { color: statusColor }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={[styles.detailText, { color: activeTheme.subText }]}>Entry: <Text style={{ color: activeTheme.text }}>{item.entry}</Text></Text>
                <Text style={[styles.detailText, { color: activeTheme.subText }]}>Exit: <Text style={{ color: activeTheme.text }}>{item.exit}</Text></Text>
                <Text style={[styles.detailText, { color: activeTheme.subText }]}>Result: <Text style={{ color: statusColor, fontWeight: '800' }}>{item.result}</Text></Text>
              </View>

              <Text style={[styles.notesText, { color: activeTheme.subText }]}>"{item.notes}"</Text>
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  addButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 4 },
  addButtonText: { fontSize: 11, fontWeight: '900', color: '#0f172a' },
  formCard: { borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, gap: 10 },
  formTitle: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 },
  dirRow: { flexDirection: 'row', gap: 10 },
  dirBtn: { flex: 1, borderWidth: 1, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  dirText: { fontSize: 12, fontWeight: '800' },
  submitBtn: { borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  submitBtnText: { fontSize: 12, fontWeight: '900', color: '#0f172a' },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pairText: { fontSize: 16, fontWeight: '900' },
  dirBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  dirBadgeText: { fontSize: 10, fontWeight: '800' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusBadgeText: { fontSize: 10, fontWeight: '900' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailText: { fontSize: 12, fontWeight: '600' },
  notesText: { fontSize: 12, fontStyle: 'italic', marginTop: 4 },
});
