import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Button, Divider, Icon, Layout, List, Text} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import {BillCard, BillCardType} from '../components/BillCard/BillCard';
import {RegisterPromptButton} from '../components/PromptButtons/RegisterPromptButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {getMissedBills, getUpcomingBills} from '../helpers/BillFilter';
import {getBillIdToNumRemindersMap} from '../helpers/ReminderMapper';
import {showToast} from '../helpers/Toast';
import {Bill} from '../models/Bill';
import {NavigationProps} from '../routes';
import BillService from '../services/BillService';
import Cache, {STORAGE_KEYS} from '../services/Cache';
import SyncService from '../services/SyncService';
import UserService from '../services/UserService';

const UpcomingBillsScreen: React.FC = () => {
  const navigator = useNavigation<NavigationProps>();
  const [bills, setBills] = useState<Bill[]>([]);
  const [missedBills, setMissedBills] = useState<Bill[]>([]);
  const [lastSyncDate, setLastSyncDate] = useState<string>('');
  const [reminders, setReminders] = useState<Record<string, number>>({});
  const [userIsPresent, setUserIsPresent] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const listRef = React.useRef<List>(null);

  const init = async () => {
    const user = UserService.getUser();
    setUserIsPresent(user ? true : false);

    const retrievedBills = await BillService.getBills();
    const upcomingBills = getUpcomingBills(retrievedBills);
    const retrievedMissedBills = getMissedBills(retrievedBills);
    setBills(upcomingBills);
    setMissedBills(retrievedMissedBills);

    const lastSyncDateFromCache = Cache.getLastSyncDate();
    setLastSyncDate(lastSyncDateFromCache ? lastSyncDateFromCache : '');

    const retrievedReminders = await getBillIdToNumRemindersMap(retrievedBills);
    setReminders(retrievedReminders);
  };

  useFocusEffect(
    useCallback(() => {
      init();

      console.debug('Adding cache listener');
      const listener = Cache.getStorage().addOnValueChangedListener(
        changedKey => {
          if (changedKey === STORAGE_KEYS.AUTH_TOKEN) {
            const user = UserService.getUser();
            setUserIsPresent(user ? true : false);
          } else if (changedKey === STORAGE_KEYS.BILLS) {
            const retrievedBills = Cache.getBills();
            if (retrievedBills) {
              setBills(getUpcomingBills([...retrievedBills], false));
              setMissedBills(getMissedBills([...retrievedBills]));
              getBillIdToNumRemindersMap(retrievedBills).then(
                retrievedReminders => {
                  setReminders(retrievedReminders);
                },
              );
            }
          } else if (changedKey === STORAGE_KEYS.LAST_SYNC_DATE) {
            const lastSyncDateFromCache = Cache.getLastSyncDate();
            setLastSyncDate(lastSyncDateFromCache ? lastSyncDateFromCache : '');
          }
        },
      );

      return () => {
        console.debug('Removing cache listener');
        listener.remove();
      };
    }, []),
  );

  const getFormattedLastSyncDate = () =>
    `Last Sync Date: ${refreshing ? 'Syncing...' : lastSyncDate}`;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await SyncService.syncAllData();
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Unable to sync data',
        text2: `${err}`,
      });
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const listProps = {
    ...(userIsPresent && {
      refreshControl: (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      ),
    }),
  };

  return (
    <SafeAreaView style={styles.main}>
      <Layout style={styles.layoutContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText} category="h4">
              Upcoming Bills
            </Text>
            <View style={styles.lastSyncDateView}>
              {lastSyncDate ? (
                <Text category="p1">{getFormattedLastSyncDate()}</Text>
              ) : (
                <Text category="p1">Not synced yet</Text>
              )}
              {!userIsPresent && (
                <RegisterPromptButton
                  description={
                    'Billy can only sync to the cloud when you have a registered account.'
                  }
                />
              )}
            </View>
          </View>
          <Button
            size="small"
            accessoryRight={<Icon name="plus-outline" />}
            onPress={() => navigator.navigate('BillForm')}
            style={styles.addBillButton}
          >
            <Text category={'label'}>Add Bill</Text>
          </Button>
        </View>
        <Divider />
        {missedBills.length > 0 && (
          <Button
            status={'warning'}
            accessoryLeft={
              <Icon name="alert-triangle" style={styles.alertIcon} />
            }
            style={styles.alertWrapper}
            onPress={() => {
              navigator.navigate('MissedBills');
            }}
          >
            <Text>
              You have {missedBills.length} missed bills, review them here
            </Text>
          </Button>
        )}
        {bills.length > 0 ? (
          <List
            ref={listRef}
            data={bills}
            renderItem={({item}) => (
              <View key={item.id || item.tempID} style={styles.listItemWrapper}>
                <BillCard
                  billCardType={BillCardType.UPCOMING_BILL}
                  bill={item}
                  numReminders={reminders[item.tempID || item.id]}
                />
              </View>
            )}
            ListFooterComponent={<ScrollToTopButton ref={listRef} />}
            {...listProps}
          />
        ) : (
          <View style={styles.noBillsContainer}>
            <Text category={'p1'}>No bills found 👀</Text>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  layoutContainer: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: 'wrap',
  },
  headerText: {
    marginEnd: 32,
  },
  addBillButton: {
    marginVertical: 8,
    flexGrow: 1,
  },
  lastSyncDateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemWrapper: {
    margin: 12,
  },
  alertWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  alertIcon: {
    width: 24,
    height: 24,
  },
  noBillsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default UpcomingBillsScreen;
