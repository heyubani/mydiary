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
  editUser: `
UPDATE users
    SET first_name = $1,
    last_name = $2,
    email = $3
    WHERE id = $4
    RETURNING *
`,
  checkUser: `
    SELECT * FROM users WHERE email=$1
    `,
  allUser: `
    SELECT * FROM users
    `,
  addDiary: `
    INSERT INTO diary (
        name,
        description,
        content,
        user_id
    )   VALUES($1, $2, $3, $4) RETURNING * 
    `,
  userDiaries: `
  SELECT * FROM diary
  `,
  updateDiary: `
    UPDATE diary
    SET name = $1,
        description = $2,
        content = $3
        WHERE id = $4
        RETURNING *
    `,
    adminUpdateUserDiary: `
    UPDATE diary
    SET description=$1,
        content=$2
        WHERE id=$3
        RETURNING *
    `,
  fetchUsers: `
    SELECT name, description, content FROM diary WHERE user_id=$1 
    `,
  searchDiary: `
    SELECT	* 
    FROM diary
    WHERE LOWER(name) LIKE $1
    `,
  adminSearchDiary: `
    SELECT	* 
    FROM diary
    WHERE LOWER(description) LIKE $1
    `,
  deleteDiary: `
    DELETE FROM diary WHERE id=$1
    `,
  adminAddDiary: `
    INSERT INTO diary (
         name,
        description,
        content,
        user_id
    )   VALUES($1, $2, $3, $4) RETURNING * 

    `,
};

module.exports = queries;
