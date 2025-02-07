export const emailValidator = (value: string) => {
    const regex = new RegExp(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)
    if (!regex.test(value)) {
        return 'the specified e-mail is not valid';
    }

    return '';
};

export const passwordValidator = (value: string) => {
    const regex = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    if (!regex.test(value)) {
        return 'the specified password is not valid';
    }

    return '';
};

export const isEmptyValidator = (value: string) => {
    if (!value) {
        return 'didn\'t specify password ';
    }

    return '';
};

export const fullNameValidator = (value: string) => {
    const regex = new RegExp(/^\p{Lu}\p{L}*\s((\p{Lu}\p{L}*)+\s)*\p{Lu}\p{L}*$/gu)
    if (!regex.test(value)) {
        return 'the specified full name is not valid';
    }

    return '';
};