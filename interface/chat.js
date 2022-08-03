export class Chat{
    constructor({ID,ownerID,otherUserID,chatName,imageURL}){
        this.ID=ID;
        this.ownerID=ownerID;
        this.otherUserID=otherUserID;
        this.chatName=chatName;
        this.imageURL=imageURL;
    }
    print(){
        console.log(this.ID,this.chatName,this.ownerID,this.otherUserID)
    }
}