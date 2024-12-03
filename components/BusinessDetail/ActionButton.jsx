import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ActionButton(business) {
    const actionButtonMenu=[
        {
            id:1,
            name:'Call',
            icon:require('./../../assets/images/telephone.png'),
            url: 'tel:' +business?.contact
        },
        {
            id:2,
            name:'Location',
            icon:require('./../../assets/images/placeholder.png'),
            url: 'https://maps.app.goo.gl/Mx9uxV9fMrcRDnx4A' +business?.address
        },
        {
            id:3,
            name:'Web',
            icon:require('./../../assets/images/web.png'),
            url: business?.website
        },
        {
            id:4,
            name:'Share',
            icon:require('./../../assets/images/send.png'),
            url: 'tel:' +business?.contact
        },
    ]
    const OnPressHandle =(item)=>{
        if(item.name =='Share'){
            Share.share({
                message:business?.name+"\n Address:" + business.address+"\n Find more details on Business Directory App by Dai and Duong !"
            })
            return ;
        }
        Linking.openURL(item.url)
    }
  return (
    <View style={{
        backgroundColor:'#fff',
        padding:20
    }}>
        <FlatList 
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item,index})=> (
            <TouchableOpacity key={index}
            onPress={()=>OnPressHandle(item)}
            >
                <Image source={item?.icon}
                style={{
                    width:50,
                    height:50
                }}
                />
                <Text style={{
                    fontFamily:'outfit-medium',
                    textAlign:'center',
                    marginTop:3
                }}>{item.name}
                </Text>
            </TouchableOpacity>
        )}
        />
      <Text>ActionButton</Text>
    </View>
  )
}