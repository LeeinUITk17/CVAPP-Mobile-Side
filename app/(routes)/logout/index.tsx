import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Link, useRouter } from 'expo-router';
import Footer from '@/components/child_components/Footer';
const LogoutScreen = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setIsSignedOut(true);
      router.push('/(routes)/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const confirmLogout = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  if (isSignedOut) {
    return <Redirect href="/(routes)/login" />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.textconfig}>Do you really want to log out ? </Text>
      <Button title="Logout" onPress={confirmLogout} color={'orange'}/>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, logout"
        confirmButtonColor="#DD6B55"
        onCancelPressed={hideAlert}
        onConfirmPressed={() => {
          hideAlert();
          handleLogout();
        }}
      />
     <View style={styles.configFooter}>
     <Footer />
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white',
      borderWidth: 5,
      borderColor: 'gray',
      borderRadius: 20,
      // padding: 10,
      marginTop: 20,
    },
    textconfig: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: 'gray',
      backgroundColor: 'white',
      borderRadius: 20,
    },
    configFooter: {
      flex: 1,
      alignContent: 'flex-end',
      backgroundColor: 'orange',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderRadius: 20,
      // borderWidth: 5,
      // borderBlockColor: 'black',
    }
})

export default LogoutScreen;
