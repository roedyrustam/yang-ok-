import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, GreenBean, RoastingProfile, RoastingSession, Sale, Notification } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { orderBy, where } from 'firebase/firestore';

interface AppState {
  user: User | null;
  users: User[];
  greenBeans: GreenBean[];
  roastingProfiles: RoastingProfile[];
  roastingSessions: RoastingSession[];
  sales: Sale[];
  notifications: Notification[];
  loading: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_GREEN_BEANS'; payload: GreenBean[] }
  | { type: 'SET_ROASTING_PROFILES'; payload: RoastingProfile[] }
  | { type: 'SET_ROASTING_SESSIONS'; payload: RoastingSession[] }
  | { type: 'SET_SALES'; payload: Sale[] }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string };

const initialState: AppState = {
  user: null,
  users: [],
  greenBeans: [],
  roastingProfiles: [],
  roastingSessions: [],
  sales: [],
  notifications: [],
  loading: true
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_GREEN_BEANS':
      return { ...state, greenBeans: action.payload };
    case 'SET_ROASTING_PROFILES':
      return { ...state, roastingProfiles: action.payload };
    case 'SET_ROASTING_SESSIONS':
      return { ...state, roastingSessions: action.payload };
    case 'SET_SALES':
      return { ...state, sales: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        )
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  services: {
    greenBeans: ReturnType<typeof useFirestore<GreenBean>>;
    roastingProfiles: ReturnType<typeof useFirestore<RoastingProfile>>;
    roastingSessions: ReturnType<typeof useFirestore<RoastingSession>>;
    sales: ReturnType<typeof useFirestore<Sale>>;
    notifications: ReturnType<typeof useFirestore<Notification>>;
    users: ReturnType<typeof useFirestore<User>>;
  };
  auth: ReturnType<typeof useAuth>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const auth = useAuth();

  // Firestore hooks
  const greenBeans = useFirestore<GreenBean>('greenBeans', [orderBy('entryDate', 'desc')]);
  const roastingProfiles = useFirestore<RoastingProfile>('roastingProfiles', [orderBy('createdAt', 'desc')]);
  const roastingSessions = useFirestore<RoastingSession>('roastingSessions', [orderBy('roastDate', 'desc')]);
  const sales = useFirestore<Sale>('sales', [orderBy('saleDate', 'desc')]);
  const notifications = useFirestore<Notification>('notifications', [
    where('userId', '==', auth.user?.id || ''),
    orderBy('timestamp', 'desc')
  ]);
  const users = useFirestore<User>('users', [orderBy('createdAt', 'desc')]);

  // Update state when Firestore data changes
  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: auth.user });
    dispatch({ type: 'SET_LOADING', payload: auth.loading });
  }, [auth.user, auth.loading]);

  useEffect(() => {
    dispatch({ type: 'SET_GREEN_BEANS', payload: greenBeans.data });
  }, [greenBeans.data]);

  useEffect(() => {
    dispatch({ type: 'SET_ROASTING_PROFILES', payload: roastingProfiles.data });
  }, [roastingProfiles.data]);

  useEffect(() => {
    dispatch({ type: 'SET_ROASTING_SESSIONS', payload: roastingSessions.data });
  }, [roastingSessions.data]);

  useEffect(() => {
    dispatch({ type: 'SET_SALES', payload: sales.data });
  }, [sales.data]);

  useEffect(() => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications.data });
  }, [notifications.data]);

  useEffect(() => {
    dispatch({ type: 'SET_USERS', payload: users.data });
  }, [users.data]);

  const services = {
    greenBeans,
    roastingProfiles,
    roastingSessions,
    sales,
    notifications,
    users
  };

  return (
    <AppContext.Provider value={{ state, dispatch, services, auth }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}