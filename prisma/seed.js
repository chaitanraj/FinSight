// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ALLOWED_CATEGORIES = [
  "Groceries",
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Rent",
  "Entertainment",
  "Health",
  "Travel",
  "Other"
];

// Helper: random integer
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: random category
function randomCategory() {
  const idx = rand(0, ALLOWED_CATEGORIES.length - 1);
  return ALLOWED_CATEGORIES[idx];
}

// Helper: random recent date (last 60 days)
function randomDate() {
  const daysAgo = rand(0, 60);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

async function main() {
  const expenses = [];

  // 20 expenses for userId = 1
  for (let i = 0; i < 20; i++) {
    expenses.push({
      userId: 1,
      merchant: `Merchant_${i + 1}`,
      amount: rand(1, 2000),
      category: randomCategory(),
      date: randomDate(),
      metadata: { note: "Sample seed expense" }
    });
  }

  // 30 expenses for userId = 2
  for (let i = 0; i < 30; i++) {
    expenses.push({
      userId: 2,
      merchant: `Merchant_${i + 21}`,
      amount: rand(1, 2000),
      category: randomCategory(),
      date: randomDate(),
      metadata: { note: "Sample seed expense" }
    });
  }

  await prisma.expense.createMany({
    data: expenses
  });

  console.log("Seed completed: 50 expenses inserted.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
