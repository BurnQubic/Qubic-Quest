import {
  PrismaClient,
  PuzzleDifficulty,
  TransactionType,
  TransactionStatus,
  AuctionStatus,
} from "@prisma/client";

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      username: "testuser",
      email: "user@example.com",
      password: "hashedpassword",
      walletAddress: "0x1234567890123456789012345678901234567890",
    },
  });

  // Create a game type
  const gameType = await prisma.gameType.create({
    data: {
      name: "Connect4",
      description: "Classic connect4 puzzle",
    },
  });

  // Create a puzzle
  const puzzle = await prisma.puzzle.create({
    data: {
      name: "Easy Connect4",
      description: "A beginner-friendly connect4 puzzle",
      difficulty: PuzzleDifficulty.EASY,
      gameTypeId: gameType.id,
    },
  });

  // Create a try
  await prisma.try.create({
    data: {
      userId: user.id,
      puzzleId: puzzle.id,
      tryCount: 1,
      success: true,
      timeTaken: 300, // 5 minutes in seconds
    },
  });

  // Create a score
  await prisma.score.create({
    data: {
      userId: user.id,
      puzzleId: puzzle.id,
      score: 1000,
    },
  });

  // Create a leaderboard entry
  await prisma.leaderboard.create({
    data: {
      userId: user.id,
      puzzleId: puzzle.id,
      score: 1000,
      week: 1,
      year: 2023,
    },
  });

  // Create a transaction
  await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: 100,
      txId: "tx_123456789",
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.COMPLETED,
    },
  });

  // Create an item
  const item = await prisma.item.create({
    data: {
      name: "Test Item",
      description: "A test item",
      ownerId: user.id,
    },
  });

  // Create an auction
  const auction = await prisma.auction.create({
    data: {
      sellerId: user.id,
      itemId: 1, // Assuming an item with id 1 exists
      startingPrice: 100,
      currentPrice: 100,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
      status: AuctionStatus.OPEN,
    },
  });

  // Create a bid
  await prisma.bid.create({
    data: {
      auctionId: auction.id,
      bidderId: user.id,
      bidAmount: 150,
      bidTime: new Date(),
    },
  });

  console.log("Seed data created successfully");
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
