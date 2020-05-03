/**
 * Migration file that adds thumbnail urls to the books table
 */

exports.up = async function up(sql) {
    await sql`
        alter table books add column if not exists thumbnail_url varchar;    
    `
}

exports.down = async function down(sql) {
    await sql`
        alter table books drop column if exists thumbnail_url;    
    `
}
