import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ theme }) {
  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  const WEBSITE_URL = 'https://macronews-three.vercel.app/';

  const handleOpenWebsite = () => {
    Linking.openURL(WEBSITE_URL);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      <View style={styles.sectionPadding}>
        
        {/* App Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border }]}>
          <Text style={[styles.brandTitle, { color: activeTheme.text }]}>
              MACRO<Text style={{ color: activeTheme.primary }}>TERMINAL</Text>
          </Text>
          <Text style={[styles.versionBadge, { color: activeTheme.primary, backgroundColor: activeTheme.primary + '15' }]}>
            v1.0.0 (RELEASE)
          </Text>
          <Text style={[styles.tagline, { color: activeTheme.subText }]}>
            A high-performance, dark-mode-first mobile intelligence terminal designed for financial markets, macro research, and active execution.
          </Text>
        </View>

        {/* Official Website & Download Banner */}
        <View style={[styles.downloadCard, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.primary }]}>
          <View style={styles.downloadHeader}>
            <Ionicons name="globe-outline" size={24} color={activeTheme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.downloadTitle, { color: activeTheme.text }]}>Official Website & Releases</Text>
              <Text style={[styles.downloadSub, { color: activeTheme.subText }]}>
                Download updates, web terminal access, and releases.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.linkBtn, { backgroundColor: activeTheme.primary }]}
            onPress={handleOpenWebsite}
            activeOpacity={0.8}
          >
            <Ionicons name="download-outline" size={18} color="#0f172a" />
            <Text style={styles.linkBtnText}>VISIT MACRONEWS STUDIO</Text>
          </TouchableOpacity>
        </View>

        {/* Features Overview */}
        <Text style={[styles.headerSubtitle, { color: activeTheme.subText }]}>
          CORE TERMINAL FEATURES
        </Text>

        <View style={[styles.card, { backgroundColor: activeTheme.cardBg, borderColor: activeTheme.border }]}>
          <View style={styles.featureItem}>
            <Ionicons name="newspaper-outline" size={18} color={activeTheme.primary} />
            <Text style={[styles.featureText, { color: activeTheme.text }]}>Realtime Macro News Feed (Supabase Postgres)</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="tv-outline" size={18} color={activeTheme.primary} />
            <Text style={[styles.featureText, { color: activeTheme.text }]}>Native HLS Global Financial Live TV Stream</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="calculator-outline" size={18} color={activeTheme.primary} />
            <Text style={[styles.featureText, { color: activeTheme.text }]}>Native Risk & Lot Size Calculator (FX, Gold, JPY)</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="grid-outline" size={18} color={activeTheme.primary} />
            <Text style={[styles.featureText, { color: activeTheme.text }]}>Currency Strength Heatmaps & Central Bank Matrix</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={[styles.copyright, { color: activeTheme.subText }]}>
          © 2026 MacroTerminal • All Rights Reserved •  Dev . Youness
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionPadding: { padding: 12 },
  heroCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: { fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  versionBadge: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginVertical: 10,
  },
  tagline: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  downloadCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    gap: 14,
  },
  downloadHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  downloadTitle: { fontSize: 15, fontWeight: '800' },
  downloadSub: { fontSize: 12, marginTop: 2 },
  linkBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  linkBtnText: { fontSize: 12, fontWeight: '900', color: '#0f172a' },
  headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 10, paddingHorizontal: 4 },
  card: { borderRadius: 12, padding: 16, borderWidth: 1, gap: 14, marginBottom: 20 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { fontSize: 13, fontWeight: '600' },
  copyright: { fontSize: 11, textAlign: 'center', marginVertical: 10 },
});
