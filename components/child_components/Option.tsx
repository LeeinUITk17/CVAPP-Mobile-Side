import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';

const Option = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'My Profile', value: 'profile' },
    { label: 'Update CV', value: 'update' },
    { label: 'Log out', value: 'logout' },
  ]);
  const router = useRouter();

  const toggleDropdown = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (value === 'profile') {
      router.push('/profile'); 
      setOpen(false); 
    } else if (value === 'update') {
      // Handle update CV logic here
      setOpen(false); 
    } else if (value === 'logout') {
      router.push('/logout');
      setOpen(false); 
    }
  }, [value, router]);

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        onBackButtonPress={() => setOpen(false)}
        swipeDirection="left"
        onSwipeComplete={() => setOpen(false)}
        animationIn="slideInLeft"
        animationInTiming={800}
        animationOut="slideOutLeft"
        animationOutTiming={800}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        backdropOpacity={0.0}
      >
        <View style={styles.dropdownOverlay}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainerStyle}
            onChangeValue={(itemValue) => setValue(itemValue)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 10,
    bottom: 20,
    backgroundColor: 'orange',
    position: 'absolute',
    borderRadius: 10,
  },
  dropdownOverlay: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownContainerStyle: {
    height: 40,
  },
});

export default Option;
