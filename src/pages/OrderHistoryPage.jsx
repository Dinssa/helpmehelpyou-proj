import { checkToken } from "../utilities/user-service"

export default function OrderHistoryPage(){
    async function handleCheckToken(){
        // const user = getUserFromToken();
        const expDate = await checkToken();
        alert('clicked')
        console.log(expDate)
    }

    return (
    <>
        <h1>Order History Page</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
    )
}