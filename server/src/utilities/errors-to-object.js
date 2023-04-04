export function errorsToObject(errors) {
    const obj = {};
    if (errors) {
        errors.forEach(error => {
            //console.log(error);
            let key = error.instancePath.substring(1);
            if (key === '') {
                key = '/';
            }
            obj[key] = obj[key] || [];
            obj[key].push(error.message);
        });
    }
    return obj;
}