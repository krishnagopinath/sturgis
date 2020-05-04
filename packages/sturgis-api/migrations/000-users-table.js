/**
 * Migration file that sets up the user table.
 */

exports.up = async function up(sql) {
    await sql`
        create type user_roles as enum ('librarian', 'member');
    `

    await sql` 
        create table if not exists users (
            id serial primary key,
            name varchar not null,
            role user_roles
        );
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
