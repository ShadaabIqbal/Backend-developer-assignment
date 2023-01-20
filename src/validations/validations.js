const isValidInput = function (value) {
    return Object.keys(value).length > 0;
}

const isEmpty = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
    return nameRegex.test(name);
}

const isValidPhone = function (phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const isValidPswd = function (Password) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
}

const isValidAge = function (age) {
    if (age > 0 && age <= 200) {
        return true;
    }
    return false;
}

const isValidpincode = function (pincode) {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
};

const isValidAadhar = function (Aadhar) {
    const aadharRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    return aadharRegex.test(Aadhar);
}

const isValidDate = function (Date) {
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    return dateRegex.test(Date)
}

const isValidSlot = function (time) {
    let arr = ['10:00 AM-10:30 AM', '10:30 AM-11:00 AM', '11:00 AM-11:30 AM', '11:30 AM-12:00 PM', '12:00 PM-12:30 PM', '12:30 PM-1:00 PM', '1:00 PM-1:30 PM', '1:30 PM-2:00 PM', '2:00 PM-2:30 PM', '2:30 PM-3:00 PM', '3:00 PM-3:30 PM', '3:30 PM-4:00 PM', '4:00 PM-4:30 PM', '4:30 PM-5:00 PM'];
    return arr.includes(time);
}

const isValidDose = function (dose) {
    let arr = ['First dose', 'Second dose'];
    return arr.includes(dose);
}

module.exports = { isValidInput, isEmpty, isValidName, isValidPhone, isValidPswd, isValidAge, isValidpincode, isValidAadhar, isValidDate, isValidSlot, isValidDose }