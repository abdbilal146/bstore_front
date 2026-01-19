import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "@tanstack/react-router";


export const Callback = () => {
    const navigate = useNavigate()
    const { isLoading } = useHandleSignInCallback(() => {
        navigate({ to: "/" });
    })


    if (isLoading) {
        return <div>Redirecting...</div>;
    }

    return null
}