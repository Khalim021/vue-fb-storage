import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const isPanding = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isPanding.value = true

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complate the signup ')
        }

        await res.user.updateProfile({ displayName })
        error.value = null
        isPanding.value = false

        return res
    } catch(err) {
        error.value = err.message
        isPanding.value = false
    }   
}
const useSignup = () => {
    return {error, signup, isPanding}
}

export default useSignup











