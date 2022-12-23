interface THotel {
    HotelId: number,
    Name: string,
    City: string,
    Address: string,
    PhoneNumber: string
  }
  
  interface THotelList {
    map(arg0: (deps: THotel) => JSX.Element): import("react").ReactNode;
    [key: number]: THotel;
  }
  
  export { THotel, THotelList};