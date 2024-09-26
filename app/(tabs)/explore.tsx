import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/child_components/Footer';
import Modal from 'react-native-modal';
import Option from '@/components/child_components/Option';
const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    email: string;
    age: number;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    summary: string;
    avatar: string;
  } | null>(null);

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'My Profile', value: 'option1' },
  //   { label: 'Update CV', value: 'option2' },
  //   { label: 'Log out', value: 'option3' },
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.130.91:3000/user/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowPress = (user: React.SetStateAction<{ name: string; email: string; age: number; phone: string; address: string; linkedin: string; github: string; summary: string; avatar:string} | null>) => {
    setSelectedUser(user);
    setModalVisible(true);
    //setOpen(false);
  };

  const renderItem = ({ item }: { item: { name: string; email: string; age: number; phone: string; address: string; linkedin: string; github: string; summary: string;avatar:string } }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)}>
       <View style={styles.userMainContainer}>
       <View style={styles.userContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    </View>
    <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}><Ionicons name="mail-outline" color="black" size={10} /> {item.email}</Text>
      </View>
       </View>
    </TouchableOpacity>
  );
  // const toggleDropdown = () => {
  //   setOpen(!open);
  // };
  return (
    <ScrollView style={styles.container}>
    <View style={styles.ConfigContainer}>
    <View style={styles.headerImageContainer}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1726731631/mauh8cky29vbpft7aqpf.jpg' }} 
        style={styles.profilePicture}
      />
       <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}><Ionicons name="code-outline" color="black" size={20} /> Public Dev</Text>
        </View>
        {/* <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
          />
        </View>
      </Modal> */}
      <Option/>
    </View>
        
      <View style={styles.container}>
        {loading ? (
          <ThemedText>Loading...</ThemedText>
        ) : error ? (
          <ThemedText>{error}</ThemedText>
        ) : (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.email}
          />
        )}
      </View>
    </View>

      {selectedUser && (
        <Modal
        isVisible={modalVisible}
    onBackdropPress={() => setModalVisible(!modalVisible)}
    onBackButtonPress={() => setModalVisible(!modalVisible)}
    animationIn="tada"
    animationOut="fadeOut"
    animationOutTiming={800}
       backdropTransitionInTiming={800}
       backdropTransitionOutTiming={800}
    backdropOpacity={0.0}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
           <View style={styles.flexConfig}>
           <Image source={{ uri: selectedUser.avatar }} style={styles.iconAvatar} />  
           <Text style={styles.modalTitle}>{selectedUser.name}</Text>
           </View>
<Text style={styles.modalText}>
  <Ionicons name="mail-outline" color="black" size={15} /> Email: {selectedUser.email}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="calendar-outline" color="black" size={15} /> Age: {selectedUser.age}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="call-outline" color="black" size={15} /> Phone: {selectedUser.phone}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="location-outline" color="black" size={15} /> Address: {selectedUser.address}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="logo-linkedin" color="black" size={15} /> LinkedIn: {selectedUser.linkedin}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="logo-github" color="black" size={15} /> GitHub: {selectedUser.github}
</Text>
<Text style={styles.modalText}>
  <Ionicons name="document-text-outline" color="black" size={15} /> Summary: {selectedUser.summary}
</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Footer />
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  // padding: 20,
  },
  ConfigContainer:{
    backgroundColor:'white'
  },
  headerImageContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  userMainContainer:{
    borderRadius: 10,
    marginBottom:10,
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // backgroundColor: 'white',
    width: '100%',
    height: 200,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    marginRight: 10,
  },
  iconAvatar: {
   width: 50,
   height: 50,
   borderRadius: 100,
   borderColor: 'orange',
   borderWidth: 1,
   alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'gray',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 12,
    color: 'black',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'black',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  flexConfig: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:'space-between',
    width: '100%',
    height: 50,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(250, 244, 230, 0.86)',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    alignContent: 'center',
  },
  // iconContainer: {
  //   marginTop: 10,
  //   alignSelf: 'flex-end',
  //   padding: 10,
  //   bottom: 20,
  //   backgroundColor: 'orange',
  //   position: 'absolute',
  //   borderRadius: 10,
  // },
  // dropdownOverlay: {
  //   backgroundColor: 'rgba(250, 244, 230, 0.86)',
  //   padding: 20,
  //   borderRadius: 10,
  // },
  // dropdown: {
  //   backgroundColor: '#fafafa',
  // },
  // dropdownContainerStyle: {
  //   height: 40,
  // },
});

export default ExploreScreen;