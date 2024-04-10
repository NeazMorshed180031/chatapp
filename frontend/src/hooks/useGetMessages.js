import { useEffect, useState } from "react";
import useConversation from '../zustand/useConversation.js'
import toast from 'react-hot-toast'

const useGetMessages = () =>{
    const [loading, setLoading] = useState(false)
    const {selectedConversation, setMessages, messages} = useConversation()

    useEffect(()=>{
        const getMessages = async () =>{
            setLoading(true)

            try{
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setMessages(data); // Update messages state
            }catch(error){
                toast.error(error.message) // Error message should be accessed through error.message, not error.messages
            } finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id) {
            getMessages(); // Call getMessages when selectedConversation._id changes
        }
    }, [selectedConversation?._id, setMessages]);

    return {loading, messages}; // Return loading state
}

export default useGetMessages;
