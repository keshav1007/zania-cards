export interface CardData {
    id: number;
    type: string;
    title: string;
    position: number;
}

export interface CardPropsType {
    data: CardData;
    onClick: any;
}

export interface ModalPropsType {
    data: CardData | undefined;
    isOpen: boolean
}