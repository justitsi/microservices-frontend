const ProtectedRoute = (props) => {
    if (!props.authenticated) window.location.replace("/login")
    return (
        props.component
    )
}
export default ProtectedRoute