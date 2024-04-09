export interface User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    accountTypeId: number;
}

export interface AccountType {
    id: number;
    nameType: string;
}

export interface FitnessTypeClass {
    id: number;
    nameType: string; 
}

export interface FitnessClass {
    id: number;
    numberClass: number;
    fitenssTypeClass : FitnessTypeClass; 
    startDate: string;
    endDate: string;
    activePlace: number;
    maxPlace: number;
    userId: number;
    user: User; 
}


export interface Reservation {
    dataReservation: string;
    userId: number;
    fitnessClassId: number;
    isAccepted: boolean;
}
