exports.up = async function up(sql) {
    await sql`
        create table if not exists checkouts (
            id serial primary key,
            user_id int,
            book_id int,
            created_at timestamp without time zone default (now() at time zone 'utc')
        );
    `

    await sql`
        alter table checkouts add foreign key (user_id) references users (id);    
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
