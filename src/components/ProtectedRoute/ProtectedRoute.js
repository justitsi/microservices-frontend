const ProtectedRoute = (props) => {
    const destination = window.location.pathname;
    if (!props.authenticated) window.location.replace(`/login/?next=${destination}`)
    return (
        props.component
    )
}
export default ProtectedRoute