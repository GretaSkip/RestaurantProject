
export interface Restaurant {
    id: number,
    title: string,
    customers: number,
    employees: number,
    meniuId: number,
    meniu: Meniu
};

export interface Meniu {
    id: number,
    title: string
};