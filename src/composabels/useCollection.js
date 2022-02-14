import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {

    let error = ref(null)
    const isPanding = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPanding.value = true
    
        try {
            const res = await projectFirestore.collection(collection).add(doc)
            isPanding.value = false

            return res
        } 
        catch(err) {
            console.log(err.message)
            error.value = "Colud not send message"
            isPanding.value = false
        }
    }
    return {error, addDoc, isPanding}
}

export default useCollection
















