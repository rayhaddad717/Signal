export class Chat{
    constructor({ID,ownerID,otherUserID,chatName,imageURL,otherUserName}){
        this.ID=ID;
        this.ownerID=ownerID;
        this.otherUserID=otherUserID;
        this.chatName=chatName;
        this.imageURL=imageURL;
        this.otherUserName=otherUserName;
    }
    print(){
        console.log(this.ID,this.chatName,this.ownerID,this.otherUserID,this.otherUserName)
    }
}