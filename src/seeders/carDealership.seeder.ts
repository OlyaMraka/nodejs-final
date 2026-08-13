import {CarDealership} from "../models/carDealership.model";

class CarDealershipSeeder {
    public async seed(): Promise<void> {
        const dealershipsCount = await CarDealership.countDocuments();

        if (dealershipsCount > 0) {
            console.log("Car dealerships already seeded");
            return;
        }

        await CarDealership.insertMany([
            {
                name: "AutoPrime",
                address: "Shevchenko Street 12, Kyiv",
                email: "sales@autoprime.com",
                phone: "+380501234567",
            },
            {
                name: "DriveLux",
                address: "Victory Avenue 45, Lviv",
                email: "hello@drivelux.com",
                phone: "+380672345678",
            },
            {
                name: "City Motors",
                address: "Soborna Street 8, Odesa",
                email: "info@citymotors.com",
                phone: "+380631234567",
            },
            {
                name: "Premium Auto",
                address: "Independence Square 3, Kharkiv",
                email: "support@premiumauto.com",
                phone: "+380951234567",
            },
            {
                name: "AutoWorld",
                address: "Gagarin Street 19, Dnipro",
                email: "contact@autoworld.com",
                phone: "+380661234567",
            },
            {
                name: "GrandDrive",
                address: "Lesi Ukrainky Street 77, Vinnytsia",
                email: "sales@granddrive.com",
                phone: "+380931234567",
            }
        ]);

        console.log("Car dealerships seeded successfully");
    }
}

export const carDealershipSeeder = new CarDealershipSeeder();
