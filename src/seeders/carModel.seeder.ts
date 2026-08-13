import {CarBrand} from "../models/carBrand.model";
import {CarModel} from "../models/carModel.model";

class CarModelSeeder {
    public async seed(): Promise<void> {
        const modelsCount = await CarModel.countDocuments();

        if (modelsCount > 0) {
            console.log("Car models already seeded");
            return;
        }

        const brands = await CarBrand.find();

        const brandMap = new Map(
            brands.map((brand) => [brand.name, brand._id])
        );

        await CarModel.insertMany([
            // BMW
            {name: "X5", carBrandId: brandMap.get("BMW")},
            {name: "X6", carBrandId: brandMap.get("BMW")},
            {name: "M5", carBrandId: brandMap.get("BMW")},
            {name: "320", carBrandId: brandMap.get("BMW")},

            // Audi
            {name: "A4", carBrandId: brandMap.get("Audi")},
            {name: "A6", carBrandId: brandMap.get("Audi")},
            {name: "Q5", carBrandId: brandMap.get("Audi")},
            {name: "Q7", carBrandId: brandMap.get("Audi")},

            // Mercedes
            {name: "C-Class", carBrandId: brandMap.get("Mercedes-Benz")},
            {name: "E-Class", carBrandId: brandMap.get("Mercedes-Benz")},
            {name: "GLE", carBrandId: brandMap.get("Mercedes-Benz")},
            {name: "GLS", carBrandId: brandMap.get("Mercedes-Benz")},

            // Volkswagen
            {name: "Golf", carBrandId: brandMap.get("Volkswagen")},
            {name: "Passat", carBrandId: brandMap.get("Volkswagen")},
            {name: "Tiguan", carBrandId: brandMap.get("Volkswagen")},
            {name: "Touareg", carBrandId: brandMap.get("Volkswagen")},

            // Toyota
            {name: "Camry", carBrandId: brandMap.get("Toyota")},
            {name: "Corolla", carBrandId: brandMap.get("Toyota")},
            {name: "RAV4", carBrandId: brandMap.get("Toyota")},
            {name: "Land Cruiser", carBrandId: brandMap.get("Toyota")},

            // Honda
            {name: "Civic", carBrandId: brandMap.get("Honda")},
            {name: "Accord", carBrandId: brandMap.get("Honda")},
            {name: "CR-V", carBrandId: brandMap.get("Honda")},

            // Nissan
            {name: "Qashqai", carBrandId: brandMap.get("Nissan")},
            {name: "X-Trail", carBrandId: brandMap.get("Nissan")},
            {name: "Juke", carBrandId: brandMap.get("Nissan")},

            // Mazda
            {name: "CX-5", carBrandId: brandMap.get("Mazda")},
            {name: "CX-7", carBrandId: brandMap.get("Mazda")},
            {name: "Mazda 6", carBrandId: brandMap.get("Mazda")},

            // Mitsubishi
            {name: "Outlander", carBrandId: brandMap.get("Mitsubishi")},
            {name: "Lancer", carBrandId: brandMap.get("Mitsubishi")},
            {name: "Pajero", carBrandId: brandMap.get("Mitsubishi")},

            // Subaru
            {name: "Forester", carBrandId: brandMap.get("Subaru")},
            {name: "Impreza", carBrandId: brandMap.get("Subaru")},
            {name: "Outback", carBrandId: brandMap.get("Subaru")},

            // Hyundai
            {name: "Tucson", carBrandId: brandMap.get("Hyundai")},
            {name: "Santa Fe", carBrandId: brandMap.get("Hyundai")},
            {name: "Elantra", carBrandId: brandMap.get("Hyundai")},

            // Kia
            {name: "Sportage", carBrandId: brandMap.get("Kia")},
            {name: "Sorento", carBrandId: brandMap.get("Kia")},
            {name: "Ceed", carBrandId: brandMap.get("Kia")},

            // Ford
            {name: "Focus", carBrandId: brandMap.get("Ford")},
            {name: "Mondeo", carBrandId: brandMap.get("Ford")},
            {name: "Kuga", carBrandId: brandMap.get("Ford")},

            // Chevrolet
            {name: "Cruze", carBrandId: brandMap.get("Chevrolet")},
            {name: "Malibu", carBrandId: brandMap.get("Chevrolet")},
            {name: "Captiva", carBrandId: brandMap.get("Chevrolet")},

            // Renault
            {name: "Megane", carBrandId: brandMap.get("Renault")},
            {name: "Duster", carBrandId: brandMap.get("Renault")},
            {name: "Koleos", carBrandId: brandMap.get("Renault")},

            // Peugeot
            {name: "208", carBrandId: brandMap.get("Peugeot")},
            {name: "308", carBrandId: brandMap.get("Peugeot")},
            {name: "3008", carBrandId: brandMap.get("Peugeot")},

            // Skoda
            {name: "Octavia", carBrandId: brandMap.get("Skoda")},
            {name: "Fabia", carBrandId: brandMap.get("Skoda")},
            {name: "Superb", carBrandId: brandMap.get("Skoda")},
            {name: "Kodiaq", carBrandId: brandMap.get("Skoda")},

            // Volvo
            {name: "XC60", carBrandId: brandMap.get("Volvo")},
            {name: "XC90", carBrandId: brandMap.get("Volvo")},
            {name: "S60", carBrandId: brandMap.get("Volvo")},

            // Daewoo
            {name: "Lanos", carBrandId: brandMap.get("Daewoo")},
            {name: "Sens", carBrandId: brandMap.get("Daewoo")},

            // Opel
            {name: "Astra", carBrandId: brandMap.get("Opel")},
            {name: "Vectra", carBrandId: brandMap.get("Opel")},
            {name: "Insignia", carBrandId: brandMap.get("Opel")},

            // Lexus
            {name: "RX350", carBrandId: brandMap.get("Lexus")},
            {name: "GX460", carBrandId: brandMap.get("Lexus")},
            {name: "LX570", carBrandId: brandMap.get("Lexus")},

            // Porsche
            {name: "Cayenne", carBrandId: brandMap.get("Porsche")},
            {name: "Macan", carBrandId: brandMap.get("Porsche")},
            {name: "Panamera", carBrandId: brandMap.get("Porsche")},

            // Jeep
            {name: "Compass", carBrandId: brandMap.get("Jeep")},
            {name: "Cherokee", carBrandId: brandMap.get("Jeep")},
            {name: "Grand Cherokee", carBrandId: brandMap.get("Jeep")},

            // Land Rover
            {name: "Discovery", carBrandId: brandMap.get("Land Rover")},
            {name: "Range Rover", carBrandId: brandMap.get("Land Rover")},
            {name: "Defender", carBrandId: brandMap.get("Land Rover")},

            // Tesla
            {name: "Model 3", carBrandId: brandMap.get("Tesla")},
            {name: "Model S", carBrandId: brandMap.get("Tesla")},
            {name: "Model X", carBrandId: brandMap.get("Tesla")},
            {name: "Model Y", carBrandId: brandMap.get("Tesla")}
        ]);

        console.log("Car models seeded successfully");
    }
}

export const carModelSeeder = new CarModelSeeder();
