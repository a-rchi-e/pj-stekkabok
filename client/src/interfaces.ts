
interface RoomProps {
    name: string,
    prod_id: string,
    imgPath: string,
    price: number,
    desc: string,
    sleeps: number,
    days: number,
    triggerWarning: () => void
}

interface RoomData {
    name: string, 
    prod_id: string,
    price: number,
    days: number, 
    nights: number
}

interface Booking {
    sleeps: number,
    days: number[]
}

interface CheckoutReq {
    clientSecret: string
}

interface ListProps {
    availableRooms: RoomProps[],
    days: number,
    triggerWarning: () => void
}

export { RoomProps, RoomData, Booking, CheckoutReq, ListProps }