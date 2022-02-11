import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const isPanding = ref(false)

const logout = async () => {
    error.value = null
    isPanding.value = true

    try {
        await projectAuth.signOut()
        isPanding.value = false
    } catch(err) {
        error.value = err.message
        isPanding.value = false
    }
}
const useLogout = () => {
    return {error, logout, isPanding}
}
export default useLogout




