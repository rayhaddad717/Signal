import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { auth } from '../firebase'
const CustomListItem = ({ ID, chatName, enterChat, imageURL, recentMessage }) => {
    return (
        <ListItem onPress={() => enterChat(ID, chatName, imageURL)} style={styles.container} key={ID} bottomDivider >
            <Avatar
                rounded
                source={{
                    uri: imageURL
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                >
                  {recentMessage[recentMessage?.length - 1]?.data?.email === auth.currentUser.email ? 'You': recentMessage[recentMessage?.length - 1]?.data?.displayName}:  {recentMessage[recentMessage?.length - 1]?.data?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    }
})