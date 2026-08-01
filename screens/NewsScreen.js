import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mujxnzazkqqxpjbftvtb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11anhuemF6a3FxeHBqYmZ0dnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNzgwNDQsImV4cCI6MjEwMDc1NDA0NH0.O6BC30u96lq3uNKInCigyaAYetqhSo4z6CoX1ukkdKE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export default function NewsScreen({ theme }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fallback default theme if not passed directly
  const activeTheme = theme || {
    bg: '#0b0f19',
    cardBg: '#1e293b',
    text: '#f8fafc',
    subText: '#94a3b8',
    border: '#334155',
    primary: '#38bdf8',
  };

  const fetchNews = async () => {
    try {
      setErrorMsg(null);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.warn('Supabase fetch error:', err.message);
      setErrorMsg('Unable to connect to news feed. Check your network.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const channel = supabase
      .channel('public:articles')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'articles' }, (payload) => {
        setArticles((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const renderArticle = ({ item }) => {
    const formattedTime = item.created_at
      ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: activeTheme.cardBg,
            borderColor: activeTheme.border,
          },
        ]}
        onPress={() => item.url && Linking.openURL(item.url)}
        activeOpacity={0.7}
      >
        {item.image_url && (
          <Image source={{ uri: item.image_url }} style={styles.cardImage} resizeMode="cover" />
        )}

        <View style={styles.cardHeader}>
          <Text style={[styles.category, { color: activeTheme.primary }]}>
            {item.category || 'MACRO'}
          </Text>
          <Text style={[styles.timestamp, { color: activeTheme.subText }]}>{formattedTime}</Text>
        </View>

        <Text style={[styles.title, { color: activeTheme.text }]}>{item.title}</Text>

        {item.description && (
          <Text style={[styles.description, { color: activeTheme.subText }]} numberOfLines={3}>
            {item.description}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: activeTheme.bg }]}>
        <ActivityIndicator size="large" color={activeTheme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.bg }]}>
      {errorMsg && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
        </View>
      )}

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderArticle}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={activeTheme.primary} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: 12 },
  errorCard: {
    backgroundColor: '#451a1a',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: { color: '#f8fafc', fontSize: 12, textAlign: 'center' },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardImage: { width: '100%', height: 160, borderRadius: 8, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  category: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  timestamp: { fontSize: 11, fontWeight: '600' },
  title: { fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 6 },
  description: { fontSize: 13, lineHeight: 18 },
});
