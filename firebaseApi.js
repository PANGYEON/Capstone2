import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp  } from "firebase/firestore";

export async function registration(email, password, name, nickname, birthdate, phonenumber, address, detailedaddress) {
  const auth = getAuth();
  const firestore = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const currentUser = userCredential.user;
    const userDocRef = doc(firestore, "Users", currentUser.uid);    

    await setDoc(userDocRef, {
      email: currentUser.email,
      name: name,
      nickname: nickname,
      birthdate: birthdate,
      phonenumber: phonenumber,
      address: address,
      detailedaddress: detailedaddress,
      order: serverTimestamp(), // 가입 시간이 찍힘
      adminvalue: 1, //관리자여부 0이면 관리자
      cash: 0 //소지금
    });

    console.log("회원가입 성공");
  } catch (err) {
    console.log("Error", err.message);
  }
}