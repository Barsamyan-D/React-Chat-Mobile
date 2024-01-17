import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { authentication, db } from '../firebase/firebaseconfig'
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, orderBy } from 'firebase/firestore'

export default function Chat({route}) {
  const uid = route.params.uid
  const [messages, setMessages] = useState([])
  const currentUser = authentication?.currentUser?.uid;

  useEffect(() => {
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const q = query(colRef, orderBy('createdAt',"desc"));
    const unsubcribe = onSnapshot(q, (onSnap) => {
      const allMsg = onSnap.docs.map(mes => {
        if(mes.data().createdAt){
          return{
            ...mes.data(),
            createdAt:mes.data().createdAt.toDate()
          }
        }else{
          return{
            ...mes.data(),
            createdAt:new Date()
          }
        }
      })
      setMessages(allMsg)

    })
      return () => {
        unsubcribe()
      }
  },[])

  const onSend = useCallback((messagesArray = []) => {
    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      sentBy:currentUser,
      sentTo:uid
    }
    console.log(myMsg)
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
    //store in backend
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const chatSnap = addDoc(colRef, {
      ...myMsg,
      createdAt:serverTimestamp(),
    })
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: currentUser,
      }}
    />
  )

}

const styles = StyleSheet.create({})