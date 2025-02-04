import db from "@/db/index"
import sampleData from "@/db/sample-data"

const main = async() =>{
    await db.cartItem.deleteMany()
    await db.cart.deleteMany()
    await db.product.deleteMany();
    await db.account.deleteMany();
    await db.user.deleteMany();
    await db.product.createMany({ data: sampleData.products});
    await db.user.createMany({data:sampleData.users});

    console.log("Database seeded successfully!");
}

main()