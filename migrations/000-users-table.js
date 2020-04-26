const users = [
    {
        name: 'Irma Prince',
        role: 'librarian',
    },
    {
        name: 'Hermione Granger',
        role: 'member',
    },
    {
        name: 'Harry Potter',
        role: 'member',
    },
    {
        name: 'Percy Weasley',
        role: 'member',
    },
]

exports.up = async function up(sql) {
    await sql`
        create type user_roles as enum ('librarian', 'member');
    `

    await sql` 
        create table if not exists users (
            id serial primary key,
            name varchar,
            role user_roles
        );
    `

    await sql`
        insert into users ${sql(users, 'name', 'role')}
    `
}

exports.down = async function down(sql) {
    await sql`
        drop table if exists users;
    `

    await sql`
        drop type if exists user_roles;
    `
}
