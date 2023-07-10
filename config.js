import { Alert } from "react-native/types";

export const firebaseConfig = {
    apiKey: "AIzaSyBDxd5M_ngzmDVd9o9m_SQ1TVgGkObD9eA",
    authDomain: "aplicativo-espectograma-7656b.firebaseapp.com",
    projectId: "aplicativo-espectograma-7656b",
    storageBucket: "aplicativo-espectograma-7656b.appspot.com",
    messagingSenderId: "893910394970",
    appId: "1:893910394970:web:f60906318e89df76045063"
  };

registerUser = (email, password, confirmPassword, first_name, last_name) =>{
    if (password == confirmPassword) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential)=>{
                Alert.alert("Usuário registrado!");
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    } else {
        Alert.alert("As senhas não são iguais!");
    }
};

signIn = async (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.replace("Dashboasd");
        })
        .catch(error => {
            Alert.alert(error.message);
        });
};

fetchUser = () => {
    let theme;
    firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", (snapshot) => {
            theme = snapshot.val().current_theme
            this.setState({ light_theme: theme === "linght"})
        })
}