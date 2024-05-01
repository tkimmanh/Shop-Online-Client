db.orders.updateOne(
{ _id: ObjectId("id-order") },
{ $set: { deliveredAt: new Date(new Date().setDate(new Date().getDate() - 4)) } }
)