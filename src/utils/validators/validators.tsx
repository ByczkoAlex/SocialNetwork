export const requiredField = (value: number | string): string | undefined => {
    if (value) return undefined;
    return "Field is required"
}

export const maxLengthCreator = (maxLength : number) =>  (value: any): string | undefined => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}

export type ValidateFunc = (val: number | string) => undefined | string