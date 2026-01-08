import { databases, conf } from './config';
import { ID, Query, Permission, Role } from 'appwrite';

export class DatabaseService {
    async createExpense({ title, amount, category, date, userId }) {
        try {
            return await databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    amount,
                    category,
                    date,
                    userId,
                },
                [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ]
            );
        } catch (error) {
            console.log("Appwrite serive :: createExpense :: error", error);
            throw error;
        }
    }

    async getExpenses(userId) {
        try {
            return await databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', userId),
                    Query.orderDesc('date')
                ]
            );
        } catch (error) {
            console.log("Appwrite serive :: getExpenses :: error", error);
            return false;
        }
    }

    async deleteExpense(id) {
        try {
            await databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteExpense :: error", error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;