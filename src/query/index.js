const queries = {
  newUser: `
     INSERT INTO users (
         first_name,
         last_name,
         email,
         password,
         is_admin
     ) VALUES($1, $2, $3, $4, $5)
     RETURNING *
    `,

  login: `SELECT * FROM users WHERE email=$1`,

  checkUser: `
    SELECT * FROM users WHERE email=$1
    `,
  allUser: `
    SELECT * FROM users where email=$1
    `,
  addDiary: `
    INSERT INTO diary (
        name,
        description,
        content,
        user_id
    )   VALUES($1, $2, $3, $4) RETURNING * 
    `,
  updateDiary: `
    UPDATE diary
    SET name = $1,
        description = $2,
        content = $3
        WHERE id = $4
        RETURNING *
    `,
    fetchUsers: `
    SELECT name, description, content FROM diary WHERE user_id=$1 
    `,
    searchUser: `
    SELECT	* 
    FROM diary
    WHERE LOWER(name) LIKE $1
    `,
    deleteDiary: `
    DELETE FROM diary WHERE id=$1
    `
};

module.exports = queries;
