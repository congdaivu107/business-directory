import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {db, storage} from '../../config/FirebaseConfig'
import { getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
    const [image,setImage ] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const {user} = useUser();
    const [name,setName] = useState();
    const [address,setAddress] = useState();
    const [contact,setContact] = useState();
    const [website,setWebsite] = useState();
    const [about,setAbout] = useState();
    const [category,setCategory] = useState();
    const [loading,setLoading] = useState(false);

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 1,
          });
          setImage(result?.assets[0].uri);
          console.log(result);
    }
    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Business',
            headerShown:true,
        });
        GetCategoryList();
    },[]);
    const GetCategoryList = async() => {
        setCategoryList([]);
        const q=query(collection(db,'Category'));
        const snapShot=await getDocs(q);

        snapShot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,{
                label:(doc.data()).name,
                value:(doc.data()).name
            }])
        })
    }

    const onAddNewBusiness= async() =>{
        setLoading(true);
        const fileName = Date.now().toString()+".jpg";
        const resp=await fetch(image);
        const blob= await resp.blob();

        const imageRef = ref(storage,'business-app/'+fileName);
        uploadBytes(imageRef,blob).then((snapShot)=>{
            console.log("File Uploaded...");
        }).then(resp=>{
            getDownloadURL(imageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                saveBusinessDetail(downloadUrl);
            })
        })
        setLoading(false);

    }
    
    const saveBusinessDetail=async(imageUrl)=>{
        await setDoc(doc(db,'BusinessDetail', Date.now().toString()),{
            name:name,
            address:address,
            contact:contact,
            about:about,
            website:website,
            category:category,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl:imageUrl
        })
        setLoading(false);
        ToastAndroid.show('New business addedd...', ToastAndroid.LONG)
    }
  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>Add New Business</Text>
      <Text style={{
        fontFamily:'outfit',
        color:Colors.GRAY
      }}>Fill all detail in order to add new business</Text>
      <TouchableOpacity style={{
        marginTop:20
      }}
      onPress={()=>onImagePick()}
      >
      {!image?<Image source={require('../../assets/images/camera.png')} 
      style={{
        width:100,
        height:100
      }}
      />:
      <Image source={{uri:image}}
      style={{
        width:100,
        height:100,
        borderRadius:15
      }}
      />}
      </TouchableOpacity>
      <View>
        <TextInput 
        placeholder='Name'
        onChangeText={(v)=>setName(v)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:5,
            fontSize:17,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit'
        }}
        />
        <TextInput 
        placeholder='Address'
        onChangeText={(v)=>setAddress(v)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:5,
            fontSize:17,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit'
        }}
        />
        <TextInput 
        placeholder='Contact'
        onChangeText={(v)=>setContact(v)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:5,
            fontSize:17,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit'
        }}
        /><TextInput 
        placeholder='Website'
        onChangeText={(v)=>setWebsite(v)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:5,
            fontSize:17,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit'
        }}
        />
        <TextInput 
        placeholder='About'
        onChangeText={(v)=>setAbout(v)}
        multiline
        numberOfLines={5}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:5,
            fontSize:17,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit',
            height:100
        }}
        />
        <View style={{
            borderWidth:1,
            borderRadius:5,
            backgroundColor:"#fff",
            marginTop:10,
            borderColor:Colors.PRIMARY,
        }}>
        <RNPickerSelect
            onValueChange={(value) =>setCategory(value)}
            items={categoryList}
            />
        </View>
      </View>
      <TouchableOpacity
      disabled={loading}
      style={{
        padding:10,
        backgroundColor:Colors.PRIMARY,
        borderRadius:5,
        marginTop:20
      }}
      onPress={()=>onAddNewBusiness()}
      >
        {loading? 
        <ActivityIndicator size={'large'} color={'#fff'}/>:
        <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            color:"#fff"
        }}>Add New Business</Text>}
      </TouchableOpacity>
    </View>
  )
}