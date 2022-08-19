export default {
    queryStringify(data: object) {
        if (typeof data !== 'object') {
            throw new Error('Data must be object');
        }
        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key as keyof Object]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    },
    onInvalidInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        if (target.value === '') {
            target.setCustomValidity(`${target.name} is empty!`);
        }
        if (target.validity.patternMismatch) {
            target.setCustomValidity(`${target.name} has pattern mismatch!`);
        }
    },
    onBlurInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.checkValidity();
    },
    onFocusInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.reportValidity();
    },
};
