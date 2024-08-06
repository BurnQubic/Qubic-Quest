Certainly! Here is the updated API documentation incorporating the previous answer and ensuring it is comprehensive for your project:

## API Documentation

### User Management

1. **POST /api/register** - Register a new user.
2. **POST /api/login** - Authenticate a user and issue a JWT token.
3. **GET /api/user** - Retrieve the authenticated user's profile.
4. **PATCH /api/user** - Update the authenticated user's profile details.
5. **POST /api/logout** - Log out the user and invalidate the JWT token.

### Puzzle and Game Logic

1. **GET /api/puzzles** - Retrieve the list of available puzzles.
2. **POST /api/puzzles/:puzzleId/try** - Submit a try for a specific puzzle.
3. **GET /api/puzzles/:puzzleId/history** - Retrieve the try history for a specific puzzle and user.

### Leaderboards

1. **GET /api/leaderboards** - Retrieve the current leaderboards for all puzzles.
2. **GET /api/leaderboards/:puzzleId** - Retrieve the leaderboard for a specific puzzle.
3. **GET /api/leaderboards/global** - Retrieve the global leaderboard for overall game performance.

### Rewards

1. **GET /api/rewards** - Retrieve the rewards for the authenticated user.
2. **POST /api/rewards/claim** - Claim a specific reward.

### Transactions

1. **POST /api/transactions** - Create a new transaction (e.g., for retry purchases).
2. **GET /api/transactions** - Retrieve the transaction history for the authenticated user.
3. **GET /api/transactions/:transactionId** - Retrieve details of a specific transaction.

### Daily Tries

1. **GET /api/daily-tries** - Retrieve the daily tries information for the authenticated user.
2. **PATCH /api/daily-tries** - Reset daily tries or update the number of tries remaining.

### Items

1. **GET /api/items** - Retrieve the list of items owned by the authenticated user.
2. **POST /api/items** - Create a new item.
3. **GET /api/items/:itemId** - Retrieve details of a specific item.
4. **PATCH /api/items/:itemId** - Update the details of a specific item.
5. **DELETE /api/items/:itemId** - Delete a specific item.

### Auctions

1. **GET /api/auctions** - Retrieve the list of active auctions.
2. **POST /api/auctions** - Create a new auction.
3. **GET /api/auctions/:auctionId** - Retrieve details of a specific auction.
4. **POST /api/auctions/:auctionId/bid** - Place a bid on an auction.
5. **PATCH /api/auctions/:auctionId** - Update details of an auction (e.g., end time).
6. **DELETE /api/auctions/:auctionId** - Cancel an auction.

### Bids

1. **GET /api/bids** - Retrieve the list of bids made by the authenticated user.
2. **GET /api/bids/:bidId** - Retrieve details of a specific bid.

### Social Features

1. **GET /api/friends** - Retrieve the friend list for the authenticated user.
2. **POST /api/friends** - Send a friend request to another user.
3. **GET /api/friends/requests** - Retrieve incoming friend requests.
4. **PATCH /api/friends/requests/:requestId** - Accept or reject a friend request.
5. **DELETE /api/friends/:friendId** - Remove a friend.

### Messaging

1. **POST /api/messages** - Send a message to a friend.
2. **GET /api/messages/conversations** - Retrieve list of message conversations.
3. **GET /api/messages/conversations/:conversationId** - Retrieve messages from a specific conversation.

### Notifications

1. **GET /api/notifications** - Retrieve notifications for the authenticated user.
2. **PATCH /api/notifications/:notificationId** - Mark a notification as read.
3. **DELETE /api/notifications/:notificationId** - Delete a specific notification.

### Admin

1. **GET /api/admin/users** - Retrieve a list of all users (Admin only).
2. **PATCH /api/admin/users/:userId** - Update user details (Admin only).
3. **DELETE /api/admin/users/:userId** - Delete a user (Admin only).
4. **GET /api/admin/transactions** - Retrieve all transactions (Admin only).
5. **PATCH /api/admin/transactions/:transactionId** - Update transaction status (Admin only).

### Real-time Updates (Socket)

1. **connect** - Fired when the client connects to the server.
2. **disconnect** - Fired when the client disconnects from the server.
3. **leaderboardUpdate** - Real-time updates for leaderboard changes.
4. **rewardUpdate** - Real-time updates for new rewards.
5. **messageReceived** - Real-time updates when a new message is received.
6. **friendRequestReceived** - Real-time updates when a new friend request is received.
7. **auctionUpdate** - Real-time updates for changes in auctions (e.g., new bids).