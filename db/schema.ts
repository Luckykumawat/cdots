import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const catalogState = sqliteTable('catalog_state', {
 id: text('id').primaryKey(),
 data: text('data').notNull(),
 revision: integer('revision').notNull().default(0),
 updatedAt: text('updated_at').notNull(),
});
export const adminPrincipals = sqliteTable('admin_principals', {
 userId: text('user_id').primaryKey(),
 createdAt: text('created_at').notNull(),
});
