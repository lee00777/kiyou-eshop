import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
    signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        // [1] firebase database로 직접가서 admins라는 key에 {0: 원하는유저의 user.uid, 1:원하는유저2의 user.id...} 이렇게 추가해준다 (참고:배열이 없어서 {}로 해야함)
        const updatedUser = user ? await adminUser(user) : user;

        callback(updatedUser);
    });
}

async function adminUser(user) {
    return get(ref(database, "admins")).then((snapshot) => {
        if (snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return { ...user, isAdmin };
        }
        return user;
    });
}

export async function addNewProduct(product, imageUrl) {
    console.log("짱구야아아:", imageUrl);
    const id = uuid(); // 고유 id만들어주기
    return set(ref(database, `products/${id}`), {
        // set은 firebase에 post할때 쓰는 함수임. // 즉, database에 proudcts라는 일종의 새로운 json파일을 만들어주고=> 그안에, id로 key값 저장하고 아래의 애들 value로 저장해라
        ...product,
        id,
        price: parseInt(product.price), // form에서 string으로 받았으니까 number로 바꿔주기
        image: imageUrl,
        options: product.options.split(","),
    });
}

export async function getProducts() {
    return get(ref(database, "products")).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val()); // uuid키는 필요없고 정보인 value만 받아오기
        } else return [];
    });
}

export async function getCart(userId) {
    return get(ref(database, `carts/${userId}`)) //
        .then((snapshot) => {
            const items = snapshot.val() || {};
            return Object.values(items);
        });
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}
