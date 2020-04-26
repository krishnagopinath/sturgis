exports.up = async function up(sql) {
    await sql`
        create table if not exists books (
            id serial primary key,
            name varchar,
            author varchar,
            isbn varchar,
            created_at timestamp without time zone default (now() at time zone 'utc'),
            created_by_id int
        );
    `

    await sql`
        alter table books add foreign key (created_by_id) references users (id);
    `
}

exports.down = async function down(sql) {
    await sql`
        drop table if exists books;
    `
}
