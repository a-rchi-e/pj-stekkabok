
interface Room {
    name: string,
    prod_id: string,
    beds: number,
    price: number,
    desc: string,
    booked: number[],
    imgPath: string
  }
  
  interface Booking {
    beds: number,
    days: number[]
  }
  
  interface CheckoutReq {
    clientSecret: string
  }

  export { Room, Booking, CheckoutReq};