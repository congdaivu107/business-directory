import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from '../Explore/BusinessListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <View>
        <FlatList 
        data={businessList}
        scrollEnabled
        renderItem={({item,index})=>(
            <View>
                <BusinessListCard 
                key={index}
                business={item}/>
            </View>
        )}
        />
        <View style={{
            height:200
        }}>

        </View>
    </View>
  )
}