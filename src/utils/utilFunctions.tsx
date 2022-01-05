
export async function fetchAndParse<T>(input: RequestInfo, init: RequestInit): Promise<T>{
    const result = await fetch(input, init);
    try {
        const data = await result.json();
        return data as T;
    }catch (e: any){
        return (result as unknown) as T;
    }
}