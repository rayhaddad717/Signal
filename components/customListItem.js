import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { auth } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
const CustomListItem = ({ ID, chatName, enterChat, imageURL, recentMessage, otherUserID }) => {
    return (
        <ListItem onPress={() => enterChat(ID, chatName, imageURL, otherUserID)} style={styles.container} key={ID} bottomDivider >
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
                    style={styles.subtitle}
                >
                    <View style={styles.subtitle}>
                        <Text>{recentMessage[recentMessage?.length - 1]?.data?.message}</Text>
                        {recentMessage[recentMessage?.length - 1]?.data?.email === auth.currentUser.email ?
                            <FontAwesomeIcon color='#2C6BED' style={styles.checkIcon} icon={faCheck} /> : null}
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    subtitle: { display:'flex',flex: 1, flexDirection: 'row',width:'100%' ,justifyContent:'space-between'},
    
    message: {}
})