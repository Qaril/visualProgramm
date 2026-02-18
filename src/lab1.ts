export interface User {
    id: number;
    name: string;
    email?: string;
    isActive: true;
}

export function createUser(id:number, name:string, email?:string):User{
    return {
        id:id,
        name:name,
        email:email,
        isActive: true
    }
}

export interface Book {
    title: string;
    autor: string;
    year?: number;
    genre: 'fiction' | 'non-fiction';
}

export function createBook(book: Book) {
    return book;
}

createBook({
    title: "book 1",
    autor: "eto ya",
    year: 1232,
    genre: 'fiction',
})

createBook({
    title: "book 2",
    autor: "eto ya2",
    genre: 'non-fiction',
})

export function calculateArea(shape: 'circle', radius: number): number;
export function calculateArea(shape: 'square', side: number): number;

export function calculateArea(shape: 'circle' | 'square', num: number): number {
    if (shape === 'circle') {
        return Math.PI * num * num;
    } else {
        return num * num;
    }
}

console.log(calculateArea('circle', 15));
console.log(calculateArea('square', 34));

type Status="active"|"inactive"|"new";
export function getStatusColor(status:Status):string{
    if (status==="active") return "green"
    else if(status==="new") return "yellow"
    else return "red"
}
console.log("active",getStatusColor("active"))
console.log("inactive", getStatusColor("inactive"))
console.log("new",getStatusColor("new"))

export type StringFormatter=(string:string, uppercase?:boolean)=>string;
export const UpperFirst: StringFormatter=(string:string,uppercase:boolean=false):string=>{
    if (string.length==0) return string;
    let result:string=string[0].toUpperCase()+string.slice(1,string.length).toLowerCase();
    return uppercase? result.toUpperCase() : result;
}

export const TrimStr: StringFormatter=(string:string,uppercase:boolean=false):string=>{
    if (string.length==0) return string;
    const trimmed:string=string.trim();
    return uppercase? trimmed.toUpperCase():trimmed;
}

console.log(UpperFirst("формат1"))
console.log(TrimStr("формат2"))

export function getFirstElement<T>(arr: T[]): T | undefined{
    if(arr.length== 0){
        return undefined;
    }
    return arr[0];
    // const num = [1,2,13];
    // const strings = ['privet','nerefe','fsdas'];
    // const emty: number[] = [];
    // console.log('1 num', getFirstElement(num));
    // console.log('1 str',getFirstElement(strings));
    // console.log('void arr', getFirstElement(emty));
}

export interface hasId{
    id: number;

}

export interface testUser extends hasId{
    name: string;
    email? : string;
}

export const user: testUser[] = [
    {id: 1, name: 'Валера', email: 'valerchik@gmail.com'},
    {id: 2, name: 'dssds', email: 'sdffasd@msfd.ru'},
    {id: 3, name: 'privet', email: 'eqrqefeqd@rfd.sp'},
    {id: 4, name: 'qq'}
];

export function findById<T extends hasId>(items: T[], id: number): T | undefined{
    for(let i = 0; i < items.length; i++){
        if(items[i].id === id){
            return items[i];
        }
    }
    return undefined;
}

console.log('id 4', findById(user,4));
console.log('id 1',findById(user,1));
console.log('id 15',findById(user,15));