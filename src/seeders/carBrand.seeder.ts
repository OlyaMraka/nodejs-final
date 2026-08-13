import {CarBrand} from "../models/carBrand.model";

class CarBrandSeeder {
    public async seed(): Promise<void> {
        const brandsCount = await CarBrand.countDocuments();

        if (brandsCount > 0) {
            console.log("Car brands already seeded");
            return;
        }

        await CarBrand.insertMany([
            {name: "BMW"},
            {name: "Audi"},
            {name: "Mercedes-Benz"},
            {name: "Volkswagen"},
            {name: "Toyota"},
            {name: "Honda"},
            {name: "Nissan"},
            {name: "Mazda"},
            {name: "Mitsubishi"},
            {name: "Subaru"},
            {name: "Hyundai"},
            {name: "Kia"},
            {name: "Ford"},
            {name: "Chevrolet"},
            {name: "Renault"},
            {name: "Peugeot"},
            {name: "Skoda"},
            {name: "Volvo"},
            {name: "Daewoo"},
            {name: "Opel"},
            {name: "Lexus"},
            {name: "Porsche"},
            {name: "Jeep"},
            {name: "Land Rover"},
            {name: "Tesla"},
            {name: "Acura"},
            {name: "Alfa Romeo"},
            {name: "Bentley"},
            {name: "Bugatti"},
            {name: "Cadillac"},
            {name: "Chery"},
            {name: "Citroen"},
            {name: "Dodge"},
            {name: "Ferrari"},
            {name: "Fiat"},
            {name: "Genesis"},
            {name: "GMC"},
            {name: "Infiniti"},
            {name: "Jaguar"},
            {name: "Lamborghini"},
            {name: "Lincoln"},
            {name: "Mini"},
            {name: "Maserati"},
            {name: "Seat"},
            {name: "Suzuki"},
            {name: "Smart"},
            {name: "SsangYong"},
            {name: "ZAZ"},
            {name: "BYD"},
            {name: "Geely"}
        ]);

        console.log("Car brands seeded successfully");
    }
}

export const carBrandSeeder = new CarBrandSeeder();
