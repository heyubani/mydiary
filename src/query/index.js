const queries = {
    newUser: `
     INSERT INTO diaries (
         firstName,
         lastName,
         email,
         password,
         isAdmin
     ) VALUES($1, $2, $3, $4, $5)
     RETURNING *
    `,
    allUser:`
    SELECT * FROM diaries
    `
}

module.exports = queries