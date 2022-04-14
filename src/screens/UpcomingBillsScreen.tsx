import {useNavigation} from '@react-navigation/native';
import {Button, Divider, Icon, Layout, List, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {BillCard, BillCardType} from '../components/BillCard/BillCard';
import {RegisterPromptButton} from '../components/RegisterPromptButton';
import {getMissedBills, getUpcomingBills} from '../helpers/BillFilter';
import {Bill} from '../models/Bill';
import {NavigationProps} from '../routes';
import BillService from '../services/BillService';
import Cache, {STORAGE_KEYS} from '../services/Cache';
import {getReminderNotificationIdsForBill} from '../services/NotificationService';
import UserService from '../services/UserService';

const UpcomingBillsScreen: React.FC = () => {
  const navigator = useNavigation<NavigationProps>();
  const [bills, setBills] = useState<Bill[]>([]);
  const [missedBills, setMissedBills] = useState<Bill[]>([]);
  const [lastSyncDate, setLastSyncDate] = useState<string>('');
  const [reminders, setReminders] = useState<Record<string, number>>({});
  const [showRegisterPromptButton, setShowRegisterPromptButton] =
    useState(true);
  const listRef = React.useRef<List>(null);

  const init = async () => {
    const user = UserService.getUser();
    if (user) {
      setShowRegisterPromptButton(false);
    }
    const retrievedBills = await BillService.getBills();
    const upcomingBills = getUpcomingBills(retrievedBills);
    const retrievedMissedBills = getMissedBills(retrievedBills);

    setBills(upcomingBills);
    setMissedBills(retrievedMissedBills);

    const lastSyncDateFromCache = Cache.getLastSyncDate();
    if (lastSyncDateFromCache) {
      setLastSyncDate(lastSyncDateFromCache);
    }

    const retrievedReminders: Record<string, number> = {};
    for (let bill of retrievedBills) {
      const identifier = `${bill.tempID || bill.id}`;
      const remindersForBill = await getReminderNotificationIdsForBill(
        `${identifier}`,
      );
      retrievedReminders[identifier] = remindersForBill.length;
    }

    setReminders(retrievedReminders);
  };

  useEffect(() => {
    const listener = Cache.getStorage().addOnValueChangedListener(
      changedKey => {
        if (changedKey === STORAGE_KEYS.AUTH_TOKEN) {
          const user = UserService.getUser();
          if (user) {
            setShowRegisterPromptButton(false);
          } else {
            setShowRegisterPromptButton(true);
          }
        } else if (changedKey === STORAGE_KEYS.BILLS) {
          const retrievedBills = Cache.getBills();
          if (retrievedBills) {
            setBills(getUpcomingBills([...retrievedBills], false));
            setMissedBills(getMissedBills([...retrievedBills]));
            const retrievedReminders: Record<string, number> = {};
            for (let bill of retrievedBills) {
              const identifier = `${bill.tempID || bill.id}`;
              getReminderNotificationIdsForBill(`${identifier}`).then(
                remindersForBill => {
                  retrievedReminders[identifier] = remindersForBill.length;
                  setReminders(retrievedReminders);
                },
              );
            }
          }
        } else if (changedKey === STORAGE_KEYS.LAST_SYNC_DATE) {
          const lastSyncDateFromCache = Cache.getLastSyncDate();
          if (lastSyncDateFromCache) {
            setLastSyncDate(lastSyncDateFromCache);
          }
        }
      },
    );

    init();

    return () => listener.remove();
  }, []);

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  return (
    <SafeAreaView style={styles.main}>
      <Layout style={styles.layoutContainer}>
        <View style={styles.header}>
          <View>
            <Text category="h2">Upcoming Bills</Text>
            <View style={styles.lastSyncDateView}>
              {lastSyncDate ? (
                <Text category="p1">Last Sync Date: {lastSyncDate}</Text>
              ) : (
                <Text category="p1">Not synced yet</Text>
              )}
              {showRegisterPromptButton && (
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
            Add Bill
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
            ListFooterComponent={
              bills.length > 5 ? (
                <Button
                  size={'large'}
                  appearance={'ghost'}
                  accessoryLeft={<Icon name="corner-left-up-outline" />}
                  status={'basic'}
                  onPress={() => {
                    scrollToTop();
                  }}
                >
                  Scroll back to top
                </Button>
              ) : (
                <></>
              )
            }
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  lastSyncDateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBillButton: {
    margin: 16,
    padding: 16,
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
