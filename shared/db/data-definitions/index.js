const users = require('./users.json');
const standard = require('./standard.json');
const section = require('./section.json');
const city = require('./city.json');
const school = require('./school.json');
const teacher = require('./teacher.json');
const student = require('./student.json');
const subject = require('./subject.json');
const parent = require('./parent.json');
const usertype = require('./usertype.json');
const admin = require('./admin.json');
const superadmin = require('./superadmin.json');


module.exports = function () {
    return {
        users,
        standard,
        section,
        city,
        school,
        teacher,
        student,
        subject,
        parent,
        usertype,
        admin,
        superadmin,
    };
}();