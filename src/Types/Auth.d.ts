interface UserAuth{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    role: string,
    avatar: string,
    active: boolean,
    socketId: string|null,
    isOnline: boolean,
    created_at: string,
    updated_at: string,
    token: string,
    md5?:string
}

type HexaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type HexaLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexaChar = HexaLetter | HexaNumber;
type Hexa3 = `${HexaChar}${HexaChar}${HexaChar}`;
type Hexa6 = `${Hexa3}${Hexa3}`;
type Hexa8 = `${Hexa6}${HexaChar}${HexaChar}`;
type ColorValueHexComplex = `#${Hexa3 | Hexa6 | Hexa8}`;