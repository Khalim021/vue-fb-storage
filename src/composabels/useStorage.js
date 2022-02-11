import { projectStorage } from "../firebase/config"
import { ref } from 'vue'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async () => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()
        } catch(err) {
            console.log(err.message)
            error.value = res.message
        }
    }
    return { url, error, filePath, uploadImage}
}
export default useStorage















