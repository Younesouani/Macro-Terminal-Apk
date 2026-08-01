import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RiskScreen() {
  const [balance, setBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [stopLossPips, setStopLossPips] = useState('20');
  const [assetType, setAssetType] = useState('FOREX'); // FOREX, JPY, GOLD

  // Calculation Logic
  const calculateRisk = () => {
    const numBalance = parseFloat(balance) || 0;
    const numRiskPct = parseFloat(riskPercent) || 0;
    const numSL = parseFloat(stopLossPips) || 0;

    if (numBalance <= 0 || numRiskPct <= 0 || numSL <= 0) {
      return { cashRisk: 0, lotSize: 0 };
    }

    // Cash at risk = Balance * (Risk % / 100)
    const cashRisk = numBalance * (numRiskPct / 100);

    // Pip Value calculation based on asset type (Standard 1 Lot = 100,000 units)
    let pipValuePerLot = 10; // Standard FX pairs (EURUSD, GBPUSD) = $10 / pip / lot

    if (assetType === 'JPY') {
      pipValuePerLot = 6.7; // Approx JPY pip value
    } else if (assetType === 'GOLD') {
      pipValuePerLot = 10; // Gold XAUUSD 0.1 pip / tick scaling
    }

    // Lot size = Cash Risk / (SL Pips * Pip Value per Lot)
    const lotSize = cashRisk / (numSL * pipValuePerLot);

    return {
      cashRisk: cashRisk.toFixed(2),
      lotSize: lotSize.toFixed(2),
    };
  };

  const { cashRisk, lotSize } = calculateRisk();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🧮 Institutional Risk Calculator</Text>
          </View>

          {/* Asset Type Switcher */}
          <View style={styles.assetSelectorContainer}>
            <TouchableOpacity
              style={[styles.assetBtn, assetType === 'FOREX' && styles.assetBtnActive]}
              onPress={() => setAssetType('FOREX')}
            >
              <Text style={[styles.assetText, assetType === 'FOREX' && styles.assetTextActive]}>EUR / USD / GBP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.assetBtn, assetType === 'JPY' && styles.assetBtnActive]}
              onPress={() => setAssetType('JPY')}
            >
              <Text style={[styles.assetText, assetType === 'JPY' && styles.assetTextActive]}>JPY Pairs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.assetBtn, assetType === 'GOLD' && styles.assetBtnActive]}
              onPress={() => setAssetType('GOLD')}
            >
              <Text style={[styles.assetText, assetType === 'GOLD' && styles.assetTextActive]}>GOLD (XAUUSD)</Text>
            </TouchableOpacity>
          </View>

          {/* Form Controls Card */}
          <View style={styles.card}>
            {/* Account Balance */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Balance ($)</Text>
              <TextInput
                style={styles.input}
                value={balance}
                onChangeText={setBalance}
                keyboardType="numeric"
                placeholder="10000"
                placeholderTextColor="#64748b"
              />
            </View>

            {/* Risk Percentage */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Risk Percentage (%)</Text>
              <TextInput
                style={styles.input}
                value={riskPercent}
                onChangeText={setRiskPercent}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor="#64748b"
              />
            </View>

            {/* Stop Loss (Pips) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Stop Loss (Pips)</Text>
              <TextInput
                style={styles.input}
                value={stopLossPips}
                onChangeText={setStopLossPips}
                keyboardType="numeric"
                placeholder="20"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          {/* Results Display Box */}
          <View style={styles.resultsCard}>
            <Text style={styles.resultsHeader}>Calculated Position Parameters</Text>
            
            <View style={styles.resultRow}>
              <View>
                <Text style={styles.resultLabel}>Risk Amount ($)</Text>
                <Text style={styles.resultSub}>Capital exposed to trade</Text>
              </View>
              <Text style={styles.riskValue}>${cashRisk}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.resultRow}>
              <View>
                <Text style={styles.resultLabel}>Recommended Position Size</Text>
                <Text style={styles.resultSub}>Standard Lots (1.00 = 100k)</Text>
              </View>
              <Text style={styles.lotValue}>{lotSize} Lots</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b0f19' },
  scrollContent: { padding: 16 },
  header: { marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  assetSelectorContainer: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 10, padding: 3, marginBottom: 16 },
  assetBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  assetBtnActive: { backgroundColor: '#38bdf8' },
  assetText: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },
  assetTextActive: { color: '#0f172a' },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  inputGroup: { marginBottom: 14 },
  label: { color: '#94a3b8', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  resultsHeader: { color: '#38bdf8', fontSize: 13, fontWeight: '800', textTransform: 'uppercase', marginBottom: 14 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { color: '#f8fafc', fontSize: 14, fontWeight: '700' },
  resultSub: { color: '#64748b', fontSize: 11, marginTop: 2 },
  riskValue: { color: '#ef4444', fontSize: 20, fontWeight: '800' },
  lotValue: { color: '#22c55e', fontSize: 22, fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#1e293b', marginVertical: 12 },
});
