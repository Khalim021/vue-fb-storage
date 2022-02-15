import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPanding = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPanding.value = true
        error.value = null
        try {
            const res = await docRef.delete()
            isPanding.value = false
            return res
        } catch(err) {
            console.log(err.mesagge)
            isPanding.value = false
            error.value = 'Could not delete the document'
        }
    }
    const updateDoc = async (updates) => {
        isPanding.value = true
        error.value = null
        try {
            const res = await docRef.update(updates)
            isPanding.value = false
            return res
        } catch(err) {
            console.log(err.mesagge)
            isPanding.value = false
            error.value = 'Could not update the document'
        }
    }

    return { error, isPanding, deleteDoc, updateDoc }
    
}
export default useDocument

















