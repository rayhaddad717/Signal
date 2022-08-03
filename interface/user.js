import { auth, getDocs, collection, db, query, where, onSnapshot, doc } from '../firebase';
export class User {
    constructor({ FullName, email, ID, imageURL }) {
        this.FullName = FullName;
        this.email = email;
        this.ID = ID;
        this.imageURL = imageURL;
    }
    print() {
        console.log(this.FullName, this.email, this.ID, this.imageURL);
    }
    static getByID = async (id) => {
        console.log(id)
        const q = query(collection(db, "users"), where("ID", "==", id));
        const querySnapshot = await getDocs(q);
        let u=null;
        querySnapshot.forEach((doc) => {
            u= new User({ ...doc.data() });
        });
        u.print()
        return u;
    }
}