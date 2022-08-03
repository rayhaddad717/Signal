import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
const UserListItem = ({ FullName, email, isSelected, imageURL, setSelectedUserID, ID }) => {
    return (
        <TouchableOpacity>

            <ListItem style={isSelected ? styles.isSelected : null} onPress={() => setSelectedUserID(ID)}>
                <Avatar
                    rounded
                    source={{
                        uri: imageURL
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "800" }}>
                        {FullName}
                    </ListItem.Title>
                    <ListItem.Subtitle
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {email}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

export default UserListItem

const styles = StyleSheet.create({
    isSelected: {
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius:5,
        width:'100%',

    }
})