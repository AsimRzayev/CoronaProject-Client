export interface IInfoboxProps {
    onClick: any;
    title: string;
    cases: string;
    total: string;
    isRed: boolean;
    isGrey: boolean;
    active: boolean;
    isloading: boolean;
    className: string;
}

export interface ICountryInfoState {
    todayCases: number;
    todayRecovered: number;
    todayDeaths: number;
    cases: number;
    deaths: number;
    recovered: number;
}

export interface IMapCenterState {
    lat: number;
    lng: number;
}
export interface IMemories {
    _id?: string;
    name: string;
    title: string;
    description: string;
    tags: string;
    createdAt?: string;
    selectedFile: string;
    likes?: string[] | undefined;
    viewcount?: number;
}
export interface IFormProps {
    currentId: string;
    setCurrentId: (value: string) => void;
}
export interface IMemoryProps {
    setCurrentId: (value: string) => void;
}

export interface ISignIn {
    email: string;
    password: string;
}
export interface ISignup {
    email: string;
    password: string;
}
export interface IFilter {
    search: string;
    category: string;
}
export interface IRecomendedMemories {
    title: string;
    name: string;
    description: string;
    likes: [];
    selectedFile: string;
    _id: string;
}
