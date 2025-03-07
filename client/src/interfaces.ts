
interface Room {
    name: string,
    prod_id: string,
    sleeps: number,
    price: number,
    desc: string,
    booked: number[],
    imgPath: string
}

interface Booking {
    sleeps: number,
    days: number[]
}

interface CheckoutReq {
    clientSecret: string
}

export { Room, Booking, CheckoutReq }