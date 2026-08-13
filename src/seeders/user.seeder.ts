import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import {Role} from "../models/role.model";
import {AccountTypes} from "../enums/account-types";
import {RoleName} from "../enums/role.enum";

class UserSeeder {
    public async seed(): Promise<void> {
        const usersCount = await User.countDocuments();

        if (usersCount > 0) {
            console.log("Users already seeded");
            return;
        }

        const sellerRole = await Role.findOne({name: RoleName.SELLER});
        const managerRole = await Role.findOne({name: RoleName.MANAGER});
        const adminRole = await Role.findOne({name: RoleName.ADMIN});

        if (!sellerRole || !managerRole || !adminRole) {
            throw new Error("Roles not found. Run role seeder first.");
        }

        const password = await bcrypt.hash("Password123!", 10);

        await User.insertMany([
            // ADMINS
            {
                name: "Ivan",
                surname: "Petrenko",
                age: 35,
                email: "admin1@gmail.com",
                phone: "+380671111111",
                password,
                roleId: adminRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Petro",
                surname: "Ivanenko",
                age: 42,
                email: "admin2@gmail.com",
                phone: "+380672222222",
                password,
                roleId: adminRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Oksana",
                surname: "Koval",
                age: 38,
                email: "admin3@gmail.com",
                phone: "+380673333333",
                password,
                roleId: adminRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },

            // MANAGERS
            {
                name: "Andriy",
                surname: "Shevchenko",
                age: 29,
                email: "manager1@gmail.com",
                phone: "+380674444444",
                password,
                roleId: managerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Taras",
                surname: "Melnyk",
                age: 31,
                email: "manager2@gmail.com",
                phone: "+380675555555",
                password,
                roleId: managerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Roman",
                surname: "Bondar",
                age: 27,
                email: "manager3@gmail.com",
                phone: "+380676666666",
                password,
                roleId: managerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Ihor",
                surname: "Tkachenko",
                age: 34,
                email: "manager4@gmail.com",
                phone: "+380677777777",
                password,
                roleId: managerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Maksym",
                surname: "Boyko",
                age: 30,
                email: "manager5@gmail.com",
                phone: "+380678888888",
                password,
                roleId: managerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },

            // BASIC SELLERS
            {
                name: "Olena",
                surname: "Savchuk",
                age: 25,
                email: "seller1@gmail.com",
                phone: "+380679000001",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.BASIC,
                isVerified: true,
            },
            {
                name: "Mykola",
                surname: "Kravets",
                age: 41,
                email: "seller2@gmail.com",
                phone: "+380679000002",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.BASIC,
                isVerified: true,
            },
            {
                name: "Sofia",
                surname: "Lysenko",
                age: 23,
                email: "seller3@gmail.com",
                phone: "+380679000003",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.BASIC,
                isVerified: true,
            },
            {
                name: "Yaroslav",
                surname: "Pavlenko",
                age: 36,
                email: "seller4@gmail.com",
                phone: "+380679000004",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.BASIC,
                isVerified: true,
            },
            {
                name: "Nazar",
                surname: "Moroz",
                age: 28,
                email: "seller5@gmail.com",
                phone: "+380679000005",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.BASIC,
                isVerified: true,
            },

            // PREMIUM SELLERS
            {
                name: "Denys",
                surname: "Kovalchuk",
                age: 33,
                email: "premium1@gmail.com",
                phone: "+380679000011",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Viktor",
                surname: "Mazur",
                age: 37,
                email: "premium2@gmail.com",
                phone: "+380679000012",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Kateryna",
                surname: "Klymenko",
                age: 28,
                email: "premium3@gmail.com",
                phone: "+380679000013",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Yulia",
                surname: "Polishchuk",
                age: 32,
                email: "premium4@gmail.com",
                phone: "+380679000014",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
            {
                name: "Oleksandr",
                surname: "Danylko",
                age: 40,
                email: "premium5@gmail.com",
                phone: "+380679000015",
                password,
                roleId: sellerRole._id,
                accountType: AccountTypes.PREMIUM,
                isVerified: true,
            },
        ]);

        console.log("Users seeded successfully");
    }
}

export const userSeeder = new UserSeeder();
