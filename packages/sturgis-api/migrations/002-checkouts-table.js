/**
 * Migration file that sets up the checkout table and its related table information.
 */

exports.up = async function up(sql) {
    await sql`
        create table if not exists checkouts (
            id serial primary key,
            book_id int unique not null,
            created_by_id int not null,
            created_at timestamp without time zone default (now() at time zone 'utc')
        );
    `

    await sql`
        alter table checkouts add foreign key (created_by_id) references users (id);    
    `

    await sql`
        alter table checkouts add foreign key (book_id) references books (id);    
    `
}

exports.down = async function down(sql) {
    await sql`
        drop table if exists checkouts
    `
}
