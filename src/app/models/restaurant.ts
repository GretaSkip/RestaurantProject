import { Meniu } from "./meniu";

export interface Restaurant {
    id: number,
    title: string,
    customers: number,
    employees: number,
    meniuId: number,
    meniu: Meniu
};