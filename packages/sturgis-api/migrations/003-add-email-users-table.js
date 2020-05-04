/**
 * Migration file that adds emails to the user table
 */

exports.up = async function up(sql) {
    await sql`
        alter table users add column if not exists email varchar unique not null;    
    `
}

exports.down = async function down(sql) {
    await sql`
        alter table users drop column if exists email;    
    `
}
