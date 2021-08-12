export type fieldValidatorsType = (value : string) => string | undefined

export const requiredField: fieldValidatorsType = (value) => {
    if (value) return undefined;
    return "Field is required"
}

export const maxLengthCreator = (maxLength : number) : fieldValidatorsType =>  (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}
