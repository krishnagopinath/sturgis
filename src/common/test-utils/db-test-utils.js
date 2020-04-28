const test = require('ava')
const ley = require('ley')
const appRoot = require('app-root-path')

const { sql } = require('../utils/index')

const leyOptions = {
    cwd: appRoot.toString(),
    dir: './migrations',
}

function printAndKill(e) {
    console.error(e)
    process.exit(1)
}

/**
 * Rolls back migrations that were run by `migrateDb`, to
 * start with a clean slate.
 */
async function rollbackDb(t) {
    try {
        await ley.down({
            ...leyOptions,
            all: true,
        })
    } catch (error) {
        t.fail('Rollback failed, quitting...')
        printAndKill(error)
    }
}

/**
 * Runs the migrations found in `{project-root}/migrations`
 */
async function migrateDb(t) {
    try {
        await ley.up(leyOptions)
    } catch (error) {
        t.fail('Migration failed, quitting...')
        printAndKill(error)
    }
}

/**
 * Performs a simple query to check if DB connection is 👍
 * @param {*} t
 */
async function checkIfDbExists(t) {
    try {
        await sql`
            select 1+1;
        `
    } catch (error) {
        t.fail(
            `DB ${process.env.PGDATABASE} does not exist. Please create it before running the test suite!`,
        )
        printAndKill(error)
    }
}

/**
 * Trancates tables
 * @param {*} t
 */
async function truncateDb(t) {
    try {
        const tables = (
            await sql`
                select 
                    table_name 
                from information_schema.tables 
                where table_schema='public' 
                and table_name != 'migrations';
            `
        ).map(t => t.table_name)

        await sql`
            truncate table ${sql(tables)}
            restart identity;
        `
    } catch (error) {
        t.fail(`Truncate failed`)
        printAndKill(error)
    }
}

/**
 * Shorthand function that sets up DB related setup and teardown
 */
exports.testDbSetup = async function testDbSetup() {
    test.before(async t => {
        await checkIfDbExists(t)
        await migrateDb(t)
    })

    test.afterEach.always(truncateDb)
    test.after.always(rollbackDb)
}
