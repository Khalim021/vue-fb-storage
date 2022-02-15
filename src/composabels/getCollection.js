import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }
    
    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })
        documents.value = results
        error.value = null
    }, (err) => {
        documents.value = null
        error.value = 'Colud not fetch tha data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })
    
    return {documents, error}
}

export default getCollection





