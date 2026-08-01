import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Visible Bottom Tab Screens
import NewsScreen from '../screens/NewsScreen';
import ChartsScreen from '../screens/ChartsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LiveTvScreen from '../screens/LiveTvScreen';
import RiskScreen from '../screens/RiskScreen';

// Import Hidden Menu Screens (Original 11 + New 6 Macro Sections)
import HeatmapScreen from '../screens/HeatmapScreen';
import CentralBanksScreen from '../screens/CentralBanksScreen';
import BondsScreen from '../screens/BondsScreen';
import CorrelationsScreen from '../screens/CorrelationsScreen';
import LiquidityScreen from '../screens/LiquidityScreen';
import CotScreen from '../screens/CotScreen';
import SentimentScreen from '../screens/SentimentScreen';
import WebFeatureScreen from '../screens/WebFeatureScreen';
import SessionsScreen from '../screens/SessionsScreen';
import JournalScreen from '../screens/JournalScreen';
import AboutScreen from '../screens/AboutScreen';
import InflationScreen from '../screens/InflationScreen';
import YieldCurveScreen from '../screens/YieldCurveScreen';
import CommoditiesScreen from '../screens/CommoditiesScreen';
import DarkPoolScreen from '../screens/DarkPoolScreen';
import EarningsScreen from '../screens/EarningsScreen';
import NewsAudioScreen from '../screens/NewsAudioScreen';

const Tab = createBottomTabNavigator();

export function AppNavigator({ theme }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subText,
        tabBarStyle: {
          backgroundColor: theme.tabBg,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          height: 60,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '800',
          marginTop: 1,
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName = 'square-outline';
          if (route.name === 'NEWS') iconName = focused ? 'newspaper' : 'newspaper-outline';
          else if (route.name === 'CHARTS') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'CALENDAR') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'LIVE TV') iconName = focused ? 'tv' : 'tv-outline';
          else if (route.name === 'RISK') iconName = focused ? 'calculator' : 'calculator-outline';

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      {/* Visible Bottom Tabs */}
      <Tab.Screen name="NEWS" options={{ tabBarLabel: 'NEWS' }}>
        {(props) => <NewsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="CHARTS" options={{ tabBarLabel: 'CHARTS' }}>
        {(props) => <ChartsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="CALENDAR" options={{ tabBarLabel: 'CALENDAR' }}>
        {(props) => <CalendarScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="LIVE TV" options={{ tabBarLabel: 'LIVE TV' }}>
        {(props) => <LiveTvScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="RISK" options={{ tabBarLabel: 'RISK' }}>
        {(props) => <RiskScreen {...props} theme={theme} />}
      </Tab.Screen>

      {/* Hidden Screens Accessible via Grid Menu */}
      <Tab.Screen name="HEATMAP" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <HeatmapScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="BANKS" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <CentralBanksScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="BONDS" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <BondsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="CORRELATIONS" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <CorrelationsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="LIQUIDITY" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <LiquidityScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="COT" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <CotScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="SENTIMENT" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <SentimentScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="WEB FEATURES" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <WebFeatureScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="SESSIONS" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <SessionsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="JOURNAL" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <JournalScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="ABOUT" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <AboutScreen {...props} theme={theme} />}
      </Tab.Screen>

      {/* New Macro & Institutional Sections */}
      <Tab.Screen name="INFLATION" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <InflationScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="YIELD CURVE" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <YieldCurveScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="COMMODITIES" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <CommoditiesScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="DARK POOL" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <DarkPoolScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="EARNINGS" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <EarningsScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="NEWS AUDIO" options={{ tabBarItemStyle: { display: 'none' } }}>
        {(props) => <NewsAudioScreen {...props} theme={theme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
