exports.up = async function up(sql) {
    await sql`
        create table if not exists user_book (
            id serial primary key,
            user_id int,
            book_id int,
            created_at timestamp without time zone default (now() at time zone 'utc')
        );
    `

    await sql`
        alter table user_book add foreign key (user_id) references users (id);    
    `

    await sql`
        alter table user_book add foreign key (book_id) references books (id);    
    `
}

exports.down = async function down(sql) {
    await sql`
        drop table if exists user_book
    `
}
